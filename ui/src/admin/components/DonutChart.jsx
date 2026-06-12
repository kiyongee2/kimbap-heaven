/**
 * 순수 SVG 도넛 차트 (외부 라이브러리 불필요)
 * segments: [{ label, pct, color }]
 */
export default function DonutChart({ segments, size = 120 }) {
  const R = (size / 2) * 0.7
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * R

  let offset = 0
  const slices = segments.map((seg) => {
    const len = (seg.pct / 100) * circumference
    const slice = { ...seg, dashArray: `${len} ${circumference - len}`, dashOffset: -offset }
    offset += len
    return slice
  })

  return (
    <svg className="donut-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* track */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f0f0f0" strokeWidth={size * 0.13} />
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={size * 0.13}
          strokeDasharray={s.dashArray}
          strokeDashoffset={s.dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}
