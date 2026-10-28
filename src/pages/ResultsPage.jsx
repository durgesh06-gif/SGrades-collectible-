import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Art from "../components/Art.jsx";
import { SOLD } from "../data/soldLots.js";
import { money } from "../utils/format.js";

// Results page: sold lots with sidebar filters, sorting, paging and list/grid view.
// Click a card to open a pop-up with the lot's specifications.
const AUCTIONS = ["Weekly Auction 193", "Weekly Auction 194", "Elite Auction #10", "Summer Comics Auction", "Summer Coin & Currency Auction"];

const fmtEnd = (d) => d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", year: "2-digit" }) +
  ", " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const SORTS = { hi: ["Highest Price", (a, b) => b.price - a.price], lo: ["Lowest Price", (a, b) => a.price - b.price],
  bids: ["Most Bids", (a, b) => b.bids - a.bids], recent: ["Recently Ended", (a, b) => b.end - a.end] };
const NONE = { sel: [], offers: false, ymin: "", ymax: "", pmin: "", pmax: "" };

export default function ResultsPage() {
  const [f, setF] = useState(NONE);
  const [draft, setDraft] = useState({ ymin: "", ymax: "", pmin: "", pmax: "" });
  const [sold, setSold] = useState(true);
  const [sort, setSort] = useState("hi");
  const [per, setPer] = useState(6);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("auction");
  const [q, setQ] = useState("");
  const [saved, setSaved] = useState({});
  const [hist, setHist] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState(null); // the card that was clicked (shown in the pop-up)

  // Esc closes the pop-up, and the page behind it stops scrolling while it is open
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const change = (patch) => { setF({ ...f, ...patch }); setPage(1); };
  const clear = () => { setF(NONE); setDraft({ ymin: "", ymax: "", pmin: "", pmax: "" }); setSold(true); setQ(""); setPage(1); };

  const list = SOLD.filter((a) =>
    (!f.sel.length || f.sel.includes(a.auction)) && (!f.offers || a.offers) &&
    (!f.ymin || a.year >= +f.ymin) && (!f.ymax || a.year <= +f.ymax) &&
    (!f.pmin || a.price >= +f.pmin) && (!f.pmax || a.price <= +f.pmax) &&
    a.title.toLowerCase().includes(q.toLowerCase())).sort(SORTS[sort][1]);
  const pages = Math.max(1, Math.ceil(list.length / per));
  const shown = list.slice((page - 1) * per, page * per);

  const chips = [];
  if (sold) chips.push(["Sold Items", () => setSold(false)]);
  f.sel.forEach((i) => chips.push([AUCTIONS[i], () => change({ sel: f.sel.filter((x) => x !== i) })]));
  if (f.offers) chips.push(["Allows Offers", () => change({ offers: false })]);
  if (f.ymin || f.ymax) chips.push([`Year ${f.ymin || "any"} to ${f.ymax || "any"}`, () => change({ ymin: "", ymax: "" })]);
  if (f.pmin || f.pmax) chips.push([`Price ${f.pmin || "any"} to ${f.pmax || "any"}`, () => change({ pmin: "", pmax: "" })]);

  // Min / Max filter box. Called like a function (not <Range />) so the inputs keep focus while typing.
  const range = (label, a, b) => (
    <div className="border-top py-3">
      <div className="small fw-semibold mb-2">{label}</div>
      {[[a, "Min"], [b, "Max"]].map(([k, p]) => (
        <input key={k} className="form-control form-control-sm mb-2" type="number" placeholder={p} value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
      ))}
      <button className="btn btn-link btn-sm p-0" onClick={() => change({ [a]: draft[a], [b]: draft[b] })}>Apply filter</button>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 m-0">Results</h1>
        <div className="d-flex gap-2">
          <Link to="/browse" className="btn btn-sm btn-outline-dark rounded-pill">View Live Items</Link>
          <Link to="/calendar" className="btn btn-sm btn-outline-dark rounded-pill">View Past Auctions</Link>
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        {[["auction", `Auction (${list.length})`], ["private", "Private Sales (0)"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`btn btn-sm rounded-pill ${tab === k ? "btn-dark" : "btn-outline-dark"}`}>{l}</button>
        ))}
        <button className="btn btn-sm btn-outline-dark ms-auto d-lg-none" onClick={() => setFiltersOpen(!filtersOpen)}>Filters</button>
      </div>

      <div className="row g-4">
        <aside className={`col-lg-3 ${filtersOpen ? "" : "d-none d-lg-block"}`}>
          {AUCTIONS.map((n, i) => (
            <div className="form-check mb-2" key={n}>
              <input className="form-check-input" type="checkbox" id={`a${i}`} checked={f.sel.includes(i)}
                onChange={() => change({ sel: f.sel.includes(i) ? f.sel.filter((x) => x !== i) : [...f.sel, i] })} />
              <label className="form-check-label small" htmlFor={`a${i}`}>{n}</label>
            </div>
          ))}
          <div className="form-check border-top pt-3 mt-3">
            <input className="form-check-input" type="checkbox" id="off" checked={f.offers} onChange={() => change({ offers: !f.offers })} />
            <label className="form-check-label small" htmlFor="off">Allows Offers ({SOLD.filter((a) => a.offers).length})</label>
          </div>
          {range("Year", "ymin", "ymax")}
          {range("Price", "pmin", "pmax")}
        </aside>

        <div className="col-lg-9">
          {tab === "private" ? <p className="text-muted">No private sales results in this demo.</p> : (
            <>
              <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
                <div className="btn-group btn-group-sm">
                  <button className={`btn ${view === "list" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setView("list")} aria-label="List view">☰</button>
                  <button className={`btn ${view === "grid" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setView("grid")} aria-label="Grid view">▦</button>
                </div>
                <input className="form-control form-control-sm" style={{ maxWidth: 220 }} type="search" placeholder="Search within these lots" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
                <select className="form-select form-select-sm ms-lg-auto" style={{ width: "auto" }} value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}
                </select>
                <select className="form-select form-select-sm" style={{ width: "auto" }} value={per} onChange={(e) => { setPer(+e.target.value); setPage(1); }}>
                  {[6, 12, 24].map((n) => <option key={n} value={n}>{n} per page</option>)}
                </select>
              </div>

              <div className="d-flex flex-wrap gap-2 align-items-center mb-3 small">
                {chips.map(([l, rm]) => <button key={l} className="chip" onClick={rm}>{l} ×</button>)}
                <button className="btn btn-link btn-sm" onClick={clear}>Clear Filters</button>
                <button className="btn btn-link btn-sm" onClick={() => setNote("Search saved (demo).")}>Save Search</button>
                <span className="text-success">{note}</span>
              </div>

              {shown.length === 0 && <p className="text-muted">No results match your filters.</p>}
              <div className="row g-3">
                {shown.map((a) => (
                  <div key={a.id} className={view === "grid" ? "col-6 col-xl-4" : "col-12"}>
                    {/* The whole card is clickable and opens the specifications pop-up */}
                    <div
                      className={`card lot h-100 ${view === "list" ? "flex-row" : ""}`}
                      style={{ cursor: "pointer" }}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelected(a)}
                      onKeyDown={(e) => { if (e.key === "Enter") setSelected(a); }}
                    >
                      <div className="ph ratio ratio-1x1" style={{ "--hue": a.hue, ...(view === "list" ? { width: 160, flex: "none" } : {}) }}>
                        <Art item={a} />
                        <span className="ended-tag">ENDED</span>
                        <button
                          className="save btn btn-light btn-sm"
                          onClick={(e) => { e.stopPropagation(); setSaved({ ...saved, [a.id]: !saved[a.id] }); }}
                          aria-label="Save lot"
                        >{saved[a.id] ? "★" : "☆"}</button>
                      </div>
                      <div className="card-body">
                        <div className="small text-muted">Lot #{a.lot}</div>
                        <h6 className="lot-title">{a.title}</h6>
                        <p className="small text-muted lot-desc">
                          {a.description || [a.cat, a.year].filter(Boolean).join(", ")}
                        </p>
                        <div className="d-flex justify-content-between align-items-baseline">
                          <strong className="fs-5">{money(a.price)}</strong><span className="small text-muted">{a.bids} bids</span>
                        </div>
                        <div className="d-flex justify-content-between small text-muted">
                          <span>Ended: {fmtEnd(a.end)}</span>
                          <button
                            className="btn btn-link btn-sm p-0 text-reset"
                            onClick={(e) => { e.stopPropagation(); setHist({ ...hist, [a.id]: !hist[a.id] }); }}
                          >Bid history</button>
                        </div>
                        {hist[a.id] && (
                          <ul className="small list-unstyled mt-2 mb-0">
                            {[1, 0.96, 0.92].map((m, i) => <li key={m} className="d-flex justify-content-between"><span>Bidder {7 + i}***</span><span>{money(Math.round(a.price * m))}</span></li>)}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button className="btn btn-sm btn-outline-dark" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span className="small">Page {page} of {pages}</span>
                <button className="btn btn-sm btn-outline-dark" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Specifications pop-up. Data comes from the lot: description and specs in auctions.js */}
      {selected && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setSelected(null)} />
          <div className="modal fade show d-block" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selected.title}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelected(null)} />
                </div>
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-5">
                      <div className="ph ratio ratio-1x1 rounded" style={{ "--hue": selected.hue }}>
                        <Art item={selected} />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="small text-muted">Lot #{selected.lot}, {selected.cat}</div>
                      <div className="fs-3 fw-bold">{money(selected.price)}</div>
                      <div className="small text-muted mb-3">Sold after {selected.bids} bids. Ended {fmtEnd(selected.end)}</div>
                      {selected.description && <p>{selected.description}</p>}
                      <h6 className="fw-bold">Specifications</h6>
                      <table className="table table-sm">
                        <tbody>
                          {Object.entries(selected.specs || { Category: selected.cat, Year: selected.year }).map(([label, value]) => (
                            <tr key={label}>
                              <td className="text-muted">{label}</td>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}