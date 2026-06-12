import { useState } from 'react';
import translations from '../i18n';

const ALLERGEN_BADGE = {
  fish:      { icon: '🐟', color: '#1565C0', bg: '#E3F2FD' },
  egg:       { icon: '🥚', color: '#F57F17', bg: '#FFFDE7' },
  dairy:     { icon: '🥛', color: '#6A1B9A', bg: '#F3E5F5' },
  shellfish: { icon: '🦐', color: '#E65100', bg: '#FFF3E0' },
};

// 메뉴 상세 화면 컴포넌트
function MenuDetail({ item, lang, onBack, onAddToCart }) {
  const t = translations[lang];
  const [quantity, setQuantity] = useState(1);

  // "장바구니에 추가" 버튼 클릭 → 주문 화면으로 이동
  const handleAdd = () => {
    onAddToCart(item, quantity);
  };

  return (
    <div className="detail-screen">
      {/* Header */}
      <header className="detail-header">
        <button className="icon-btn" onClick={onBack} aria-label={t.back}>
          ☰
        </button>
        <span className="detail-header-title">{item.name[lang]}</span>
        <span style={{ width: 40 }} />
      </header>

      {/* Hero Image */}
      <div className="detail-image" style={{ backgroundColor: item.bgColor }}>
        {item.image
          ? <img src={item.image} alt={item.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span className="detail-emoji">{item.emoji}</span>
        }
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="detail-name-row">
          <h1 className="detail-name">{item.name[lang]}</h1>
          <span className="detail-price">₩{item.price.toLocaleString()}</span>
        </div>
        <p className="detail-desc">{item.description[lang]}</p>

        {/* Dietary Info */}
        <div className="detail-section">
          <h3 className="section-label">{t.dietaryInfo}</h3>
          <div className="dietary-badges">
            {item.allergens.map((allergen) => {
              const key = allergen.toLowerCase();
              const badge = ALLERGEN_BADGE[key] ?? { icon: '⚠️', color: '#757575', bg: '#F5F5F5' };
              return (
                <span
                  key={allergen}
                  className="dietary-badge"
                  style={{ backgroundColor: badge.bg, color: badge.color }}
                >
                  {badge.icon}&nbsp;{t.allergens?.[key] ?? allergen}
                </span>
              );
            })}

            <span
              className="dietary-badge"
              style={
                item.dietary.spicy
                  ? { backgroundColor: '#FFEBEE', color: '#C62828' }
                  : { backgroundColor: '#E8F5E9', color: '#2E7D32' }
              }
            >
              {item.dietary.spicy ? t.dietary?.spicy : t.dietary?.notSpicy}
            </span>

            {item.dietary.noPork && (
              <span className="dietary-badge" style={{ backgroundColor: '#FFEBEE', color: '#C62828' }}>
                {t.dietary?.noPork}
              </span>
            )}
            {item.dietary.vegan && (
              <span className="dietary-badge" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                {t.dietary?.vegan}
              </span>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div className="detail-section">
          <h3 className="section-label">{t.quantity}</h3>
          <div className="quantity-control">
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease"
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              aria-label="Increase"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="subtotal-row">
          <span className="subtotal-label">{t.total}</span>
          <span className="subtotal-value">₩{(item.price * quantity).toLocaleString()}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="detail-footer">
        <button className="add-btn" onClick={handleAdd}>
          🛍️&nbsp;&nbsp;{t.addToOrder}
        </button>
      </div>


    </div>
  );
}

export default MenuDetail;
