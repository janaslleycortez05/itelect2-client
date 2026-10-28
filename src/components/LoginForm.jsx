
import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await onLogin(username, password);
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: "10px", marginBottom: "20px" }}
    >
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        autoComplete="username"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        autoComplete="current-password"
        required
      />

      <button type="submit">Log In</button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default LoginForm;
