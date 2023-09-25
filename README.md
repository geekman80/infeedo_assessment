# Task Crafter (Made with ❤️ and some great efforts)

A task tracking application that allows you to manage and monitor your tasks. It provides CRUD APIs for task management and offers task metrics based on status and timeline.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Security of API](#security-of-api)
- [Starting the Application](#starting-the-application)
- [Unit Testing and Code Coverage](#unit-testing-and-code-coverage)
- [Naming Convention](#naming-conventions-and-formatting)
- [Future Scope](#future-scope)

## Features

- Create, Read, Update, and Delete tasks.
- Retrieve task metrics based on status and timeline.
- Pagination support for task retrieval.
- API authentication and authorization (customize as needed).
- Clean and well-organized codebase.

## Getting Started

### Prerequisites

- Node.js
- SQL Database (instance running)

### Installation

1. Clone this repository in any code editor (I have used Visual Code):

   git clone <https://github.com/geekman80/infeedo_assessment.git>
Branch: main

2. Navigate to the project directory: cd INFEEDO_ASSESSMENT
3. Installing the dependencies: npm i
4. cd src (src folder contains the code)
5. For the first time, we need to run our migration to sync up with the database: 
npx sequelize-cli db:migrate

Note ! Please modify config/config.json to set the credentials for your database.

## API Endpoints

The application provides the following API endpoints:

1. POST /api/tasks-> Create a new task.
2. PUT /api/tasks/:id-> Update an existing task by ID.
3. GET /api/tasks-> Retrieve a list of tasks with pagination support.
4. GET /api/tasks/:id-> Retrieve all details of a task with given ID.
5. GET /api/task-metrics: Retrieve task metrics based on status and timeline.
6. DELETE /api/tasks/:id: Delete a task by ID.

## Security of API

I have added a security layer to our APIs as well. If you want to invoke the api then you
have to pass 'x-api-key' in the header section with value of VALID_API_KEY (as seen in .env).

## Starting the Application

To run the application and make it live, please use below command: 
npm start

## Unit Testing and Code Coverage

Please verify the working of all testcases by running below command, you would also be able to find code coverage:
npm test

Please note that uncovered lines in the code coverage is due to the fact that in my application I have also used logic to handle unforseen circumstances that are very rare to occur (like DB connection failed)

Note: API Test Run screenshot have been added as well. Make sure you check that as well.

## API Run - Screenshot

Please navigate to src/screenshot to find all screenshots for api run and unit tests.

## Naming Conventions and Formatting

Variables are typically named in camelCase, and constants (e.g., environment variables) are often in uppercase with underscores.
To follow lint standards, I have use prettier extension

## Future Scope

We can add loggers to log and each and every event occured on our application.
We can also integrate notification service on our application.
