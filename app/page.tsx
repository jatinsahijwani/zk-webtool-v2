"use client";

import { useState } from "react";
import Web3 from "web3";

export default function Home() {
  const [circuitCode, setCircuitCode] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<{
    wasm?: string;
    zkey?: string;
    verifier?: string;
  }>({});
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const [abi, setAbi] = useState<any>(null);
  const [bytecode, setBytecode] = useState<string>("");

  const handleCompile = async () => {
    setCompiling(true);
    setDownloadLinks({});
    setAbi(null);
    setBytecode("");
    setContractAddress(null);

    try {
      const res = await fetch("/api/compile-circuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ circuit: circuitCode }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Compilation failed: " + err.details);
        setCompiling(false);
        return;
      }

      const data = await res.json();
      console.log("Compile response:", data);

      const createDownload = (base64: string, filename: string, mime: string) => {
        const blob = new Blob([Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))], {
          type: mime,
        });
        return URL.createObjectURL(blob);
      };

      setDownloadLinks({
        wasm: createDownload(data.wasm, "circuit.wasm", "application/wasm"),
        zkey: createDownload(data.zkey, "circuit_final.zkey", "application/octet-stream"),
        verifier: URL.createObjectURL(new Blob([data.verifier], { type: "text/plain" })),
      });

      if (data.abi && data.bytecode) {
        console.log("Received ABI:", data.abi);
        console.log("Received Bytecode length:", data.bytecode.length);
        setAbi(data.abi);
        setBytecode(data.bytecode);
      } else {
        alert("ABI and bytecode not received from backend. Deploy disabled.");
      }

      setCompiling(false);
    } catch (err) {
      console.error("Client error:", err);
      alert("Unexpected error. Check console for details.");
      setCompiling(false);
    }
  };

  const handleDeploy = async () => {
  if (!abi || !bytecode) {
    alert("Missing ABI or bytecode for deployment.");
    return;
  }

  if (!(window as any).ethereum) {
    alert("Please install a web3 wallet like MetaMask or Talisman.");
    return;
  }

  try {
    setDeploying(true);
    const web3 = new Web3((window as any).ethereum);
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    console.log("Deploying from account:", account);
    console.log("ABI:", abi);
    console.log("Bytecode (first 100 chars):", bytecode.slice(0, 100));

    const contract = new web3.eth.Contract(abi);
    const deployTx = contract.deploy({ data: bytecode });

    let gasEstimate;
    try {
      gasEstimate = await deployTx.estimateGas({ from: account });
      console.log("Estimated Gas (raw):", gasEstimate, typeof gasEstimate);

      // Convert BigInt (or any other type) to string explicitly
      const gasEstimateStr = gasEstimate.toString();
      console.log("Estimated Gas (string):", gasEstimateStr, typeof gasEstimateStr);

      // Add buffer gas as a Number, convert sum back to string
      // const gasWithBuffer = (BigInt(gasEstimateStr) + BigInt(100000)).toString();
      const gasWithBuffer = (BigInt(gasEstimateStr)).toString();

      console.log("Gas with buffer (string):", gasWithBuffer);

      // Use gasWithBuffer string in deployment
      const deployedContract = await deployTx.send({
        from: account,
        gas: gasWithBuffer,
      });

      // After deployment
      setContractAddress(deployedContract.options.address || null);

      alert("Contract deployed at: " + deployedContract.options.address);
    } catch (gasErr) {
      console.error("Gas estimation or deployment error:", gasErr);
      alert("Gas estimation or deployment failed. See console.");
      setDeploying(false);
      return;
    }
  } catch (err: any) {
    console.error("Unexpected deployment error:", err);
    alert("Deployment failed: " + (err.message || err));
  } finally {
    setDeploying(false);
  }
};


  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl text-black font-semibold mb-4">ZK Circuit Compiler</h1>

        <textarea
          value={circuitCode}
          onChange={(e) => setCircuitCode(e.target.value)}
          placeholder="Enter your Circom circuit here..."
          className="w-full h-60 p-4 border border-gray-300 text-black rounded mb-4 font-mono"
        />

        <button
          onClick={handleCompile}
          disabled={compiling || !circuitCode.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {compiling ? "Compiling..." : "Compile Circuit"}
        </button>

        {downloadLinks.verifier && (
          <div className="mt-6 space-y-3">
            <h2 className="text-lg text-black font-medium">Download Compiled Files:</h2>
            <a
              href={downloadLinks.verifier}
              download="verifier.sol"
              className="text-blue-600 underline block"
            >
              Download verifier.sol
            </a>
            <a
              href={downloadLinks.wasm}
              download="circuit.wasm"
              className="text-blue-600 underline block"
            >
              Download circuit.wasm
            </a>
            <a
              href={downloadLinks.zkey}
              download="circuit_final.zkey"
              className="text-blue-600 underline block"
            >
              Download circuit_final.zkey
            </a>

            <button
              onClick={handleDeploy}
              disabled={deploying || !abi || !bytecode}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {deploying ? "Deploying..." : "Deploy Contract"}
            </button>

            {contractAddress && (
              <p className="mt-2 text-green-800">
                Deployed Contract Address: <code>{contractAddress}</code>
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
