// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {FunctionsClient} from "@chainlink/contracts@1.2.0/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts@1.2.0/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/resources/link-token-contracts/
 */

/**
 * @title GettingStartedFunctionsConsumer
 * @notice This is an example contract to show how to make HTTP requests using Chainlink
 * @dev This contract uses hardcoded values and should not be used in production.
 */
contract GettingStartedFunctionsConsumer is FunctionsClient{
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);
    AggregatorV3Interface internal dataFeed;

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        bytes response,
        bytes err
    );
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Router address - Hardcoded for Sepolia
    // Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0xf9B8fc078197181C841c296C876945aaa425B278;

    address recepient = {};

    // JavaScript source code
    // Fetch character name from the Star Wars API.
    // Documentation: https://swapi.info/people
    string source =
        "const theme = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://12da-50-171-3-130.ngrok-free.app/success?s=${theme}`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;";

    //Callback gas limit
    uint32 gasLimit = 300000;
    uint64 private constant subscriptionId = 211;
    

    // donID - Hardcoded for Sepolia
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID =
        0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000;

    // State variable to store the returned character information
    address payable public recipient;

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor() FunctionsClient(router) { 
        dataFeed = AggregatorV3Interface(
            0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1
        );
     }

    /**
     * @notice Sends an HTTP request for character information
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        string[] calldata args
    ) external payable returns (bytes32 requestId) {
        require(msg.value > 0, "Must send ETH to call this function"); // Ensure msg.value is greater than 0
        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Transfer failed");
        // Emit transfer event
        emit Transfer(msg.sender, recipient, msg.value);
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, s_lastResponse, s_lastError);
    }

    function getLatestEthUsdPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    /**
     * Converts a given amount of USD to ETH using the latest ETH/USD price.
     * @param usdAmount The amount in USD (with 8 decimals)
     * @return ethAmount The equivalent amount in ETH (also with 8 decimals)
     */
    function convertUsdToEth(uint usdAmount) public view returns (uint) {
        int ethUsdPrice = getLatestEthUsdPrice();
        require(ethUsdPrice > 0, "Invalid price");

        // Convert USD to ETH using price, adjusting for decimals
        // ethAmount = (usdAmount * 10^18) / ethUsdPrice
        uint ethAmount = (usdAmount * 1e18) / uint(ethUsdPrice);
        return ethAmount * 1e8;
    }
}
