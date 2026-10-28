import { getLot } from "./auctions.js";

// Past (sold) lots. Each row:
//   lot id (from auctions.js), sold price, bids, lot #, auction number (0-4),
//   ended date, allows offers (1 = yes, 0 = no)
// Title, image, colour, category and year come from auctions.js.
export const SOLD = [
  [5,  420000,  97, 1, 0, "2026-10-26 11:44", 0],
  [2,  2400000, 37, 1, 2, "2026-10-22 09:08", 0],
  [1,  212000,  73, 2, 2, "2026-10-22 09:20", 1],
  [4,  1650000, 41, 1, 3, "2026-10-15 11:26", 0],
  [3,  184000,  52, 3, 2, "2026-10-22 09:31", 0],
  [6,  96000,   18, 4, 1, "2026-10-19 10:02", 1],
  [11, 88000,   29, 1, 4, "2026-10-12 08:30", 0],
  [10, 31500,   22, 2, 0, "2026-10-26 11:50", 1],
  [8,  410000,  35, 2, 3, "2026-10-15 11:40", 0],
  [12, 11200,   36, 5, 1, "2026-10-19 10:15", 1],
  [7,  14300,   24, 6, 1, "2026-10-19 10:22", 0],
  [9,  4200,     9, 7, 0, "2026-10-26 12:05", 1],
].map(([lotId, price, bids, lot, auction, ended, offers], id) => {
  const [d, t] = ended.split(" ");
  const [y, m, dd] = d.split("-").map(Number);
  const [h, mi] = t.split(":").map(Number);
  return {
    ...getLot(lotId),               // title, image, hue, cat, year from auctions.js
    id, price, bids, lot, auction,  // sale details from this file
    end: new Date(y, m - 1, dd, h, mi),
    offers: !!offers,
  };
});