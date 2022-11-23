# E-Commerce Site
Simulation of an E-Commerce site. It features the ability to sign-up and login. products can then be added and removed from a cart. Each item also has a page that shows more details on the item.

## Demo
https://e-commerce-p0lh.onrender.com/

## Technology
### Frontend
- React
- Typescript
- Scss

### Backend
- Node JS
- Typescript
- Express
- MongoDB

Data for products comes from https://dummyjson.com/

## Technical Information
### How To Run(Locally)
In the backend folder create a .env file and add the following.

    MONGO_URI = (MongoDB connection string)
    PORT = (Port number to run on)
    SESSION_SECRET = (Type a string of random letters)
    CORS_ORIGIN = (Set to frontend url)

In the root directory run "npm run build", and then "npm start". 

## API
Method | Path | Purpose
---|---|---
get | /api/products | Get an array of producst
get | /api/cart | Gets a array of items that are in the cart
post | /api/additem | Adds item to cart or if it already exists increase quanitity
delete | /api/removeitem | Removes item from cart
get | /api/products/:id | Gets info for specific items
get | /api/cart/count/:id | Get the count of an item in cart
put | /api/cart/count/:id | Changes the quantity of an item in cart
get | /api/cart/count | Gets total count of items in cart
post | /user | Receives a user name and password and creates a new user
post | /user/authenication | Receives a user name and password authenicates user and returns user information
get | /user/profile | checks for current user and returns user information