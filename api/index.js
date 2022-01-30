var express = require("express");
const app = express();
const port = 3000;

app.get("/getTokenPrice", require("./apiCalls/getTokenPrice"));
app.post("/buyNFT", require("./apiCalls/buyNFT"));

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`);
});