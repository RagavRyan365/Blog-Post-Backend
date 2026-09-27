import {Client} from "pg";
import dotenv from "dotenv";
dotenv.config();

const DB = new Client(process.env.DB_URL);
DB.connect()
.then(()=>console.log("Db connected successfully"))
.catch((err)=>console.log(err));

export default DB;