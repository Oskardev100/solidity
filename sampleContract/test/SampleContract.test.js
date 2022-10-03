const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let sampleContract;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  sampleContract = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });
});

describe("Sample Contract", () => {
  it("ensure contract is deployed to test network", () => {
    assert.ok(sampleContract.options.address);
  });

  it("allows one account to enter", async () => {
    await sampleContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.002", "ether"),
    });

    const players = await sampleContract.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });


  it("Ensure mulitple accounts can enter to sample contract", async () => {
    await sampleContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await sampleContract.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.002", "ether"),
    });
    await sampleContract.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.002", "ether"),
    });

    const players = await sampleContract.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it('Ensure ether is required to enter the sample contract', async () => {
    try{
      await sampleContract.methods.enter().send({
        from: accounts[0],
        value: 0,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

});
