// app/api/deploy-verifier/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import util from "util";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const execAsync = util.promisify(exec);
const BASE_TEMP_DIR = path.resolve("./temp_deployments");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const verifierSol: string = body.verifier;

    if (!verifierSol) {
      return NextResponse.json({ error: "Missing verifier.sol code" }, { status: 400 });
    }

    const tempDir = path.join(BASE_TEMP_DIR, `deploy-${uuidv4()}`);
    await fs.ensureDir(tempDir);

    const solPath = path.join(tempDir, "verifier.sol");

    await fs.writeFile(solPath, verifierSol);

    // Step 1: Compile to .polkavm (run inside tempDir)
    await execAsync(`npx @parity/revive --bin verifier.sol`, { cwd: tempDir });

    // Step 2: Find the generated .polkavm file dynamically
    const files = await fs.readdir(tempDir);
    const polkavmFile = files.find((f) => f.endsWith(".polkavm"));
    if (!polkavmFile) {
      return NextResponse.json({ error: "Compiled .polkavm file not found" }, { status: 500 });
    }
    const polkavmPath = path.join(tempDir, polkavmFile);

    // Step 3: Use xxd to get hex string from the correct .polkavm file
    const xxdCmd = `xxd -p -c 99999 ${polkavmPath}`;
    const { stdout: hexData } = await execAsync(xxdCmd);

    if (!hexData || hexData.trim().length === 0) {
      return NextResponse.json({ error: "Failed to extract hex data from .polkavm" }, { status: 500 });
    }

    const privateKey = process.env.PRIVATE_KEY;
    const rpcUrl = process.env.RPC_URL;

    if (!privateKey || !rpcUrl) {
      return NextResponse.json({ error: "Missing PRIVATE_KEY or RPC_URL in environment" }, { status: 500 });
    }

    // Step 4: Deploy using cast
    const deployCmd = `cast send --rpc-url ${rpcUrl} --private-key ${privateKey} --create "${hexData.trim()}" --json`;
    const { stdout } = await execAsync(deployCmd);
    const deployResult = JSON.parse(stdout);

    return NextResponse.json({
      contractAddress: deployResult.contractAddress,
      txHash: deployResult.transactionHash,
    });

  } catch (err: any) {
    console.error("Deploy error:", err);
    return NextResponse.json({ error: "Deploy failed", details: err.message || String(err) }, { status: 500 });
  }
}