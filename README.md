# E-commerce Backend

# Description

This project is a backend system for an e-commerce website, built using Node.js, Express.js, Sequelize, and PostgreSQL. It provides a RESTful API for managing products, categories, and tags in an e-commerce store. The project is designed to allow an internet retail company to effectively manage product data and inventory.

# Installtion

- Clone the repository
  - git clone https://github.com/your-username/ECom-Backend.git

- Navigate to the project directory
  - cd ECom-Backend/Develop

 - Install the dependencies
   - npm install
  
- Create a .env file in the Develop folder with the following environment variables
  - DB_NAME=ecommerce_db
  - DB_USER=your_postgres_username
  - DB_PASSWORD=your_postgres_password
  - DB_HOST=localhost
  - DB_PORT=5432

- Create the database in PostgreSQL using the db/schema.sql file

- Seed the database with sample data (optional)
  - npm run seed
 
# Usage

- Start the server
  - npm start

- The API will be running on http://localhost:3001. Use a tool like Insomnia or Postman to test the routes

# Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- dotenv
