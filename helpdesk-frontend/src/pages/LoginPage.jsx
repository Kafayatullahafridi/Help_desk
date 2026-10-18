import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  function submit(event) { event.preventDefault(); setError(""); navigate("/app"); }
  return <div className="auth-card"><p className="kicker">Welcome back</p><h1>Sign in to your workspace</h1><p className="auth-description">Pick up where you left off.</p><form onSubmit={submit} className="auth-form"><label>Work email<input required type="email" placeholder="you@company.com" /></label><label>Password<div className="password-field"><input required minLength="6" type={show ? "text" : "password"} placeholder="Enter your password" /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>{error && <p className="form-error">{error}</p>}<div className="auth-options"><label className="check-label"><input type="checkbox" />Remember me</label><Link to="/forgot-password">Forgot password?</Link></div><button className="button button-dark auth-submit" type="submit">Sign in <ArrowRight size={16} /></button></form><p className="auth-switch">Don’t have an account? <Link to="/register">Create one</Link></p></div>;
}
