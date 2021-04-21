# BukuWarung Assignment

#### Deployed Application API:

https://commerce-task.anantmathur.me/
or
http://18.224.165.248:8001/

#### Sample Requests Collection:

https://documenter.getpostman.com/view/7916291/TzJvcbbK
(Please use one of the above URL as the BASE_URl)

## About the Project

This repository contains code for a REST based JSON mock server to easily add, update, delete, sort, search, filter, and access data from a JSON file, made as a part of SDE internship assesment at Commerce IQ. The project is made using Node.js and Express.js with some dependencies.

## Project Setup

```javascript
1. Clone the repo
2. cd commerceIq-task
3. npm install
4. npm run dev
5. Open the project on localhost:8001
```

## Features of the Application

1. This application is a REST based JSON mock server to easily add, update, delete and access data from a JSON file.

2. Every data has a parent identifier (entity), and a primary key - "id".

3. A JSON file namely store.json is used as the database/base file for all the operations in the API.

4. The supported requests are - GET, POST, PUT, and DELETE.

5. Whenever any change is made to the data, it gets automatically saved to the JSON file.

6. The JSON file supports multiple (infinite) entity types. (Refer _API endpoints_ for more details)

7. The API also supports sorting (using a parameter and order), searching (using a query string) and filtering (using key value pair(s)) for a particular entity records.

8. Nested support for sorting and searching is also there.

9. store.json can be an empty file or prepopulated.

10. "id" has to be present in every document (every entity has "id" as primary key) and it cannot be mutated in any case.

11. morgan is used as a logger in the application. All the logs are stored in ./history.log with information about the request and response.

12. The API is developed using all the REST standards. The code is nicely structured, modular and hence scaleable.

13. All the functions/routes have detailed comments describing them with the input paramers, return types and the description.

## API endpoints

1. GET /api/:entity - Fetch all the records of a particular entity (see point 6-9 for searching, filtering and sorting whose code is implemented in this route only).

2. GET /api/:entity/:id - Fetch a particular record of a particular entity.

3. POST /api/:entity - Create a new record for a particular entity. In case the entity does not exist right now, create a new array in the file.

4. PUT /api/:entity/:id - Update a
   particular record of a partcular entity. The "id" cannot the mutated.

5. DELETE /api/:entity/:id - Delete a particular record of a particular entity.

6. GET /api/:entity?\_sort=parameter&\_order=order - Fetch the sorted records of an entity. The parameter should be a valid key. The order can be "asc" (by default) or "desc"

7. GET /api/:entity?key1=value1&key2=value2 - Fetch the filtered records of an entity. The keys in the parameters should be valid. There can be infinite parameters.

8. GET /api/:entity?q=string - Fetch the records of an entity by searching. We look for the objects that have the query string as any of the values. We currently support only 1 parameter. Numbers are also treated as strings for this functionality.

9. GET /api/:entity?\_sort=parameter&\_order=order&q=string - Fetch the records of an entity by searching and sorting. First look for the objects that have the query string as any of the values. Then sort them according to the parameter and the order (asc or desc).

## Technology Stack

- Node.js v14.15.4
- Express.js v4.17.1

#### Dependencies

- body-parser: To get data in JSON format

- cors: To enable cross origin resource sharing

- express: Nodejs framework for building web APIs

- morgan: To keep a track of app logs

- nodemon: Dev dependency to auto-restart the server if any changes are made in the project
