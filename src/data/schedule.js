// Auction schedule used by the Calendar page and the live auction cards.
// Each row: name, type, consign-by date, open date, close date, colour hue, category.
const D = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d, 8, 30); };

// name, type, consign-by, open, close, hue, category shown when clicked

export const SCHEDULE = [
  ["Fall Trading Card Auction", "Thematic", "2026-09-28", "2026-10-05", "2026-11-09", 28, "Trading Cards"],
  ["Fall Comics Auction", "Thematic", "2026-10-01", "2026-10-12", "2026-11-02", 280, "Comics"],
  ["Fall Sports Memorabilia Auction", "Thematic", "2026-09-30", "2026-10-13", "2026-11-07", 0, "Sports Memorabilia"],
  ["Weekly Auction 195", "Weekly", "", "2026-10-20", "2026-10-29", 150, "All"],
  ["Weekly Auction 196", "Weekly", "", "2026-10-27", "2026-11-05", 160, "All"],
  ["Elite Auction #11", "Elite", "2026-10-15", "2026-11-03", "2026-11-21", 215, "All"],
  ["Holiday Coins & Currency Auction", "Thematic", "2026-10-30", "2026-11-12", "2026-12-03", 60, "Coins"],
  ["Year-End Elite Auction", "Elite", "2026-11-15", "2026-12-01", "2026-12-18", 320, "All"],
  ["Fall Toys Auction", "Thematic", "2026-10-02", "2026-10-14", "2026-11-12", 160, "Toys"],
  ["Fall Coin Auction", "Thematic", "2026-10-05", "2026-10-18", "2026-11-14", 60, "Coins"],
  ["Weekly Auction 197", "Weekly", "", "2026-10-24", "2026-11-12", 215, "All"],
  ["Jersey Auction Rise", "Weekly","", "2026-10-24", "2026-11-12", 116, "Jersey"],
].map(([name, type, cb, o, c, hue, cat]) => ({ name, type, cb: cb && D(cb), o: D(o), c: D(c), hue, cat }));
