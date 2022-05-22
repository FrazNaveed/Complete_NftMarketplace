var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
const tokenAbi = require("../abi/ERC721abi.json");

let getTokens = (req, res) => {
  
  
  const tokenAddress = process.env.ADDRESS_NFT;
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

  tokenContract.methods.getTokens().call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = getTokens;
