import { useState } from "react";

export default function LoginForm({ isPending, mutate }) {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="login-container">
      <input
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        value={userName}
        placeholder="Enter Username"
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        value={password}
        placeholder="Enter Password"
      />
      <button
        onClick={() => mutate({ userName, password })}
        className="btn btn-green"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </div>
  );
}
