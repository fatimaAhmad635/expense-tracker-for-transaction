import express from "express";
import database from "./database/mongoDB.js"
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from './routes/TransactionApi.js'
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
await database()
app.get('/', (req, res) => {
    res.send("Hello World")
});

// '/transaction' is the base Url 
app.use('/transaction',TransactionsApi)



app.listen(PORT, () => {
    console.log("server is running at http://localhost:4000");
})