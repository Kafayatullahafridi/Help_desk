import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  function submit(event) { event.preventDefault(); setError(""); navigate("/app"); }
  return <div className="auth-card"><p className="kicker">Get started</p><h1>Create your workspace</h1><p className="auth-description">Set up your team’s support hub in a few minutes.</p><form onSubmit={submit} className="auth-form"><div className="form-two"><label>First name<input required placeholder="Sam" /></label><label>Last name<input required placeholder="Ortega" /></label></div><label>Work email<input required type="email" placeholder="you@company.com" /></label><label>Password<input required minLength="6" type="password" placeholder="At least 6 characters" /></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark auth-submit" type="submit">Create workspace <ArrowRight size={16} /></button></form><p className="terms">By continuing, you agree to our <a href="#terms">Terms of service</a> and <a href="#privacy">Privacy policy</a>.</p><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></div>;
}
