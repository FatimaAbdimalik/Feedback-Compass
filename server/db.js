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
    password: "cyf2020",
>>>>>>> 6155f713f2874169fad12a3a5f5929c188bfc85e
    port: 5432,
  };
}
pool = new Pool(config);

exports.Connection = pool;
