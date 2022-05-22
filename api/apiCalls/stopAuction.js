var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);

const NFT_ABI = require("../abi/ERC721abi.json");
const AUCTION_ABI = require("../abi/Auctionabi.json");

let stopAuction = (req, res) => {
  var msgsender = req.body.msgsender || "";
  var tokenId = req.body.tokenId || "";

  if ([msgsender, tokenId].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }
  const NFT_ADDRESS = process.env.ADDRESS_NFT;
  const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

  const AUCTION_ADDRESS = process.env.ADDRESS_AUCTION;
  const AUCTION_CONTRACT = new web3.eth.Contract(AUCTION_ABI, AUCTION_ADDRESS);

  web3.eth.getTransactionCount(msgsender, (error, txCount) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const txObject1 = {
      to: NFT_ADDRESS,
      from: msgsender,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: NFT_CONTRACT.methods.approve(AUCTION_ADDRESS, tokenId).encodeABI(),
    };

    const txObject2 = {
      to: AUCTION_ADDRESS,
      from: msgsender,
      nonce: web3.utils.toHex(parseInt(txCount) + 1),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: AUCTION_CONTRACT.methods.stopAuction(tokenId).encodeABI(),
    };

    res.status(200).json({
      signRequired: [txObject1, txObject2],
    });
    return;
  });
};
module.exports = stopAuction;
