export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div aria-hidden className="h-8 w-8 rounded-md bg-blue-600" />
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            Expense-Tracker
          </span>
        </a>
      </div>
    </header>
  );
}
