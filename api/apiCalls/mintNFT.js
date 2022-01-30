var Web3 = require("web3");
var NFTaddress = "0xc4bA070d91D10877c0bE4265aF8692f1707729d7";
var NFTabi = "../abi/ERC721abi.json";


const NFT_CONTRACT = new web3.eth.Contract(NFTabi, NFTaddress);

var fs = require("fs");
const pinataSDK = require("@pinata/sdk");


const pinata = pinataSDK(
    "17f1fd332091faac8827",
    "885c8fcaef1b1bbd6455c2fe35bd8e0a57876273b15cbdece015d7cf96bc5f04"
);


let mintNFT = (req, res)=>{

    var msgsender = req.body.msgsender || "";
    var title = req.body.title || "";
    var price = req.body.price || "";
    var category = req.body.category || "";
    var description = req.body.description || "";
    var mediaPath = req.file.path;

    var imgHash = "";
    var metadataHash = "";
    var to = msgsender;

    if ([msgsender, title, price, description, category].includes("")) {
        res.status(404).json({
            error: "one of the required fields were left empty",
        });
        return;
    }

    if (!fs.existsSync(mediaPath)) {
        res.status(500).json({ error: "file conflict occured at server end" });
        return;
    }

    const readableStreamForFile = fs.createReadStream(mediaPath);
    const options = {
        pinataMetadata: {
            name: "nftImg",
            keyvalues: {
                media: "NFT",
            },
        },
        pinataOptions: {
            cidVersion: 0,
        },
    };
    pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
        imgHash = "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash;
        fs.unlinkSync(mediaPath);
 
        var sampleObject = {
            creator: msgsender,
            title: title,
            media: imgHash,
            category: category,
            description: description,
        };

        fs.writeFile(
            "./temp/metadata_" + msgsender + ".json",
            JSON.stringify(sampleObject, null, 4),
            (err) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }
                const readableStreamForFile1 = fs.createReadStream(
                    "./temp/metadata_" + msgsender + ".json"
                );

                const options1 = {
                    pinataMetadata: {
                        name: "Metadata",
                        keyvalues: {
                            media: "NFT metadata",
                        },
                    },
                    pinataOptions: {
                        cidVersion: 0,
                    },
                };
                pinata
                    .pinFileToIPFS(readableStreamForFile1, options1)
                    .then((result) => {
                        metadataHash =
                            "https://gateway.pinata.cloud/ipfs/" +
                            result.IpfsHash;
                        fs.unlinkSync(
                            "./temp/metadata_" + msgsender + ".json"
                        );

                        // blockchain mint start
                        web3.eth.getTransactionCount(
                            msgsender,
                            (error, txCount) => {
                                if (error) {
                                    res.status(400).json({ error });
                                    return;
                                }
                                const txObject = {
                                    to: NFT_ADDRESS,
                                    nonce: web3.utils.toHex(txCount),
                                    gasLimit: web3.utils.toHex(1000000),
                                    gasPrice: web3.utils.toHex(
                                        web3.utils.toWei("10", "gwei")
                                    ),
                                    data: NFT_CONTRACT.methods
                                        .mint(
                                            to,
                                            metadataHash,
                                            price
                                        )
                                        .encodeABI(),
                                };
                                res.status(200).json({
                                    signRequired: txObject,
                                });
                                return;
                            }
                        );
                        // blockchain mint end
                    })
                    .catch((err) => {
                        fs.unlinkSync(
                            "./temp/metadata_" + msgsender + ".json"
                        );
                        res.status(500).json({
                            error: err,
                        });
                        return;
                    });
            }
        );
        10;
    })
    .catch((err) => {
        fs.unlinkSync(mediaPath);
        res.status(500).json({
            error: err,
        });
        return;
    });
}

module.exports = mintNFT;