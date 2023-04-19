INSERT INTO Department (department_name)
VALUES ('Programmer'),
('HR'),
('Art'),
('Production'),
('Audio'),
('Design')

INSERT INTO Role (title, salary, department_id)
VALUES('Gameplay Programmer', 80000, 1),
('Network Engineer', 80000, 1),
('Graphics Programmer', 100000, 1),
('HR Coordinator', 75000, 2),
('HR Generalist', 85000, 2),
('HR Director', 100000, 2),
('Jr. Concept Artist', 55000, 3),
('Sr. Concept Artist', 60000, 3),
('Environmental Artist', 60000, 3),
('Associate Producer', 75000, 4),
('Lead Director', 150000, 4),
('Junior Narrative Designer', 50000, 5),
('Associate Narrative Designer"', 65000, 5),
('Lead Narrative Designer', 70000, 5);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES
('Eloise', 'McDonald', 12, NULL),
('Anthony', 'Brady', 13, 1),
('Cheryl', 'Anderson', 14, 1),
('Patrick', 'Allen', 3, 2),
('Samantha', 'Brooks', 9, 2),
('Christopher', 'Haley', 11, 2),
('Amy', 'Cardenas', 6, 2),
('Tracey', 'Blair', 1, 4),
('Stephanie', 'Rivera', 1, 4),
('Stephanie', 'Rodriguez', 2, 4),
('Wayne', 'Cunningham', 4, 7),
('Julie', 'Richards', 5, 7),
('Erin', 'Montgomery', 5, 7),
('Kimberly', 'Lane', 7, 5),
('Benjamin', 'Hoffman', 8, 5),
('William', 'Miller', 10, 6),
('Daniel', 'Buchanon', 10, 6);
