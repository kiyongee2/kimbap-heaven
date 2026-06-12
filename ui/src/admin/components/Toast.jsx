import { useEffect, useRef } from 'react'

export default function Toast({ message, type = '', onClose }) {
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setTimeout(onClose, 2500)
    return () => clearTimeout(timer.current)
  }, [onClose])

  if (!message) return null
  return <div className={`toast ${type}`}>{message}</div>
}
