import { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'

const ACTIVITIES = [
  { id: 1, type: 'orange', icon: '🛍', title: '새 주문 접수 #1024', sub: '참치김밥 x1', time: '2분 전' },
  { id: 2, type: 'blue',   icon: '📱', title: 'QR 스캔 (테이블 12)', sub: '일본어',    time: '5분 전' },
  { id: 3, type: 'green',  icon: '✏️',  title: '메뉴 업데이트',     sub: '불고기김밥', time: '30분 전' },
  { id: 4, type: 'orange', icon: '🛍', title: '새 주문 접수 #1023', sub: '라면 x1',   time: '45분 전' },
  { id: 5, type: 'purple', icon: '📍', title: '정문 QR 스캔',       sub: '영어',      time: '1시간 전' },
]

export default function Dashboard() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('kimbap_orders')
      setOrders(raw ? JSON.parse(raw) : [])
    } catch { setOrders([]) }

    const onStorage = () => {
      try {
        const raw = localStorage.getItem('kimbap_orders')
        setOrders(raw ? JSON.parse(raw) : [])
      } catch { setOrders([]) }
    }
    window.addEventListener('storage', onStorage)
    const timer = setInterval(onStorage, 5000)
    return () => { window.removeEventListener('storage', onStorage); clearInterval(timer) }
  }, [])

  const todayOrders = orders.filter((o) => {
    const d = new Date(o.timestamp)
    const now = new Date()
    return d.getFullYear() === now.getFullYear() &&
           d.getMonth() === now.getMonth() &&
           d.getDate() === now.getDate()
  })

  const langCounts = todayOrders.reduce((acc, o) => {
    acc[o.lang] = (acc[o.lang] || 0) + 1
    return acc
  }, {})
  const langNames = { ko: '한국어', en: '영어', ja: '일본어', zh: '중국어' }
  const mainLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]

  const menuCounts = {}
  todayOrders.forEach((o) => o.items?.forEach((item) => {
    menuCounts[item.id] = {
      name: item.name?.ko || item.id,
      count: (menuCounts[item.id]?.count || 0) + item.quantity,
      image: item.image,
    }
  }))
  const topMenu = Object.values(menuCounts).sort((a, b) => b.count - a.count)[0]

  return (
    <div className="admin-page">
      <AdminHeader
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>🏪</span> 명동김밥 관리자
          </span>
        }
        left={<button className="admin-icon-btn">☰</button>}
        right={<button className="admin-icon-btn">🔔</button>}
      />

      {/* KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card__label">오늘 QR 접속 수</div>
          <div className="kpi-card__value">1,248</div>
          <div className="kpi-card__sub positive">+12% (어제 대비)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card__label">오늘 주문 수</div>
          <div className="kpi-card__value" style={{ color: 'var(--primary)' }}>
            {todayOrders.length || 356}
          </div>
          <div className="kpi-card__sub positive">+8% (어제 대비)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card__label">주요 언어</div>
          <div className="kpi-card__value" style={{ fontSize: 20 }}>
            {mainLang ? langNames[mainLang[0]] : '영어'}
          </div>
          <div className="kpi-card__sub" style={{ color: 'var(--primary)', fontWeight: 800 }}>
            {mainLang
              ? `${Math.round((mainLang[1] / todayOrders.length) * 100)}%`
              : '45%'}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card__label">인기 메뉴</div>
          {topMenu ? (
            <div className="kpi-card__thumbnail">
              {topMenu.image && (
                <img className="kpi-card__thumb-img" src={topMenu.image} alt={topMenu.name} />
              )}
              <div>
                <div className="kpi-card__menu-name">{topMenu.name}</div>
                <div className="kpi-card__menu-count">{topMenu.count}주문</div>
              </div>
            </div>
          ) : (
            <div className="kpi-card__thumbnail">
              <img className="kpi-card__thumb-img" src="/images/참치김밥.png" alt="참치김밥" />
              <div>
                <div className="kpi-card__menu-name">참치김밥</div>
                <div className="kpi-card__menu-count">324 주문</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="activity-section">
        <div className="admin-card">
          <div className="section-header">
            <span className="section-title">최근 활동</span>
            <button className="section-link">전체 보기</button>
          </div>
          {ACTIVITIES.map((a) => (
            <div key={a.id} className="activity-item">
              <div className={`activity-icon ${a.type}`}>{a.icon}</div>
              <div className="activity-body">
                <div className="activity-title">{a.title}</div>
                <div className="activity-sub">{a.sub}</div>
              </div>
              <div className="activity-time">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
