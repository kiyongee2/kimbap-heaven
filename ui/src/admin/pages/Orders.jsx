import { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'

const LANG_FLAGS = { ko: '🇰🇷', en: '🇺🇸', ja: '🇯🇵', zh: '🇨🇳' }

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('kimbap_orders')
        setOrders(raw ? JSON.parse(raw).reverse() : [])
      } catch { setOrders([]) }
    }
    load()
    window.addEventListener('storage', load)
    const timer = setInterval(load, 5000)
    return () => { window.removeEventListener('storage', load); clearInterval(timer) }
  }, [])

  const fmt = (iso) => {
    const d = new Date(iso)
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
  }

  const total = (items) =>
    items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div className="admin-page">
      <AdminHeader
        title="주문"
        left={<button className="admin-icon-btn">☰</button>}
      />

      <div style={{ padding: '12px 0' }}>
        {orders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">🛍</span>
            <span className="empty-state__text">아직 주문이 없습니다</span>
          </div>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="order-item">
              <div className="order-item__header">
                <span className="order-item__id">주문 #{o.id}</span>
                <span className="order-item__time">{fmt(o.timestamp)}</span>
              </div>
              <div className="order-item__rows">
                {(o.items || []).map((item, i) => (
                  <div key={i} className="order-item__row">
                    <span className="order-item__name">
                      {item.name?.ko || item.id} x{item.quantity}
                    </span>
                    <span className="order-item__price">
                      ₩{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-item__footer">
                <span className="order-item__lang">
                  {LANG_FLAGS[o.lang] || ''} {o.lang?.toUpperCase()}
                </span>
                <span className="order-item__total">
                  합계 ₩{total(o.items || []).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
