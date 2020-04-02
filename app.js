const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

async function start() {
    console.log("Let's build your team...!");

    let teamHTML = "";
    let teamSize;

    await inquirer.prompt({
            type: "number",
            message: "Enter the number of your team members...",
            name: "numMembers"
        })
        .then((data) => {
            teamSize = data.numMembers + 1;
        });

    for (i = 1; i < teamSize; i++) {
        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([{
                    type: "input",
                    message: `Enter employee #${i}'s name...`,
                    name: "name"
                },
                {
                    type: "input",
                    message: `Enter employee #${i}'s id...`,
                    name: "id"
                },
                {
                    type: "input",
                    message: `Enter employee #${i}'s email...`,
                    name: "email"
                },
                {
                    type: "list",
                    message: `Enter employee #${i}'s title...`,
                    name: "title",
                    choices: ["Manager", "Engineer", "Intern"]
                }
            ])
            .then((data) => {
                name = data.name;
                id = data.id;
                title = data.title;
                email = data.email;
            });

        switch (title) {
            case "Manager":
                await inquirer.prompt([{
                        type: "input",
                        message: "Enter the manager's office number...",
                        name: "officeNum"
                    }])
                    .then((data) => {
                        const manager = new Manager(name, id, email, data.officeNum);
                        teamMember = fs.readFileSync("templates/manager.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;
            case "Intern":
                await inquirer.prompt([{
                        type: "input",
                        message: "Enter the name of the school the intern is attending...",
                        name: "school"
                    }])
                    .then((data) => {
                        const intern = new Intern(name, id, email, data.school);
                        teamMember = fs.readFileSync("templates/intern.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;
            case "Engineer":
                await inquirer.prompt([{
                        type: "input",
                        message: "Enter the engineer's GitHub username...",
                        name: "github"
                    }])
                    .then((data) => {
                        const engineer = new Engineer(name, id, email, data.github);
                        teamMember = fs.readFileSync("templates/engineer.html");
                        teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                    });
                break;
        }
    }

    const mainHTML = fs.readFileSync("templates/main.html");
    teamHTML = eval('`' + mainHTML + '`');

    fs.writeFile("output/team.html", teamHTML, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your team has been successfully built!");
    });
}

start();