import { useState } from 'react';
import translations from '../i18n';

// 주문 요약 화면 컴포넌트
function OrderSummary({ lang, cart, onUpdateCart, onClearCart, onBack }) {
  const t = translations[lang];
  const [showDialog, setShowDialog] = useState(false);

  // 주문 총액 계산
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-screen">
      {/* Header */}
      <header className="order-header">
        <button className="icon-btn" onClick={onBack} aria-label={t.back}>☰</button>
        <h2>{t.yourOrder}</h2>
        {cart.length > 0 && (
          <button className="icon-btn clear-icon" onClick={() => setShowDialog(true)} aria-label={t.clearAll}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        )}
        {cart.length === 0 && <span style={{ width: 40 }} />}
      </header>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="empty-cart">
          <span className="empty-icon">🛍️</span>
          <p className="empty-title">{t.emptyCart}</p>
          <p className="empty-sub">{t.addItems}</p>
          <button className="back-to-menu-btn" onClick={onBack} aria-label={t.menu}>
            ☰ {t.menu}
          </button>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="order-list">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-img" style={{ backgroundColor: item.bgColor }}>
                  {item.image
                    ? <img src={item.image} alt={item.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    : item.emoji}
                </div>
                <div className="order-item-info">
                  <p className="order-item-name">{item.name[lang]}</p>
                  <div className="order-item-qty">
                    <button className="qty-sm-btn" onClick={() => onUpdateCart(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button className="qty-sm-btn" onClick={() => onUpdateCart(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <span className="order-item-price">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="order-total">
            <span>{t.total}</span>
            <span className="order-total-value">₩{total.toLocaleString()}</span>
          </div>

          {/* Staff Panel */}
          <div className="staff-panel">
            <div className="staff-panel-header">
              <span>👨‍💼</span>
              <span>{t.showToStaff}</span>
            </div>
            <div className="staff-panel-body">
              {cart.map((item) => (
                <div key={item.id} className="staff-item-kr">
                  {item.krName}&nbsp;{item.quantity}개
                </div>
              ))}
            </div>
          </div>


        </>
      )}

      {/* Clear All Dialog */}
      {showDialog && (
        <div className="dialog-overlay" onClick={() => setShowDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <p>{t.clearAll}?</p>
            <div className="dialog-btns">
              <button onClick={() => setShowDialog(false)} aria-label={t.cancel}>{t.cancel}</button>
              <button
                className="dialog-confirm"
                onClick={() => {
                  onClearCart();
                  setShowDialog(false);
                }}
              >
                {t.clearAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
