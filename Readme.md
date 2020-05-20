# Zicli Shop

Web Application for Mock shop

This file consist of API hosted on Heroku.Its correspinding frontend file can be found at [Front-End](https://github.com/sadewole/Zicli-Synergy-Mock-Shop-Front-End-)

## Prerequisites

1. [Node js](https://nodejs.org/en/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)
5. Postgresql

## Installing

Clone this project using `git clone https://github.com/sadewole/zicli-synergy-mock-shop` on your bash or cmd

```shell
mkdir zicli-shop
cd zicli-shop
git clone https://github.com/sadewole/zicli-synergy-mock-shop
cd "zicli-synergy-mock-shop"
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
PORT=3000
PGHOST=localhost
PGPASSWORD=
PGDATABASE=mockshop
PGUSER=
PGPORT=7432
JWT_KEY=
```

## Features

1. user can create an account and log in
2. A user should be able to order for food
3. The admin should be able to add, edit, or delete product items
4. The admin should be able to see a list of products
5. User can see product in his/her cart
6. User can delete a product from his/her cart

## API Routes

### [API DOCUMENTATION]()

| HTTP verb | Routes                 | Description                                   |
| --------- | ---------------------- | --------------------------------------------- |
| POST      | /api/v1/auth/signup    | Register a user                               |
| POST      | /api/v1/auth/signin    | Login a user                                  |
| GET       | /api/v1/auth/secret    | Get a specific user by user token             |
| GET       | /api/v1/product        | Get all available product on the webpage      |
| GET       | /api/v1/product/:id    | Get one product by ID                         |
| POST      | /api/v1/product        | Post new product to productlist               |
| PUT       | /api/v1/product/:id    | Update product by id                          |
| DELETE    | /api/v1/product/:id    | Delete one product from the productlist by ID |
| GET       | /api/v1/order          | Get all ordered products                      |
| GET       | /api/v1/order/:id      | Get one order by ID                           |
| GET       | /api/v1/order/user/:id | Get all order of a specific user by ID        |
| POST      | /api/v1/order          | Post new order by user                        |
| PUT       | /api/v1/order/:id      | Update order status                           |
| DELETE    | /api/v1/order/:id      | Delete an order                           |
| GET       | /api/v1/user           | Get all registered user                       |
| GET       | /api/v1/user/:id       | Get user by ID                                |
| DELETE    | /api/v1/user/:id       | Delete user by ID                             |

## Contributing

If you'd like to Contribute, please fork the repository and create a new branch, commit to that branch and make a pull request

## Links

1. [API on Heroku](https://zicli-synergy.herokuapp.com/api/v1)
2. [Frontend on Netlify](https://zicli-mock-shop.netlify.com/)
3. [API on Swagger](https://app.swaggerhub.com/apis/PressGurd/Mock-shop/1.0#trial)

## Author

1. Samuel Adewole
