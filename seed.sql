-- DUMMY TEST DATA ************************
USE employeeDB_db;

INSERT INTO department (name) VALUES ('Developer');
INSERT INTO department (name) VALUES ('Manager');
INSERT INTO department (name) VALUES ('Engineer');
INSERT INTO department (name) VALUES ('Intern');
INSERT INTO role (title, salary, department_id) VALUES ('HR Rep', 100000, 0);
INSERT INTO role (title, salary, department_id) VALUES ('Mechanical Engineer', 100000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('James', 'Hudgins', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Andrew', 'Raines', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Gabe', 'Perry', 3), null;
