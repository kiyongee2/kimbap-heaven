export default function AdminHeader({ title, left, right }) {
  return (
    <header className="admin-header">
      <div className="admin-header__left">{left}</div>
      <h1 className="admin-header__title">{title}</h1>
      <div className="admin-header__right">{right}</div>
    </header>
  )
}
