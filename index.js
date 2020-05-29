var inquirer = require("inquirer");
var fs = require('fs');
var axios = require('axios');

// User Questions
inquirer
    .prompt([{
        type: "input",
        message: "Hello! what is your GitHub user name?",
        name: "username",
    }]).then(function ({
        username
    }) {
        const queryReposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(queryReposUrl).then(function (res) {

            // Quiestions for the user
            inquirer
                .prompt([{
                    type: "list",
                    message: `Which of this repos is your project? `,
                    name: "repository",
                    choices: res.data.map(function (repo) {
                        return repo.name;
                    })
                }, {
                    type: "input",
                    message: "What is your project title?",
                    name: "name"
                }, {
                    type: "input",
                    message: "What is the description of the project?",
                    name: "description"
                }, {
                    type: "input",
                    message: "What's the installation instruction commands?",
                    name: "installation"
                }, {
                    type: "input",
                    message: "What would the Usage Section say?",
                    name: "usage"
                }, {
                    type: "list",
                    message: "What license would you prefer?",
                    name: "license",
                    choices: [
                        "MIT",
                        "Apache2.0",
                        "ISC",
                        "BSD",
                        "GPLv3",
                        "AGPLv3"
                    ]
                }, {
                    type: "input",
                    message: "Any notes on the Contributing section?",
                    name: "contributing"
                }, {
                    type: "input",
                    message: "Test instruction commands?",
                    name: "tests"
                }, {
                    type: "input",
                    message: "Anything on the Questions section?",
                    name: "questions"
                }]).then(function ({
                    repository,
                    name,
                    description,
                    installation,
                    usage,
                    license,
                    contributing,
                    tests,
                    questions
                }) {

                    // Building of the readme.md content
                    const repoNamesStr = `
                    
# ${name}
[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](https://github.com/${username}/${repository})

## Description

${description}

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:


                        
                        '${installation}'
                    
                        

## Usage

${usage}

## License

This project is licensed under the ${license} license.
  
## Contributing

${contributing}

## Tests

To run tests, run the following command:


                        
                        '${tests}'
                        
                        

## Questions

${questions}



                    `;

                    fs.writeFile("./output/README.md", repoNamesStr, function (err) {
                        if (err) {
                            throw err;
                        }

                        console.log(`README File created, enjoy!`);

                    });
                });
        });
    });