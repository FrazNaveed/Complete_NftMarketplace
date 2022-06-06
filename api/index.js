require("dotenv").config();
var express = require("express");
var multer = require("multer");
var cors = require('cors')
const mongoose = require("mongoose");
const app = express();
const port = 8080;

app.use(cors());

// app.use(express.json());
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
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const Userupload = multer({ storage: userStorage });

const uri = process.env.MONGO_URL;
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to DB"))
    .catch((error) => console.log("Error connecting to DB:", error));


//********* ERC20 Calls *********\\
app.get("/tokenBalanceOf", require("./apiCalls/ERC20/tokenBalanceOf"));

app.get("/getTokens", require("./apiCalls/ERC721/getTokens"));

//*******  ERC721 Calls *******\\

app.post("/mintNFT", upload.single("media"), require("./mintNFT"));
app.post("/buyNFT", require("./apiCalls/ERC721/buyNFT"));
app.get("/getTokenURI", require("./apiCalls/ERC721/getTokenURI"));
app.get("/getTokenPrice", require("./apiCalls/ERC721/getTokenPrice"));
app.get("/getNftHistory", require("./apiCalls/ERC721/getNftHistory"));
app.get("/getCollections", require("./apiCalls/ERC721/getCollections"));
app.get("/ownerOf", require("./apiCalls/ERC721/ownerOf"));


//********* Auction Calls *********\\
app.post("/startAuction", require("./apiCalls/Auction/startAuction"));
app.post("/stopAuction", require("./apiCalls/Auction/stopAuction"));
app.post("/updateBid", require("./apiCalls/Auction/updateBid"));
app.get("/auctionInfo", require("./apiCalls/Auction/auctionInfo"));
app.get("/getAllAuctions", require("./apiCalls/Auction/getAllAuctions"));


//********* DB related Calls *********\\

app.post("/registerProfile", require("./registerProfile"));
app.get("/getProfile", require("./getProfile"));
app.get("/getProfileInfo", require("./getProfileInfo"));

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
}); 