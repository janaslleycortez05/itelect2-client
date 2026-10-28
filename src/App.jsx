
import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import LoginForm from "./components/LoginForm";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  async function fetchTasks(authToken = token) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        headers: authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {},
      });

      if (!response.ok) {
        throw new Error(`Failed to load tasks (${response.status})`);
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : data.tasks ?? []);
    } catch (err) {
      setError(err.message || "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  }
async function handleLogin(username, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Login failed.");
  }

  const receivedToken = data.token || data.accessToken;

  if (!receivedToken) {
    throw new Error("The login response did not include a token.");
  }

  setToken(receivedToken);
  await fetchTasks(receivedToken);
}
  useEffect(() => {
    fetchTasks("");
  }, []);

  async function handleAddTask(task) {
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`Failed to add task (${response.status})`);
      }

      await fetchTasks(token);
    } catch (err) {
      setError(err.message || "Could not add task.");
    }
  }

  
  return (
    <main className="container">
      <h1>GT14 - Task Manager</h1>
      <p>Manage your tasks using React.</p>

      <LoginForm onLogin={handleLogin} />

      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <TaskForm onAddTask={handleAddTask} token={token} />
          <h2>My Tasks</h2>
          <TaskList tasks={tasks} />
        </>
      )}
    </main>
  );
}

export default App;
