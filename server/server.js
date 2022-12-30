import express from "express";
import database from "./database/mongoDB.js"
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportConfig from "./config/passport.js";
import routes from './routes/index.js'
import * as dotenv from 'dotenv';


dotenv.config();


const PORT = 4000
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)




app.get('/', (req, res) => {
    res.send("Hello World")
});
app.use('/',routes)
await database()


app.listen(PORT, () => {
    console.log("server is running at http://localhost:4000");
})