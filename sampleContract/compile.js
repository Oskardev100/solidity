const path = require("path");
const fs = require("fs");
const solc = require("solc");

const sampleContractPath = path.resolve(__dirname, "contracts", "SampleContract.sol");
const source = fs.readFileSync(sampleContractPath, "utf8");

const input = {
  language: 'Solidity',
    sources: {
        'SampleContract.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'SampleContract.sol'
].SampleContract;
