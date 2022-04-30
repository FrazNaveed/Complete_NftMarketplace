var Web3 = require("Web3");
const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
var nftAddress = "0x25873A135EcFaeCdb4Da5ecB87547FEaD67a9DCf";
var nftAbi = require("../abi/ERC721abi.json");

var tokenAbi = require("../abi/ERC20abi.json");
var tokenAddress = "0x1294e07e5B522307829F3Ca0074db1Fda940CC24"


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
      .allowance(msgsender, nftaddress)
      .call((error, allowance) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        if (allowance < price) {
          signRequired.push({
            to: tokenAddress,
            from: msgsender,
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            data: token_CONTRACT.methods
              .approve(nft_ADDRESS, Number.MAX_SAFE_INTEGER - 1)
              .encodeABI(),
          });
        }
      });

    // signRequired.push({
    //   to: NFTaddress,
    //   from: msgsender,
    //   nonce: web3.utils.toHex(parseInt(txCount) + 1),
    //   gasLimit: web3.utils.toHex(1000000),
    //   gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    //   data: NFT_CONTRACT.methods.buyToken(tokenId).encodeABI(),
    // });

    nft_CONTRACT.methods.buyToken(tokenId).call((error, result) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        res.status(200).json({ result });
      });

    res.status(200).json({
      signRequired,
    });

    return;
  });
};

module.exports = buyToken;
