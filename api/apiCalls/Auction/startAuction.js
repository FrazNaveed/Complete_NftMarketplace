var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
const auctionAbi = require("../../abi/Auctionabi.json");

let startAuction = (req, res) => {
  var endTime = req.body.endTime || "";
  var startPrice = req.body.startPrice || "";
  var tokenId = req.body.tokenId || "";
  var tokenOwner = req.body.tokenOwner || "";

  if ([tokenId, startPrice, endTime, tokenOwner].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }

  const auctionAddress = process.env.ADDRESS_AUCTION;
  const auctionContract = new web3.eth.Contract(auctionAbi, auctionAddress);

  web3.eth.getTransactionCount(tokenOwner, (error, txCount) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const txObject = {
      to: auctionAddress,
      from: tokenOwner,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: auctionContract.methods
        .startAuction(
          endTime,
          (startPrice * Math.pow(10, 18)).toString(),
          tokenId
        )
        .encodeABI(),
    };

    res.status(200).json({
      signRequired: txObject,
    });
    return;
  });
};

module.exports = startAuction;
