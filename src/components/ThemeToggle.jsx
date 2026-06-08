import { useTheme } from "../lib/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 text-[var(--color-gold)]" /> : <Moon className="h-4 w-4 text-[var(--color-gold)]" />}
    </button>
  );
}
