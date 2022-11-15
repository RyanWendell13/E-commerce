# E-Commerce Site
Simulation of an E-Commerce site. It features the ability to sign-up and login. products can then be added and removed from a cart. Each item also has a page that shows more details on the item.

## Demo
https://mern-e-commerce-site.herokuapp.com/


## Technology
### Frontend
React, Scss

### Backend: 
Node JS, Express, MongoDB

Data for products comes from https://dummyjson.com/

## Technical Information

### How To Run(Locally)
In the backend folder create a .env add the following.

    MONGO_URI = (MongoDB connection string)
    PORT = (Port number to run on)
    SESSION_SECRET = (Type a string of random letters)
    CORS_ORIGIN = (Set to frontend url)

run npm i for both the frontend and backend. then run npm start for both.