import { Link } from "react-router-dom";
import PromoBanner from "../components/PromoBanner.jsx";
import LiveAuctionCard from "../components/LiveAuctionCard.jsx";
import LotRow from "../components/LotRow.jsx";
import useDemoClock from "../hooks/useDemoClock.js";
import { SCHEDULE } from "../data/schedule.js";
import { SOLD } from "../data/soldLots.js";
import { auctions } from "../data/auctions.js";
import { money } from "../utils/format.js";

// Home page: promo banner, live auctions, featured lots, highest sales.
export default function HomePage() {
  const now = useDemoClock();

  const live = SCHEDULE.filter((a) => a.o <= now && now < a.c).sort((a, b) => a.c - b.c);
  const featured = [...auctions].sort((a, b) => b.bids - a.bids).slice(0, 8)
    .map((a) => ({ key: a.id, to: `/lot/${a.id}`, item: a, title: a.title, price: money(a.bid), sub: `${a.bids} bids` }));
  const sales = [...SOLD].sort((a, b) => b.price - a.price).slice(0, 8)
    .map((a) => ({ key: a.id, to: "/results", item: a, title: a.title, price: money(a.price), sub: `${a.bids} bids`, tag: "SOLD" }));

  return (
    <>
      <PromoBanner />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-baseline">
          <h2 className="h5 fw-bold">Auctions</h2>
          <Link to="/calendar" className="small text-muted">View All Auctions</Link>
        </div>
        <div className="agrid">
          {live.map((a) => (
            <LiveAuctionCard key={a.name} auction={a} now={now} />
          ))}
        </div>
        <LotRow title="Featured" rows={featured} autoplay />
        <LotRow title="Highest Sales" rows={sales} />
      </div>
    </>
  );
}

// Dashboard by default; search text or a chosen category switches to the lot browser.
