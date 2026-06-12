import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/admin',          icon: '⊞',  label: '대시보드' },
  { path: '/admin/menus',    icon: '🍽',  label: '메뉴' },
  { path: '/admin/orders',   icon: '🛍',  label: '주문' },
  { path: '/admin/stats',    icon: '📊', label: '통계' },
  { path: '/admin/settings', icon: '⚙️',  label: '설정' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path) => {
    if (path === '/admin') return pathname === '/admin' || pathname === '/admin/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="admin-bottom-nav">
      {NAV_ITEMS.map(({ path, icon, label }) => (
        <button
          key={path}
          className={`admin-bottom-nav__item${isActive(path) ? ' active' : ''}`}
          onClick={() => navigate(path)}
        >
          <span className="nav-icon" style={isActive(path) ? { filter: 'none' } : {}}>
            {icon}
          </span>
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
