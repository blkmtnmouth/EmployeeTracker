DROP DATABASE IF EXISTS empTracker;
CREATE database empTracker;

USE empTracker;

CREATE TABLE  department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)

); 

CREATE TABLE  role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10, 2), 
    department_id INT, 
    PRIMARY KEY (id)

); 

CREATE TABLE  employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)

); 

INSERT INTO department (name)
VALUES ("Math"), ("science"), ("history"), ("english");

INSERT INTO role (title, salary, department_id)
VALUES ("teacher", 40000.00, 1), ("student", 10000.00, 2), ("teacher", 20000.00, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 1), ("Jane", "Smith", 2, 2), ("Jim", "Doe", 3, 3);



