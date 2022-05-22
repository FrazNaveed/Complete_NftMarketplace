var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
var contractAbi = require("../abi/ERC721abi.json");

let getNftHistory = (req, res) => {

  var contractAddress = process.env.ADDRESS_NFT;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  contract.getPastEvents("tokenInfo", {
    filter: { topics: ["0x7817bb79920d732df263bad59dcbf804d55cbf31b0d4b609522e04400bc4a099"] },
    fromBlock: 0,
    toBlock: "latest",
  })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = getNftHistory;






