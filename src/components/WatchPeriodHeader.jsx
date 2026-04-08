export default function WatchPeriodHeader({ period }) {
  return (
    <div
      className="px-4 py-2 border-b text-xs font-bold uppercase tracking-widest sticky top-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {period}
    </div>
  )
}
