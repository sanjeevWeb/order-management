# Order-management Project

This project is a Node.js-based backend application built with Express.js and MongoDB. It is designed for an e-commerce or order management system with features for user authentication, order placement, vendor management, and analytics.

## Features

1. **Authentication**
   - Users can sign up and log in using the endpoints in `auth.route.js`.
   - Passwords are hashed using `bcryptjs`, and JWT tokens are issued for authentication.
   - Middleware like `authorization` ensures that only authenticated users can access protected routes.

2. **Roles and Permissions**
   - Users have roles (`admin`, `vendor`, `customer`) defined in the `user.model.js`.
   - The `authorizeRoles` middleware restricts access to specific routes based on roles.

3. **Order Management**
   - Customers can place orders, which are split into master orders and sub-orders, with sub-orders assigned to vendors.

4. **Vendor Management**
   - Vendors can manage their products (add, update, delete).

5. **Analytics**
   - Admins and vendors can access analytics data, such as revenue per vendor, top 5 products by sales, average order value, daily sales for the last 7 days, and low stock items.

6. **Database**
   - MongoDB is used as the database, connected via the `connectMongoDB` function in `database.js`.

## Project Structure


## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install

## API Documentation

### Authentication

Method	Endpoint	Description	Roles
**POST**	/api/signup	User signup	All

**POST**	/api/login	User login	All

### Order Management

Method	Endpoint	Description	Roles
**POST**	/api/order	Place an order	Customer

### Vendor Management

Method	Endpoint	Description	Roles
**POST**	/api/product	Add a product	Vendor

**PUT**	/api/product/:id	Update a product	Vendor

**DELETE**	/api/product/:id	Delete a product	Vendor

### Analytics
Method	Endpoint	Description	Roles
**GET**	/api/analytics/revenue/admin	Revenue per vendor (last 30 days)	Admin

**GET**	/api/analytics/product/admin	Top 5 products by sales	Admin

**GET**	/api/analytics/avg-order/admin	Average order value	Admin

**GET**	/api/analytics/daily-sales/vendor	Daily sales for the last 7 days	Vendor

**GET**	/api/analytics/low-stock/vendor	Low stock items for the vendor	

Vendor Models
### User Model (user.model.js)
Fields: username, email, password, role (admin, vendor, customer).

### Product Model (product.model.js)
Fields: name, price, stock, vendorId, category.

### Master Order Model (master-order.model.js)
Fields: customerId, items, totalAmount, subOrders.

### Sub Order Model (sub-order.model.js)
Fields: masterOrderId, vendorId, items, totalAmount.

## Middleware
### Authorization Middleware (auth.middleware.js)

Verifies JWT tokens and attaches the user to the request object.
Role Middleware (role.middleware.js)

Restricts access to routes based on user roles.
### Database Connection
MongoDB is connected using Mongoose in database.js.

### Error Handling
A global error-handling middleware is implemented to catch and respond to errors.

