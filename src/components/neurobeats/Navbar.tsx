import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/neurobeats/Logo";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "How It Works", href: "#philosophy", isRoute: false },
  { label: "Science", href: "#science", isRoute: false },
  { label: "Demo", href: "#demo", isRoute: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isRoute: boolean) => {
    if (isRoute) return;

    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-nav border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <Logo size={36} showText />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-muted-foreground/80 hover:text-foreground transition-all duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() =>
                  handleNavClick(link.href, link.isRoute)
                }
                className="text-sm text-muted-foreground/80 hover:text-foreground transition-all duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            )
          )}
        </div>

        {/* Auth + Mobile */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block px-4 py-2 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-all duration-300 relative group"
          >
            Login
            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            Sign Up
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-card border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 space-y-3">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() =>
                  handleNavClick(link.href, link.isRoute)
                }
                className="block w-full text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            )
          )}

          <Link
            to="/login"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="block py-2 text-foreground/80 hover:text-foreground transition-colors sm:hidden"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
