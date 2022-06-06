var Web3 = require("Web3");
const web3 = new Web3(process.env.TESTNET_RPC);


var nftAbi = require("../../abi/ERC721abi.json");
var nftAddress = process.env.ADDRESS_NFT;


var tokenAbi = require("../../abi/ERC20abi.json");
var tokenAddress = process.env.ADDRESS_TOKEN;


let buyToken = (req, res) => {

  var msgsender = req.body.msgsender || "";
  var price = req.body.price || "";
  var tokenId = req.body.tokenId || "";

  if ([msgsender, price, tokenId].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
  }
  const token_CONTRACT = new web3.eth.Contract(tokenAbi, tokenAddress);
  const nft_CONTRACT = new web3.eth.Contract(nftAbi, nftAddress);

  web3.eth.getTransactionCount(msgsender, async (error, txCount) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }

     var signRequired = [];

    await token_CONTRACT.methods
      .allowance(msgsender, nftAddress)
      .call((error, allowance) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        if (parseInt(allowance) < parseInt(price)) {

         console.log("here");
          signRequired.push({
            to: tokenAddress,
            from: msgsender,
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            data: token_CONTRACT.methods
              .approve(nftAddress, price+600)
              .encodeABI(),
          });
        }
      });

      signRequired.push({
      to: nftAddress,
      from: msgsender,
      nonce: web3.utils.toHex(parseInt(txCount) + 1),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: nft_CONTRACT.methods.buyToken(tokenId).encodeABI(),
    });

    res.status(200).json({
      signRequired,
    });

    return;
  });
};

module.exports = buyToken;
