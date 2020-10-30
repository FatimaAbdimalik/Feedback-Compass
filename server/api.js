import { request, Router } from "express";
import { Connection } from "./db";
import { AuthorizationCode } from "simple-oauth2";

const router = new Router();
// router.get("/", (_, res, next) => {
//   Connection.connect((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.json({ message: "Hello, Team" });
//   });
// });

// login via github

const clientId = process.env.Github_Client_ID;
const clientSecret = process.env.Github_Client_Secret;

const callbackUrl = "http://localhost:3000/api/callback";

const client = new AuthorizationCode({
  client: {
    id: clientId,
    secret: clientSecret,
  },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
});

// Authorization uri definition
const authorizationUri = client.authorizeURL({
  redirect_uri: callbackUrl,
  scope: "user:email",
  state: "3(#0/!~",
});

// Initial page redirecting to Github
router.get("/auth", (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const options = {
    code,
  };

  try {
    const accessToken = await client.getToken(options);

    console.log("The resulting token: ", accessToken.token);

    return res.status(200).json(accessToken.token);
  } catch (error) {
    console.error("Access Token Error", error.message);
    return res.status(500).json("Authentication failed");
  }
});

router.get("/", (req, res) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.send('Hello<br><a href="/api/auth">Log in with Github</a>');
  });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    Connection.query(
      "select * from users where email = $1 and password = $2 ",
      [email, password],
      (err, result) => {
        if (result.rowCount > 0) {
          return res.status(200).send(result.rows[0]);
        } else {
          res.status(500).json(err);
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

router.get("/feedback", (req, res, next) => {
  const studentId = Number(req.query.student_id);
  console.log(studentId);
  const title = req.query.title;
  console.log(title);
  const stuQuery =
    "SELECT sent_date, title, body, response FROM feedbacktable WHERE student_id= $1 and title = $2";
  Connection.query(stuQuery, [studentId, title], (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
});

router.post("/feedback", (req, res) => {
  const mentorId = req.body.mentor_id;
  const studentId = req.body.student_id;
  const newTitle = req.body.title;
  const newBody = req.body.body;
  const sentDate = req.body.sent_date.postDate;

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

router.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const editedName = req.body.name;
  const editedSurname = req.body.surname;
  const editedBio = req.body.biography;
  const eidtedProfileQuery =
    "UPDATE users SET name =$2, surname=$3, biography =$4 WHERE id = $1 RETURNING * ";
  Connection.query(
    eidtedProfileQuery,
    [studentId, editedName, editedSurname, editedBio],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(results.rows);
        res.status(200).json(results.rows[0]);
      }
    }
  );
});

router.put("/feedback/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const newResponse = req.body.response;

  const putQuery =
    "UPDATE feedbacktable SET response = $2 WHERE student_id = $1";

  Connection.query(putQuery, [studentId, newResponse], (err, result) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json({ message: "successful" });
    }
  });
});

router.get("/syllabus/lessons", (req, res) => {
  const getQuery = "SELECT description FROM lessons";
  Connection.query(getQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result.rows);
    }
  });
});

router.put("/syllabus", (req, res) => {
  const studentId = req.query.student_id;
  const syllabusId = req.body.syllabus_id;
  const completed = req.body.completed;

  const updateTickBox =
    "UPDATE progress SET completed = $3 WHERE syllabus_id = $2 and student_id = $1";

  Connection.query(
    updateTickBox,
    [studentId, syllabusId, completed],
    (err, result) => {
      if (err) {
        res.json();
      } else {
        res.json(result.rows);
      }
    }
  );
});

router.get("/syllabus", (req, res) => {
  const studentId = req.query.student_id;
  const getQuery =
    "SELECT s.modules, s.start_date, p.completed,p.syllabus_id FROM syllabus s JOIN progress p ON(s.id = p.syllabus_id) WHERE p.student_id = $1";
  Connection.query(getQuery, [studentId], (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result.rows);
  });
});

router.get("/get-syllabus", (req, res) => {
  const getAllModules = "select modules from syllabus";

  Connection.query(getAllModules, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result.rows);
  });
});

router.get("/get-submissions/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const getAllSubmissions =
    "select id, submission_date, title, body, submission from feedbacktable  where student_id = $1";
  // "select u.name,u.surname , f.id, f.submission_date, f.title, f.body, f.submission from users u join feedbacktable f on (u.id = f.student_id) where student_id= $1";

  Connection.query(getAllSubmissions, [studentId], (err, result) => {
    if (err) {
      res.json(err);
    }
    res.json(result.rows);
  });
});

router.post("/submission", (req, res) => {
  const studentId = Number(req.body.student_id);
  const newTitle = req.body.title;
  const newSubmission = req.body.submission;
  const sentDate = req.body.submission_date;
  const postQuery =
    "INSERT INTO feedbacktable (student_id, title, submission, submission_date)" +
    "VALUES ($1,$2,$3,$4) returning *";
  Connection.query(
    postQuery,
    [studentId, newTitle, newSubmission, sentDate],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ message: "successful" });
      }
    }
  );
});

router.put("/feedback", (req, res) => {
  const mentorId = req.body.mentor_id;
  const newBody = req.body.body;
  const newDate = req.body.feedback_date;
  const feedbackId = req.body.id;

  const putQuery =
    " update feedbacktable set mentor_id= $1, body = CONCAT(body, $2::text) , feedback_date=$3 where  id = $4";

  Connection.query(
    putQuery,
    [mentorId, newBody, newDate, feedbackId],
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
