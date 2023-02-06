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
            
            connection.query("select id from role where title = ?", [answers.role_name], (error, test) => {
                const [first_name, last_name] = answers.manager_name.split(" ");
                connection.query("select id from employee where first_name = ? and last_name = ?", [first_name, last_name], (error, test2) => {
                    const [{id:role_id}] = test;
                        const [{id:manager_id}] = test2;
                    connection.query("insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)", [answers.first_name, answers.last_name, role_id, manager_id]);
                });
            });
            

            // 5. Create the employee record

        })
    }
    if(answers.action == "View All Departments"){
        connection.query("select dept_name from dept", ((error, answers) => {
            console.log(answers);

        }));
    };
    if(answers.action == "View All Roles"){
    connection.query("select title from role", ((error, answers) => {
        console.log(answers);
}))
       
    }

    if(answers.action == "View All Employees"){
        connection.query("select first_name, last_name from employee", ((error, answers) => {
            console.log(answers);
    }))
           
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