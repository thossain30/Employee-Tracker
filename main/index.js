const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        port: process.env.PORT || 3306,
        user: process.env.USER || "root",
        password: process.env.PASS || "", 
        database: "employees_db"
    },
    console.log("Connected to mysql!")
)

const question = [
    {
        type: "list",
        name: "task",
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
        ]
    }
]

function viewAllEmployees() {
    db.query("SELECT * FROM Employees;", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM Role;", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}

function addRole() {
    db.query("SELECT * FROM Department;", (err,res) => {
        if (err) console.log(err);
        let departments = res.map(department => ({name: department.department_name, id: department.id}));
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role you want to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role you want to add?"
            },
            {
                name: "deptName",
                type: "list",
                message: "Which department do you want to add the new role to?",
                choices: departments
            }
        ]).then((response) => {
            db.query(`INSERT INTO Role SET ?` ,
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            }, (err,res) => {
                if (err) console.log(err)
                console.log(`\n ${response.title} successfully added to database! \n`);
            })
        }) 
    })
};

function viewAllDepartments() {
    db.query("SELECT * FROM Department;", (err, results) => {
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
            console.log(`\n ${res.newDept} successfully added to database! \n`);
        })
    })
}

// function runTask(task) {
//     switch(task) {
//         case "View All Employees": 
//             viewAllEmployees();
//             break;
//         case "Add Employee": 
//             //
//             break;
//         case "Update Employee Role": 
//             //
//             break;
//         case "View All Roles": 
//             viewAllRoles();
//             break;
//         case "Add Role": 
//             //
//             break;
//         case "View All Departments": 
//             viewAllDepartments();
//             break;
//         case "Add Department": 
//             addDepartment();
//             break;
//         case "Quit": 
//             db.end();
//             console.log('\n You have now exited the employee management program. \n');
//             break;
//     }
// }

function init() {
    inquirer.prompt(question).then
        ((answer) => {
        switch(answer.task) {
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
                addRole();
                break;
            case "View All Departments": 
                viewAllDepartments();
                break;
            case "Add Department": 
                addDepartment();
                break;
            case "Quit": 
                db.end();
                console.log('\n You have now exited the employee management program. \n');
                break;
        }
    });
}

init();