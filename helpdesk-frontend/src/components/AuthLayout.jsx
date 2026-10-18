import { LifeBuoy } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return <div className="auth-layout"><div className="auth-side"><Link to="/" className="brand inverse"><span className="brand-icon"><LifeBuoy size={19} /></span>northstar</Link><div><p className="kicker inverse-kicker">Support, simplified</p><h1>Help your team<br /><em>move forward.</em></h1><p className="auth-quote">“The fastest way to solve a problem is to make sure it reaches the right person.”</p><span className="quote-author">Northstar support principles</span></div><div className="auth-shape" /></div><div className="auth-form-area"><Link to="/" className="mobile-brand brand"><span className="brand-icon"><LifeBuoy size={18} /></span>northstar</Link><Outlet /></div></div>;
}
