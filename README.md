# 🧠 ZK Verifier Dev Tool — Build, Prove & Deploy Zero-Knowledge Circuits on Polkadot

A complete **end-to-end developer tool** to write custom Circom circuits, compile them, generate SNARK verifier contracts, and **deploy them directly to Polkadot AssetHub (PolkaVM)** — all from your browser, no CLI required.  

> ⚡ Built at the [AssetHub Hackathon](https://dorahacks.io/hackathon/polkadot/detail) to empower ZK builders in the Polkadot ecosystem.

---

## 🌐 Live Demo
[🔗 Click here to try it live](https://youtu.be/JLpnR_1gqBU) 

---

## 📦 Key Features

- 🧑‍💻 **Write Circom in-browser**: Fully integrated code editor to write zero-knowledge circuits
- ⚙️ **Compile to Wasm + Zkey**: Trusted setup done backend-side via `snarkjs`
- 🛠️ **Auto-generate verifier.sol**: Automatically generates the Solidity verifier from the circuit
- 🚀 **Deploy to PolkaVM**: Compiles `verifier.sol` using `@parity/revive` to `.polkavm`, deploys it via the user's connected wallet (e.g., Talisman)
- 📥 **Download Artifacts**: Easily download `circuit.wasm`, `circuit_final.zkey`, and `verifier.sol` for frontend proof generation
- 🌉 **Web3.js Integration**: Deployment uses the connected wallet (no backend private key)
- 🧰 **Future-proof SDK Vision**: Soon to be modularized into an SDK so any frontend dApp can integrate its own ZK toolchain

---

## 🏗 Architecture Overview

```text
[Frontend (Next.js + Tailwind)]
        |
        |-- Write Circom code
        |-- View output artifacts (wasm, zkey, verifier.sol)
        |-- Deploy verifier.sol to PolkaVM
        |
[Backend (Node.js API Routes)]
        |
        |-- Circom compiler (circom v2)
        |-- Trusted setup using snarkjs
        |-- Generate verifier.sol
        |-- Compile verifier.sol to .polkavm using @parity/revive
        |-- Send compiled bytecode to frontend
```


---

## 🧱 Tech Stack

| Layer         | Tech                                |
|---------------|--------------------------------------|
| Frontend      | Next.js, TypeScript, Tailwind CSS    |
| Web3 Wallets  | Talisman, Polkadot.js extension      |
| ZK Tools      | Circom, snarkjs                      |
| Solidity      | `verifier.sol` (Groth16 Verifier)    |
| PolkaVM       | `@parity/revive` compiler            |
| Deployment    | `cast send` OR Web3.js from frontend |
| File Handling | UUID, `fs-extra`, `blob`, base64     |

---

## 💡 Future Vision: Modular SDK for ZK Circuits

This project is just the beginning.

### 🚧 Planned SDK Utility:
```ts
import { compileCircuit, deployVerifier } from "@zk-builder/sdk";

const { wasm, zkey, verifier } = await compileCircuit(userInput);
const contractAddress = await deployVerifier(verifier);
```
### 🤯 Benefits
- Plug ZK circuits into any frontend dApp
- No backend configuration required
- Developers focus only on writing circuits, not setup logistics
- Pre-integrated deployment to AssetHub

---

## 🚀 Local Setup Guide

> **Prerequisites:**
- Node.js ≥ 18.x
- Circom v2 installed globally (`npm i -g circom`)
- snarkjs (`npm i -g snarkjs`)
- solc (`npm install -g solc`)
- `@parity/revive` (`npm install -g @parity/revive`)
- cast CLI from Foundry (`curl -L https://foundry.paradigm.xyz | bash`)
- Download `powersOfTau28_hez_final_15.ptau` into `public/`

---

### 🧰 Run the Project

```bash
git clone https://github.com/your-username/zk-verifier-tool
cd zk-verifier-tool

npm install
cp circuits/powersOfTau28_hez_final_15.ptau public/

npm run dev
```

Visit: http://localhost:3000
Start writing and deploying Circom circuits directly from the browser!

## 🛡️ Security Considerations

- ✅ Uses **Groth16**, a well-audited zk-SNARK proof system
- 🔐 Trusted setup (ptau + zkey) is generated dynamically for each circuit
- 🔑 Deployments are signed from the user's wallet (no hardcoded private keys)
- ⚙️ All `.polkavm` binaries are generated from clean, isolated environments
- 🧱 Backend is sandboxed with strict limits to avoid arbitrary code execution

---

## 🧠 Why This Matters

- Brings **ZK-powered development** to the Polkadot ecosystem
- Makes zero-knowledge verifiers first-class citizens on **AssetHub**
- Simplifies the end-to-end workflow for developers and hackers
- Makes AssetHub a **privacy-preserving smart contract playground**
- Empowers devs to ship faster, with fewer setup steps

---

## 🤝 Built With ❤️ at the #AssetHubHackathon

Let’s shape the future of on-chain privacy and modular ZK tooling.

🧪 Try it now, or fork it to build your own ZK IDE!  
🔗 [Tweeted](https://x.com/jatinsahijwani1/status/1930931515438846098) using [#BuiltAtAssetHubHackathon](https://twitter.com/search?q=%23BuiltAtAssetHubHackathon)

> DM me if you'd like to contribute, collaborate, or integrate this SDK into your own stack.
