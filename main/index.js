const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASS, 
        database: "employees_db",
    },
    console.log("Connected to mysql")
);
db.connect(function (err) {
    if (err) throw err;
  });

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
        ],
    }
]

function viewAllEmployees() {
    db.query("SELECT * FROM Employees;", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        init()
    })
}

function addEmployee() {
    db.query(`SELECT * FROM Roles;`, (err, res) => {
        if (err) console.log(err);
        // Maps all roles as an array to this variable so that we can use it to prompt for role choices when adding an employee
        let roles = res.map(role => ({name: role.title, value: role.id}));
        db.query(`SELECT * FROM Employees;`, (err,res) => {
            if (err) console.log(err);
            // Maps current db of employees to this variable
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'Enter the new Employee\'s first name'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'Enter the new Employee\'s last name'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Choose the new Employee\'s title',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Choose the new Employee\'s manager',
                    choices: employees
                }
            ]).then((answers) => {
                db.query(`INSERT INTO Employees SET ?`,
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.role,
                    manager_id: answers.manager
                },
                (err, res) => {
                    if (err) console.log(err);
                    console.log(`\n ${answers.firstName} ${answers.lastName} successfully added to database! \n`);
                    init()
                })
            })
        })
    })
};

function updateEmployeeRole() {
    db.query(`SELECT * FROM Roles;`, (err, res) => {
        if (err) console.log(err);
        let roles = res.map(role => ({name: role.title, value: role.id}));
        db.query(`SELECT * FROM Employees;`, (err, res) => {
            if (err) console.log(err);
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                }, 
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What should the Employee\'s new role be?',
                    choices: roles
                }
            ]).then((answers) => {
                db.query(`UPDATE Employees SET? WHERE ?`, 
                [
                    {
                        role_id: answers.newRole
                    },
                    {
                        id: answers.employee
                    }
                ],
                (err, res) => {
                    if (err) console.log(err)
                    console.log(`\n Successfully updated employee's role in the database! \n`)
                    init();
                })
            })
        })
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM Roles;", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        init();
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
            db.query(`INSERT INTO Roles SET ?` ,
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            }, (err,res) => {
                if (err) console.log(err)
                console.log(`\n ${response.title} successfully added to database! \n`);
                init();
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
        init();
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
            init();
        })
    })
}

function runTask(task) {
    switch(task) {
        case "View All Employees": 
            viewAllEmployees();
            break;
        case "Add Employee": 
            addEmployee();
            break;
        case "Update Employee Role": 
            updateEmployeeRole();
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
}

function init() {
    inquirer.prompt(question).then
        ((answer) => {
        runTask(answer.task);
    });
}

init();