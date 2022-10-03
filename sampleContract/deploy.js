
const HDWalletProvider = require('@truffle/hdwallet-provider');

const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'nothing bird capital exercise bus draft hard depend wood another bachelor erase',
  'https://goerli.infura.io/v3/897348593abd4c7bbabb7fa6bb54f982'

  );

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying to network from account', accounts[0]);

  
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();