import { useState } from "react";
import { Link } from "react-router-dom";
import Art from "../components/Art.jsx";
import { auctions } from "../data/auctions.js";
import { money } from "../utils/format.js";

// Explains professional grading and lists lots graded by PSA, BGS or CGC.
const parseGrade = (t) => {
  const m = t.match(/(PSA|BGS|CGC) ([\d.]+)/);
  return m && { co: m[1], n: Number(m[2]) };
};

export default function GradedPage() {
  const [co, setCo] = useState("All");
  const list = auctions
    .filter((a) => { const g = parseGrade(a.title); return g && (co === "All" || g.co === co); })
    .sort((a, b) => parseGrade(b.title).n - parseGrade(a.title).n);
  const steps = [
    ["Authenticate", "Experts confirm the item is genuine."],
    ["Grade", "Condition is scored on a numbered scale."],
    ["Encase", "The item is sealed in a tamper-evident holder with a label."],
  ];

  return (
    <section className="container py-4" id="graded">
      <h1 className="h2 fw-bold">Professionally graded</h1>
      <p className="text-muted" style={{ maxWidth: 640 }}>
        Independent grading companies authenticate each item, score its condition and seal it in a case. Higher grades mean better condition.
      </p>

      <div className="gs">
        {[...Array(10)].map((_, i) => <span key={i} style={{ background: `hsl(${i * 13} 62% 42%)` }}>{i + 1}</span>)}
      </div>
      <div className="d-flex justify-content-between small text-muted mb-4">
        <span>1 Poor</span><span>5 Excellent</span><span>7 Near Mint</span><span>9 Mint</span><span>10 Gem Mint</span>
      </div>

      <div className="row g-3 mb-4">
        {steps.map(([t, d], i) => (
          <div className="col-md-4" key={t}>
            <div className="d-flex gap-3"><span className="step-num">{i + 1}</span>
              <div><div className="fw-semibold">{t}</div><div className="small text-muted">{d}</div></div></div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2 mb-3">
        {["All", "PSA", "BGS", "CGC"].map((c) => (
          <button key={c} onClick={() => setCo(c)} className={`btn btn-sm rounded-pill ${co === c ? "btn-dark" : "btn-outline-dark"}`}>
            {c === "All" ? "All graders" : c}
          </button>
        ))}
      </div>

      <div className="row g-3">
        {list.length === 0 && <p className="text-muted">No graded lots from this company yet.</p>}
        {list.map((a) => {
          const g = parseGrade(a.title);
          return (
            <div className="col-6 col-md-4 col-xl-3" key={a.id}>
              <Link to={`/lot/${a.id}`} className="card lot h-100 text-reset text-decoration-none">
                <div className="ph ratio ratio-1x1" style={{ "--hue": a.hue }}>
                  <Art item={a} /><span className="gb">{g.co} {g.n}</span>
                </div>
                <div className="card-body">
                  <h6 className="lot-title">{a.title}</h6>
                  <strong>{money(a.bid)}</strong>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <p className="small text-muted mt-3">Grading scales vary slightly by company. PSA, BGS and CGC are independent companies and are not affiliated with this demo site.</p>
    </section>
  );
}
