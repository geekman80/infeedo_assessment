# Task Crafter Application

A task tracking application that allows you to manage and monitor your tasks. It provides CRUD APIs for task management and offers task metrics based on status and timeline.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

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

2. Navigate to the project directory: cd INFEEDO_ASSESSMENT
3. Installing the dependencies: npm i

## API Endpoints

The application provides the following API endpoints:

POST /api/tasks-> Create a new task.
PUT /api/tasks/:id-> Update an existing task by ID.
GET /api/tasks-> Retrieve a list of tasks with pagination support.
GET /api/tasks/:id-> Retrieve all details of a task with given ID.
GET /api/task-metrics: Retrieve task metrics based on status and timeline.
DELETE /api/tasks/:id: Delete a task by ID.

## Starting the Application

To run the application and make it live, please use below command: 
npm start

## Testing 

Please verify the working of all testcases by running below command:
npm test

## Naming Conventions

Variables are typically named in camelCase, and constants (e.g., environment variables) are often in uppercase with underscores.
