// Dependencies 
const cTable = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");
const validator = require('validator');

// create connection to the AWS RDS database **********************************
var connection = mysql.createConnection({
  host: "database-1.cafvzihsfdz1.us-west-2.rds.amazonaws.com",
// Your port; if not 
  port: 3306,
// Your username
  user: "admin",

// Your password
  password: "Password123",
  database: "employeeDB_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the DB as: " + connection.threadId);
//  Start the user prompts.
  mainTasker();
});
// ********************** Connection established ******************************


function mainTasker() {
    // ask the user what they want to do
    inquirer
        .prompt(
            {
                name: "taskToPerform",
                type: "list",
                message: "Select a task to perform to your database.",
                choices: ["Add to my database", "View my database", "Update employee roles", "Exit, there's nothing else to do."],
            }
        ).then(function ( { taskToPerform } ) {
            switch (taskToPerform) {
                case "Add to my database":
                    add();
                    break;
                case "View my database":
                    view();
                    break;
                case "Update employee roles":
                    update();
                    break;
                case "Exit, there's nothing else to do.":
                    // end the connection
                    connection.end()
                    return console.log("Goodbye, see you next time.");
            }
        });


            function add() {
                // ask the user what they want to do
                inquirer.prompt(
                    {
                        name: "add",
                        type: "list",
                        message: "What do you want to add?",
                        choices: ["A new department", "Add new roles", "Add a new employee", "Forget it, I changed my mind (Go back)."],
                    }
                    ).then(function ( { add } ) {
                    switch (add) {
                        case "A new department":
                            newDept();
                            break;
                        case "Add new roles":
                            newRole();
                            break;
                        case "Add a new employee":
                            console.log("Case 3");
                            break;
                        case "Forget it, I changed my mind (Go back).":
                            console.log("Case 4")
                            // return back the last prompt.
                            return mainTasker();
                    }});
            }
            // add a new department
            function newDept() {
                inquirer.prompt(
                    {
                        name: "newDept",
                        message: "Name the new department",
                        type: "input",
                        validate: userEntry => {
                            // if user response is not nothing
                            if(userEntry !== ""){
                                return true;
                            }
                            return "You have to enter some information!"
                        },
                        default: ""                     
                    }
                ).then(function ({ newDept }) {
                    connection.query(`INSERT INTO department (name) VALUES ('${newDept}')`, function (err, data) {
                        if (err) throw err;
                        console.log('Inserted ' + newDept + ' into row ' + data.insertId)
                        mainTasker();
                    })
                })
            };
            // add a new role
            function newRole() {
            // placeholder for department array
            let deptList = [];

            connection.query(`SELECT * FROM department`, function (err, data) {
                if (err) throw err;
                // loop through to find all departments
                for (let i = 0; i < data.length; i++) { 
                    deptList.push(data[i].name)
                }
                // ask the user for info about the new role
            inquirer.prompt([
                {
                    name: "roleTitle",
                    message: "What is the title of role?",
                    type: "input",
                    validate: userEntry => {
                        // if user response is not nothing
                        if(userEntry !== ""){
                            return true;
                        }
                        return "You have to enter some information!"
                    },
                    default: ""        
                },
                {
                    name: "roleSalary",
                    message: "What is the salary of the role? (no , or $ needed)",
                    type: "input",
                    validate: userEntry => {
                        // if user response is a number
                        if(validator.isNumeric(userEntry)){
                            return true;
                        }
                        return "That's not a valid number!";
                    },
                    default: ""
                },
                {
                    name: "roleDept",
                    message: "What department does this role work for?",
                    type: "list",
                    choices: deptList
                }
            ]).then(function ({ roleTitle, roleSalary, roleDept }) {
                // set the id
                let index = deptList.indexOf(roleDept)
                // add one the the returned index (SQL doesn't start at 0)
                index += 1;
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', ${index})`, function (err, data) {
                    if (err) throw err;
                    console.log('Added ' + roleTitle + ' into row ' + data.insertId)
                    mainTasker();
                })
            })
        })
    }
        
};


