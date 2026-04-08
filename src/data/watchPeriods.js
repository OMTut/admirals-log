export const WATCH_PERIODS = [
  { name: 'Middle Watch',    start: 0,  end: 4  },
  { name: 'Morning Watch',   start: 4,  end: 8  },
  { name: 'Forenoon Watch',  start: 8,  end: 12 },
  { name: 'Afternoon Watch', start: 12, end: 16 },
  { name: 'First Dog Watch', start: 16, end: 18 },
  { name: 'Last Dog Watch',  start: 18, end: 20 },
  { name: 'First Watch',     start: 20, end: 24 },
]

export function getWatchPeriod(isoString) {
  const hour = new Date(isoString).getHours()
  return (
    WATCH_PERIODS.find(p => hour >= p.start && hour < p.end)?.name ?? 'First Watch'
  )
}

export function groupShowsByWatchPeriod(shows) {
  const groups = {}

  shows.forEach(show => {
    const period = getWatchPeriod(show.showtimes[0])
    if (!groups[period]) groups[period] = []
    groups[period].push(show)
  })

  // Sort shows within each group chronologically
  Object.values(groups).forEach(g =>
    g.sort((a, b) => new Date(a.showtimes[0]) - new Date(b.showtimes[0]))
  )

  // Return groups in watch-period order, skipping empty periods
  return WATCH_PERIODS
    .filter(p => groups[p.name]?.length > 0)
    .map(p => ({ period: p.name, shows: groups[p.name] }))
}
