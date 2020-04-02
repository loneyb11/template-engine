const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const create = require("./lib/create");
const managerArray = [];
const engineerArray = [];
const internArray = [];

promptManager = function() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your managers first name?",
        validate: function(val) {
          return /^[a-zA-Z]+$/i.test(val) || "Must only be letters!";
        }
      },
      {
        type: "input",
        name: "idnumber",
        message: "What is your managers id ?",
        validate: function(val) {
          return (
            /^[0-9]*$/i.test(val) || "Must be a number/numbers between 0-9"
          );
        }
      },
      {
        type: "input",
        name: "email",
        message: "What is your managers Email?",
        validate: function(val) {
          return (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
              val
            ) || "Must be an email address like john@aol.com!"
          );
        }
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your managers office phone number?",
        validate: function(val) {
          return (
            /^[2-9]\d{2}-\d{3}-\d{4}$/i.test(val) ||
            "Must be a phone number in this format 123-456-7890!"
          );
        }
      }
    ])
    .then(managerAnswers => {
      const man = new Manager(
        managerAnswers.name,
        managerAnswers.idnumber,
        managerAnswers.email,
        managerAnswers.officeNumber
      );
      managerArray.push(man);
      askForEmployee();
    });
};

askForEmployee = function() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ])
    .then(val => {
      if (val.selection === "Engineer") {
        engineerQuestions();
      } else if (val.selection === "Intern") {
        internQuestions();
      } else if (
        val.selection === "I don't want to add any more team members"
      ) {
        create(managerArray, internArray, engineerArray);
      }
    });
};

internQuestions = function() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your intern's  first name?",
        validate: function(val) {
          return /^[a-zA-Z]+$/i.test(val) || "Must only be letters!";
        }
      },
      {
        type: "input",
        name: "idnumber",
        message: "What is your intern's ID?",
        validate: function(val) {
          return (
            /^[0-9]*$/i.test(val) || "Must be a number/numbers between 0-9"
          );
        }
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        validate: function(val) {
          return (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
              val
            ) || "Must be an email address like john@aol.com!"
          );
        }
      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        validate: function(val) {
          return /[a-z1-9]/i.test(val) || "Must only be letters!";
        }
      }
    ])
    .then(internAnswers => {
      const int = new Intern(
        internAnswers.name,
        internAnswers.idnumber,
        internAnswers.email,
        internAnswers.school
      );
      internArray.push(int);
      askForEmployee();
    });
};

engineerQuestions = function() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your engineer's first name?",
        validate: function(val) {
          return /^[a-zA-Z]+$/i.test(val) || "Must only be letters!";
        }
      },
      {
        type: "input",
        name: "idnumber",
        message: "What is your engineers ID?",
        validate: function(val) {
          return (
            /^[0-9]*$/i.test(val) || "Must be a number/numbers between 0-9"
          );
        }
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
        validate: function(val) {
          return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(val);
        }
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineers Github?",
        validate: function(val) {
          return /^(\w+\S+)$/i.test(val) || "Must be a Github user name!";
        }
      }
    ])
    .then(engineerAnswers => {
      const eng = new Engineer(
        engineerAnswers.name,
        engineerAnswers.idnumber,
        engineerAnswers.email,
        engineerAnswers.github
      );
      engineerArray.push(eng);

      askForEmployee();
    });
};

promptManager();