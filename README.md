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
