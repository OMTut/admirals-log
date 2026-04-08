export default function Header({ onMenuOpen, title = "Admiral Boom's Master's Log" }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 sticky top-0 z-10 shrink-0"
      style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
    >
      <h1 className="text-base font-bold leading-tight">{title}</h1>
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        className="p-3 text-xl leading-none"
      >
        ☰
      </button>
    </header>
  )
}
