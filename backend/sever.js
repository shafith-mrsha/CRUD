const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "data", "people.json");

/* ---------- Helper Functions ---------- */
const readPeople = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

const writePeople = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

/* ---------- CREATE (POST) ---------- */
app.post("/api/people", (req, res) => {
  const people = readPeople();

  const newPerson = {
    id: Date.now(),
    name: req.body.name,
    age: req.body.age,
    job: req.body.job,
    salary: req.body.salary,
    education: req.body.education
  };

  people.push(newPerson);
  writePeople(people);

  res.status(201).json(newPerson);
});

/* ---------- READ ALL (GET) ---------- */
app.get("/api/people", (req, res) => {
  const people = readPeople();
  res.json(people);
});

/* ---------- READ ONE (GET BY ID) ---------- */
app.get("/api/people/:id", (req, res) => {
  const people = readPeople();
  const id = Number(req.params.id); // works for Date.now() IDs too

  const person = people.find(p => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  res.json(person);
});


/* ---------- UPDATE (PUT) ---------- */
app.put("/api/people/:id", (req, res) => {
  const people = readPeople();
  const id = Number(req.params.id);

  const updatedPeople = people.map(person =>
    person.id === id
      ? { ...person, ...req.body }   // updates only given fields
      : person
  );

  writePeople(updatedPeople);
  res.json({ message: "Person updated successfully" });
});

/* ---------- DELETE ---------- */
app.delete("/api/people/:id", (req, res) => {
  const people = readPeople();
  const id = Number(req.params.id);

  const filtered = people.filter(p => p.id !== id);
  writePeople(filtered);

  res.json({ message: "Person deleted successfully" });
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
