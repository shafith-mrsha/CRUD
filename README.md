Overview
--------
This project is a simple CRUD (Create, Read, Update, Delete) application built to demonstrate the fundamentals of backend and frontend integration using Node.js, Express, and React.

The backend provides RESTful APIs to manage a list of people stored in a JSON file, and the frontend is a React-based dashboard that consumes these APIs and visually demonstrates CRUD operations. Each UI action is explicitly mapped to its corresponding HTTP method for learning purposes.

This project was developed as part of an internship task to understand basic full-stack development and API interaction.


Tech Stack
----------
Backend:
- Node.js
- Express.js
- JSON file as a lightweight database
- CORS for cross-origin requests

Frontend:
- React (Vite)
- JavaScript
- Inline styling with a dark theme dashboard

Tools:
- Postman (API testing)
- Git and GitHub (version control)


Features
--------
- Create a new person (POST)
- View all people (GET)
- Update an existing person (PUT)
- Delete a person (DELETE)
- Persistent storage using a JSON file
- Dark-themed, modern React dashboard
- UI clearly labels HTTP methods for each action

Backend API Endpoints
---------------------
POST    /api/people        - Create a new person
GET     /api/people        - Get all people
GET     /api/people/:id    - Get a person by ID
PUT     /api/people/:id    - Update a person
DELETE  /api/people/:id    - Delete a person


How to Run the Project
---------------------

1. Clone the repository

git clone https://github.com/Hari-1925/KT_3_Task.git
cd <KT_3_Task>


2. Run the backend

cd backend
npm install
npx nodemon server.js

Backend will run at:
http://localhost:5000


3. Run the frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend will run at:
http://localhost:5173


Using the Application
---------------------
1. Enter person details in the form and click "Add Person (POST)".
2. View all records in the People List (GET).
3. Click "Edit (PUT)" to update an existing record.
4. Click "Delete (DELETE)" to remove a record.
5. All changes are persisted in the backend JSON database.


API Testing with Postman
------------------------
All backend endpoints were tested using Postman before frontend integration. Each CRUD operation can be verified independently using the API endpoints listed above.

Conclusion
----------
From this we can learn how basic CRUD operation are performed.

Thank you
# IBM_TASK_3
