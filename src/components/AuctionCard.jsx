import { useState } from "react";
import { Link } from "react-router-dom";
import Art from "./Art.jsx";
import Countdown from "./Countdown.jsx";
import { money } from "../utils/format.js";

// One lot in the Browse grid.
export default function AuctionCard({ item }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="col-6 col-md-4 col-xl-3">
      <div className="card lot h-100">
        <Link to={`/lot/${item.id}`} className="ph ratio ratio-1x1 d-block" style={{ "--hue": item.hue }}>
          <Art item={item} />
          <button className="save btn btn-light btn-sm" onClick={(e) => { e.preventDefault(); setSaved(!saved); }} aria-label="Save lot">
            {saved ? "♥" : "♡"}
          </button>
        </Link>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title lot-title"><Link to={`/lot/${item.id}`} className="text-reset text-decoration-none">{item.title}</Link></h6>
          <div className="mt-auto">
            <div className="d-flex justify-content-between small text-muted">
              <span>{item.bids} bids</span><Countdown hours={item.hours} />
            </div>
            <div className="fw-bold fs-5">{money(item.bid)}</div>
            <Link to={`/lot/${item.id}`} className="btn btn-dark btn-sm w-100 mt-2">Place bid</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
