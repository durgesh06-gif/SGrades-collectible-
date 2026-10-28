import { useEffect, useState } from "react";

// A pretend clock that starts on 26 Oct 2026 and ticks every second,
// so the sample auctions always look "live". Replace with Date.now() for real data.
export default function useDemoClock() {
  const [now, setNow] = useState(() => new Date(2026, 9, 26, 12, 0).getTime());
  useEffect(() => {
    const t = setInterval(() => setNow((n) => n + 1000), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
