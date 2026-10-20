
import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", dueDate: "2026-10-22" },
    { id: 2, title: "Build a task list", dueDate: "2026-10-23" },
    { id: 3, title: "Finish GT13", dueDate: "2026-10-21" },
  ]);

  function handleAddTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      dueDate: "",
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  return (
    <main className="container">
      <h1>GT13 - Task Manager</h1>
      <p>Manage your tasks using React.</p>

      <TaskForm onAddTask={handleAddTask} />

      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </main>
  );
}

export default App;
