const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASS,
        database: "employees_db"
    }
)

const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ],
        name: "task" 
    }
]

function runTask(task) {
    switch(task) {
        case "View All Employees": 
            //
            break;
        case "Add Employee": 
            //
            break;
        case "Update Employee Role": 
            //
            break;
        case "View All Roles": 
            //
            break;
        case "Add Role": 
            //
            break;
        case "View All Departments": 
            //
            break;
        case "Add Department": 
            //
            break;
        case "Quit": 
            //
            break;
    }
}

function init() {
    inquirer.prompt(questions).
    then(answers => {
        runTask(answers.task);
    })
}

init();