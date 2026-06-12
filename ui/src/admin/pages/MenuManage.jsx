import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import DietaryBadge from '../components/DietaryBadge'
import ConfirmModal from '../components/ConfirmModal'
import Toast from '../components/Toast'

const CATEGORIES = ['전체', '김밥', '라면', '떡볶이', '음료']

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export default function MenuManage() {
  const navigate = useNavigate()
  const [menus, setMenus] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, name }
  const [toast, setToast] = useState(null)

  const fetchMenus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/menus/admin`)
      if (res.ok) {
        const data = await res.json()
        setMenus(data)
      }
    } catch {
      // 서버 미연결 시 로컬 데이터 폴백
      const { default: menuData } = await import('../../data/menuData')
      setMenus(menuData.map((m) => ({
        id: m.id,
        krName: m.krName,
        image: m.image,
        bgColor: m.bgColor,
        name: m.name,
        price: m.price,
        dietary: m.dietary,
        enabled: true,
      })))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMenus() }, [fetchMenus])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`${API_BASE}/api/menus/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setMenus((prev) => prev.filter((m) => m.id !== deleteTarget.id))
      setToast({ message: `'${deleteTarget.name}' 메뉴가 삭제되었습니다.`, type: 'success' })
    } catch {
      setToast({ message: '삭제에 실패했습니다. 다시 시도해주세요.', type: 'error' })
    } finally {
      setDeleteTarget(null)
    }
  }

  const filtered = menus.filter((m) => {
    const matchSearch = search === '' ||
      (m.krName || '').includes(search) ||
      (m.name?.ko || '').includes(search) ||
      (m.name?.en || '').toLowerCase().includes(search.toLowerCase())
    return matchSearch
  })

  return (
    <div className="admin-page">
      <AdminHeader
        title="메뉴 관리"
        left={<button className="admin-icon-btn">☰</button>}
        right={<button className="admin-icon-btn">⇅</button>}
      />

      {/* 검색 */}
      <div className="admin-search">
        <span className="admin-search__icon">🔍</span>
        <input
          className="admin-search__input"
          placeholder="메뉴 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="admin-search__clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {/* 카테고리 필 */}
      <div className="category-pills">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`pill${category === c ? ' active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 메뉴 목록 */}
      {loading ? (
        <div className="empty-state">
          <span className="empty-state__icon">⏳</span>
          <span className="empty-state__text">불러오는 중...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🍽</span>
          <span className="empty-state__text">메뉴를 추가해 주세요</span>
        </div>
      ) : (
        <div className="menu-list">
          {filtered.map((menu) => {
            const dietary = menu.dietary || {}
            return (
              <div key={menu.id} className="menu-list-item">
                <img
                  className="menu-list-item__img"
                  src={menu.image}
                  alt={menu.krName}
                  style={{ background: menu.bgColor || '#f5f5f5' }}
                />
                <div className="menu-list-item__body">
                  <div className="menu-list-item__name">{menu.krName || menu.name?.ko}</div>
                  <div className="menu-list-item__tags">
                    {dietary.popular && <DietaryBadge type="popular" />}
                    {dietary.noPork  && <DietaryBadge type="noPork" />}
                    {dietary.spicy   && <DietaryBadge type="spicy" />}
                    {dietary.vegan   && <DietaryBadge type="vegan" />}
                    {dietary.beef    && <DietaryBadge type="beef" />}
                  </div>
                  <div className="menu-list-item__price">
                    ₩{(menu.price || 0).toLocaleString()}
                  </div>
                </div>
                <button
                  className="menu-list-item__edit"
                  onClick={() => navigate(`/admin/menus/${menu.id}/edit`)}
                >
                  ✏️
                </button>
                <button
                  className="menu-list-item__delete"
                  onClick={() => setDeleteTarget({ id: menu.id, name: menu.krName || menu.name?.ko })}
                >
                  🗑
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* 메뉴 추가 버튼 */}
      <button
        className="admin-add-btn"
        onClick={() => navigate('/admin/menus/new')}
      >
        + 메뉴 추가
      </button>

      {/* 삭제 확인 모달 */}
      {deleteTarget && (
        <ConfirmModal
          message={`'${deleteTarget.name}' 메뉴를 삭제하시겠습니까?`}
          confirmLabel="삭제"
          cancelLabel="취소"
          danger
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
