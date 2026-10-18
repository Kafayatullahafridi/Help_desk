export function StatusBadge({ children, status = "open" }) { return <span className={`badge badge-${status.toLowerCase().replaceAll(" ", "-")}`}><i />{children}</span>; }
export function PriorityBadge({ children }) { return <span className={`priority priority-${String(children).toLowerCase()}`}><i />{children}</span>; }
