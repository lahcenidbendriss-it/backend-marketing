const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const db = mysql.createConnection({
    host: "sql308.infinityfree.com",  // MySQL Host Name from InfinityFree
    user: "if0_37279520",             // MySQL User Name from InfinityFree
    password: "wzDi1Jb1I7Rd5nT",      // MySQL Password from InfinityFree
    database: "if0_37279520_marketing_sahara", // Full MySQL Database Name
    port: 3306,                        // Default MySQL port
    dateStrings: "date"                // To handle date fields as strings
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database successfully!");
});

app.get("/", (req, res) => {
    return res.json("backend khedam");
});


app.get("/users", (req, res) => {
    const sql = "SELECT * FROM `email-users`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post("/users", (req, res) => {
    const { email } = req.body;
    

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    console.log("Received email:", email);
    
    const sql = "INSERT INTO `email-users` (email) VALUES (?)";
    
    db.query(sql, [email], (err, data) => {
        if (err) {
            
            console.error("Error inserting email into database:", err);
            return res.status(500).json(err);
        }
        console.log("Email inserted successfully:", data);
        return res.json("Email added successfully");
    });
});


app.listen(3500, () => {
    console.log("Server is running on port 3500");
});
