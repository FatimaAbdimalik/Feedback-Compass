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

router.get("/feedback/:student_id",(_,res,next)=> {
	const studentId = Number(_.params.student_id);
	const query = "SELECT sent_date, title, body, response FROM feedbacktable WHERE student_id= $1";
	Connection.query(query,[studentId],(err,result)=>{
		if(err){
			return next(err);
		}
		res.json(result.rows[0]);
	});
});



router.get("/students",(req,res,next)=> {
	const cityName = (req.query.city);
	const cohortName = (req.query.cohort);
	if(cityName && cohortName == undefined){
		Connection.query("SELECT * FROM students WHERE lower(city) LIKE $1 || '%'",[cityName],(err,result)=>{
			if(err){
				return next(err);
			}
			res.status(200).json(result.rows);
		});

	}else if(cityName){

		if(cohortName) {
			Connection.query("SELECT * FROM students WHERE lower(city) LIKE $1 || '%' and lower(cohort) LIKE $2 || '%'",[cityName,cohortName],(err,result)=>{
				if(err){
					return next(err);
				}
				res.status(200).json(result.rows);
			});
		}


	}else{
		Connection.query("SELECT * FROM students",(err,result) => {
			if (err) {
				return next(err);
			}
			res.status(200).json(result);
		});

	}

});





export default router;
