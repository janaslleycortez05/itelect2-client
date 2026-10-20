
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          {task.dueDate && ` — Due: ${task.dueDate}`}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
