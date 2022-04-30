var Web3 = require("web3");

const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

const auctionABI = require("../abi/Auctionabi.json");
const tokenABI = require("../abi/ERC20abi.json");

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
  const auctionAddress = "0xbB98e0B3DbE79e6Ba74edDa53Fc852400DcBe455"
  const auctionContract = new web3.eth.Contract(auctionABI, auctionAddress);

  const tokenAddress = "0xD1eFE36e9587367b4a6AF81199b863d47943D22c";
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
            to: tokenContract,
            from: msgsender,
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            data: tokenContract.methods
              .approve(auctionAddress, Number.MAX_SAFE_INTEGER - 1)
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
      data: auctionContract.methods.updatePrice(tokenId, newPrice).encodeABI(),
    });

    res.status(200).json({
      signRequired,
    });
    return;
  });
};

module.exports = updatePrice;
