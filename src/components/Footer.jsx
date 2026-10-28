import { useState } from "react";
import { Link } from "react-router-dom";

// Site footer with the newsletter box and link columns.
export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ ok: false, text: "" });

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus({ ok: false, text: "Enter a valid email address." });
    setStatus({ ok: true, text: "You're subscribed to auction alerts." }); // TODO: send to your API
    setEmail("");
  };

  const cols = [
    ["Buy", [["Live auctions", "/browse"], ["Graded items", "/graded"], ["Auction calendar", "/calendar"], ["Results", "/results"], ["How bidding works", "/"], ["Log in", "/login"]]],
    ["Sell", [["Consign an item", "/sell"], ["Selling guide", "/sell"]]],
    ["Company", [["About", "/"], ["Careers", "/"], ["Contact", "/"]]],
  ];

  return (
    <footer className="bg-ink text-white-50 mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="brand text-white mb-2">COLLECTA</div>
            <p>Auctions for serious collectors.</p>
            <form className="d-flex gap-2" onSubmit={subscribe} noValidate>
              <input type="email" className="form-control form-control-sm" placeholder="Email for auction alerts"
                aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn btn-sm btn-gold" type="submit">Subscribe</button>
            </form>
            <div className={`small mt-1 ${status.ok ? "text-success" : "text-danger"}`} aria-live="polite">{status.text}</div>
          </div>
          {cols.map(([h, links]) => (
            <div className="col-6 col-lg-2 offset-lg-0" key={h}>
              <div className="text-white mb-2">{h}</div>
              <ul className="list-unstyled">
                {links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-white-50 text-decoration-none">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="d-flex flex-wrap justify-content-between gap-2 border-top border-secondary mt-4 pt-3 small">
          <span>© {new Date().getFullYear()} Collecta. Demo site, not affiliated with any auction house.</span>
          <span><a href="#" className="text-white-50 me-3">Terms</a><a href="#" className="text-white-50">Privacy</a></span>
        </div>
      </div>
    </footer>
  );
}
