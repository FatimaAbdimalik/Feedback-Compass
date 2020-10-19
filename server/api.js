import { Router } from "express";
import { Connection } from "./db";
const router = new Router();
router.get("/", (_, res, next) => {
  Connection.connect((err) => {
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

router.get("/students/:id", (_, res, next) => {
  let studentId = Number(_.params.id);

  Connection.query(
    "SELECT * FROM users WHERE id = $1 and user_type = 'student'",
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
  let cityId;

  if (cityName) {
    Connection.query(
      "SELECT id FROM cities WHERE cities_name = $1",
      [cityName],
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          cityId = result.rows[0].id;
          Connection.query(
            "SELECT * FROM users WHERE city_id = $1 AND user_type ='student'",
            [cityId],
            (err, result) => {
              if (err) {
                res.status(500).json(err);
              } else {
                res.status(200).json(result.rows);
              }
            }
          );
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

  // if (cityName && cohortName == undefined) {
  //   Connection.query(
  //     "SELECT * FROM users WHERE lower(city) LIKE $1 || '%' and user_type = 'student'",
  //     [cityName],
  //     (err, result) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.status(200).json(result.rows);
  //     }
  //   );
  // } else if (cityName) {
  //   if (cohortName) {
  //     Connection.query(
  //       "SELECT * FROM users WHERE lower(city) LIKE $1 || '%' and lower(cohort) LIKE $2 || '%' and user_type = 'student'",
  //       [cityName, cohortName],
  //       (err, result) => {
  //         if (err) {
  //           return next(err);
  //         }
  //         res.status(200).json(result.rows);
  //       }
  //     );
  //   }
  // } else {
  //   Connection.query(
  //     "SELECT * FROM users WHERE user_type = 'student'",
  //     (err, result) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.status(200).json(result);
  //     }
  //   );
  // }
});

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
