// Dependencies 
const cTable = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");

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
                    console.log("Case 2");
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
                type: "input"
            }
        ).then(function ({ newDept }) {
            connection.query(`INSERT INTO department (name) VALUES ('${newDept}')`, function (err, data) {
                if (err) throw err;
                console.log('Inserted ' + newDept + ' into row ' + data.insertId)
                mainTasker();
            })
        })
    }
};


