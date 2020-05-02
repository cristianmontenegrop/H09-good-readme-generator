var inquirer = require("inquirer");
var fs = require('fs');
var axios = require('axios');

// User Questions
// inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "What is your GitHub user name?",
//       name: "username"
//     },
//     {
//       type: "password",
//       message: "What is your password?",
//       name: "password"
//     },
//     {
//       type: "password",
//       message: "Re-enter password to confirm:",
//       name: "confirm"
//     }
//   ])
//   .then(function(response) {

//     if (response.confirm === response.password) {
//       console.log("Success!");
//     }
//     else {
//       console.log("You forgot your password already?!");
//     }
//   });


// Axios call to Github
inquirer
    .prompt({
        message: "Enter your GitHub username:",
        name: "username"
    })
    .then(function ({
        username
    }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function (res) {
            console.log(res.data)
            // const repoNames = res.data.map(function (repo) {
            // return repo.name;
            // return repo;
            // });

            // const repoNamesStr = repoNames.join("\n");

            // fs.writeFile("repos.txt", repoNamesStr, function (err) {
            //     if (err) {
            //         throw err;
            //     }

            //     console.log(`Saved ${repoNames.length} repos`);
            // });
        });
    });







// Write file Piece
// ]).then(function(data) {

//     var filename = data.name.toLowerCase().split(' ').join('') + ".json";

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

//       if (err) {
//         return console.log(err);
//       }

//       console.log("Success!");

//     });
//   });