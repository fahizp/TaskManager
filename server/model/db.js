import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fahiz@2003",
  database: "task"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database');
    process.exit(1);
  }
  console.log('Connected to database');
});

export default db;