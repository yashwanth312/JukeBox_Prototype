import {React} from 'react';
import { useFormik } from "formik";
import Web3 from 'web3';
import contractTransactABI from "./abi.json";

function Preferences () {

    const prices = {
        song: 0.0005,
        color: 0.0002,
        drink: 0.001,
      };

    const contractAddress = "0x68e06052d591E7b1aff8385eA40952aD765cFE02";

    const calculateTotal = () => {
        return (
          (formik.values.song ? prices.song : 0) +
          (formik.values.color ? prices.color : 0) +
          (formik.values.drink ? prices.drink : 0)
        );
    };

    const formik = useFormik({
        initialValues: {
          song: '',  // Initially no song selected
          color: '', // Initially no color selected
          drink: '', // Initially no drink selected
        },
        onSubmit: (values) => {
          // Calculate total price based on the number of items selected
          const total =
            (values.song ? prices.song : 0) +
            (values.color ? prices.color : 0) +
            (values.drink ? prices.drink : 0);

            Transact(total)
            
          // Generate dynamic URL
        //   const dynamicURL = `https://www.localhost.com/success?s=${values.song}&l=${values.color}&d=${values.drink}`;
          
          // For now, we will just alert the URL. In practice, you can redirect or display it
        //   alert(`Total price: ${total} ETH \nDynamic URL: ${dynamicURL}`);
        // console.log(prices.drink)
        },
      });

      async function Transact (amount) {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(contractTransactABI, contractAddress);
        const totalAmount = web3.utils.toWei(amount, 'ether');
        console.log(totalAmount)
        
        //  const gasPrice = await web3.eth.getGasPrice();
        //  console.log(gasPrice)
        // Estimate the gas limit for the transaction
        // const gasLimit = await contract.methods.purchase("Blinding Lights", "Blue", "Vodka").estimateGas({ from: "0x14ba14600a148f8A1bCACD68210af6dB888B671e", value: totalAmount });
        // console.log(gasLimit)
        // Calculate the total gas cost in ETH
        // const totalGasCost = web3.utils.fromWei((gasPrice * gasLimit).toString(), 'ether');
        //  console.log(gasPrice, gasLimit, totalGasCost)
        await contract.methods.sendRequest(208, ["1", "1"]).send({ from: "0x7896474a3dEC193C69937b0CB37Ba7cc58b13CE4", value: totalAmount })
      }

    return (
        <div>
      <h2>Choose a Song, Color, and Drink</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Song Dropdown */}
        <div>
          <label htmlFor="song">Song (0.0005 ETH):</label>
          <select
            id="song"
            name="song"
            onChange={formik.handleChange}
            value={formik.values.song}
          >
            <option value="">Select a song</option>
            <option value="song1">Song 1</option>
            <option value="song2">Song 2</option>
            <option value="song3">Song 3</option>
          </select>
        </div>

        {/* Color Dropdown */}
        <div>
          <label htmlFor="color">Color (0.0002 ETH):</label>
          <select
            id="color"
            name="color"
            onChange={formik.handleChange}
            value={formik.values.color}
          >
            <option value="">Select a color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        {/* Drink Dropdown */}
        <div>
          <label htmlFor="drink">Drink (0.001 ETH):</label>
          <select
            id="drink"
            name="drink"
            onChange={formik.handleChange}
            value={formik.values.drink}
          >
            <option value="">Select a drink</option>
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="juice">Juice</option>
          </select>
        </div>

        {/* Display total price */}
        <div>
          <h3>Total Price: {calculateTotal()} ETH</h3>
        </div>

        {/* Submit button */}
        <button type="submit">Preview</button>
      </form>
    </div>
    )
}

export default Preferences;