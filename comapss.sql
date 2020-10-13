drop table if exists students;
drop table if exists mentors;
drop table if exists feedbacktable;


CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone_number INT,
  password VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  cohort VARCHAR(30) NOT NULL,
  biography VARCHAR(500),
  picture OID
);

CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(120) NOT NULL,
  password VARCHAR(120) NOT NULL,
  photo OID 
);


CREATE TABLE feedbacktable (
  id SERIAL PRIMARY KEY,
  mentor_id INT REFERENCES mentors(id),
  student_id INT REFERENCES students(id),
  sent_date DATE NOT NULL,
  title VARCHAR(120),
  body VARCHAR(300),
  response VARCHAR(500)
 );

 INSERT INTO students (name, surname, email, password, city, cohort) VALUES ('Hedyeh', 'Etemadi','hedyeh.etemadi@gmail.com', 'abcd','Manchester','north-west-class3');
 INSERT INTO students (name, surname, email, password, city, cohort,biography) VALUES ('Fatima', 'Abdimalik','f.abdimalik@gmail.com', '123','Manchester','north-west-class3', 'A tech enthusiast');
 INSERT INTO students (name, surname, email, password, city, cohort,biography) VALUES ('Sulaiman', 'Solo','sulaimansolo73505@gmail.com', '123','Manchester','north-west-class3', 'software trainee');




INSERT INTO mentors (name, email, password) VALUES ('Ahmad','ahmadshagel@gmail.com', 'efgh');


INSERT INTO FEEDBACKTABLE (mentor_id, student_id, sent_date, title, body, response) VALUES(1,4,'2020-10-13','HTML feedback','Well done, good effort', 'Thank you mentor');