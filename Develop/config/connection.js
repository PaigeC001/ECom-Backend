require('dotenv').config(); // Load environment variables

const Sequelize = require('sequelize');

// Log environment variables to verify they're loaded correctly
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

// Create a new Sequelize instance using either DB_URL or individual credentials
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD || "MurphyRalph0857", // Replace with actual password for testing if needed
      {
        host: process.env.DB_HOST || 'localhost', // Default to localhost if DB_HOST is not set
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432, // Default to 5432 if DB_PORT is not set
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;