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

            inquirer
                .prompt([{
                    type: 'checkbox',
                    name: 'optSelection',
                    message: 'Which of these would you like to have in the readme?',
                    choices: [
                        'installation', 'usage', 'tests', 'contributing', 'questions',
                    ],
                }])
                .then((optionalsSelection) => {
                    console.log("optionalSelection: ", optionalsSelection);
                    // optionalsSelection = optionalsSelection.optSelection;
                    console.log("optionalSelection: ", optionalsSelection.optSelection);
                    const finalPrompts = [{
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
                        message: "What is your project's URL?",
                        name: "url"
                    }, {
                        type: "input",
                        message: "What is the project demonstartion's file path (*.gif preferably)?",
                        name: "demonstration"
                    }, {
                        type: "input",
                        message: "What is the description of the project?",
                        name: "description"
                    }, {
                        type: "input",
                        message: "What are the technologies used? (remember to add ',' between each technology",
                        name: "technologies"
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
                    }];
                    const selectedOptionals = optionalsSelection.optSelection.map((item) => {

                        if (item === 'installation') {
                            return {
                                type: "input",
                                message: "What's the installation instruction commands?",
                                name: "installation"
                            };
                        } else if (item === 'usage') {
                            return {
                                type: "input",
                                message: "What would the Usage Section say?",
                                name: "usage"
                            }
                        } else if (item === 'tests') {
                            return {
                                type: "input",
                                message: "Test instruction commands?",
                                name: "tests"
                            }
                        } else if (item === 'contributing') {
                            return {
                                type: "input",
                                message: "Any notes on the Contributing section?",
                                name: "contributing"
                            }
                        } else if (item === 'questions') {

                            return {
                                type: "input",
                                message: "Anything on the Questions section?",
                                name: "questions"
                            }
                        };
                    })
                    console.log("selectedOptionals is: ", selectedOptionals);
                    finalPrompts.splice(6, 0, ...selectedOptionals)
                    console.log("final prompts::", finalPrompts);
                    // Final questions for the user
                    inquirer
                        .prompt(finalPrompts)
                        .then((
                            renderInputs
                        ) => {
                            console.log("renderInputs is:", renderInputs);

                            // Creating a list for Technologies

                            var technologiesList = renderInputs.technologies.split(",");

                            technologiesList = technologiesList.map((item) => {
                                item = '<li>' + item + '</li>';
                                return item;
                            });

                            technologiesList = technologiesList.join('');
                            technologiesList = '<ul>' + technologiesList + '</ul>'

                            // Creating optional body section elements 
                            let installationRender, usageRender, testRender = '';

                            installationFunc = () => {
                                if (renderInputs.installation) {
                                    installationRender = "## Installation \n To install necessary dependencies, run the following command: '" + renderInputs.installation + "'";
                                    return;
                                };
                            };
                            usageFunc = () => {
                                if (renderInputs.usage) {
                                    usageRender = "## Usage \n " + renderInputs.usage + " "
                                    return
                                }
                            };
                            testFunc = () => {
                                if (renderInputs.tests) {
                                    testRender = "## Tests \n To run tests, run the following command: " + "'" + renderInputs.tests + "'"
                                    return;
                                }
                            };

                            installationFunc();
                            usageFunc();
                            testFunc();
                            // Building of the readme.md content
                            const repoNamesStr = `
                
# ${renderInputs.name}
[![GitHub license](https://img.shields.io/badge/license-${renderInputs.license}-blue.svg)](https://github.com/${username}/${renderInputs.repository})
[![GitHub license](https://img.shields.io/badge/license-${renderInputs.license}-green.svg)](${renderInputs.url})

## Table of Contents 

* [Demonstration](#Demonstration)

* [Description](#Description)

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Demonstration

[![Foo](${renderInputs.demonstration})](${renderInputs.url}) 

## Description

${renderInputs.description}

## Technologies

${technologiesList}

                    
${installationRender}                   

${usageRender}

${testRender}

${() => {
                                    if (renderInputs.contributing) {
                                        return "                            ## Contributing "

                                            + renderInputs.contributing + " "
                                    }
                                }}

${() => {
                                    if (renderInputs.questions) {
                                        return "                            ## Questions        "

                                            , renderInputs.questions
                                    }
                                }}

## License

This project is licensed under the ${renderInputs.license} license.


                    `;

                            fs.writeFile("./output/README.md", repoNamesStr, function (err) {
                                if (err) {
                                    throw err;
                                }

                                console.log(`README File created, enjoy!`);

                            });
                        });
                })



        });
    });




    // inquirer
    // .prompt([{
    //     type: "list",
    //     message: `Which of this repos is your project? `,
    //     name: "repository",
    //     choices: res.data.map(function (repo) {
    //         return repo.name;
    //     })
    // }, {
    //     type: "input",
    //     message: "What is your project title?",
    //     name: "name"
    // }, {
    //     type: "input",
    //     message: "What is your project's URL?",
    //     name: "url"
    // }, {
    //     type: "input",
    //     message: "What is the project demonstartion's file path (*.gif preferably)?",
    //     name: "demonstration"
    // }, {
    //     type: "input",
    //     message: "What is the description of the project?",
    //     name: "description"
    // }, {
    //     type: "input",
    //     message: "What are the technologies used? (remember to add ',' between each technology",
    //     name: "technologies"
    // }, {
    //     type: "input",
    //     message: "What's the installation instruction commands?",
    //     name: "installation"
    // }, {
    //     type: "input",
    //     message: "What would the Usage Section say?",
    //     name: "usage"
    // }, {
    //     type: "input",
    //     message: "Test instruction commands?",
    //     name: "tests"
    // }, {
    //     type: "input",
    //     message: "Any notes on the Contributing section?",
    //     name: "contributing"
    // }, {
    //     type: "input",
    //     message: "Anything on the Questions section?",
    //     name: "questions"
    // }, {
    //     type: "list",
    //     message: "What license would you prefer?",
    //     name: "license",
    //     choices: [
    //         "MIT",
    //         "Apache2.0",
    //         "ISC",
    //         "BSD",
    //         "GPLv3",
    //         "AGPLv3"
    //     ]
    // }]