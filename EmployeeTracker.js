//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');


//Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_DB'
});

connection.connect(function (err) {
    if(err) throw err;
    inquirer
    .prompt([
    {type: "list",
    name: "action",
    message: "What Would you like to do?",
    choices: 
    ["View All Departments",
    "View All Roles",
    "View All Employees",
    "Add a Department",
    "Add a Role",
    "Add an Employee",
    "Update an Employee Role",
    ]
    }

  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);

    if(answers.action == "Add an Employee"){
        // TODO: 
        // 1. Prompt for employee first name
        // 2. Prompt for employee last name
        // 3. Prompt for employee role name
        // 4. Prompt for employee manager first and last
        inquirer
        .prompt([
            {
                type: 'input',
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: "role_name",
                message: "What is the employee's role with the company?"
            },
            {
                type: 'input',
                name: "manager_name",
                message: "What is the manager's first and last name?"
            }
        ])
        .then((answers) => {
            console.log(answers);

            // 5. Create the employee record

        })
    }
      });
});

//Welcome message
console.table(
    "\m-------------- EMPLOYEE TRACKER --------------\m"
);

function askName() {
    return ([
        {
            name: "first",
            type: "input",
            message: "Enter the first name: "
        },
        {
            name: "last",
            type: "input",
            message: "Enter the last name: "
        }
    ]);
}