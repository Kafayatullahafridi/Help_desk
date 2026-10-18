import { ArrowLeft, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
export default function NotFoundPage() { return <div className="not-found"><span className="brand-icon"><LifeBuoy size={22} /></span><p className="kicker">404 error</p><h1>That page wandered off.</h1><p>We couldn’t find the page you were looking for.</p><Link to="/app" className="button button-dark"><ArrowLeft size={16} /> Back to workspace</Link></div>; }
