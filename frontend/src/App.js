import "./App.css";
import { React, useState } from "react";
import MetaMaskConnect from "./MetaMaskConnect";
import Preferences from "./Preferences";
import { Typography, Box } from "@mui/material";

function App() {
  const [connected, setconnected] = useState(false);
  const [user, setuser] = useState();

  return (
    <Box textAlign="center" mt={4}>
      {/* VibeBox Title */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        VibeBox: Your Music, Your Lights, Your Atmosphere
      </Typography>

      {/* Display the user's address in the top right corner */}
      {connected && (
        <Typography
          variant="body1"
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          {user}
        </Typography>
      )}

      {/* Conditional rendering for preferences or MetaMask connection */}
      {connected ? (

        <><Preferences userAddress={user} /></>

      ) : (
        <MetaMaskConnect setconnected={setconnected} setuser={setuser} />
      )}
    </Box>
  );
}

export default App;
