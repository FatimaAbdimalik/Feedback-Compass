import { Router } from "express";
import { connection } from "./db";
const router = new Router();
router.get("/", (_, res, next) => {
  connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Compass team!" });
  });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    connection.query(
      "select * from students where email = $1 and password = $2",
      [email, password],
      (err, result) => {
        if (result.rowCount > 0) {
          return res.status(200).send(result.rows[0]);
        } else {
          connection.query(
            "select * from mentors where email = $1 and password = $2",
            [email, password],
            (err, result2) => {
              if (result2.rowCount > 0) {
                return res.status(200).send(result2.rows[0]);
              } else {
                res.status(404).json({
                  msg:
                    "User not found, please enter a valid email and password!",
                });
              }
            }
          );
        }
      }
    );
  }
});

router.get("/students/:id", (_, res, next) => {
  let studentId = Number(_.params.id);

  connection.query(
    "SELECT * FROM students WHERE id = $1",
    [studentId],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result.rows[0]);
    }
  );
});

router.get("/feedback/:student_id", (_, res, next) => {
  const studentId = Number(_.params.student_id);
  const query =
    "SELECT sent_date, title, body, response FROM feedbacktable WHERE student_id= $1";
  connection.query(query, [studentId], (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows[0]);
  });
});

router.get("/students", (req, res, next) => {
  const cityName = req.query.city;
  const cohortName = req.query.cohort;
  if (cityName && cohortName == undefined) {
    connection.query(
      "SELECT * FROM students WHERE lower(city) LIKE $1 || '%'",
      [cityName],
      (err, result) => {
        if (err) {
          return next(err);
        }
        res.status(200).json(result.rows);
      }
    );
  } else if (cityName) {
    if (cohortName) {
      connection.query(
        "SELECT * FROM students WHERE lower(city) LIKE $1 || '%' and lower(cohort) LIKE $2 || '%'",
        [cityName, cohortName],
        (err, result) => {
          if (err) {
            return next(err);
          }
          res.status(200).json(result.rows);
        }
      );
    }
  } else {
    connection.query("SELECT * FROM students", (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(result);
    });
  }
});

export default router;
