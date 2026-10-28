import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Top bar + navigation. To add a page, add a link here and a route in App.jsx.
const AUCTION_MENU = [
  ["Weekly Auctions", "All"],
  ["Elite Auctions", "All"],
  ["Fall Trading Card Auction", "Trading Cards"],
  ["Fall Comics Auction", "Comics"],
  ["Fall Sports Memorabilia Auction", "Sports Memorabilia"],
];

export default function Header({ query, setQuery }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <header className="sticky-top">
      <div className="topbar text-center py-1 small">Consignments open for the Winter Elite auction</div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-ink">
        <div className="container">
          <Link className="navbar-brand brand" to="/">COLLECTA</Link>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle auc-toggle" data-bs-toggle="dropdown" aria-expanded="false">Auctions</button>
                <ul className="dropdown-menu auc-menu">
                  <li><Link className="dropdown-item" to="/browse" state={{ cat: "All" }}>Browse All</Link></li>
                  {AUCTION_MENU.map(([label, cat]) => (
                    <li key={label}>
                      <Link className="dropdown-item" to="/browse" state={{ cat }}>{label}<span className="live">Live</span></Link>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li className="auc-label">Resources</li>
                  <li><Link className="dropdown-item" to="/graded">How It Works</Link></li>
                  <li><Link className="dropdown-item" to="/browse" state={{ cat: "Comics" }}>Comics</Link></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>Mobile App</a></li>
                </ul>
              </li>
              <li className="nav-item"><NavLink className="nav-link" to="/graded">Graded</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/calendar">Calendar</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/results">Results</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/sell">Sell</NavLink></li>
            </ul>
            <form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control form-control-sm" type="search" placeholder="Search players, sets, grades"
                value={query} onChange={(e) => { setQuery(e.target.value); navigate("/browse"); }} />
            </form>
            {user ? (
              <>
                <span className="text-white-50 small me-3">Signed in as {user.name}</span>
                <button className="btn btn-sm btn-outline-light" onClick={() => { logout(); navigate("/"); }}>Log out</button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light me-2" to="/login">Log in</Link>
                <Link className="btn btn-sm btn-gold" to="/login">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
