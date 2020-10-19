import { Router } from "express";
import { Connection } from "./db";
const router = new Router();
router.get("/", (_, res, next) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Team" });
  });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    Connection.query(
      "select * from users where email = $1 and password = $2",
      [email, password],
      (err, result) => {
        if (result.rowCount > 0) {
          return res.status(200).send(result.rows[0]);
        }
      }
    );
  }
});

// edited after database recreation
router.get("/students/:id", (_, res, next) => {
  let studentId = Number(_.params.id);

  Connection.query(
    "SELECT * FROM users WHERE id = $1 and user_type = 'student'",
    [studentId],
    (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result.rows[0]);
    }
  );
});

router.get("/feedback/:student_id", (_, res, next) => {
  const studentId = Number(_.params.student_id);
  const query =
    "SELECT sent_date, title, body, response FROM feedbacktable WHERE student_id= $1";
  Connection.query(query, [studentId], (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows[0]);
  });
});

router.get("/students", (req, res, next) => {
  const cityName = req.query.city;
  const cohortName = req.query.cohort;
  const cityQuery =
    "SELECT u.name, u.surname, u.email, u.cohort_name FROM users u JOIN cities c ON (u.city_id = c.id) WHERE u.user_type = 'student' AND lower(c.cities_name) = $1";
  if (cohortName) {
    Connection.query(
      "SELECT * FROM users WHERE lower(cohort_name) = $1",
      [cohortName],
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result.rows);
        }
      }
    );
  } else if (cityName) {
    // const cityQuery =
    //   "SELECT u.name, u.surname, u.email, u.cohort_name FROM users u JOIN cities c ON (u.city_id = c.id) WHERE u.user_type = 'student' AND lower(c.cities_name) = $1";
    Connection.query(cityQuery, [cityName], (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(results.rows);
      }
    });
  } else if (cityName && cohortName) {
    Connection.query(
      "SELECT u.name, u.surname, u.email, u.cohort_name, c.cities_name FROM users u JOIN cities c ON (u.city_id = c.id) WHERE u.user_type = 'student' AND lower(c.cities_name)= $1 AND lower(u.cohort_name) = $2",
      [cityName, cohortName],
      (err, results) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  } else {
    Connection.query(
      "SELECT * FROM users WHERE user_type = 'student'",
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  }
});

/// new endpoint after database recreation
router.get("/cities", (req, res, nex) => {
  Connection.query("SELECT cities_name FROM cities", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});
export default router;
