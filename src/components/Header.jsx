export default function Header({ onMenuOpen }) {
  return (
    <header
      className="flex items-center justify-between px-4 py-2 sticky top-0 z-10 shrink-0"
      style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}
    >
      <img
        src="/ABML_logo.png"
        alt="Admiral Boom's Master's Log"
        className="h-32 w-auto"
      />
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-3xl"
        style={{ color: 'var(--color-text)' }}
      >
        ☰
      </button>
    </header>
  )
}
