import { Bell, ChevronDown, ClipboardList, Command, LayoutDashboard, LifeBuoy, LogOut, Menu, Settings, ShieldCheck, Users, X } from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  { label: "Overview", to: "/app", icon: LayoutDashboard },
  { label: "All tickets", to: "/tickets", icon: ClipboardList },
  { label: "Team", to: "/users", icon: Users },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname === "/app" ? "Overview" : location.pathname.includes("/tickets") ? "Tickets" : location.pathname.includes("/users") ? "Team" : "Settings";
  return <div className="product-shell"><aside className={`product-sidebar ${mobileOpen ? "open" : ""}`}><div className="sidebar-top"><NavLink to="/" className="brand"><span className="brand-icon"><LifeBuoy size={18} /></span>northstar</NavLink><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></div><div className="workspace-card"><div className="workspace-logo">AC</div><div><strong>Acme Corporation</strong><span>Support workspace</span></div><ChevronDown size={15} /></div><p className="side-label">Workspace</p><nav>{links.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}><Icon size={17} />{label}{label === "All tickets" && <span className="side-count">24</span>}</NavLink>)}</nav><p className="side-label">Manage</p><nav><NavLink to="/users" className="side-link"><ShieldCheck size={17} />Admin tools</NavLink><NavLink to="/settings" className="side-link"><Settings size={17} />Settings</NavLink></nav><div className="sidebar-bottom"><div className="agent-card"><div className="user-avatar">SO</div><div><strong>Sam Ortega</strong><span>Administrator</span></div><button aria-label="Profile options" onClick={() => navigate("/settings")}><MoreDots /></button></div><button className="logout-button" onClick={() => navigate("/")}><LogOut size={16} />Sign out</button></div></aside><main className="product-main"><header className="product-header"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><div className="header-breadcrumb"><span>Workspace</span><b>/</b><strong>{page}</strong></div><div className="header-actions"><button className="command-button" onClick={() => setSearchOpen(true)}><Command size={14} /><span>Quick search</span><kbd>⌘ K</kbd></button><div className="notification-wrap"><button className="header-icon" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications"><Bell size={18} /><i /></button>{notificationsOpen && <div className="notification-popover"><strong>Notifications</strong><p><b>Priya assigned you a ticket</b><small>Cannot access shared drive · 3 hrs ago</small></p><p><b>Ticket #NS-1048 was updated</b><small>Jamie Wilson replied · 12 min ago</small></p></div>}</div><div className="header-avatar">SO</div></div></header><div className="product-content"><Outlet /></div>{searchOpen && <div className="search-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}><div className="quick-search"><div className="search-box wide"><SearchIcon /><input autoFocus placeholder="Search tickets, people, or pages" onKeyDown={(event) => { if (event.key === "Enter") { setSearchOpen(false); navigate("/tickets"); } }} /></div><p>Press Enter to open the ticket queue</p></div></div>}</main></div>;
}
function MoreDots() { return <span className="dots"><i /><i /><i /></span>; }
function SearchIcon() { return <span className="search-symbol">⌕</span>; }
