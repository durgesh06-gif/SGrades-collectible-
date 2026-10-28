// Single lot page (route /lot/:id) with the bid box. Bidding needs a login.
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Art from "../components/Art.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { auctions } from "../data/auctions.js";
import { money } from "../utils/format.js";

export default function LotDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const item = auctions.find((a) => a.id === Number(id));
  const [bid, setBid] = useState(item?.bid || 0);
  const [bids, setBids] = useState(item?.bids || 0);
  const [current, setCurrent] = useState(item?.bid || 0);
  const [msg, setMsg] = useState({ type: "", text: "" });

  if (!item)
    return <div className="container py-5"><p>Lot not found.</p><Link to="/browse">Back to auctions</Link></div>;

  const inc = current >= 50000 ? 1000 : current >= 10000 ? 500 : 100;
  const min = current + inc;
  const grade = (item.title.match(/(PSA|BGS|CGC) [\d.]+/) || ["Authenticated"])[0];

  const place = () => {
    if (!user) return setMsg({ type: "warning", text: "Log in to place a bid." });
    const v = Number(bid);
    if (!(v >= min)) return setMsg({ type: "danger", text: `Bid must be at least ${money(min)}.` });
    setCurrent(v); setBids(bids + 1); setBid(v + inc);
    setMsg({ type: "success", text: `Bid placed: ${money(v)}. You are the highest bidder.` });
  };

  return (
    <div className="container py-4">
      <Link to="/browse" className="text-muted text-decoration-none">← Back to auctions</Link>
      <div className="row g-4 mt-1">
        <div className="col-md-6">
          <div className="ph ratio ratio-1x1 rounded" style={{ "--hue": item.hue }}><Art item={item} /></div>
        </div>
        <div className="col-md-6">
          <div className="text-muted">{item.cat}, lot #{item.id}</div>
          <h1 className="h3 fw-bold">{item.title}</h1>
          <div className="text-muted small">Current bid</div>
          <div className="display-6 fw-bold">{money(current)}</div>
          <div className="text-muted">{bids} bids, ends in {item.hours} hours</div>
          <label className="form-label mt-3" htmlFor="bid">Your bid ($, minimum {money(min)})</label>
          <input id="bid" type="number" className="form-control" value={bid} onChange={(e) => setBid(e.target.value)} />
          {msg.text && <div className={`alert alert-${msg.type} py-2 mt-2`}>{msg.text}</div>}
          {user ? (
            <button className="btn btn-gold w-100 mt-2" onClick={place}>Place bid</button>
          ) : (
            <Link to="/login" state={{ from: `/lot/${item.id}`, reason: "Log in to place a bid." }} className="btn btn-gold w-100 mt-2">Log in to place a bid</Link>
          )}
          <table className="table mt-4">
            <tbody>
              <tr><td className="text-muted">Category</td><td>{item.cat}</td></tr>
              <tr><td className="text-muted">Grade</td><td>{grade}</td></tr>
              <tr><td className="text-muted">Lot number</td><td>{item.id}</td></tr>
              <tr><td className="text-muted">Bids</td><td>{bids}</td></tr>
            </tbody>
          </table>
          <p className="text-muted small">Sample listing. Replace this with the seller's provenance, condition notes and certification details.</p>
        </div>
      </div>
    </div>
  );
}
