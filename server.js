var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
require("dotenv").config();

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PWD,
    database: "employeeDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

var empRoleChoices = [
    {
        name: "Sales Lead",
        value: 1

    },
    {
        name: "Sales Person",
        value: 2

    },
    {
        name: "Lead Engineer",
        value: 3

    },
    {
        name: "Software Engineer",
        value: 4

    },
    {
        name: "Legal Team Lead",
        value: 5

    },
    {
        name: "Lawyer",
        value: 6

    },
    {
        name: "Accountant",
        value: 7

    },
];

function start() {
    inquirer
        .prompt({
            name: "initialPrompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees.",
                "View All Employees by Department.",
                "Add Employee.",
                "Remove Employee.",
                "Update Employee Role.",
            ]
        })
        .then(function (answer) {
            if (answer.initialPrompt === "View All Employees.") {
                viewEmployees();
            }
            else if (answer.initialPrompt === "View All Employees by Department.") {
                viewEmployeesDept();
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
        });
};

function viewEmployees() {
    //call the query to select the join that we created
    connection.query(`SELECT first_name as "First Name", last_name as "Last Name", title as "Title", salary as "Salary", department_name as "Department Name"
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id`, function (err, results) {
        if (err) throw err;
        console.table(results);
        //THIS NEEDS TO BE AT THE END OF EVERY FUNCTION!!
        start();
    });
    //the results objects will go into console.table and it will display in a table view
};

//This just has two NULLs for the left and right join; need full join
function viewEmployeesDept() {
    connection.query(
        //     `SELECT department_name as "Department Name", title as "Title", first_name as "First Name", last_name as "Last Name"
        // FROM department
        // LEFT JOIN roles ON department.id = roles.department_id
        // LEFT JOIN employee ON roles.title = employee.role_id
        // UNION ALL
        // SELECT department_name as "Department Name", title as "Title", first_name as "First Name", last_name as "Last Name"
        // FROM department
        // RIGHT JOIN roles ON department.id = roles.department_id
        // RIGHT JOIN employee ON roles.title = employee.role_id;`
        `SELECT department_name as "Department Name", title as "Title", first_name as "First Name", last_name as "Last Name"
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
ORDER BY department_name, title, first_name, last_name;`
        , function (err, results) {
            if (err) throw err;
            console.table(results);
            start();
        })
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
            choices: empRoleChoices
        }
    ],
    ).then(answers => {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.newEmpRole,
            },
            (err, results) => {
                if (err) throw err;
                console.log(`Employee ${answers.firstName} ${answers.lastName} added.`)
                start();
            });
    });

};

function removeEmployee() {
    inquirer.prompt([
        {
            name: "removeEmp",
            type: "input",
            message: "What is the ID of the employee you'd like to remove?"
        }],
    ).then(answers => {
        connection.query("DELETE FROM employee WHERE ?",
            {
                id: answers.removeEmp
            },
            (err, results) => {
                if (err) throw err;
                console.log(`Employee removed.`)
                start();
            }
        )
    })
};

function updateRole() {
    inquirer.prompt([
        {
            name: "updateEmpId",
            type: "input",
            message: "What is the ID of the employee you'd like to update?"
        },
        {
            name: "updateEmpRole",
            type: "list",
            message: "What is their new role?",
            choices: empRoleChoices
        },
    ])
        .then(answer => {
            connection.query("UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.updateEmpRole
                    }
                ],
            )
        })

};