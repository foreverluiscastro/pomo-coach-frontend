import { useState } from "react";
import Error from "./Error";

export default function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="Form">
      <div className="FormField">
        <label className="Label">Username:</label>
        <input
          className="Input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="FormField">
        <label className="Label">Password:</label>
        <input
          className="Input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="FormField">
        <button type="submit" className="SettingsButton">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="FormField">
        {errors.map((err) => (
          <Error err={err} />
        ))}
      </div>
    </form>
  );
}
