var Web3 = require("web3");

const web3 = new Web3(process.env.TESTNET_RPC);

const auctionABI = require("../../abi/Auctionabi.json");
const tokenABI = require("../../abi/ERC20abi.json");

let updatePrice = (req, res) => {
  var tokenId = req.body.tokenId || "";
  var newPrice = req.body.newPrice || "";
  var msgsender = req.body.msgsender || "";

  if ([msgsender, tokenId, newPrice].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }
  const auctionAddress = process.env.ADDRESS_AUCTION;
  const auctionContract = new web3.eth.Contract(auctionABI, auctionAddress);

  const tokenAddress = process.env.ADDRESS_TOKEN;
  const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

  web3.eth.getTransactionCount(msgsender, async (error, txCount) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    var signRequired = [];

    await tokenContract.methods
      .allowance(msgsender, auctionAddress)
      .call((error, allowance) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        if (allowance < newPrice) {
          signRequired.push({
            to: tokenAddress,
            from: msgsender,
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(100000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
            data: tokenContract.methods
              .approve(auctionAddress,  (newPrice+500*Math.pow(10,18)).toString())
              .encodeABI(),
          });
        }
      });
      signRequired.push({
        to: auctionAddress,
        from: msgsender,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
        data: auctionContract.methods.updateBid(tokenId, (newPrice*Math.pow(10,18)).toString()).encodeABI(),
      });

    res.status(200).json({
      signRequired,
    });
    return;
  });
};

module.exports = updatePrice;