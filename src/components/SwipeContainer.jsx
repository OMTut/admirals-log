import { useRef } from 'react'

export default function SwipeContainer({ children, currentIndex, onSwipeLeft, onSwipeRight }) {
  const dragStart = useRef(null)

  // --- Touch handlers (mobile) ---
  function handleTouchStart(e) {
    const t = e.touches[0]
    dragStart.current = { x: t.clientX, y: t.clientY }
  }

  function handleTouchEnd(e) {
    if (!dragStart.current) return
    const t = e.changedTouches[0]
    evaluate(t.clientX - dragStart.current.x, t.clientY - dragStart.current.y)
    dragStart.current = null
  }

  // --- Mouse handlers (desktop testing) ---
  function handleMouseDown(e) {
    dragStart.current = { x: e.clientX, y: e.clientY }
  }

  function handleMouseUp(e) {
    if (!dragStart.current) return
    evaluate(e.clientX - dragStart.current.x, e.clientY - dragStart.current.y)
    dragStart.current = null
  }

  function evaluate(dx, dy) {
    if (Math.abs(dx) <= Math.abs(dy) * 1.5 || Math.abs(dx) <= 60) return
    if (dx < 0) onSwipeLeft?.()
    else onSwipeRight?.()
  }

  return (
    <div className="overflow-hidden w-full h-full select-none">
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </div>
  )
}
