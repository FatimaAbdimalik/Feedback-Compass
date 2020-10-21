drop table if exists feedbacktable CASCADE;
drop table if exists students CASCADE;
drop table if exists mentors CASCADE;
drop table if exists users CASCADE;
drop table if exists cohorts CASCADE;
drop table if exists courses CASCADE;
drop table if exists cities CASCADE;

CREATE TABLE cities  (
id SERIAL PRIMARY KEY,
cities_name VARCHAR(100),
address VARCHAR(500)
);

CREATE TABLE courses  (
id SERIAL PRIMARY KEY,
course_name VARCHAR(300)
);


CREATE TABLE cohorts (
cohort_name VARCHAR(300) PRIMARY KEY,
start_date DATE,
end_date DATE, 
course_id INT REFERENCES courses(id)
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_type VARCHAR(100) NOT NULL,
  name VARCHAR(30) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone_number VARCHAR(150),
  password VARCHAR(30) NOT NULL,
  city_id INT REFERENCES cities(id),
  cohort_name VARCHAR(300) REFERENCES cohorts(cohort_name),
  biography VARCHAR(500),
  picture OID
);



CREATE TABLE feedbacktable (
  id SERIAL PRIMARY KEY,
  mentor_id INT REFERENCES users(id),
  student_id INT REFERENCES users(id),
  sent_date DATE NOT NULL,
  title VARCHAR(120),
  body VARCHAR(300),
  response VARCHAR(500)
 );

 
INSERT INTO cities (cities_name) VALUES('North-West'),('Glasgow'),('West-Midlands'),('Rome'),('Cape Town'),('Medellin');

INSERT INTO courses (course_name) VALUES ('Full Stack'),('Intro to Coding');

INSERT INTO cohorts VALUES('north-west-class3', '2020-02-01', '2020-11-30',1),('north-west-class2','2019-02-01','2019-11-30',1);
INSERT INTO cohorts (cohort_name,start_date,end_date,course_id) VALUES ('north-west-class1','2018-02-01','2017-11-30', 1),('london-class6','2019-11-01','2020-10-01',1),('london-class5','2018-11-01','2019-10-01',1),('london-class4','2017-11-01','2018-10-01',1),('scotland-class-4','2020-03-01','2020-12-31',1),('scotland-class-3','2019-03-01','2019-12-01',1),('scotland-class-2','2018-03-01','2018-12-01',1),('scotland-class-1','2017-03-01','2017-12-31',1),('west-midlands-class4','2020-01-31','2020-10-30',1),('west-midlands-class3','2019-01-31','2019-10-30',1),('west-midlands-class2','2018-01-31','2018-10-30',1),('medellin-class1','2020-02-01','2020-11-30',1),('rome-class1','2020-03-01','2020-12-01',1),('capetown-class1','2021-01-31','2021-10-31',1);

INSERT INTO users (user_type,name, surname,email, password,city_id,cohort_name) VALUES('student', 'Fatima', 'Abdimalik','f@gmail.com','123456789',2,'north-west-class3');

INSERT INTO users (user_type,name, surname,email, password,city_id)VALUES('mentor', 'Ahmad', 'Al','ahmed@gmail.com','123456789',2);
INSERT INTO users (user_type,name, surname,email,password,city_id,cohort_name) VALUES ('student', 'Hedyeh','Etemadi','hedyeh.etemadi@gmail.com', '123456789',2,'north-west-class3');
INSERT INTO users (user_type,name, surname,email,password,city_id,cohort_name) VALUES ('student', 'Sulaiman','Solo','sulaimansolo73505@gmail.com', '123456789',2,'north-west-class3'),('student','Leida', 'Gandy', 'leidagandy@hotmail.com','123456789',2,'north-west-class3');
INSERT INTO users (user_type,name, surname,email,password,city_id) VALUES ('mentor', 'Ahmad','Mire','afmire877@gmail.com', '123456789',1),('mentor','Alec', 'A', 'alec@epicb.co.uk','123456789',1);
INSERT INTO users (user_type,name, surname,email,password,city_id,cohort_name) VALUES ('student', 'Layla','Jones','l@gmail.com', '123456789',1,'london-class6'),('student','Noor', 'Saleem', 'noor@gmail.com','123456789',1,'london-class6'),('student','Shahad','Fahad', 'shahad@hotmail.com','123456789',1,'london-class5'),('student','Sameer','Jama','smaeer@gmail.com','123456789',1,'london-class5'),('student','Hani', 'James', 'james@gmail.com','123456789',1,'london-class5'),('student', 'Ali', 'Shaheen', 'ali@gmail.com', '123456789', 1, 'london-class4'),('student', 'Sara', 'Josh','sara@gmail.com','123456789',1,'london-class4'),('student', 'Sara', 'Jones', 'jones@gmail.com','123456789', 1, 'london-class4'),('student','Sahal', 'Rasheed', 'rasheed@gmail.com','123456789',3,'scotland-class-4'),('student','Khadar', 'Hassan', 'khadar@gmail.com', '123456789',3, 'scotland-class-4'),('student', 'Ibrahim', 'Saalah','ibrahim@gmail.com', '123456789', 3, 'scotland-class-3'),('student', 'Sally', 'James', 'sally@hotmail.com','123456789',3,'scotland-class-3'),('student', 'Fakher', 'Noor', 'fakher@gmail.com', '123456789',3, 'scotland-class-3'), ('student', 'Ned', 'Duncun', 'ned@gmail.com', '123456789',3,'scotland-class-1'),('student', 'Hussien', 'Kamal', 'kamal@gmail.com','123456789', 3,'scotland-class-2'), ('student', 'Rahma', 'Fathi', 'rahma@gmail.com','123456789', 4, 'west-midlands-class4'),('student','David', 'Hewit', 'hewit@gmail.com','12345',4, 'west-midlands-class4'),('student', 'Henarry', 'Camron', 'henarry@gmail.com','123456789',4,'west-midlands-class4'), ('student', 'Rob', 'Obama', 'obama@gmail.com', '12345', 4, 'west-midlands-class3'), ('student','Sharron','Williams', 'sharron@gmail.com','12345', 4, 'west-midlands-class2'), ('student', 'Nahla', 'Saeed', 'nahla@gmail.com', '12345', 7, 'medellin-class1'),('student', 'Hamad', 'Kareem', 'hamad@gmail.com', '123', 7, 'medellin-class1'), ('student', 'Abrar', 'Nikk', 'abrar@gmail.com', '123', 6, 'rome-class1'), ('student', 'Ahamd', 'Raami', 'rami@gmail.com', '123', 5, 'capetown-class1');




INSERT INTO feedbacktable (mentor_id,student_id,sent_date,title, body, response) VALUES (3,2,'2020-10-18','test title', 'test body', 'test response');
INSERT INTO feedbacktable (mentor_id,student_id,sent_date,title,body,response) VALUES (7,6, '2020-10-19','good work', 'Ckecked your work, excellent work','Thank you mentor');
INSERT INTO feedbacktable (mentor_id,student_id,sent_date,title,body,response) VALUES (8,5, current_date,'Review your classwork', 'Please review your class work to improve your understanding ','Will do');
INSERT INTO feedbacktable (mentor_id, student_id,sent_date, title, body, response) VALUES (7,67, current_date,'new title','new body', 'new response');