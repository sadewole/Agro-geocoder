# ***

Web Application for Mock Market Location

This file consist of API hosted on Heroku.Its correspinding frontend file can be found at [Front-End](https://github.com/sadewole/Agro-coder-FE)

## Prerequisites

1. [Node js](https://nodejs.org/en/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)
5. Postgresql

## Installing

```shell
on your bash or cmd
git clone https://github.com/sadewole/Agro-coder-FE.git
cd "Agro-coder-FE
npm Install
git checkout master
npm start
```

Hurray!!! You now have the files on your local computer
`npm install` will install all app dependencies
`npm start` will start the project

make your environment variable `.env file`
Fill in this data for postgresql and Json web token to work

```
mongoURI
JWT_SECRET

CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY

GEOCODER_PROVIDER
GEOCODER_APIKEY
```

## Features

## API Routes

### [API DOCUMENTATION]()

| HTTP verb | Routes                 | Description                                   |
| --------- | ---------------------- | --------------------------------------------- |
| POST      | /api/v1/auth/signup    | Register a user                               |
| POST      | /api/v1/auth/signin    | Login a user                                  |
| GET       | /api/v1/auth/secret    | Get a specific user by user token             |
| GET       | /api/v1/market        | Get all available market on the webpage      |
| GET       | /api/v1/market/:id    | Get one market by ID                         |
| POST      | /api/v1/market        | Post new market to marketlist               |
| DELETE    | /api/v1/market/:id    | Delete one market from the marketlist by ID |
| GET       | /api/v1/user           | Get all registered user                       |
| GET       | /api/v1/user/:id       | Get user by ID                                |
| DELETE    | /api/v1/user/:id       | Delete user by ID                             |

## Contributing

If you'd like to Contribute, please fork the repository and create a new branch, commit to that branch and make a pull request

## Links

1. [API on Heroku](https://agro-mall-market.herokuapp.com/api/v1)

## Author

1. Samuel Adewole
