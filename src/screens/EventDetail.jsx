import { useRef, useEffect } from 'react'
import Header from '../components/Header.jsx'
import ShowImage from '../components/ShowImage.jsx'

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
    timeZone: 'America/Los_Angeles',
  })
}

export default function EventDetail({ show, onBack }) {
  const containerRef = useRef(null)
  const touchStart = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onTouchStart(e) {
      const t = e.touches[0]
      touchStart.current = { x: t.clientX, y: t.clientY }
    }

    function onTouchMove(e) {
      if (!touchStart.current) return
      const dx = e.touches[0].clientX - touchStart.current.x
      const dy = e.touches[0].clientY - touchStart.current.y
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 10) {
        e.preventDefault()
      }
    }

    function onTouchEnd(e) {
      if (!touchStart.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStart.current.x
      const dy = t.clientY - touchStart.current.y
      touchStart.current = null
      if (dx > 60 && dx > Math.abs(dy) * 1.5) onBack()
    }

    function onTouchCancel() { touchStart.current = null }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchCancel, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [onBack])

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Header />

      <div className="flex-1 overflow-y-auto overscroll-y-none" style={{ touchAction: 'pan-y' }}>
        <button
          onClick={onBack}
          className="px-4 py-3 text-sm text-left w-full border-b min-h-[44px] flex items-center"
          style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
        >
          ← Back
        </button>

        <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
          {/* Show name & meta */}
          <div>
            <h2 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
              {show.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {show.location && (
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {show.location}
                </p>
              )}
              {show.duration && (
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {show.location && <span style={{ marginRight: 12 }}>·</span>}
                  Duration: {show.duration} min
                </p>
              )}
            </div>
            {show.preciseLocation && (
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {show.preciseLocation}
              </p>
            )}
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-accent)' }}>
              {show.category}
            </p>
          </div>

          {/* All showtimes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Showtimes
            </p>
            <div className="flex flex-wrap gap-2">
              {show.showtimes.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {formatTime(t)}
                </span>
              ))}
            </div>
          </div>

          {/* Description (when API provides it) */}
          {show.description && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
              {show.description}
            </p>
          )}

          {/* Image */}
          <ShowImage imageUrl={show.imageUrl} showName={show.name} />
        </div>
      </div>
    </div>
  )
}
