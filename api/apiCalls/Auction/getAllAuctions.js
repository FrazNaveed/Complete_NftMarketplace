var Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_RPC);
const AUCTION_ABI = require("../../abi/Auctionabi.json");
const AUCTION_ADDRESS = process.env.ADDRESS_AUCTION;
const AUCTION_CONTRACT = new web3.eth.Contract(AUCTION_ABI, AUCTION_ADDRESS);

let getAllAuctions = async (_, res) => {

  var result = [];

  await AUCTION_CONTRACT.methods.getAllAuctions().call((error, returned) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    result = result.concat(returned);
  });

  res.status(200).json({ result });
};

module.exports = getAllAuctions;
