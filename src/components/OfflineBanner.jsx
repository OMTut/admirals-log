export default function OfflineBanner({ isOffline, lastFetched }) {
  if (!isOffline) return null

  const timeLabel = lastFetched
    ? new Date(lastFetched).toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true,
      })
    : 'unknown time'

  return (
    <div className="bg-amber-100 border-b border-amber-300 text-amber-800 text-xs text-center py-2 px-4 shrink-0">
      Showing cached data from {timeLabel}
    </div>
  )
}
