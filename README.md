# eshop-api
Welcome to the eshop-api repository! This is a Node.js, Express, Typescript, and MongoDB with Mongoose based API for an e-commerce web application.

## Cloning the repository
To clone the repository, please run the following command in your terminal:

`git clone git@github.com:placideirandora/eshop-api.git`


## Installing the dependencies
After cloning the repository, navigate to the project directory and install the dependencies by running the following command:

`npm install`

## Starting the server
To start the server, you need to first build the project using the following command:

`npm start`

## Database configuration
Please make sure you have MongoDB installed and running on your system. You will also need to set up the required environment variables by creating a .env file based on the .env.example file.

## Endpoints
Here are the endpoints available in the API:

### Registration
To create a new user, make a POST request to the following endpoint:

`/api/v1/auth/signup`

Please provide the following details in the request body:

- firstName: first name of the user
- lastName: last name of the user
- email: email address of the user
- password: password for the user
- accountType: account type of the user between client and seller


### Login
To log in to the API, make a POST request to the following endpoint:

`/api/v1/auth/signin`

Please provide the following details in the request body:

- email: email address of the user
- password: password for the user

After a successful login, you will receive a bearer token. Please include this token in the Authorization header of all subsequent requests.

### Create a product
To create a new product, make a POST request to the following endpoint:

`/api/v1/product/add`

Please provide the following details in the request body:

- name: name of the product
- shortDescription: short description of the product
- price: price of the product
- category: category of the product
- image: image of the product
- manufacturingDate: manufacturing date of the product
- seller: seller mongodb object id of the owner of the product


Please include the bearer token in the Authorization header of the request.

### Retrieve all products
To retrieve all products, make a GET request to the following endpoint:

`/api/v1/product`

Please include the bearer token in the Authorization header of the request.

## Conclusion
That's it! You now have a fully functional API for a simple e-commerce web application built with Node.js, Express, Typescript, and MongoDB with Mongoose. Happy coding!