# Project Description

The main idea for this project is to make a simple website. This website will be a common puzzle generator, creator, and solver. The website will preliminarily hold a set amount of images that will be stored in a database, then randomized puzzle pieces will be made according to a selected difficulty level. The ultimate goal is to complete the puzzle. There will be a timer, auto-solver, and some other basic features that will be necessary for a bare-bones project. We intend to start simple, then if time allows, add complexity to the website.

- Motivation <br>
We wanted to do a project that would be relatively simple, but thoughtful; Worthy of a final project. We have various experiences with web development, ranging from some experience to no experience. We hope to learn some industry standard work ethics, as well as utilize our previous coding experiences. This was initially Isaiah’s idea because he was thinking to himself about how to improve the website that exists already (jigsaw explorer). His thoughts were to add multiplayer functionality, a chatroom, and upload custom images. These are pretty ambitious goals for a semester project, so we ultimately decided on a smaller-scale version. At the moment only single-player, with only necessary features.

- Problems <br>
Generally speaking, when people try to build a puzzle they very easily tend to lose focus during the process, or find it very tedious and difficult, so they end up getting bored and give up, ultimately never finishing the puzzle. With this website we aim to make building a puzzle a fun and rewarding experience. Moreover, if time permits, features like multiplayer and being able to turn an uploaded image/photo into a puzzle will make this more engaging and unique, prompting users to have more reasons and desire to use the website.
On techni

- Description <br>
In order to deliver the contents of this project, we will list the main functions of this web application. Then some technologies that we are going to use for implementing the application.
Application functions:
We focus on two types of users in this puzzle website. They are administrators and players. These application features will be listed below with specific roles and responsibilities for users:
Login/Register: only administrators need to login in order to update the puzzles. The extension features such as a store high score system, or recording the history can be the reason for players to login or register.
Play the puzzle: everyone can play a selected puzzle with some illustrations at the selection page. They can play by drag and drop the pieces from the panel, which are loaded from the server when they select the puzzle and wait. There are also shape validation for easier user interaction.
Update the puzzle: only administrators can update the puzzle, for example some common setting like name, time, and so forth.
Delete the puzzle: only administrators can delete the puzzle.
We also consider some advanced features such as:
Multiplayer: two or more can play the same puzzle at the same time.
History: store the puzzles that logged in players are completed with record time.
Leaderboard: this will be calculated by the history for competition.
Technologies: For the average strength of the teammates, we decided to choose the PERN technology (pcpiyush1106) for building a website. PERN is abbreviation for the database PostgreSQL, the server side framework ExpressJs, the client Single Page Application React framework, and the Nodejs runtime environment.
Database: Postgresql. We choose PostgreSQL because it is a free, open source, relational database with a friendly UI management system, which is pgAdmin.
Server side: ExpressJs. This framework provides a minimal and flexible Node.js web application framework. So that we can easily catch up.
Client side: ReactJs. ReactJs is a famous framework to build single page applications and we can use similar concepts on mobile using React native for the future.
Server runtime environment: Nodejs. Besides the reason as the most famous runtime environment for compiling and running expressJs framework, NodeJs provides lots of modules with package manager.

- References <br>
jigsaw explorer. Jigsaw Explorer – Online Jigsaw Puzzles, https://www.jigsawexplorer.com/. Accessed 10 October 2022.
pcpiyush1106. “What is PERN Stack?” GeeksforGeeks, 25 September 2020, https://www.geeksforgeeks.org/what-is-pern-stack/. Accessed 10 October 2022.