import { useState } from 'react'

const ADMIN_ID = 'admin'
const ADMIN_PW = 'admin1234'

export default function Login({ onLogin }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (id === ADMIN_ID && pw === ADMIN_PW) {
        sessionStorage.setItem('admin_auth', '1')
        onLogin()
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="login-screen">
      <div className="login-brand">
        <div className="login-logo">🍱</div>
        <h1 className="login-title">Kimbap Admin</h1>
        <p className="login-subtitle">명동김밥 관리자 페이지</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="login-field">
          <label htmlFor="admin-id">아이디</label>
          <input
            id="admin-id"
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </div>

        <div className="login-field">
          <label htmlFor="admin-pw">비밀번호</label>
          <div className="login-pw-wrap">
            <input
              id="admin-pw"
              type={showPw ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-pw-toggle"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button
          type="submit"
          className="login-btn"
          disabled={loading || !id || !pw}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  )
}
