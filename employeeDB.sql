-- Drop DB if one is there already
DROP DATABASE IF EXISTS employeeDB_db;
-- Create a new database 
CREATE DATABASE employeeDB_db;
-- Select the new database for use
USE employeeDB_db;
-- Create the tbale for departments
CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);
-- Create the table for roles
CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (id)
);
-- Create the table for employees
CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int NOT NULL,
    manager_if int,
    PRIMARY KEY (id)
)
