import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return <div className="auth-card">{sent ? <><span className="success-icon"><Mail size={22} /></span><p className="kicker">Check your inbox</p><h1>Reset link sent</h1><p className="auth-description">If an account exists for that email, you’ll receive reset instructions shortly.</p><Link className="button button-dark auth-submit center-button" to="/login">Back to sign in <ArrowRight size={16} /></Link></> : <><Link to="/login" className="back-link"><ArrowLeft size={15} /> Back to sign in</Link><p className="kicker">Account recovery</p><h1>Forgot your password?</h1><p className="auth-description">Enter your email and we’ll send you a secure reset link.</p><form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="auth-form"><label>Work email<input required type="email" placeholder="you@company.com" /></label><button className="button button-dark auth-submit" type="submit">Send reset link <ArrowRight size={16} /></button></form></>}</div>;
}
