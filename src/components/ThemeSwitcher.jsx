// Floating "Theme" button. Theme colours live in styles/App.css.
import { useEffect, useState } from "react";

export const THEMES = [
  { id: "classic", name: "Classic", a: "#111318", b: "#c9a24b" },
  { id: "midnight", name: "Midnight", a: "#05060a", b: "#c9a24b" },
]

const read = () => { try { return localStorage.getItem("theme") || "classic"; } catch { return "classic"; } };

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(read);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  return (
    <div className="theme-fab">
      {open && (
        <div className="theme-panel">
          {THEMES.map((t) => (
            <button key={t.id} className="theme-opt" aria-pressed={theme === t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}>
              <span className="sw" style={{ background: `linear-gradient(135deg, ${t.a} 50%, ${t.b} 50%)` }} />
              {t.name}
            </button>
          ))}
        </div>
      )}
      <button className="theme-btn" onClick={() => setOpen(!open)} aria-expanded={open}>Theme</button>
    </div>
  );
}
