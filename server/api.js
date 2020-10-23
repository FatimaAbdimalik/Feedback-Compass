import { request, Router } from "express";
import { Connection } from "./db";
import { AuthorizationCode } from "simple-oauth2";

const router = new Router();
router.get("/", (_, res, next) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Team" });
  });
});

// login via github

//   if (email && password) {
//     Connection.query(
//       "select * from users where email = $1 and password = $2",
//       [email, password],
//       (err, result) => {
//         if (err) {
//           return res.status(404).json(err);
//         }
//         res.status(200).send(result.rows[0]);
//         console.log(result.rows);
//       }
//     );
//   }
// });

// router.get("/login/github/callback", (req, res) => {});

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
  const stuQuery =
    "SELECT sent_date, title, body, response FROM feedbacktable WHERE student_id= $1";
  Connection.query(stuQuery, [studentId], (err, result) => {
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
router.get("/cities", (req, res, next) => {
  Connection.query("SELECT cities_name FROM cities", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});


router.get("/cohorts", (req, res, next) => {
  Connection.query("SELECT cohort_name FROM cohorts", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// studnet edit/delete comment

router.put("/feedback/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const newResponse = req.body.response;
  const updateQuery =
    "UPDATE feedbacktable SET response = $2 WHERE student_id = $1";

  Connection.query(updateQuery, [studentId, newResponse], (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// student delete comment

router.delete("/feedback/:student_id", (req, res) => {
  const studentId = req.params.student_id;

  const deleteQuery = "DELETE FROM feedbacktable WHERE student_id = $1";
  Connection.query(deleteQuery, [studentId], (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// student updates profile

router.put("/students/:student_id", (req, res) => {
  const studentId = req.params.student_id;

  const editedName = req.body.name;
  const editedSurname = req.body.surname;
  const editedEmail = req.body.email;
  const eidtedProfileQuery =
    "UPDATE users SET name =$2, surname=$3, email =$4 WHERE student_id = $1";
  Connection.query(
    eidtedProfileQuery,
    [studentId, editedName, editedSurname, editedEmail],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
});

router.put("/students/comments/:mentor_is/:student_id", (req, res) => {
const studentId = req.params.student_id
const mentorId = req.params.mentor_id
  const newResponse = req.body.response;

  const eidtedProfileQuery =
    "UPDATE feedbacktable SET response =$1 WHERE student_id = $2 and mentor_id = $3 ";
  Connection.query(
    eidtedProfileQuery,
    [newResponse, studentId, mentorId],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
});

router.post("/feedback/:mentor_id/:student_id", (req, res) => {
  const mentorId = req.params.mentor_id;
  const studentId = req.params.student_id;
  const newTitle = req.body.title;
  const newBody = req.body.body;
  const sentDate = req.body.sent_date;

  const postQuery =
    "INSERT INTO feedbacktable (mentor_id,student_id,title, body, sent_date) " +
    "VALUES ($1,$2,$3,$4,$5)";

  Connection.query(
    postQuery,
    [mentorId, studentId, newTitle, newBody, sentDate],
    (err, result) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json({ message: "successful" });
      }
    }
  );
});

export default router;


