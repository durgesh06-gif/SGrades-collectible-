// Log in / register page. Replace the TODO in submit() with a real API call.
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (mode === "register" && !form.name.trim()) return setError("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    setError("");
    login({ name: form.name.trim() || form.email }); // TODO: replace with a real API call
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          {location.state?.reason && <div className="alert alert-info py-2">{location.state.reason}</div>}
          <ul className="nav nav-pills nav-fill mb-4">
            {["login", "register"].map((m) => (
              <li className="nav-item" key={m}>
                <button className={`nav-link ${mode === m ? "active bg-dark" : "text-dark"}`}
                  onClick={() => { setMode(m); setError(""); }}>
                  {m === "login" ? "Log in" : "Register"}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={submit} noValidate>
            {mode === "register" && (
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Full name</label>
                <input id="name" className="form-control" value={form.name} onChange={set("name")} />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" value={form.email} onChange={set("email")} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pw">Password</label>
              <input id="pw" type="password" className="form-control" value={form.password} onChange={set("password")} />
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button className="btn btn-gold w-100" type="submit">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
            {mode === "login" && <div className="text-center mt-3"><a href="#" className="small">Forgot password?</a></div>}
          </form>
        </div>
      </div>
    </div>
  );
}
