import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Art from "./Art.jsx";

// A titled row of lots that slides sideways. `rows` is a list of
// { key, to, item, title, price, sub, tag }.
export default function LotRow({ title, rows, autoplay }) {
  const track = useRef(null);
  const paused = useRef(false);

  const slide = (dir) => {
    const el = track.current;
    const step = el.firstChild.getBoundingClientRect().width + 12;
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!paused.current) slide(1); }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mt-4" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <h2 className="h5 fw-bold">{title}</h2>
      <div className="sl-wrap">
        <button className="sl-btn sl-prev" onClick={() => slide(-1)} aria-label="Previous lots">‹</button>
        <div className="slider" ref={track}>
          {rows.map((r) => (
            <Link key={r.key} to={r.to} className="slide text-reset text-decoration-none">
              <div className="ph ratio ratio-1x1" style={{ "--hue": r.item.hue }}>
                <Art item={r.item} />{r.tag && <span className="ended-tag">{r.tag}</span>}
              </div>
              <div className="p-2">
                <div className="lot-title small">{r.title}</div>
                <strong>{r.price}</strong> <span className="small text-muted">{r.sub}</span>
              </div>
            </Link>
          ))}
        </div>
        <button className="sl-btn sl-next" onClick={() => slide(1)} aria-label="Next lots">›</button>
      </div>
    </section>
  );
}
