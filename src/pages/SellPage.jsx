// Sell page (login required, see App.jsx). Replace the TODO in submit() with a real API call.
import { useState } from "react";
import { categories } from "../data/categories.js";

const steps = [
  ["Submit your item", "Tell us what you have and add photos."],
  ["We review it", "Our team checks authenticity and suggests a value."],
  ["Auction goes live", "Collectors bid and you get paid after the sale."],
];
const empty = { title: "", category: "Trading Cards", grade: "", start: "", buyNow: "", days: "7", desc: "" };

export default function SellPage() {
  const [form, setForm] = useState(empty);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const addPhotos = (e) =>
    setPhotos([...photos, ...Array.from(e.target.files).map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))].slice(0, 6));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.title.trim()) err.title = "Add a title.";
    if (!(Number(form.start) > 0)) err.start = "Enter a starting bid above $0.";
    if (form.buyNow && Number(form.buyNow) <= Number(form.start)) err.buyNow = "Buy now price must be higher than the starting bid.";
    if (photos.length === 0) err.photos = "Add at least one photo.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true); // TODO: POST form + photos to your API
  };

  if (sent)
    return (
      <div className="container py-5" style={{ maxWidth: 560 }}>
        <div className="alert alert-success">
          <strong>Item submitted.</strong> We'll review "{form.title}" and email you within 2 business days.
        </div>
        <button className="btn btn-dark" onClick={() => { setForm(empty); setPhotos([]); setSent(false); }}>
          Submit another item
        </button>
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="h2 fw-bold">Sell your collectibles</h1>
      <p className="text-muted">List a single item for auction or fixed price.</p>

      <div className="row g-3 mb-4">
        {steps.map(([t, d], i) => (
          <div className="col-md-4" key={t}>
            <div className="d-flex gap-3">
              <span className="step-num">{i + 1}</span>
              <div><div className="fw-semibold">{t}</div><div className="small text-muted">{d}</div></div>
            </div>
          </div>
        ))}
      </div>

      <form className="card border-0 shadow-sm" onSubmit={submit} noValidate>
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label" htmlFor="t">Item title</label>
              <input id="t" className={`form-control ${errors.title ? "is-invalid" : ""}`} value={form.title}
                onChange={set("title")} placeholder="e.g. 1986 Fleer Michael Jordan RC #57 PSA 8" />
              <div className="invalid-feedback">{errors.title}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="c">Category</label>
              <select id="c" className="form-select" value={form.category} onChange={set("category")}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="g">Grade or condition</label>
              <input id="g" className="form-control" value={form.grade} onChange={set("grade")} placeholder="PSA 9, Near Mint, ..." />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="s">Starting bid ($)</label>
              <input id="s" type="number" min="1" className={`form-control ${errors.start ? "is-invalid" : ""}`} value={form.start} onChange={set("start")} />
              <div className="invalid-feedback">{errors.start}</div>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="b">Buy now price ($, optional)</label>
              <input id="b" type="number" min="1" className={`form-control ${errors.buyNow ? "is-invalid" : ""}`} value={form.buyNow} onChange={set("buyNow")} />
              <div className="invalid-feedback">{errors.buyNow}</div>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="d">Auction length</label>
              <select id="d" className="form-select" value={form.days} onChange={set("days")}>
                {[3, 5, 7, 10].map((n) => <option key={n} value={n}>{n} days</option>)}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="ds">Description</label>
              <textarea id="ds" rows="4" className="form-control" value={form.desc} onChange={set("desc")}
                placeholder="Provenance, certification number, flaws..." />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="p">Photos (up to 6)</label>
              <input id="p" type="file" accept="image/*" multiple className={`form-control ${errors.photos ? "is-invalid" : ""}`} onChange={addPhotos} />
              <div className="invalid-feedback">{errors.photos}</div>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {photos.map((p) => <img key={p.url} src={p.url} alt={p.name} className="thumb" />)}
              </div>
            </div>
          </div>
          <button className="btn btn-gold btn-lg mt-4" type="submit">Submit for review</button>
        </div>
      </form>
    </div>
  );
}
