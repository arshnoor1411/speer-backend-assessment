# Speer Assignment

## Technologies/Frameworks Used

1. NodeJS --> Node.js is an open-source, server-side runtime environment built on the V8 JavaScript engine. It allows you to execute JavaScript code on the server, enabling the development of scalable and high-performance web applications.
2. TypeScript --> TypeScript is a superset of JavaScript that adds static typing and other features to the language. It is designed to make it easier to write and maintain large-scale applications by providing developers with tools for catching errors early in the development process.
3. NestJS --> NestJS is a framework for building efficient, scalable, and maintainable server-side applications with TypeScript. It is built on top of Node.js and heavily inspired by Angular, sharing many of its concepts and design patterns.
4. PostgreSQL --> PostgreSQL, often referred to as Postgres, is a powerful, open-source relational database management system (RDBMS). It is known for its extensibility, standards compliance, and robust features.
5. TypeORM --> It allows you to interact with databases using TypeScript classes and objects, making database operations more straightforward and maintaining a code-first approach.
6. Meilisearch --> Meilisearch is a powerful search engine that offers several advantages, including fast search capabilities, customisable ranking and filtering, easy integration, and scalability.
7. Sendgrid --> SendGrid is a cloud-based email service that provides a reliable and scalable solution for sending transactional and marketing emails. It is often used by developers to integrate email functionality into applications.

## Installation

To install the dependencies for this project, run the following command:

```bash
$ npm install
```

## Running the application

To start the application run the following command:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# test mode
$ npm run test
```

## Environment Variables

Environmental variables (env variables) are key-value pairs that are used to configure and customize the behavior of software applications. They are external to the application code and are set in the operating system or a container environment where the application runs.

Here's a brief description of each environment variable:

### Database

```
DATABASE_HOST= # The hostname of the database server
DATABASE_PORT= # The port number on which the database server is listening
DATABASE_NAME= # The username of the database user
DATABASE_USER= # The name of the database
DATABASE_PASSWORD=  # The password of the database user

SENDGRID_API_KEY= "Key for sending emails from sendgrid console"
```

### JWT

```
JWT_SECRET= # The private key used to sign JWTs
```

## Installation(Setup files)

Download and Install meilisearch from this website :-  
[https://www.meilisearch.com/docs/learn/getting_started/installation](https://www.meilisearch.com/docs/learn/getting_started/installation)

Run meilisearch by following command :-

```
./meilisearch
```

### Meilisearch

```
MEILISEARCH_HOST= # The host url of meilisearch server
MEILI_MASTER_KEY= # The secret key of meilisearch
```

Make sure to replace the placeholder values with your own values before starting the application.
