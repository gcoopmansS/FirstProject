export default function Header() {
  return (
    <header className="bg-sky-100 h-12 flex items-center justify-between px-6 border-b">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">RouteCrafter</h1>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          Features
        </a>
        <a href="#" className="hover:underline">
          Prices
        </a>
      </nav>
    </header>
  );
}
