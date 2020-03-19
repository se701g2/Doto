# Doto

![](https://github.com/se701g2/Doto/workflows/doto-CI/badge.svg?event=push) ![](https://github.com/se701g2/Doto/workflows/doto-backend-deploy/badge.svg?event=push) ![](https://github.com/se701g2/Doto/workflows/doto-frontend-deploy/badge.svg?event=push)

Welcome to Doto. The open-source software (OSS) project for a smart scheduling calendar app. Doto is an online calendar and to-do app. It has all of the basic functionality of any calendar app and can be used to make to-do lists. It also has smart scheduling capabilities, meaning that if the user wants to do a task, it can input it into our app and the app will allocate this task in a suitable time in the user’s calendar. Doto uses Google to sign up, meaning that to use this app, the user must have a google account. The development of Doto is done using the M.E.R.N (MongoDB, Express, React, Node) tech stack (more info about the tech stack can be found in the Wiki).

## Why is this project Useful?
This project is useful as it has the basic functionalities of any normal calendar app, but also has the added functionality of smart scheduling. This is particularly useful for people who like to plan their day but find it difficult to plan it well, as the app finds the most suitable time for whatever task the user wants to accomplish. It also encourages people who don’t usually like to plan their day to start planning their day as all they need to do is input the task and the app will choose the perfect time, no effort required. 


## Development Setup
It is recommended that you use **VsCode** when contributing to this project. Please install the **Eslint** and **Prettier** extensions so that the code style matches what has already been done before.

## Setting up the environment variables 

There are a number of application secrets and credentials which are needed before you begin development. These secrets will be given to you by the Repo maintainer when you start contributing. To set up these envrionment variables you will need to make a `.env` file sitting in the doto-backend folder. An example of this file can be found in the repository `.env.example` contains all the variables that will need to be set (just make a copy of the file and rename to `.env` then copy and paste all the secrets given by the repo maintainer)

## Running the code
We are using npm for this particular project (https://www.npmjs.com/get-npm).
### `cd doto-frontend/backend`
To get the project up and running locally, you will need to change directory to `doto-backend` and start up the local server, to do this simply run the following commands: 

### `npm install`

### `npm start`

Once your local backend server is up, in a separate terminal, change directory into `doto-backend` and once again run the same commands to run the react-app locally. By default, the react-app is hosted on port 3000 and the local server is hosted on port 3001. Do not change these numbers as we have added the addresses as authorized redirect uri's in our google credentials.

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


