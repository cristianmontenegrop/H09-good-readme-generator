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
        const queryUserUrl = `https://api.github.com/users/${username}`;
        // console.log(queryUserUrl)
        axios.get(queryUserUrl).then(function ({
            userData
        }) {



            const queryReposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
            axios.get(queryReposUrl).then(function (res) {
                // console.log(res);
                const repoNames = res.data.map(function (repo) {
                    return repo.name;
                });
                // const repoNamesStr = repoNames.join("','");

                // console.log(repoNamesStr);


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
                        message: "What are the installation instructions?",
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
                            "Apache 2.0",
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
                        message: "Test instructions?",
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

                        console.log(repository);
                        console.log(username);
                        console.log(userData)
                        const repoNamesStr = `Hello CRis!!!!! ${repository}, ${username}, 
                    
# Google
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/johnfyoung/google)

## Description

Google will search the internet for anything you want

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

`
                        ``
                        "npm i"
                        ``
                        `

## Usage

After clone make a copy of .env.sample, and fill in your environement variables.

## License

This project is licensed under the MIT license.
  
## Contributing

Hit me up on slack - I have lots for your to do.

## Tests

To run tests, run the following command:

`
                        ``
                        "npm test"
                        ``
                        `

## Questions

If you have any questions about the repo, open an issue or contact [johnfyoung](undefined) directly at john@codeandcreative.com.



                    `;
                        fs.writeFile("README.md", repoNamesStr, function (err) {
                            if (err) {
                                throw err;
                            }

                            console.log(`README File created!`);

                        });
                    });
            });
        });
    });