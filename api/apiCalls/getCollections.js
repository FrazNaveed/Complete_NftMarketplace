var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
var contractAbi = require("../abi/ERC721abi.json");
var contractAddress = process.env.ADDRESS_NFT;
const contract = new web3.eth.Contract(contractAbi, contractAddress);

let getCollections = (req, res) => {
  var address = req.query.address || "";

  if ([address].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }

  contract.methods.getCollections(address).call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = getCollections;
