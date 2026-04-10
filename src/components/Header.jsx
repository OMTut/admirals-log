export default function Header({ onMenuOpen, title }) {
  return (
    <header
      className="flex items-center px-4 py-2 sticky top-0 z-10 shrink-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      {/* Menu button — shown on screens that don't have a bottom bar */}
      {onMenuOpen && (
        <button
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-3xl shrink-0"
          style={{ color: 'var(--color-text)' }}
        >
          ☰
        </button>
      )}

      {title && (
        <span
          className="flex-1 text-center text-base font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </span>
      )}

      {/* Spacer to balance the menu button and keep title centered */}
      {onMenuOpen && <div className="min-w-[44px]" />}
    </header>
  )
}
