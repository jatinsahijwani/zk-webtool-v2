import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs-extra";
import util from "util";
import { v4 as uuidv4 } from "uuid";
import solc from "solc"; // <-- NEW

const execAsync = util.promisify(exec);

const PTAU_FILE_PATH = path.resolve("pot12_final.ptau");
const BASE_TEMP_DIR = path.resolve("./temp_circuits");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const circomCode: string = body.circuit;

    if (!circomCode) {
      return NextResponse.json({ error: "Missing circuit input." }, { status: 400 });
    }

    await fs.ensureDir(BASE_TEMP_DIR);

    const tempDir = path.join(BASE_TEMP_DIR, `circom-${uuidv4()}`);
    await fs.ensureDir(tempDir);

    const circuitFilePath = path.join(tempDir, "circuit.circom");
    await fs.writeFile(circuitFilePath, circomCode);

    const compileCmd = `circom circuit.circom --r1cs --wasm --sym`;
    await execAsync(compileCmd, { cwd: tempDir });

    const ptauPath = path.join(tempDir, "pot12_final.ptau");
    await fs.copyFile(PTAU_FILE_PATH, ptauPath);

    const r1csPath = path.join(tempDir, "circuit.r1cs");
    const zkeyPath = path.join(tempDir, "circuit_final.zkey");
    const setupCmd = `snarkjs groth16 setup ${r1csPath} ${ptauPath} ${zkeyPath}`;
    try {
      await execAsync(setupCmd);
    } catch (err: any) {
      console.error("Error during groth16 setup:", err.stderr || err.message || err);
      return NextResponse.json(
        {
          error: "groth16 setup failed",
          details: err.stderr || err.message || String(err),
        },
        { status: 500 }
      );
    }

    const verifierPath = path.join(tempDir, "verifier.sol");
    const exportCmd = `snarkjs zkey export solidityverifier ${zkeyPath} ${verifierPath}`;
    await execAsync(exportCmd);

    const wasmPath = path.join(tempDir, "circuit.wasm");
    const wasmFile = await fs.readFile(wasmPath, "base64");
    const zkeyFile = await fs.readFile(zkeyPath, "base64");
    const verifierSol = await fs.readFile(verifierPath, "utf-8");

    // 🔧 Compile verifier.sol using solc to get ABI + Bytecode
    const solcInput = {
      language: "Solidity",
      sources: {
        "verifier.sol": {
          content: verifierSol,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode.object"],
          },
        },
      },
    };

    const solcOutput = JSON.parse(solc.compile(JSON.stringify(solcInput)));

    const contractFile = solcOutput.contracts["verifier.sol"];
    const contractName = Object.keys(contractFile)[0];
    const compiledContract = contractFile[contractName];

    const abi = compiledContract.abi;
    let bytecode = compiledContract.evm.bytecode.object;
     if (!bytecode.startsWith("0x")) {
      bytecode = "0x" + bytecode;
    }


    return NextResponse.json({
      wasm: wasmFile,
      zkey: zkeyFile,
      verifier: verifierSol,
      abi,
      bytecode,
    });
  } catch (err: any) {
    console.error("Compilation error:", err?.message || err);
    return NextResponse.json(
      { error: "Server error during compilation.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
