
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

router.get("/students", (_, res, next) => {
	console.log("Hi");
	Connection.query("SELECT * FROM students",(err,result) => {
		if (err) {
			return next(err);
		}
		res.json(result);
	});
});

router.get("/students/:id", (_, res, next) => {
	let studentId = Number(_.params.id);
	console.log("Hi");
	Connection.query("SELECT * FROM students WHERE id = $1", [studentId],(err,result) => {
		if (err) {
			return next(err);
		}
		res.json(result.rows[0]);
	});
});

export default router;
