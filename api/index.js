var express = require("express");
var multer = require("multer");
var cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
// app.use(express.json({extended: false}));
app.use(express.json({limit: "50mb"}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "temp");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});


const upload = multer({ storage: storage });

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "temp");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const Userupload = multer({ storage: userStorage });

//********* ERC20 Calls *********\\
app.get("/tokenBalanceOf", require("./apiCalls/tokenBalanceOf"));

//*******  ERC721 Calls *******/
app.get("/ownerOf", require("./apiCalls/ownerOf"));
app.get("/getTokenPrice", require("./apiCalls/getTokenPrice"));
app.post("/buyNFT", require("./apiCalls/buyNFT"));
app.post("/mintNFT", upload.single("media"), require("./apiCalls/mintNFT"));
app.get("/getTokenURI", require("./apiCalls/getTokenURI"));

//********* Auction Calls *********\\
app.post("/startAuction", require("./apiCalls/startAuction"));
app.get("/auctionInfo", require("./apiCalls/auctionInfo"));
app.post("/updateAuctionPrice", require("./apiCalls/updateAuctionPrice"));
// app.post("/stopAuction", require("./apiCalls/stopAuction"));
// app.get("/getAllAuctions", require("./apiCalls/getAllAuctions"));


app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
});