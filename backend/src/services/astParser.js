import parser from "solidity-parser-antlr";

export function parseSolidity(code) {

    try {

        const ast = parser.parse(code, {
            loc: true,
            range: true
        });

        return ast;

    } catch (err) {

        throw new Error(
            `Solidity parsing failed: ${err.message}`
        );

    }

}