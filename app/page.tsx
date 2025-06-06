"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {Shield} from "lucide-react"

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
  const [verifierSol, setVerifierSol] = useState<string>(""); // store verifier.sol code

  // Remove abi and bytecode since deploy will be via backend now

  const handleCompile = async () => {
    setCompiling(true);
    setDownloadLinks({});
    setContractAddress(null);
    setVerifierSol("");

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

      // Save verifier.sol source to state for deployment
      setVerifierSol(data.verifier);

      setCompiling(false);
    } catch (err) {
      console.error("Client error:", err);
      alert("Unexpected error. Check console for details.");
      setCompiling(false);
    }
  };

  const handleDeploy = async () => {
    if (!verifierSol) {
      alert("No verifier.sol code to deploy. Please compile first.");
      return;
    }

    setDeploying(true);
    setContractAddress(null);

    try {
      const res = await fetch("/api/deploy-verifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifier: verifierSol }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Deployment failed: " + (err.details || "Unknown error"));
        setDeploying(false);
        return;
      }

      const data = await res.json();

      setContractAddress(data.contractAddress || null);
      alert("Contract deployed at: " + data.contractAddress);
    } catch (err) {
      console.error("Deploy error:", err);
      alert("Deployment error occurred. Check console.");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-pink-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-white">Polka</span>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                ZK
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-pink-400">
                Docs
              </Button>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">GitHub</Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto bg-white/30 p-6 rounded-xl shadow mt-8">
        <h1 className="text-2xl text-white font-semibold mb-4">ZK Circuit Compiler</h1>

        <textarea
          value={circuitCode}
          onChange={(e) => setCircuitCode(e.target.value)}
          placeholder="Enter your Circom circuit here..."
          className="w-full h-60 p-4 border border-white text-white rounded mb-4 font-mono"
        />

        <button
          onClick={handleCompile}
          disabled={compiling || !circuitCode.trim()}
          className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 "
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
              disabled={deploying || !verifierSol}
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
