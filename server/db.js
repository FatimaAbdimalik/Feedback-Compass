const { Pool } = require("pg");

let pool;
let config;

if (process.env.DATABASE_URL) {
  //it's set in Heroku
  const connectionString = process.env.DATABASE_URL;
  config = {
    connectionString: connectionString,
    sslmode: require,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  //default local config
  config = {
    host: "localhost",
    database: "compass",
<<<<<<< HEAD
    password: "12133405",
=======
    password: "*********",
>>>>>>> 3c5c3df5b96641dcd1a6603e3503deabc178a5c7
    port: 5432,
  };
}
pool = new Pool(config);

exports.Connection = pool;
