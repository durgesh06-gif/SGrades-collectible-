import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LiveAuctionCard from "../components/LiveAuctionCard.jsx";
import useDemoClock from "../hooks/useDemoClock.js";
import { SCHEDULE } from "../data/schedule.js";

// Calendar page: live auctions slider + month-by-month auction schedule.
const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function CalendarPage() {
  const now = useDemoClock();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All auctions");
  const track = useRef(null);


  const list = SCHEDULE.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()) && (type === "All auctions" || a.type === type))
    .sort((a, b) => a.o - b.o);
  const live = list.filter((a) => a.o <= now && now < a.c);
  const months = [...new Set(list.map((a) => a.o.toLocaleDateString("en-US", { month: "long", year: "numeric" })))];
  const scroll = (dir) => track.current.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="container py-4">
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-6"><input className="form-control" type="search" placeholder="Search within auctions" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="col-12 col-md-3">
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            {["All auctions", "Thematic", "Weekly", "Elite"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h2 className="h5 fw-bold m-0">Now live</h2>
        <Link to="/browse" className="small text-muted">View all items</Link>
      </div>
      <div className="sl-wrap mt-2">
        <button className="sl-btn sl-prev" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
        <div className="slider" ref={track}>
          {live.length === 0 && <p className="text-muted">No live auctions match.</p>}
          {live.map((a) => (
            <LiveAuctionCard key={a.name} auction={a} now={now} />
          ))}
        </div>
        <button className="sl-btn sl-next" onClick={() => scroll(1)} aria-label="Next">›</button>
      </div>

      <h2 className="h5 fw-bold mt-4">Auction schedule</h2>
      {list.length === 0 && <p className="text-muted">No auctions match.</p>}
      {months.map((m) => (
        <div key={m}>
          <div className="mh">
            <span className="m">{m}</span><span className="flex-fill" />
            <span className="hc g">Consign by</span><span className="hc d">Open&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close</span><span className="hc t">Type</span>
          </div>
          {list.filter((a) => a.o.toLocaleDateString("en-US", { month: "long", year: "numeric" }) === m).map((a) => (
            <Link key={a.name} to="/browse" state={{ cat: a.cat }} className="crow text-reset text-decoration-none">
              <div className="db" style={{ "--hue": a.hue }}><b>{a.o.getDate()}</b><span>{a.o.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</span></div>
              <div className="cb">
                <div className="cn">{a.name}</div>
                <div className="cg">{a.cb ? fmt(a.cb) : "—"}</div>
                <div className="cd2"><span className="pl"><i />{fmt(a.o)}</span><span className="dots">····</span><span className="pl c"><i />{fmt(a.c)}</span></div>
                <div className="tw"><span className={`ty ${a.type === "Weekly" ? "w" : a.type === "Elite" ? "e" : ""}`}>{a.type}</span></div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
