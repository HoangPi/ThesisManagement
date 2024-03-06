# Thesis management
## Introduction
This is a MERN Stack web application for managing thesis between students and instructor
## Run the project
### Install the packages
Open terminal
  cd client
  npm install
Open a new terminal
  cd server
  npm install
### Run the project
First option: Using 2 terminal
The first one run
  cd client
  npm run dev
The second one run
  cd server
  npm run dev
Alternative option: Using concurrently
Install concurrently:
  npm install concurrently
Define installing script in package.json file
  "init": "concurrently \"cd server && npm install\" \"cd client && npm install\" ",
Define starting scripts in package.json file
  "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\" "
  
