const CATEGORY_COLORS = {
  'Nighttime':                '#F59E0B',
  'Parades':                  '#8B5CF6',
  'Atmosphere Entertainment': '#14B8A6',
  'Events':                   '#10B981',
  'Shows':                    '#3B82F6',
  'Characters':               '#EC4899',
}

const THUMBNAIL_STYLE = {
  width: 56,
  height: 56,
  borderRadius: 10,
  flexShrink: 0,
  objectFit: 'cover',
}

function Thumbnail({ show }) {
  if (show.imageUrl) {
    return (
      <img
        src={show.imageUrl}
        alt=""
        style={THUMBNAIL_STYLE}
      />
    )
  }

  const bg = CATEGORY_COLORS[show.category] ?? '#64748B'
  const initial = show.name?.[0]?.toUpperCase() ?? '?'
  return (
    <div style={{
      ...THUMBNAIL_STYLE,
      backgroundColor: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      fontWeight: 700,
      color: '#ffffff',
      fontFamily: 'var(--font-body)',
    }}>
      {initial}
    </div>
  )
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
    timeZone: 'America/Los_Angeles',
  })
}

function getNextShowtime(showtimes) {
  const cutoff = Date.now() - 10 * 60 * 1000
  return showtimes.find(t => new Date(t).getTime() >= cutoff) ?? null
}

export default function ShowCard({ show, onSelect }) {
  const nextShowtime = getNextShowtime(show.showtimes)
  const allTimes = show.showtimes.map(formatTime).join(' · ')

  return (
    <button
      onClick={() => onSelect(show)}
      className="w-full text-left flex items-center"
      style={{
        gap: 14,
        padding: '12px 16px',
        marginBottom: 8,
        backgroundColor: 'var(--color-surface)',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        border: 'none',
      }}
    >
      <Thumbnail show={show} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: '1.3',
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {show.name}
        </div>

        {nextShowtime && (
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-accent)',
            marginBottom: 3,
          }}>
            {formatTime(nextShowtime)}
          </div>
        )}

        <div style={{
          fontSize: 12,
          color: 'var(--color-text-secondary)',
          marginBottom: show.location ? 2 : 0,
        }}>
          {allTimes}
        </div>

        {show.location && (
          <div style={{
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            opacity: 0.75,
          }}>
            {show.location}
          </div>
        )}
      </div>
    </button>
  )
}
