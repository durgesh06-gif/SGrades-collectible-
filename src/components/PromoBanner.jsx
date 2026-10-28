import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Art from "./Art.jsx";
import { getLot } from "../data/auctions.js";

// Sliding promo banner at the top of the home page. Edit PROMOS to change the slides.
const PROMOS = [
  { title: "Fall Game-Used", head: "Now Open", note: "Closes November 7th", cat: "Sports Memorabilia", hue: 28,
    items: [6, 9] },
  { title: "Fall Comics Auction", head: "Now Open", note: "Closes November 2nd", cat: "Comics", hue: 280,
    items: [4, 8] },
  { title: "Elite Auction #11", head: "Opens Nov 3", note: "Elite trading cards", cat: "Trading Cards", hue: 215,
    items: [1, 2] },
];

export default function PromoBanner() {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const go = (d) => setI((x) => (x + d + PROMOS.length) % PROMOS.length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!paused.current) go(1); }, 5000);
    return () => clearInterval(t);
  }, []);
  const p = PROMOS[i];
  return (
    <div className="promo-band" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <button className="pa pa-l" onClick={() => go(-1)} aria-label="Previous promotion">‹</button>
      <div className="promo" style={{ background: `linear-gradient(120deg, hsl(${p.hue} 75% 36%), hsl(${p.hue + 22} 85% 52%))` }}>
        <div className="pt">
          <div className="pk">{p.title}</div>
          <div className="ph1">{p.head}</div>
          <div className="pn">{p.note}</div>
          <Link to="/browse" state={{ cat: p.cat }} className="btn btn-dark rounded-pill px-4">Bid Now</Link>
        </div>
        <div className="pr">{p.items.map((id) => <Art key={id} item={getLot(id)} />)}</div>
        <div className="pd">{PROMOS.map((_, k) => <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Promotion ${k + 1}`} />)}</div>
      </div>
      <button className="pa pa-r" onClick={() => go(1)} aria-label="Next promotion">›</button>
    </div>
  );
}
