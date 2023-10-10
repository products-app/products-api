<div align="center">
  <a href="https://github.com/products-app/products-fe">
    <img src="https://github.com/products-app/products-fe/assets/13439423/9f90454c-c622-4a20-8c3a-c739cd9a7f1b" width="100" /> 
  </a>

  <h3 align="center">Prompt - Shopping Cart (Backend API)</h3>

  <p align="center">
    This project is related to the <strong>backend api</strong>.
    <br />
    <i>This is a project I'm building as a test, but it's also intended to create a basis for building how a real, scalable application would work.</i>
    <br />
    <a href="https://github.com/products-app/products-fe"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-app">Running the app</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

The project consists of 3 sub-projects: design system, api and front-end.<br />
This project is the back-end responsible for containing the business rules, handles the database and various other functionalities.<br />

Features:

- Provide API;
- Products CRUD;
- DB Migrations.

_New features will be added soon._


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

#### Enviroment Variables

Change the `.env.sample` to `.env` and run the app.

Note that you need to have mysql server running on your machine.

#### NPM

```sh
npm install npm@latest -g
```

### Installation

1 - Clone the repo
```sh
git clone git@github.com:products-app/products-api.git
```
Enter the project folder
```sh
cd products-api
```

2 - Install packages
```sh
npm install
```

### Running the app

Running this app is simple, just follow the commands below:

Build the application:

```
npm run build
```

Run the application in the local environment:

```
npm run dev
```

### Migrations with Prisma

Whenever you update your Prisma schema, it is necessary to create a migration with the command below:
```
prisma migrate dev
```

Then to update the database, run the command:

```
prisma db push
```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Letícia Bernardo - [@letisgobabe](https://twitter.com/letisgobabe)
