export default function Header() {
  return (
    <header className="bg-white h-14 shadow-sm px-6 flex items-center justify-between border-b">
      <h1 className="text-xl font-semibold text-sky-600 tracking-tight">
        RouteCrafter
      </h1>
      <nav className="flex space-x-6 text-sm text-gray-600">
        <a href="#" className="hover:text-sky-600">
          Home
        </a>
        <a href="#" className="hover:text-sky-600">
          Features
        </a>
        <a href="#" className="hover:text-sky-600">
          Prices
        </a>
      </nav>
    </header>
  );
}
