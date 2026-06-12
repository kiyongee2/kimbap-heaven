const BADGE_MAP = {
  popular: { icon: '⭐', label: '인기',         cls: 'badge-popular' },
  noPork:  { icon: '❌', label: '돼지고기 없음', cls: 'badge-nopork'  },
  spicy:   { icon: '🌶', label: '매움',          cls: 'badge-spicy'   },
  vegan:   { icon: '🌿', label: '비건',          cls: 'badge-vegan'   },
  beef:    { icon: '🥩', label: '소고기 포함',   cls: 'badge-beef'    },
}

export default function DietaryBadge({ type }) {
  const b = BADGE_MAP[type]
  if (!b) return null
  return (
    <span className={`badge ${b.cls}`}>
      {b.icon} {b.label}
    </span>
  )
}
