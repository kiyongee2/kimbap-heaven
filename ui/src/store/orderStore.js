/**
 * orderStore.js
 * localStorage를 통해 고객 앱과 관리자 앱이 주문 데이터를 공유한다.
 */

const ORDERS_KEY  = 'kimbap_orders'
const COUNTER_KEY = 'kimbap_order_counter'

function getNextOrderNumber() {
  const n = parseInt(localStorage.getItem(COUNTER_KEY) || '1000', 10) + 1
  localStorage.setItem(COUNTER_KEY, String(n))
  return n
}

/**
 * 고객이 주문 확정 시 호출. cart 배열을 localStorage에 저장한다.
 * @param {Array}  cart - [{ id, name, price, quantity, emoji }]
 * @param {string} lang - 고객이 선택한 언어 코드
 * @returns 저장된 order 객체
 */
export function saveOrder(cart, lang) {
  const existing = getOrders()
  const order = {
    id:        getNextOrderNumber(),
    timestamp: new Date().toISOString(),
    lang:      lang || 'ko',
    items:     cart.map(({ id, name, price, quantity, emoji }) => ({
      id, name, price, quantity, emoji,
    })),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }
  const updated = [order, ...existing].slice(0, 100) // 최대 100건 보관
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
  return order
}

/** localStorage에서 전체 주문 목록을 반환한다. */
export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  } catch {
    return []
  }
}

/** 오늘 날짜의 주문만 반환한다. */
export function getTodayOrders() {
  const today = new Date().toDateString()
  return getOrders().filter((o) => new Date(o.timestamp).toDateString() === today)
}
