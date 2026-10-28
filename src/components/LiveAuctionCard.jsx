import { Link } from "react-router-dom";
import CountdownDigits from "./CountdownDigits.jsx";

// Coloured card for an auction that is open for bidding right now.
// Click it to browse that auction's category.
export default function LiveAuctionCard({ auction, now }) {
  const closes = auction.c.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
  return (
    <Link to="/browse" state={{ cat: auction.cat }} className="acard text-decoration-none" style={{ "--hue": auction.hue }}>
      <span className="tag">Live</span>
      <h3 className="h6">{auction.name}</h3>
      <div style={{ opacity: 0.85 }}>Closes in</div>
      <CountdownDigits to={auction.c} now={now} />
      <div className="small">{closes}, 8:30 AM</div>
    </Link>
  );
}
