import mongodb from "mongodb";
import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT;

MongoClient.connect(
    process.env.ELECTRONICS_STORE_URI,
    {
        maxPoolSize:2,
        waitQueueTimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(error => {
        console.error(error.stack);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })
