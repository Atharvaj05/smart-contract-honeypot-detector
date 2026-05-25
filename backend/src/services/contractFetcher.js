import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchContractSource(address) {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  
  // Update: Changed base URL to /v2/api and added chainid=1 for Ethereum Mainnet
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    
    // Check for V2 specific error structure
    if (response.data.status === "0") {
      throw new Error(`Etherscan Error: ${response.data.result}`);
    }

    const data = response.data.result[0];
    
    if (!data || !data.SourceCode) {
      throw new Error("Contract source code is not verified on Etherscan.");
    }

    let sourceCode = data.SourceCode;

    // Handle JSON-input format (multi-file contracts)
    if (sourceCode.startsWith('{{')) {
      sourceCode = sourceCode.slice(1, -1); 
      const json = JSON.parse(sourceCode);
      sourceCode = Object.values(json.sources).map(s => s.content).join('\n');
    }

    return {
      sourceCode,
      name: data.ContractName,
      compiler: data.CompilerVersion
    };
  } catch (err) {
    console.error("Fetcher Error:", err.message);
    throw new Error(err.message);
  }
}