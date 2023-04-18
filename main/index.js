const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        port: process.env.PORT || 3306,
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

function viewAllEmployees() {
    db.query("SELECT * FROM Employees", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM Role", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}

function viewAllDepartments() {
    db.query("SELECT * FROM Department", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "What is the name of the department you'd like to add?"
        }
    ]).then((response) => {
        db.query(`INSERT INTO Department SET ?`, 
        {
            department_name : response.newDept
        },
        (err, res) => {
            if (err) {console.log(err);}
            console.log(`\n ${response.newDept} successfully added to database! \n`);
        })
    })
}

function runTask(task) {
    switch(task) {
        case "View All Employees": 
            viewAllEmployees();
            break;
        case "Add Employee": 
            //
            break;
        case "Update Employee Role": 
            //
            break;
        case "View All Roles": 
            viewAllRoles();
            break;
        case "Add Role": 
            //
            break;
        case "View All Departments": 
            viewAllDepartments();
            break;
        case "Add Department": 
            addDepartment();
            break;
        case "Quit": 
            //
            break;
    }
}

function init() {
    inquirer.prompt(questions).
    then(answer => {
        runTask(answer.task);
    })
}

init();