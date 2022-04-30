var Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const tokenAbi = require("../abi/ERC20abi.json");

let tokenBalanceOf = (req, res) => {
  var address = req.query.address || "";
  
  if ([address].includes("")) {
    res.status(404).json({
      error: "one of the required fields were left empty",
    });
    return;
  }
  const tokenAddress = "0xD1eFE36e9587367b4a6AF81199b863d47943D22c";
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
