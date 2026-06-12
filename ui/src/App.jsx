 import { useState, useEffect } from 'react'
import LanguageSelect from './components/LanguageSelect'
import MenuList from './components/MenuList'
import MenuDetail from './components/MenuDetail'
import OrderSummary from './components/OrderSummary'
import fallbackMenuData from './data/menuData'
import { saveOrder } from './store/orderStore'
import './App.css'

const SCREENS = { LANGUAGE: 'language', MENU: 'menu', DETAIL: 'detail', ORDER: 'order' }
const API_BASE = 'http://localhost:8080'

function App() {
  const [screen, setScreen] = useState(SCREENS.LANGUAGE)
  const [lang, setLang] = useState(() => localStorage.getItem('kimbap_lang') || 'en')
  const [menuData, setMenuData] = useState(fallbackMenuData)
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [cart, setCart] = useState([])

  // 앱 시작 시 메뉴 데이터를 API에서 불러오기, 실패 시 fallback 데이터 사용
  useEffect(() => {
    fetch(`${API_BASE}/api/menus`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setMenuData(data))
      .catch(() => setMenuData(fallbackMenuData))
  }, [])

  // 언어 선택 → 메뉴 화면으로 이동
  const handleSelectLanguage = (code) => {
    setLang(code)
    localStorage.setItem('kimbap_lang', code)
    setScreen(SCREENS.MENU)
  }

  // 메뉴 선택 → 상세 화면으로 이동
  const handleSelectMenu = (item) => {
    setSelectedMenu(item)
    setScreen(SCREENS.DETAIL)
  }

  // 장바구니에 항목 추가 → 주문 화면으로 이동
  const handleAddToCart = (item, quantity) => {
    setCart((prev) => {
      // 이미 장바구니에 있는 항목이면 수량 업데이트, 없으면 새 항목 추가
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        // 수량은 최대 99로 제한
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: Math.min(99, c.quantity + quantity) } : c
        )
      }
      return [...prev, { ...item, quantity }]
    })
    setScreen(SCREENS.ORDER)
  }

  // 장바구니 수량 변경
  const handleUpdateCart = (id, delta) => {
    // 수량은 최대 99로 제한, 0 이하가 되면 장바구니에서 제거
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(99, item.quantity + delta) } : item))
          .filter((item) => item.quantity > 0)
    )
  }

  // 주문 저장 → 관리자 앱과 공유
  const handleSaveOrder = () => {
    saveOrder(cart, lang)   // localStorage에 주문 저장 → 관리자 앱과 공유
  }

  // 주문 확정 → 장바구니 초기화, 메뉴 화면으로 이동
  const handleConfirmOrder = () => {
    setCart([])
    setScreen(SCREENS.MENU)
  }

  return (
    <div className="app">
      {screen === SCREENS.LANGUAGE && (
        <LanguageSelect onSelectLanguage={handleSelectLanguage} />
      )}
      {screen === SCREENS.MENU && (
        <MenuList
          lang={lang}
          cart={cart}
          menuData={menuData}
          onSelectMenu={handleSelectMenu}
          onOpenOrder={() => setScreen(SCREENS.ORDER)}
          onChangeLang={() => setScreen(SCREENS.LANGUAGE)}
        />
      )}
      {screen === SCREENS.DETAIL && selectedMenu && (
        <MenuDetail
          item={selectedMenu}
          lang={lang}
          onBack={() => setScreen(SCREENS.MENU)}
          onAddToCart={handleAddToCart}
        />
      )}
      {screen === SCREENS.ORDER && (
        <OrderSummary
          lang={lang}
          cart={cart}
          onUpdateCart={handleUpdateCart}
          onClearCart={() => setCart([])}
          onBack={() => setScreen(SCREENS.MENU)}
        />
      )}
    </div>
  )
}

export default App
