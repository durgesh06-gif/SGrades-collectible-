import { categories } from "../data/categories.js";

// Row of category pills used on the Browse page.
export default function CategoryStrip({ active, setActive }) {
  return (
    <div className="container py-3 overflow-auto">
      <div className="d-flex gap-2 flex-nowrap">
        {["All", ...categories].map((c) => (
          <button key={c} onClick={() => setActive(c)}
            className={`btn btn-sm rounded-pill text-nowrap ${active === c ? "btn-dark" : "btn-outline-dark"}`}>{c}</button>
        ))}
      </div>
    </div>
  );
}
