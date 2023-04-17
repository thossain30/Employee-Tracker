const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASS,
        database: "employees_db"
    }
)