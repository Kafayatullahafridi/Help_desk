import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  function addScreenshots(event) {
    const selected = Array.from(event.target.files || [])
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setScreenshots((current) => [...current, ...selected]);
    event.target.value = "";
  }
  function submit(event) { event.preventDefault(); setSubmitted(true); setTimeout(() => navigate("/tickets/1049"), 650); }
  return <div className="narrow-page"><Link to="/tickets" className="back-link"><ArrowLeft size={15} /> Back to tickets</Link><div className="page-title standalone"><div><p className="kicker">New request</p><h1>Create a ticket</h1><p className="title-description">Tell us what’s going on and we’ll route it to the right person.</p></div></div><form className="panel ticket-form" onSubmit={submit}><label>What do you need help with?<input required placeholder="Give your ticket a clear title" /></label><div className="form-two"><label>Category<select defaultValue=""><option value="" disabled>Select a category</option><option>Technical issue</option><option>Access & permissions</option><option>Hardware</option><option>Billing</option><option>Other</option></select></label><label>Priority<select defaultValue="Medium"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label></div><label>Describe the issue<textarea required rows="8" placeholder="Include any details that will help us understand and solve the issue..." /></label><div className="screenshot-upload"><div><strong>Add screenshots</strong><small>PNG, JPG, GIF or WEBP · 10MB each</small></div><label className="file-button button button-soft"><Paperclip size={16} /> Choose images<input accept="image/png,image/jpeg,image/gif,image/webp" multiple type="file" onChange={addScreenshots} /></label></div>{screenshots.length > 0 && <div className="screenshot-grid">{screenshots.map((screenshot, index) => <div className="screenshot-preview" key={`${screenshot.file.name}-${index}`}><img src={screenshot.url} alt={`Selected screenshot ${index + 1}`} /><button type="button" onClick={() => setScreenshots(screenshots.filter((_, currentIndex) => currentIndex !== index))} aria-label={`Remove screenshot ${index + 1}`}>×</button><small>{screenshot.file.name}</small></div>)}</div>}<div className="form-footer"><span className="attachment-count">{screenshots.length ? `${screenshots.length} screenshot${screenshots.length > 1 ? "s" : ""} attached` : "Screenshots are optional"}</span><div><Link to="/tickets" className="button button-plain">Cancel</Link><button className="button button-dark" disabled={submitted} type="submit">{submitted ? "Creating..." : "Create ticket"} <Send size={15} /></button></div></div></form></div>;
}
