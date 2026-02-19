import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn, setRole }) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_type", res.data.user.type);

      setIsLoggedIn(true);
      setRole(res.data.user.type);

      navigate("/");

    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

 return (
  <div className="login-wrapper">
    <div className="login-card">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button>Login</button>
      </form>

      {msg && <div className="login-error">{msg}</div>}
    </div>
  </div>
);

}
