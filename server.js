var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// do I need this for Heroku?
// var PORT = process.env.PORT || 8080;


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "greatBay_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "initialPrompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees.",
                "View All Employees by Department.",
                "View All Employees by Manager.",
                "Add Employee.",
                "Remove Employee.",
                "Update Employee Role.",
                "Update Employee Manager.",
            ]
        })
        .then(function (answer) {
            if (answer.initialPrompt === "View All Employees.") {
                viewEmployees();
            }
            else if (answer.initialPrompt === "View All Employees by Department.") {
                viewEmployeesDept();
            }
            else if (answer.initialPrompt === "View All Employees by Manager.") {
                viewEmployeesManager();
            }
            else if (answer.initialPrompt === "Add Employee.") {
                addEmployee();
            }
            else if (answer.initialPrompt === "Remove Employee.") {
                removeEmployee();
            }
            else if (answer.initialPrompt === "Update Employee Role.") {
                updateRole();
            }
            else if (answer.initialPrompt === "Update Employee Manager.") {
                updateManager();
            }
        });
};

function viewEmployees() {

};

function viewEmployeesDept() {

};

function viewEmployeesManager() {

};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the new Employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the new Employee's last name?"
        },
        {
            name: "newEmpRole",
            type: "list",
            message: "What is the new Employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
            ]
        },
        {
            name: "newEmpRole",
            type: "list",
            message: "What is the new Employee's role?",
            choices: [""],
        },
    ])
};

function removeEmployee() {

};

function updateRole() {

};

function updateManager() {

};