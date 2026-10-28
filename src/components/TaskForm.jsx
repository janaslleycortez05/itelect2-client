
import { useState } from "react";

function TaskForm({ onAddTask, token }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    await onAddTask({
      title: trimmedTitle,
      dueDate,
    });

    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit" disabled={!token}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
