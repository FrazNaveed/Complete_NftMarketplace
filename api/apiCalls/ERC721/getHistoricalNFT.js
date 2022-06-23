var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
var contractAbi = require("../../abi/ERC721abi.json");
var contractAddress = process.env.ADDRESS_NFT;
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const getHistoricalNFT = (_, res) => {
  contract
    .getPastEvents("mintedTokens", {
      filter: {
        topics: [
          "0x0eef326681f316cac3aedd86732a57ceb005efc1b65a2d7958b20131f053cadd",
        ],
      },
      fromBlock: 0,
      toBlock: "latest",
    })
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = getHistoricalNFT;
