import AdminHeader from '../components/AdminHeader'

export default function Settings({ onLogout }) {
  return (
    <div className="admin-page">
      <AdminHeader
        title="설정"
        left={<button className="admin-icon-btn">☰</button>}
      />
      <div style={{ padding: 24 }}>
        {[
          { icon: '🏪', label: '매장 정보' },
          { icon: '👤', label: '계정 관리' },
          { icon: '🔔', label: '알림 설정' },
          { icon: '🌐', label: '언어 설정' },
          { icon: '📋', label: '이용 약관' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: '#fff', borderRadius: 12, padding: '16px',
              marginBottom: 10, boxShadow: 'var(--shadow)', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{label}</span>
            <span style={{ color: '#bbb' }}>›</span>
          </div>
        ))}

        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', background: '#fff', borderRadius: 12, padding: '16px',
            marginTop: 8, boxShadow: 'var(--shadow)', cursor: 'pointer',
            border: 'none', textAlign: 'left',
          }}
        >
          <span style={{ fontSize: 22 }}>🚪</span>
          <span style={{ fontSize: 15, fontWeight: 600, flex: 1, color: '#F44336' }}>로그아웃</span>
        </button>
      </div>
    </div>
  )
}
