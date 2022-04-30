var Web3 = require("Web3");
const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
var contractAddress = "0x25873A135EcFaeCdb4Da5ecB87547FEaD67a9DCf";
var contractAbi = require("../abi/ERC721abi.json");



const contract = new web3.eth.Contract(contractAbi, contractAddress);

let getTokenURI = (req, res) => {
  var tokenId = req.query.tokenId || "";

  if ([tokenId].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }

  contract.methods.getTokenURI(tokenId).call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = getTokenURI;
