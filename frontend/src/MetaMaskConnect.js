import { React } from 'react';


function MetaMaskConnect (props) {


    async function connectWallet() {
        if (window.ethereum) {
          const accounts = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
              if (err.code === 4001) {
                console.log("Please connect to MetaMask.");
              } else {
                console.error(err);
              }
            });
          if (accounts[0]) {
            console.log("We have an account");
            props.setconnected(true);
            props.setuser(accounts[0]);
          }
        } else {
          console.error("No web3 provider detected");
          document.getElementById("connectMessage").innerText =
            "No web3 provider detected. Please install MetaMask.";
        }
      }

      return (
        <div>
            <h3>Connect you Wallet</h3>
            <button onClick={connectWallet}>Connect</button>
        </div>
      )
}

export default MetaMaskConnect;