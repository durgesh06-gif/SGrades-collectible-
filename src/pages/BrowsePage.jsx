import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuctionCard from "../components/AuctionCard.jsx";
import CategoryStrip from "../components/CategoryStrip.jsx";
import { auctions } from "../data/auctions.js";

// Browse page: search, price filter, sort and category pills for all live lots.
// `query` is the text typed in the header search box (shared via App.jsx).
export default function BrowsePage({ query, setQuery }) {
  const location = useLocation();
  const [active, setActive] = useState(location.state?.cat || "All");
  useEffect(() => { if (location.state?.cat) setActive(location.state.cat); }, [location.state]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("end");

  const q = query.trim().toLowerCase();
  const list = auctions
    .filter((a) => (active === "All" || a.cat === active) && a.title.toLowerCase().includes(q)
      && a.bid >= (Number(min) || 0) && a.bid <= (Number(max) || Infinity))
    .sort((a, b) => ({ lo: a.bid - b.bid, hi: b.bid - a.bid, bids: b.bids - a.bids, end: a.hours - b.hours })[sort]);

  const clear = () => { setQuery(""); setMin(""); setMax(""); setSort("end"); setActive("All"); };

  return (
    <>
      <main id="auctions">
        <div className="container pt-4 d-flex align-items-baseline gap-3">
          <h2 className="h3 fw-bold m-0">Live auctions</h2>
          <Link to="/" className="btn btn-link p-0">← Back to dashboard</Link>
        </div>
        <div className="container">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <input className="form-control" type="search" placeholder="Search lots" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="col-6 col-md-2"><input className="form-control" type="number" min="0" placeholder="Min $" value={min} onChange={(e) => setMin(e.target.value)} /></div>
            <div className="col-6 col-md-2"><input className="form-control" type="number" min="0" placeholder="Max $" value={max} onChange={(e) => setMax(e.target.value)} /></div>
            <div className="col-8 col-md-3">
              <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="end">Ending soon</option>
                <option value="lo">Price: low to high</option>
                <option value="hi">Price: high to low</option>
                <option value="bids">Most bids</option>
              </select>
            </div>
            <div className="col-4 col-md-1"><button className="btn btn-outline-dark w-100" onClick={clear}>Clear</button></div>
          </div>
        </div>
        <CategoryStrip active={active} setActive={setActive} />
        <div className="container">
          <div className="small text-muted mb-2">{list.length} of {auctions.length} lots</div>
          {list.length === 0 && <div className="alert alert-light">No lots match. Try a different search or clear the filters.</div>}
          <div className="row g-3">
            {list.map((a) => <AuctionCard key={a.id} item={a} />)}
          </div>
        </div>
      </main>
    </>
  );
}
