import { Router } from "express";
import { Connection } from "./db";
const router = new Router();
router.get("/", (_, res, next) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, world!" });
  });
});

function validUser(user) {
const validUser = typeof user.email == "string" && user.email.trim() != "";

const validPassword = typeof user.password == "string == " && user.passsword.trim() !="";
return validUser && validPassword;

}

router.post("/login", (req, res, next) => {
  if (validUser(req.body)) {
    Connection.query("SELECT * FROM students where students.email like '%?'", (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
      res.json({
        message: "Is this working??"
      })
    });
  
  } else {
next(new Error ("Invalid User"))

  }
  });


router.get("/students", (_, res, next) => {
  console.log("Hi");
  Connection.query("SELECT * FROM students", (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get("/students", (req, res, next) => {
  const cityName = req.query.city;
  Connection.query(
    "SELECT * FROM students WHERE lower(city) = $1 ",

    (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result.rows);
    }
  );
});
router.get("/students/:id", (_, res, next) => {
  let studentId = Number(_.params.id);
  console.log("Hi");
  Connection.query(
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
  Connection.query(query, [studentId], (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows[0]);
  });
});

router.get("/students/:city/:cohort", (_, res, next) => {
  const cityName = _.params.city;
  const cohortName = _.params.cohort;
  const query =
    "SELECT * FROM students WHERE lower(city) LIKE $1 || '%' and lower(cohort) LIKE $2 || '%'";
  Connection.query(query, [cityName, cohortName], (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
});

export default router;
