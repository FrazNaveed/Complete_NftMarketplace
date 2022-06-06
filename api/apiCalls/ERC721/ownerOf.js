var Web3 = require("Web3");
const web3 = new Web3(process.env.TESTNET_RPC);
var nftAddress = process.env.ADDRESS_NFT;
var nftAbi = require("../../abi/ERC721abi.json");


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
