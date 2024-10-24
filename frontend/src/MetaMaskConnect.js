import { React } from "react";
import { Button, Typography, Box } from "@mui/material"; // Importing Material UI components

function MetaMaskConnect(props) {
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5" // Light background color for contrast
    >
      <Typography variant="h5" gutterBottom>
        Connect Your Wallet
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={connectWallet}
        size="large"
        sx={{ mt: 2 }}
      >
        Connect with MetaMask
      </Button>

      <Typography
        id="connectMessage"
        variant="body2"
        color="error"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}

export default MetaMaskConnect;
