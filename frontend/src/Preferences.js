import React from "react";
import { useFormik } from "formik";
import Web3 from "web3";
import contractTransactABI from "./abi.json";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./styles.css"; // Import the CSS file here

// Import image if located in the src directory
import removedBgImage from "./images/Streaks Left.png"; // Uncomment if the image is in the src folder
import removedright from "./images/Streaks Right.png";
import boxes from "./images/block network.png";
import judebox from "./images/Jukebox.png";
import vibebox from "./images/VibeBox Logo.png";

function Preferences() {
  const prices = {
    song: 0.0005,
    color: 0.0002,
    drink: 0.001,
  };

  const contractAddress = "0x28Df1348846D8C14A26B309E820c53e7dCcD00D6";

  const calculateTotal = () => {
    return (
      (formik.values.song !== "" ? prices.song : 0) +
      (formik.values.color !== "" ? prices.color : 0) +
      (formik.values.drink !== "" ? prices.drink : 0)
    ).toFixed(6);
  };

  const formik = useFormik({
    initialValues: {
      song: "",
      color: "",
      drink: "",
    },
    onSubmit: (values) => {
      const total = calculateTotal();
      Transact(total);
    },
  });

  async function Transact(amount) {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          contractTransactABI,
          contractAddress
        );
        const totalAmount = web3.utils.toWei(amount.toString(), "ether");

        const { song, color, drink } = formik.values;
        await contract.methods
          .sendRequest(208, [song || "N/A", color || "N/A", drink || "N/A"])
          .send({
            from: selectedAccount,
            value: totalAmount,
          });

        console.log("Transaction successful!");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <Box className="custom-container">
      {/* Add the image */}
      <img src={removedBgImage} alt="Background" className="top-right-image" />
      <img src={removedright} alt="Background" className="top-left-image" />
      <img src={boxes} alt="Bottom Image" className="box-image" />
      <img src={judebox} alt="Bottom Image" className="judeleft-image" />
      <img src={judebox} alt="Bottom Image" className="juderight-image" />
      <img src={vibebox} alt="Bottom Image" className="vibebox-image" />
      <Typography variant="h5" className="custom-heading" gutterBottom>
        Choose a Song, Color, and Drink
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="song-label">Song (0.0005 ETH)</InputLabel>
          <Select
            labelId="song-label"
            id="song"
            name="song"
            value={formik.values.song}
            onChange={formik.handleChange}
            label="Song (0.0005 ETH)"
          >
            <MenuItem value="">
              <em>Select a song</em>
            </MenuItem>
            <MenuItem value="Blinding Lights">Blinding Lights</MenuItem>
            <MenuItem value="Formula1">Formula1</MenuItem>
            <MenuItem value="Skyfall">Skyfall</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="color-label">Color (0.0002 ETH)</InputLabel>
          <Select
            labelId="color-label"
            id="color"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            label="Color (0.0002 ETH)"
          >
            <MenuItem value="">
              <em>Select a color</em>
            </MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="drink-label">Drink (0.001 ETH)</InputLabel>
          <Select
            labelId="drink-label"
            id="drink"
            name="drink"
            value={formik.values.drink}
            onChange={formik.handleChange}
            label="Drink (0.001 ETH)"
          >
            <MenuItem value="">
              <em>Select a drink</em>
            </MenuItem>
            <MenuItem value="Coke">Coke</MenuItem>
            <MenuItem value="Vodka">Vodka</MenuItem>
            <MenuItem value="Gin">Gin</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" className="custom-highlight" gutterBottom>
          Total Price: {calculateTotal()} ETH
        </Typography>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" className="custom-button" type="submit">
            Transfer
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Preferences;
