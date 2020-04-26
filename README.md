# Doto
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![](https://github.com/se701g2/Doto/workflows/doto-CI/badge.svg?event=push) 
![](https://github.com/se701g2/Doto/workflows/doto-backend-deploy/badge.svg?event=push) 
![](https://github.com/se701g2/Doto/workflows/doto-frontend-deploy/badge.svg?event=push)

Welcome to Doto. The open-source software (OSS) project for a smart scheduling calendar app. Doto is an online calendar and to-do app. It has all of the basic functionality of any calendar app and can be used to make to-do lists. It also has smart scheduling capabilities, meaning that if the user wants to do a task, it can input it into our app and the app will allocate this task in a suitable time in the user’s calendar. Doto uses Google to sign up, meaning that to use this app, the user must have a google account. The development of Doto is done using the M.E.R.N (MongoDB, Express, React, Node) tech stack (more info about the tech stack can be found in the Wiki).

## Why is this project Useful?
This project is useful as it has the basic functionalities of any normal calendar app, but also has the added functionality of smart scheduling. This is particularly useful for people who like to plan their day but find it difficult to plan it well, as the app finds the most suitable time for whatever task the user wants to accomplish. It also encourages people who don’t usually like to plan their day to start planning their day as all they need to do is input the task and the app will choose the perfect time, no effort required. 


## Development Setup
It is recommended that you use **VsCode** when contributing to this project. Please install the **Eslint** and **Prettier** extensions so that the code style matches what has already been done before.

## Setting up the environment variables 

There are a number of application secrets and credentials which are needed before you begin development. These secrets will be given to you by the Repo maintainer when you start contributing. To set up these envrionment variables you will need to make a `.env` file sitting in the doto-backend folder. An example of this file can be found in the repository `.env.example` contains all the variables that will need to be set (just make a copy of the file and rename to `.env` then copy and paste all the secrets given by the repo maintainer)

The VAPID keys can be generated by running:
```
npx web-push generate-vapid-keys
```
Copy the public and private keys to the backend `.env` then copy the public key to the frontend `.env`.

## Running the code
We are using [lerna](https://lerna.js.org/) and [yarn](https://yarnpkg.com/) for this project.

### Installing dependencies
Run `yarn install --frozen-lockfile` in the project root.

### Starting the frontend and backend
To get the project running locally, run `yarn start` in the project root.

By default, the react-app is hosted on port 3000 and the local server is hosted on port 3001. Do not change these numbers as we have added the addresses as authorized redirect uri's in our google credentials.

Please check the front end [readme](https://github.com/se701g2/Doto/blob/master/doto-frontend/README.md) for more information on running the front end of the code.

### Link to the website 
[doto.azurewebsites.net](https://doto.azurewebsites.net)

### Link to the API
[doto-backend.azurewebsites.net](https://doto-backend.azurewebsites.net)

## Contributing to this Project
Please refer to our [wiki](https://github.com/se701g2/Doto/wiki) for an outline of our coding conventions and git workflow

## Meta
Se701 Group2 - Se701group2@gmail.com
Distributed under the MIT license. Check the [wiki](https://github.com/se701g2/Doto/wiki/license) for more details

## Where to Get More Help
If you have run into any issues, you can contact our lecturer Kelly Blincoe and she will be able to point you in the right direction. 

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

If you're a developer in the project and would like to add yourself here, please follow the instructions [here](https://github.com/se701g2/Doto/wiki/All-Contributors-Bot).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/KimberleyEvans-Parker"><img src="https://avatars2.githubusercontent.com/u/45865186?v=4" width="100px;" alt=""/><br /><sub><b>Kimberley</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=KimberleyEvans-Parker" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3AKimberleyEvans-Parker" title="Reviewed Pull Requests">👀</a> <a href="#design-KimberleyEvans-Parker" title="Design">🎨</a> <a href="#ideas-KimberleyEvans-Parker" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/AlexanderTheGrape"><img src="https://avatars0.githubusercontent.com/u/20546002?v=4" width="100px;" alt=""/><br /><sub><b>Alex Monk</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=AlexanderTheGrape" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/commits?author=AlexanderTheGrape" title="Tests">⚠️</a> <a href="https://github.com/se701g2/Doto/commits?author=AlexanderTheGrape" title="Documentation">📖</a></td>
    <td align="center"><a href="http://matteas.nz"><img src="https://avatars0.githubusercontent.com/u/45587386?v=4" width="100px;" alt=""/><br /><sub><b>Matt Eden</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=Matteas-Eden" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3AMatteas-Eden" title="Reviewed Pull Requests">👀</a> <a href="#design-Matteas-Eden" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=Matteas-Eden" title="Documentation">📖</a> <a href="https://github.com/se701g2/Doto/commits?author=Matteas-Eden" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://jordan.sim-smith.co.nz"><img src="https://avatars3.githubusercontent.com/u/18223858?v=4" width="100px;" alt=""/><br /><sub><b>Jordan Sim-Smith</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=jordansimsmith" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3Ajordansimsmith" title="Reviewed Pull Requests">👀</a> <a href="#design-jordansimsmith" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=jordansimsmith" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/qibao0722"><img src="https://avatars3.githubusercontent.com/u/53366211?v=4" width="100px;" alt=""/><br /><sub><b>Xiaoji Sun</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=qibao0722" title="Code">💻</a> <a href="#design-qibao0722" title="Design">🎨</a></td>
    <td align="center"><a href="http://PreetPatel.com"><img src="https://avatars1.githubusercontent.com/u/22407548?v=4" width="100px;" alt=""/><br /><sub><b>Preet Patel</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=PreetPatel" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3APreetPatel" title="Reviewed Pull Requests">👀</a> <a href="#design-PreetPatel" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=PreetPatel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/EricPedrido"><img src="https://avatars1.githubusercontent.com/u/43208889?v=4" width="100px;" alt=""/><br /><sub><b>Eric Pedrido</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=EricPedrido" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3AEricPedrido" title="Reviewed Pull Requests">👀</a> <a href="#design-EricPedrido" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=EricPedrido" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/harmanlamba"><img src="https://avatars1.githubusercontent.com/u/40023122?v=4" width="100px;" alt=""/><br /><sub><b>Harman Lamba</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=harmanlamba" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3Aharmanlamba" title="Reviewed Pull Requests">👀</a> <a href="#design-harmanlamba" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=harmanlamba" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/salma-s"><img src="https://avatars0.githubusercontent.com/u/43306586?v=4" width="100px;" alt=""/><br /><sub><b>salma-s</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=salma-s" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3Asalma-s" title="Reviewed Pull Requests">👀</a> <a href="#design-salma-s" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=salma-s" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Minus20Five"><img src="https://avatars3.githubusercontent.com/u/20623467?v=4" width="100px;" alt=""/><br /><sub><b>Tony Liu</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=Minus20Five" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3AMinus20Five" title="Reviewed Pull Requests">👀</a> <a href="#design-Minus20Five" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=Minus20Five" title="Documentation">📖</a> <a href="https://github.com/se701g2/Doto/commits?author=Minus20Five" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://harrisonleach1.github.io"><img src="https://avatars3.githubusercontent.com/u/44953072?v=4" width="100px;" alt=""/><br /><sub><b>Harrison Leach</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=HarrisonLeach1" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3AHarrisonLeach1" title="Reviewed Pull Requests">👀</a> <a href="#design-HarrisonLeach1" title="Design">🎨</a> <a href="https://github.com/se701g2/Doto/commits?author=HarrisonLeach1" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/DeshmukhChinmay"><img src="https://avatars3.githubusercontent.com/u/41243225?v=4" width="100px;" alt=""/><br /><sub><b>Chinmay Deshmukh</b></sub></a><br /><a href="https://github.com/se701g2/Doto/commits?author=DeshmukhChinmay" title="Code">💻</a> <a href="https://github.com/se701g2/Doto/pulls?q=is%3Apr+reviewed-by%3ADeshmukhChinmay" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/se701g2/Doto/commits?author=DeshmukhChinmay" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!