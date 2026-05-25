# Sentinel Honeypot Detector 🛡️

A full-stack blockchain security tool that detects honeypot patterns, malicious logic, and hidden backdoors in Ethereum and EVM-compatible smart contracts using static analysis and AST-based inspection.

🔗 Live Demo: https://smart-contract-honeypot-detector.vercel.app/

---

## Features

- Smart contract static analysis
- AST-based Solidity parsing
- Honeypot pattern detection
- Blacklist and transfer restriction detection
- Hidden mint function detection
- Owner privilege analysis
- Dynamic tax / fee manipulation detection
- Risk scoring system (0–100)
- Real-time frontend visualization

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- Solidity AST Parsing
- Custom Security Scanner Engine

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Project Architecture

```text
[User Input]
      │
      ▼
[React Frontend]
      │
      ▼
[Express API Server]
      │
      ▼
[Security Scanner Engine]
(AST Parsing & Analysis)
      │
      ▼
[Risk Evaluation System]
      │
      ▼
[Scan Results & Threat Report]
```
---

## Vulnerabilities Detected

- Blacklist Logic
- Hidden Mint Functions
- Sell Lock Mechanisms
- Excessive Owner Privileges
- Dynamic Fee Manipulation
- Suspicious State Variables
- Transfer Restrictions

---

## Local Setup

### Prerequisites

- Node.js v16+
- npm

---

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-contract-honeypot-detector.git
cd smart-contract-honeypot-detector
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside `/backend`:

```env
PORT=5000
NODE_ENV=development
ETHERSCAN_API_KEY=your_api_key
```

Run backend:

```bash
node server.js
```

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Future Improvements

- AST Visualization Dashboard
- Simulated EVM Transaction Execution
- Multi-Chain Support
- Advanced Heuristic Detection
- Wallet Risk Profiling

---

## License

This project is licensed under the MIT License.

---

## Disclaimer

This tool is intended for educational and security research purposes only.

Always perform proper smart contract audits before interacting with blockchain assets.
