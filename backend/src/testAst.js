import fs from "fs";
import { parseAST } from "./services/astParser.js";

const code = fs.readFileSync(
  "../contracts/testContract.sol",
  "utf-8"
);

const ast = parseAST(code);

console.log(JSON.stringify(ast, null, 2));