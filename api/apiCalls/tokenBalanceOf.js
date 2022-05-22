var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
const tokenAbi = require("../abi/ERC20abi.json");

let tokenBalanceOf = (req, res) => {
  var address = req.query.address || "";
  
  if ([address].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }
  const tokenAddress = process.env.ADDRESS_TOKEN;
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

  tokenContract.methods.balanceOf(address).call((error, result) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ result });
  });
};

module.exports = tokenBalanceOf;
