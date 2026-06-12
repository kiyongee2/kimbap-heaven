import { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import DonutChart from '../components/DonutChart'

const LANG_SEGS = [
  { label: '영어',   pct: 45, color: '#E8622A' },
  { label: '일본어', pct: 25, color: '#F44336' },
  { label: '중국어', pct: 20, color: '#26C6DA' },
  { label: '한국어', pct: 10, color: '#66BB6A' },
]

const QR_SEGS = [
  { label: '정문 QR',  pct: 55, color: '#E8622A' },
  { label: '테이블 QR',pct: 35, color: '#42A5F5' },
  { label: '기타',     pct: 10, color: '#66BB6A' },
]

const FILTER_BADGES = [
  { icon: '❌', label: '돼지고기 없음', pct: 38 },
  { icon: '🌶', label: '매움',         pct: 32 },
  { icon: '🌿', label: '비건',         pct: 18 },
  { icon: '🥩', label: '소고기 포함',  pct: 12 },
]

export default function Statistics() {
  const [topMenus, setTopMenus] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('kimbap_orders')
      const orders = raw ? JSON.parse(raw) : []
      const counts = {}
      orders.forEach((o) => o.items?.forEach((item) => {
        if (!counts[item.id]) counts[item.id] = { name: item.name?.ko || item.id, image: item.image, count: 0 }
        counts[item.id].count += item.quantity
      }))
      const sorted = Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 3)
      setTopMenus(sorted.length ? sorted : [
        { name: '참치김밥', image: '/images/참치김밥.png', count: 654 },
        { name: '라면',     image: null,                   count: 432 },
        { name: '떡볶이',   image: null,                   count: 321 },
      ])
    } catch {
      setTopMenus([
        { name: '참치김밥', image: '/images/참치김밥.png', count: 654 },
        { name: '라면',     image: null,                   count: 432 },
        { name: '떡볶이',   image: null,                   count: 321 },
      ])
    }
  }, [])

  const maxCount = topMenus[0]?.count || 1

  return (
    <div className="admin-page">
      <AdminHeader
        title="통계"
        left={<button className="admin-icon-btn">☰</button>}
        right={<button className="admin-icon-btn" style={{ fontSize: 14 }}>📅 오늘 ▾</button>}
      />

      {/* 언어별 접속 현황 */}
      <div className="donut-section">
        <div className="section-title" style={{ marginBottom: 12 }}>언어별 접속 현황</div>
        <div className="donut-wrap">
          <DonutChart segments={LANG_SEGS} size={110} />
          <div className="legend">
            {LANG_SEGS.map((s) => (
              <div key={s.label} className="legend-item">
                <span className="legend-dot" style={{ background: s.color }} />
                <span className="legend-label">{s.label}</span>
                <span className="legend-pct">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 인기 메뉴 TOP */}
      <div className="donut-section">
        <div className="section-title" style={{ marginBottom: 12 }}>인기 메뉴 TOP</div>
        {topMenus.map((m, i) => (
          <div key={i} className="top-menu-item">
            <span className="top-menu-rank">{i + 1}</span>
            {m.image ? (
              <img className="top-menu-img" src={m.image} alt={m.name} />
            ) : (
              <div className="top-menu-img" style={{ background: '#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🍽</div>
            )}
            <div className="top-menu-body">
              <div className="top-menu-name">{m.name}</div>
              <div className="top-menu-bar-track">
                <div
                  className="top-menu-bar-fill"
                  style={{ width: `${Math.round((m.count / maxCount) * 100)}%` }}
                />
              </div>
            </div>
            <span className="top-menu-count">{m.count}</span>
          </div>
        ))}
      </div>

      {/* QR 위치별 접속 */}
      <div className="donut-section">
        <div className="section-title" style={{ marginBottom: 12 }}>QR 위치별 접속</div>
        <div className="donut-wrap">
          <DonutChart segments={QR_SEGS} size={110} />
          <div className="legend">
            {QR_SEGS.map((s) => (
              <div key={s.label} className="legend-item">
                <span className="legend-dot" style={{ background: s.color }} />
                <span className="legend-label">{s.label}</span>
                <span className="legend-pct">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 필터 사용 비율 */}
      <div className="donut-section">
        <div className="section-title" style={{ marginBottom: 8 }}>필터 사용 비율</div>
        <div className="filter-badges">
          {FILTER_BADGES.map((b) => (
            <div key={b.label} className="filter-badge">
              <span>{b.icon}</span>
              <span>{b.label}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
