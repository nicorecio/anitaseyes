import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          anitas<span className="text-muted-foreground">.eyes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <Link to="/" className="hover:text-muted-foreground transition">Tienda</Link>
          <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer" className="hover:text-muted-foreground transition">Instagram</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
