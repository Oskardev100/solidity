import React from "react";
import web3 from "./web3";
import sampleContract from "./sampleContract";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    const manager = await sampleContract.methods.manager().call();
    const players = await sampleContract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(sampleContract.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting to get access..." });

    await sampleContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "Account granted with access" });
  };



  render() {
    return (
      <div>
        <h2>Sample web app, for your sample Smart  Contract</h2>
        <p>
          Contract initialized by: {this.state.manager}. Current total subscribers: {" "}
          {this.state.players.length} total users is: {" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Give me access:</h4>
          <div>
            <label>Minimum Fee is: 0.0011 Eth.</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>OK</button>
        </form>

        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;