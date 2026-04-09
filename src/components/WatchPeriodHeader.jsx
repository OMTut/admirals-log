export default function WatchPeriodHeader({ period }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        className="text-base whitespace-nowrap"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {period}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
    </div>
  )
}
