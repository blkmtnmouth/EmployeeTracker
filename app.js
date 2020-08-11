var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: 'Buzzkill1!',
  database: "empTracker"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Update Employee Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View Department":
       viewDepartment();
        break;

      case "View Role":
        viewRole();
        break;

     case "View Employee":
        viewEmployee();
        break;

     case "Update Employee Role":
       updateEmployee();
        break;
      }
    });
}



function addDepartment(){
  inquirer
      .prompt ({
          name: "dept",
          type: "input",
          message: "What is your department?"
      })
      .then(function(answer) { 
          var query = connection.query(
              "INSERT INTO department SET ?",
              {name: answer.dept}, 
              function(err, res) {
              if (err) throw err; 
              console.log(res.affectedRows + " dept inserted!\n");
              runSearch();   
          });
      }); 
}


function addRole(){
  inquirer
      .prompt ([{
          name: "title",
          type: "list",
          message: "What is your role title?",
          choices: ["Teacher", "Manager", "Student", "Engineer"]
      }, 
      {
        name: "salary",
        type: "input",
        message: "What is the salary?"
      }, 
      {
        name: "dept_id",
        type: "input",
        message: "What is your department id?"
      }])
      .then(function(answer) { 
          var query = connection.query(
              "INSERT INTO role SET ?",
              {title: answer.title, salary: answer.salary, department_id: answer.dept_id}, 
              function(err, res) {
              if (err) throw err; 
              console.log(res.affectedRows + " role inserted!\n");
              runSearch();   
          });
      }); 
}

function addEmployee(){
  inquirer
      .prompt ([{
          name: "firstName",
          type: "input",
          message: "What is your first name?"
      }, 
      {
        name: "lastName",
        type: "input",
        message: "What is your first name?"
      }, 
      {
        name: "roleId",
        type: "input",
        message: "What is your role id?"
      },
      {
        name: "managerId",
        type: "input",
        message: "What is your manager id?"
      }])
      .then(function(answer) { 
          var query = connection.query(
              "INSERT INTO employee SET ?",
              {first_name: answer.firstName, last_name: answer.lastName, role_Id: answer.roleId, manager_Id: answer.managerId}, 
              function(err, res) {
              if (err) throw err; 
              console.log(res.affectedRows + " employee inserted!\n");
              runSearch();   
        });
      });  
}

function viewRole(){
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewEmployee(){
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewDepartment(){
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}


function updateEmployee() {
  inquirer
    .prompt([{
      name: "employee", 
      type: "input", 
      message: "What employee do you want to update? Search by id", 
    }, 
    {
      name: "newRole", 
      type: "input", 
      message: "What is the new role id?"
    }])
    .then(function(answer){
      var query = connection.query(
        "UPDATE employee SET ? WHERE ?", 
        [
          {role_id: answer.newRole}, 
          {id: answer.employee}
        ], 
        function(err, res){
          if (err) throw err; 
          console.log(res.affectedRows + " employee role updated!\n");
          runSearch(); 
        }
      );
    });  
}