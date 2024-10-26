import "./App.css";
import { React, useState } from "react";
import MetaMaskConnect from "./MetaMaskConnect";
import Preferences from "./Preferences";
import { Typography, Box } from "@mui/material";

function App() {
  const [connected, setconnected] = useState(false);
  const [user, setuser] = useState();

  // async function Transact () {
  //   let web3 = new Web3(window.ethereum);
  //   let contract = new web3.eth.Contract(contractTransactABI, contractAddress);
  //   const totalAmount = web3.utils.toWei(amount, 'ether');
  //   console.log(totalAmount)

  //    const gasPrice = await web3.eth.getGasPrice();
  //    console.log(gasPrice)
  //   // Estimate the gas limit for the transaction
  //   // const gasLimit = await contract.methods.purchase("Blinding Lights", "Blue", "Vodka").estimateGas({ from: "0x14ba14600a148f8A1bCACD68210af6dB888B671e", value: totalAmount });
  //   // console.log(gasLimit)
  //   // Calculate the total gas cost in ETH
  //   // const totalGasCost = web3.utils.fromWei((gasPrice * gasLimit).toString(), 'ether');
  //   //  console.log(gasPrice, gasLimit, totalGasCost)
  //   await contract.methods.sendRequest(208, ["1", "1"]).send({ from: "0x7896474a3dEC193C69937b0CB37Ba7cc58b13CE4", value: totalAmount })
  // }

  // async function createTweet(content) {
  //   const accounts = await web3.eth.getAccounts();
  //   try {
  //     await contract.methods.createTweet(content).send({ from: accounts[0] });
  //     displayTweets(accounts[0]);
  //   } catch (error) {
  //     console.error("User rejected request:", error);
  //   }
  // }

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Welcome
      </Typography>
      {connected ? (
        <div>
          <Typography variant="h5" align="center" gutterBottom>
            {user}
          </Typography>
          <Preferences userAddress={user}/>
        </div>
      ) : (
        <MetaMaskConnect setconnected={setconnected} setuser={setuser} />
      )}
    </div>
  );
}

export default App;
