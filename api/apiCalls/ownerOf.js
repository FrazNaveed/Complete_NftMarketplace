var Web3 = require("Web3");
const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
var nftAddress = "0x25873A135EcFaeCdb4Da5ecB87547FEaD67a9DCf";
var nftAbi = require("../abi/ERC721abi.json");


let ownerOf = (req, res) => {
  var tokenId = req.query.tokenId || "";


  if ([tokenId].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
  }

 
  const nftContract = new web3.eth.Contract(nftAbi, nftAddress);

  nftContract.methods.ownerOf(tokenId).call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = ownerOf;
