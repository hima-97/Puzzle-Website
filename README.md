# Getting Started
## Prerequisites
```
    Run 'npm run swagger-autogen' to generate swagger for debugging
    'npm start' to start a server
```
## API
```
    Open browser at 'http://localhost:4002/health' for checking the status of the server
    Open browser at 'http://localhost:4002/web/api-docs/' to get access to the API documentation
```

# Project Description

This full-stack web application consists of a common puzzle generator, creator, and solver. <br>
The website holds a preliminary amount of images that are stored in a database. <br> 
Randomized puzzle pieces are made according to a selected difficulty level. <br>
The ultimate goal is to complete the puzzle.

# Software Stack

Fitness Guru is built using the MERN stack:

- MongoDB
- Express
- React
- Node.js

The application also uses Mongoose, a simple schema-based solution to model application data that makes it easier to work with MongoDB in Node.js.

For more details on the MERN stack implementation: <br>
https://github.com/hima-97/Puzzle-Website/blob/master/docs/MERN.md

# Functionality

- Login/Register:

The extension features like recording high score or history can be reasons for players to login or register. <br>
We focus on two types of users in this puzzle website, administrators and players. <br>
Only administrators need to login in order to update the puzzles.

- Play Puzzle:

Anyone can play a selected puzzle with some illustrations at the selection page. <br> 
Users can play by drag and drop the pieces from the panel, which are loaded from the server. <br>

- Update Puzzle:

Only administrators can update a puzzle. For example, some common settings are name, time, etc.

- Delete Puzzle:

Only administrators can delete a puzzle.

- Multiplayer:

Two or more players can play the same puzzle at the same time.

- Leaderboard:

Leaderboard position is calculated from the history.

# Installation and Deployment

To check out our most recent deployment of the app, visit the link here: <br>
`Insert Heroku deployment link here`

To install and deploy the app, follow the instructions here: <br>
https://github.com/hima-97/Puzzle-Website/blob/master/docs/DEPLOY.md