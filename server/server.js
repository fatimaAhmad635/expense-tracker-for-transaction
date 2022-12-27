import express from "express";
import database from "./database/mongoDB.js"
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from './routes/TransactionApi.js'
import AuthApi from './routes/AuthApi.js'
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)
await database()
app.get('/', (req, res) => {
    res.send("Hello World")
});

// '/transaction' is the base Url 
app.use('/transaction',TransactionsApi)

app.use('/auth',AuthApi)


app.listen(PORT, () => {
    console.log("server is running at http://localhost:4000");
})