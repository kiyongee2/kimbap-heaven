import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import Toast from '../components/Toast'
import ConfirmModal from '../components/ConfirmModal'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const DEFAULT_FORM = {
  krName: '', image: '', bgColor: '#FFFFFF',
  nameKo: '', nameEn: '', nameJa: '', nameZh: '',
  descKo: '', descEn: '', descJa: '', descZh: '',
  price: '',
  isVegan: false, isNoPork: false, isBeef: false,
  isSpicy: false, isPopular: false,
  allergens: '', enabled: true,
}

export default function MenuEdit() {
  const { id } = useParams()
  // menus/new 라우트는 id가 undefined, menus/:id/edit 라우트는 숫자 문자열
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const [form, setForm] = useState(DEFAULT_FORM)
  const [previewUrl, setPreviewUrl] = useState('')
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const fileRef = useRef()

  /* 기존 메뉴 불러오기 */
  useEffect(() => {
    if (isNew) return
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/menus/${id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setForm({
          krName:    data.krName  || '',
          image:     data.image   || '',
          bgColor:   data.bgColor || '#FFFFFF',
          nameKo:    data.name?.ko || '',
          nameEn:    data.name?.en || '',
          nameJa:    data.name?.ja || '',
          nameZh:    data.name?.zh || '',
          descKo:    data.description?.ko || '',
          descEn:    data.description?.en || '',
          descJa:    data.description?.ja || '',
          descZh:    data.description?.zh || '',
          price:     data.price ?? '',
          isVegan:   data.dietary?.vegan   || false,
          isNoPork:  data.dietary?.noPork  || false,
          isBeef:    data.dietary?.beef    || false,
          isSpicy:   data.dietary?.spicy   || false,
          isPopular: data.dietary?.popular || false,
          allergens: (data.allergens || []).join(','),
          enabled:   data.enabled ?? true,
        })
        setPreviewUrl(data.image || '')
      } catch {
        setToast({ message: '메뉴를 불러올 수 없습니다.', type: 'error' })
      }
    }
    load()
  }, [id, isNew])

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }))
    setDirty(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setToast({ message: 'PNG, JPG 파일만 업로드 가능합니다.', type: 'error' }); return
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: '파일 크기는 최대 5MB까지 가능합니다.', type: 'error' }); return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    set('image', `/images/${file.name}`)
    setDirty(true)
  }

  const handleBack = () => {
    if (dirty && !window.confirm('변경사항을 저장하지 않고 나가시겠습니까?')) return
    navigate('/admin/menus')
  }

  const handleDelete = async () => {
    setShowDeleteConfirm(false)
    try {
      const res = await fetch(`${API_BASE}/api/menus/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      navigate('/admin/menus')
    } catch {
      setToast({ message: '삭제에 실패했습니다.', type: 'error' })
    }
  }

  const handleSave = async () => {
    if (!form.nameKo && !form.krName) {
      setToast({ message: '한국어 이름은 필수입니다.', type: 'error' }); return
    }
    setSaving(true)
    const body = {
      krName:    form.krName || form.nameKo,
      image:     form.image,
      bgColor:   form.bgColor,
      nameKo:    form.nameKo,
      nameEn:    form.nameEn,
      nameJa:    form.nameJa,
      nameZh:    form.nameZh,
      descKo:    form.descKo,
      descEn:    form.descEn,
      descJa:    form.descJa,
      descZh:    form.descZh,
      price:     Number(form.price) || 0,
      isVegan:   form.isVegan,
      isNoPork:  form.isNoPork,
      isBeef:    form.isBeef,
      isSpicy:   form.isSpicy,
      isPopular: form.isPopular,
      allergens: form.allergens,
      enabled:   form.enabled,
    }
    try {
      const url = isNew ? `${API_BASE}/api/menus` : `${API_BASE}/api/menus/${id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setDirty(false)
      setToast({ message: '저장되었습니다.', type: 'success' })
      setTimeout(() => navigate('/admin/menus'), 1200)
    } catch {
      setToast({ message: '저장에 실패했습니다. 다시 시도해주세요.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const canSave = (form.nameKo || form.krName) && form.price !== ''

  const Toggle = ({ field }) => (
    <button
      className={`toggle-switch${form[field] ? ' on' : ''}`}
      onClick={() => set(field, !form[field])}
      type="button"
    />
  )

  return (
    <div className="admin-page">
      <AdminHeader
        title={isNew ? '메뉴 추가' : '메뉴 수정'}
        left={
          <button className="admin-icon-btn" onClick={handleBack}>←</button>
        }
        right={
          !isNew && (
            <button className="admin-icon-btn" onClick={() => setShowDeleteConfirm(true)}>🗑</button>
          )
        }
      />

      {/* 이미지 영역 */}
      <div className="edit-image-area" onClick={() => fileRef.current?.click()}>
        {previewUrl && <img src={previewUrl} alt="preview" />}
        <div className="edit-image-overlay">
          <span className="upload-icon">☁️</span>
          <span className="upload-text">이미지 업로드</span>
          <span className="upload-hint">PNG, JPG (최대 5MB)</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      <div className="edit-form">
        {/* 다국어 이름 */}
        {[
          { key: 'nameKo', label: '한국어' },
          { key: 'nameEn', label: '영어' },
          { key: 'nameJa', label: '일본어' },
          { key: 'nameZh', label: '중국어(간체)' },
        ].map(({ key, label }) => (
          <div key={key} className="edit-field">
            <label>{label}</label>
            <input
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              placeholder={label}
            />
          </div>
        ))}

        {/* 가격 */}
        <div className="edit-field">
          <label>가격(원)</label>
          <div className="price-input-wrap">
            <span className="price-prefix">₩</span>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        {/* 식단 토글 */}
        <div className="admin-card">
          <div className="toggle-rows">
            {[
              { field: 'isVegan',   icon: '🌿', label: '비건' },
              { field: 'isNoPork',  icon: '❌', label: '돼지고기 없음' },
              { field: 'isBeef',    icon: '🥩', label: '소고기 포함' },
              { field: 'isSpicy',   icon: '🌶', label: '매움' },
              { field: 'isPopular', icon: '⭐', label: '인기 메뉴' },
            ].map(({ field, icon, label }) => (
              <div key={field} className="toggle-row">
                <span className="toggle-label">
                  <span className="t-icon">{icon}</span>{label}
                </span>
                <Toggle field={field} />
              </div>
            ))}
          </div>
        </div>

        {/* 저장 버튼 */}
        <button
          className="admin-save-btn"
          disabled={!canSave || saving}
          onClick={handleSave}
        >
          {saving ? '저장 중...' : isNew ? '메뉴 등록' : '변경사항 저장'}
        </button>
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          message={`'${form.nameKo || form.krName}' 메뉴를 삭제하시겠습니까?`}
          confirmLabel="삭제"
          cancelLabel="취소"
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
