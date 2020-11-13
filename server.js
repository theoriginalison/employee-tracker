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
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
            ]
        });
}