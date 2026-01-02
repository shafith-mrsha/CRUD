import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/people";

function App() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    job: "",
    salary: "",
    education: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchPeople = async () => {
    const res = await fetch(API);
    setPeople(await res.json());
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const addPerson = async () => {
    if (!form.name.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    resetForm();
    fetchPeople();
  };

  const updatePerson = async () => {
    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    resetForm();
    setEditingId(null);
    fetchPeople();
  };

  const deletePerson = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchPeople();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm(p);
  };

  const resetForm = () => {
    setForm({
      name: "",
      age: "",
      job: "",
      salary: "",
      education: ""
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <header style={styles.header}>
          <h1>People CRUD Dashboard</h1>
          <p>
            Dark-theme dashboard demonstrating CRUD operations using
            <b> React + Node.js (Express)</b>
          </p>
          <div style={styles.methodBar}>
            <span style={styles.post}>POST → Add</span>
            <span style={styles.get}>GET → Read</span>
            <span style={styles.put}>PUT → Update</span>
            <span style={styles.delete}>DELETE → Remove</span>
          </div>
        </header>

        {/* FORM CARD */}
        <div style={{ ...styles.card, marginBottom: "48px" }}>
          <h3>
            Person Form{" "}
            <span style={styles.muted}>
              ({editingId ? "PUT" : "POST"})
            </span>
          </h3>

          <div style={styles.form}>
            <input style={styles.input} placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
            <input style={styles.input} placeholder="Age"
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })} />
            <input style={styles.input} placeholder="Job"
              value={form.job}
              onChange={e => setForm({ ...form, job: e.target.value })} />
            <input style={styles.input} placeholder="Salary"
              value={form.salary}
              onChange={e => setForm({ ...form, salary: e.target.value })} />
            <input style={styles.input} placeholder="Education"
              value={form.education}
              onChange={e => setForm({ ...form, education: e.target.value })} />
          </div>

          {editingId ? (
            <button style={styles.updateBtn} onClick={updatePerson}>
              Update Person (PUT)
            </button>
          ) : (
            <button style={styles.addBtn} onClick={addPerson}>
              Add Person (POST)
            </button>
          )}
        </div>

        {/* TABLE CARD */}
        <div style={styles.card}>
          <h3>
            People List <span style={styles.muted}>(GET)</span>
          </h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Job</th>
                <th>Salary</th>
                <th>Education</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.job}</td>
                  <td>{p.salary}</td>
                  <td>{p.education}</td>
                  <td>
                    <button style={styles.editBtn} onClick={() => startEdit(p)}>
                      Edit (PUT)
                    </button>
                    <button style={styles.deleteBtn} onClick={() => deletePerson(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {people.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.empty}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */
const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "32px",
    color: "#e5e7eb"
  },
  container: {
    width: "100%",
    maxWidth: "1600px",
    fontFamily: "Inter, Arial, sans-serif"
  },
  header: {
    marginBottom: "32px"
  },
  muted: {
    color: "#94a3b8",
    fontSize: "13px"
  },

  methodBar: {
    display: "flex",
    gap: "20px",
    marginTop: "12px"
  },
  post: { color: "#22c55e" },
  get: { color: "#38bdf8" },
  put: { color: "#facc15" },
  delete: { color: "#f87171" },

  card: {
    background: "#020617",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.7)"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
    marginTop: "16px"
  },

  input: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "16px",
    fontSize: "15px",
    color: "#e5e7eb",
    height: "52px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "12px"
  },

  addBtn: {
    background: "#22c55e",
    border: "none",
    padding: "14px 22px",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer"
  },
  updateBtn: {
    background: "#facc15",
    border: "none",
    padding: "14px 22px",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer"
  },
  editBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    marginRight: "8px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#f87171",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    padding: "28px"
  }
};

export default App;
