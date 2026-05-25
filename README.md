# Sentinel Honeypot Detector 🛡️

A comprehensive, full-stack static analysis tool and on-chain security audit platform designed to detect malicious patterns, hidden backdoors, and honeypot structures within Ethereum and EVM-compatible smart contracts. 

**🔗 Live Production Application:** [https://smart-contract-honeypot-detector.vercel.app/](https://smart-contract-honeypot-detector.vercel.app/)

---

## 📋 Executive Summary

In decentralized finance (DeFi), **honeypots** represent a highly pervasive class of fraudulent smart contracts. These contracts are programmatically engineered to entice investors to purchase a token but systematically prevent them from selling or transferring their assets, effectively trapping liquidity within the contract pool.

**Sentinel Honeypot Detector** addresses this vector by performing real-time logical and syntactic evaluation of Solidity source code. By analyzing functional logic, modifier state dependencies, ownership privileges, and structural anomalies, Sentinel parses complex JSON data payloads into high-fidelity, actionable security logs. The platform generates a normalized security score (0–100) and flags critical vulnerabilities to empower developers, security auditors, and retail traders.

---

## 🚀 Key Features

- **Dual-Input Verification Pipeline:**
  - **On-Chain Address Scan:** Fetches verified smart contract source code directly from network block explorers via integration endpoints.
  - **Raw Source Code Analysis:** Allows developers to paste un-deployed Solidity source code directly into a robust IDE-like compilation textarea for pre-deployment checks.
- **Deep Syntactic Structural Scan:** Evaluates structural design blocks, access controllers, state mutation interfaces, and modifier conditions.
- **Defensive Data Aggregator Engine:** Built with a resilient backend-to-frontend parsing loop capable of sanitizing nested object schemas, escaping strings, and extracting clear descriptions dynamically.
- **Real-Time Threat Visualization:** Features conditional UI themes (Critical, High, Medium, and Low risk thresholds) accented by crisp typography and clear responsive indicators.

---

## 🛠️ Technical Stack & Architecture

Sentinel is organized as a high-performance **Monorepo** decoupled into distinct frontend presentation and backend compute directories.

### Languages
* **Solidity (`.sol`):** Target execution language audited by the system rules.
* **JavaScript (ES6+):** Universal language powering the runtime engine, API logic, and reactive view state.
* **HTML5 / CSS3:** Structural rendering with native responsive layouts.

### Frontend Architecture (`/frontend`)
* **React.js (v18+):** Functional component architecture utilizing hooks (`useState`, `useEffect`) for single-page reactive application flow.
* **Vite:** High-performance, next-generation build tool enabling instantaneous Hot Module Replacement (HMR) and optimized rollup compilation.
* **Tailwind CSS:** Utility-first CSS framework configuring custom color tokens (slate and dark blue slate themes) and fluid grid constraints.
* **Lucide React:** Configures high-performance structural SVG iconography for real-time visual categorization of risks.
* **Axios:** Extensible HTTP client handling asynchronously decoupled network promises.

### Backend Infrastructure (`/backend`)
* **Node.js:** Scalable V8 asynchronous server-side Javascript runtime environment.
* **Express.js:** Minimalist, unopinionated routing framework establishing RESTful API validation layers.
* **Security Scanner Engine:** Custom pattern matching and Abstract Syntax Tree (AST) scanning heuristics designed to trace code execution hooks.

### Production Deployment Profile
* **Frontend Hosting:** Hosted via **Vercel** connected through a continuous integration pipeline, served via a global Content Delivery Network (CDN).
* **Backend Hosting:** Hosted via **Render Cloud Services** using a containerized Node application stack environment.

---

## 📐 Architecture Data Flow

```text
[User UI Input] ──(Address or Source Code)──> [Axios HTTP Post Request]
                                                        │
                                                        ▼
                                            [Express API Entry Point]
                                                (server.js / Router)
                                                        │
                                                        ▼
                                            [Security Scanner Engine]
                                         (AST Parsing & Logic Mapping)
                                                        │
                                                        ▼
[Render API Gateway] <──(Normalized JSON Payload)── [Threat Evaluator]
         │                                       (Score & Risk Metric Calculation)
         ▼
[Vercel Frontend Client] ──(Defensive Parser)──> [UI Render Panel]
```
🚨 Vulnerability Vectors Audited
Sentinel explicitly analyzes contract syntax to capture the following high-risk honeypot blueprints:

Blacklist Logic (BLACKLIST_LOGIC): Catches hidden mappings (e.g., _isBlacklisted, isFrozen) used by owners to unilaterally strip specific user wallets of transaction execution rights.

Excessive Owner Privileges (OWNER_PRIVILEGE): Pinpoints absolute operational capabilities over structural states, including unrestrictive access to RenounceOwnership or parameters modifying external fee limits.

Hidden Minting & Supply Dilution (HIDDEN_MINT): Evaluates whether the system state allows internal _mint loops to change totalSupply after constructor finalization.

Dynamic Fee Trapping (SUSPICIOUS_VARIABLE): Traps arbitrary fee/tax configurations (e.g., burnTaxRate, sellFee) that can be altered programmatically to 100%, rendering assets unsellable.

⚙️ Local Development & Setup
Follow these steps to configure and run the entire full-stack application on your local workstation.

Prerequisites
Ensure Node.js (v16.x or higher) and npm are installed.

1. Clone the Repository
Bash
git clone [https://github.com/YOUR_USERNAME/Honeypot-detector.git](https://github.com/YOUR_USERNAME/Honeypot-detector.git)
cd Honeypot-detector
2. Configure the Backend Node API
Navigate to the backend directory, fetch project dependencies, and initialize the server:

Bash
cd backend
npm install
Create a .env file within the root of the /backend folder to manage optional variables:

Code snippet
PORT=5000
NODE_ENV=development
# ETHERSCAN_API_KEY=your_key_here (optional for address lookup)
Launch the backend:

Bash
node server.js
The server will instantiate and output: Backend Server running on port 5000.

3. Configure the Frontend React Application
Open a new terminal session, navigate to the frontend directory, install dependencies, and launch Vite:

Bash
cd ../frontend
npm install
Launch the development server:

Bash
npm run dev
Open your browser and navigate to the output address (typically http://localhost:5173).

📈 Future Roadmaps & Enhancements
Abstract Syntax Tree (AST) Visualizer: Integrating full compilation graphing to display function reference trees directly in the browser interface.

Simulated Sandbox EVM Execution: Running dry-run contract transaction calls via an isolated virtual runtime environment to map post-buy transfer behaviors dynamically.

Multi-Chain Explorer Integration: Expanding scanning layers to seamlessly fetch sources across Polygon, Arbitrum, Optimism, and Avalanche explorers.

⚖️ License & Disclaimer
This project was developed for educational and academic assessment purposes. While Sentinel uses comprehensive rule profiles to identify malicious behaviors, it does not substitute for a formal, multi-signature contract verification audit. Always exercise caution when interacting with experimental crypto-assets.

Distributed under the MIT License. See LICENSE for more details.
