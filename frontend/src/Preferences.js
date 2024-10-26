import { React } from "react";
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

function Preferences(props) {
  const prices = {
    song: 0.0005,
    color: 0.0002,
    drink: 0.001,
  };

  const contractAddress = "0x10023E15676d80048Cb0Ae25117ff5C803551F75";

  const calculateTotal = () => {
    const total =
      (formik.values.song !== "" ? prices.song : 0) +
      (formik.values.color !== "" ? prices.color : 0) +
      (formik.values.drink !== "" ? prices.drink : 0);

    // Round to 6 decimal places to avoid floating-point issues
    return parseFloat(total.toFixed(6));
  };

  const formik = useFormik({
    initialValues: {
      song: "", // Initially no song selected
      color: "", // Initially no color selected
      drink: "", // Initially no drink selected
    },
    onSubmit: (values) => {
      // Calculate total price based on the number of items selected
      const total =
        (values.song !== "" ? prices.song : 0) +
        (values.color !== "" ? prices.color : 0) +
        (values.drink !== "" ? prices.drink : 0);

      Transact(total);
    },
  });

  async function Transact(amount) {

    // const inputObj = {
    //   song: "Blinding Lights",
    //   lights: "Blue",
    //   drinks: "Vodka"
    // };

    console.log(contractTransactABI)

    // const args = [inputObj.song, inputObj.lights, inputObj.drinks];
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractTransactABI, contractAddress);
    const amountWei = web3.utils.toWei(amount.toString(), "ether");

    console.log("Amount: " + amount)
    console.log("Amount Eth: " + amountWei)

    // console.log(props.userAddress)
    // const gasPrice = await web3.eth.getGasPrice();

    // const gasLimit = await contract.methods.sendRequest(["Blinding Lights", "Blue", "Vodka"]).estimateGas({ from: props.userAddress, value: amountWei });
    // const totalGasCost = gasPrice * gasLimit
    // // const totalGasCost = web3.utils.fromWei((gasPrice * gasLimit).toString(), 'ether');
    // const totalPrice = totalGasCost + amountWei


    
    // const totalPriceWei = web3.utils.toWei(totalPrice.toString(), "ether");

    // Get selected song, color, and drink from form values
    const selectedSong = formik.values.song || "N/A"; // default to "N/A" if not selected
    const selectedColor = formik.values.color || "N/A"; // default to "N/A" if not selected
    const selectedDrink = formik.values.drink || "N/A"; // default to "N/A" if not selected

    console.log([selectedSong, selectedColor, selectedDrink])

    await contract.methods
      .sendRequest([selectedSong, selectedColor, selectedDrink])
      .send({
        from: props.userAddress,
        value: amountWei,
      });
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Choose a Song, Color, and Drink
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Song Dropdown */}
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
            <MenuItem value="song3">Skyfall</MenuItem>
          </Select>
        </FormControl>

        {/* Color Dropdown */}
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

        {/* Drink Dropdown */}
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

        {/* Display total price */}
        <Typography variant="h6" gutterBottom align="center">
          Total Price: {calculateTotal()} ETH
        </Typography>

        {/* Submit button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Transfer
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Preferences;
