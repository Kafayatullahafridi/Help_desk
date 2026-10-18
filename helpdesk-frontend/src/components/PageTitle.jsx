export default function PageTitle({ eyebrow, title, description, action }) {
  return <div className="page-title"><div><p className="kicker">{eyebrow}</p><h1>{title}</h1>{description && <p className="title-description">{description}</p>}</div>{action}</div>;
}
