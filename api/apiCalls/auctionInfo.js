var Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const auctionAbi = require("../abi/Auctionabi.json");
const auctionAddress = "0xbB98e0B3DbE79e6Ba74edDa53Fc852400DcBe455";
const auctionContract = new web3.eth.Contract(auctionAbi, auctionAddress);

let auctionInfo = (req, res) => {
  var tokenId = req.query.tokenId || "";

  if ([tokenId].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }

  auctionContract.methods.auctionInfo(tokenId).call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = auctionInfo;
