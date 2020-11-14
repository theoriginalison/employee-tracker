INSERT INTO department (department_name) values ('Sales');
INSERT INTO department (department_name) values ('Engineering');
INSERT INTO department (department_name) values ('Finance');
INSERT INTO department (department_name) values ('Legal');

INSERT INTO roles (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO roles (title, salary, department_id) values ('Salesperson', 80000, 1);
INSERT INTO roles (title, salary, department_id) values ('Lead Engineer', 150000, 2);
INSERT INTO roles (title, salary, department_id) values ('Software Engineer', 120000, 2);
INSERT INTO roles (title, salary, department_id) values ('Legal Team Lead', 250000, 4);
INSERT INTO roles (title, salary, department_id) values ('Lawyer', 190000, 4);
INSERT INTO roles (title, salary, department_id) values ('Accountant', 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Meguel', 'Chavez', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Alice', 'Elle', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('');
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('');
