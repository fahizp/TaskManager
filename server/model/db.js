import mysql from "mysql";
import * as dotenv from 'dotenv';
dotenv.config();
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:process.env.DB_KEY,
  database: "task",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database");
    process.exit(1);
  }
  console.log("Connected to database");
});

export default db;
