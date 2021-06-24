# Taikai

Is an open job board API

This project is built with NodeJs(ES6), Express and a sprinkle of other supporting cases. see technologies section for more details.

## Setup

```bash
- git clone https://github.com/vic3king/taikai-project.git
- cd taikai-project && npm install
- create a .env file using details provided in the .env.example
- after that run npm run migrate and npm run seed
- npm run start:dev to launch development server and access endpoints e.g [localhost:3000/v1](http://127.0.0.1:3000)
```

Hosted api can be found here [click to view](https://taikai-project.herokuapp.com/)


## API Endpoints
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
    <tr>
      <td>POST</td>
      <td>/</td>
      <td>Welcome screen</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/v1/users/create/</td>
    <td>Creates a user and subscribes them for notifications</td>
  </tr>
   <tr>
    <td>POST</td>
    <td>/v1/users/toggle-subscription</td>
    <td>With the right parameters it subscribes and unsubscribes an existing user</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/v1/jobs</td>
    <td>Create a new job opening</td>
  </tr>
   <tr>
    <td>GET</td>
    <td>/v1/jobs</td>
    <td>Get all jobs(can return based on active params)</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/v1/jobs/search</td>
    <td>Search by a skill title, location address or job title. e.g ?filter=CSS</td>
  </tr>
   <tr>
    <td>PATCH</td>
    <td>/v1/jobs/:jobId</td>
    <td>Update properties of a job</td>
  </tr>
   <tr>
    <td>DELETE</td>
    <td>/v1/jobs/:jobId</td>
    <td>Deletes a job</td>
  </tr>
</table>

## Entity Relationship diagram

Schema Diagram can be found here [click to view](https://github.com/vic3king/taikai-project/blob/master/Screenshot%202021-06-24%20at%2011.27.22.png)

## Technologies

### Backend

- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Postgres](https://www.mongodb.com/) The World's Most Advanced Open Source Relational Database.
- [SequelizeOrm](https://mongoosejs.com/) Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- [Jest](https://jestjs.io/) Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Supertest](https://www.npmjs.com/package/supertest) SuperAgent driven library for testing HTTP servers
- [BullJs](https://optimalbits.github.io/bull/) The fastest, most reliable, Redis-based queue for Node. Carefully written for rock solid stability and atomicity.
#### Linter(s)

- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Prettier](https://prettier.io) Prettier is an opinionated code formatter with support for Javascript

### Style Guide

- [Airbnb](https://github.com/airbnb/javascript) - Airbnb maintains a very popular JavaScript Style Guide

#### Compiler

- [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Authors

- **Akaniru Victory** - _Initial work_ - [Vic3King](www.vic3king.io)
