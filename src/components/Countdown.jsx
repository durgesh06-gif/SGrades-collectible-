import { useEffect, useState } from "react";

// Small live countdown (e.g. "2d 04:10:33") used on lot cards.
export default function Countdown({ hours }) {
  const [secs, setSecs] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (x) => String(x).padStart(2, "0");
  return <span className="countdown">{d > 0 && `${d}d `}{pad(h)}:{pad(m)}:{pad(s)}</span>;
}
