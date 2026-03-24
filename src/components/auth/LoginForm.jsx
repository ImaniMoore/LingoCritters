import { useState } from "react";

export default function Login() {

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    // auth go here later
    setSubmitted(true);
  }

  // --- Success screen ---
  if (submitted) {
    return (
      <div>
        <h2>Welcome back!</h2>
        <p>You have successfully logged in.</p>
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    );
  }

  // --- Login form ---
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@email.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <button type="submit">Login</button>

      </form>

      <p>Don't have an account? <a href="/register">Sign up here</a></p>

    </div>
  );
}