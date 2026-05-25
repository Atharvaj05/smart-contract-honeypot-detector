process.removeAllListeners('warning');
import { parseAST } from "./services/astParser.js";
import { analyzeContract } from "./services/analyzer.js";

const sampleHoneypot = `
pragma solidity ^0.8.0;
contract Honeypot {
    mapping (address => bool) public blacklisted;
    address public owner;

    constructor() { owner = msg.sender; }

    function transfer(address to, uint256 amount) public {
        require(!blacklisted[msg.sender], "You are blacklisted");
        if(msg.sender != owner) {
            require(amount < 1 ether, "Transfer limit exceeded");
        }
    }

    function setBlacklist(address _user) public {
        require(msg.sender == owner);
        blacklisted[_user] = true;
    }
}
`;

function runTest() {
    console.log("--- Starting Backend Logic Test ---");
    try {
        console.log("1. Testing Parser...");
        const ast = parseAST(sampleHoneypot);
        console.log("✅ Parser Success");

        console.log("2. Testing Analyzers...");
        const results = analyzeContract(ast);
        console.log("✅ Analysis Success");
        
        console.log("--- Findings ---");
        console.log(JSON.stringify(results, null, 2));
    } catch (error) {
        console.error("❌ Test Failed!");
        console.error("Error Message:", error.message);
        if (error.stack) {
            console.error("Stack Trace:", error.stack);
        }
    }
}

runTest();