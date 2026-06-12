import { useState } from 'react';
import translations from '../i18n';

const TAG_CONFIG = {
  noPork:  { icon: '🚫', color: '#C62828', bg: '#FFEBEE' },
  beef:    { icon: '🥩', color: '#4E342E', bg: '#EFEBE9' },
  spicy:   { icon: '🌶️', color: '#E53935', bg: '#FFEBEE' },
  popular: { icon: '⭐', color: '#F57F17', bg: '#FFFDE7' },
};

// 메뉴 리스트 화면 컴포넌트
function MenuList({ lang, cart, menuData, onSelectMenu, onOpenOrder, onChangeLang }) {
  const t = translations[lang]; // 현재 언어에 맞는 번역 객체
  const [search, setSearch] = useState('');

  // 장바구니에 담긴 총 수량 계산
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 검색어에 따라 메뉴 필터링
  const filtered = menuData.filter((item) => {
    const q = search.toLowerCase();
    return (
      // 이름이나 설명에 검색어가 포함된 항목만 표시
      item.name[lang].toLowerCase().includes(q) ||
      item.description[lang].toLowerCase().includes(q)
    );
  });

  return (
    <div className="menu-screen">
      {/* Header */}
      <header className="menu-header">
        <span className="menu-header-brand">🍱 Myeongdong Kimbap</span>
        <button className="lang-change-btn" onClick={onChangeLang}>
          🌐&nbsp;{lang.toUpperCase()}
        </button>
      </header>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>
            ✕
          </button>
        )}
      </div>

      {/* Menu List */}
      <div className="menu-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: 40 }}>🔍</span>
            <p>{t.noItems}</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="menu-card" onClick={() => onSelectMenu(item)}>
              <div className="menu-card-img" style={{ backgroundColor: item.bgColor }}>
                {item.image
                  ? <img src={item.image} alt={item.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span>{item.emoji}</span>
                }
              </div>
              <div className="menu-card-info">
                <h3 className="menu-card-name">{item.name[lang]}</h3>
                <p className="menu-card-desc">{item.description[lang]}</p>
              </div>
              <div className="menu-card-price">₩{item.price.toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-btn active">
          <span className="nav-icon">🍽️</span>
          <span>{t.menu}</span>
        </button>
        <button className="nav-btn" onClick={onOpenOrder}>
          <span className="nav-icon-wrap">
            <span className="nav-icon">🛍️</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
          <span>{t.order}</span>
        </button>
        <button className="nav-btn" onClick={onChangeLang}>
          <span className="nav-icon">🌐</span>
          <span>{t.language}</span>
        </button>
      </nav>
    </div>
  );
}

export default MenuList;
