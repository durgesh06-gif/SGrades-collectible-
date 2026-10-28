// MASTER LIST of lots. Change a lot here and it updates everywhere.
// Images live in public/images/ and are written as "/images/file.jpg".
// A lot with no image shows the drawing instead.

export const auctions = [
  { id: 1,  title: "2003 Topps Chrome LeBron James RC #111 PSA 10", bid: 184000,  bids: 31, hours: 52,  hue: 28,  cat: "Trading Cards",  year: 2003, image: "/src/images/lebron.jpg" },
  { id: 2,  title: "1952 Topps Mickey Mantle #311 PSA 6", bid: 412500,  bids: 44, hours: 20,  hue: 8,   cat: "Trading Cards", year: 1952, image: "/src/images/mickey.jpg" },
  { id: 3,  title: "1986 Fleer Michael Jordan RC #57 BGS 9",        bid: 96000,   bids: 27, hours: 76,  hue: 215, cat: "Trading Cards",  year: 1986, image: "/src/images/michael.jpg" },
  { id: 4,  title: "Action Comics #1 (1938) CGC 2.0",               bid: 1250000, bids: 18, hours: 5,   hue: 45,  cat: "Comics",   year: 1938, image: "/src/images/actioncomics.jpg" },
  { id: 5,  title: "1999 Pokémon Base Set Charizard 1st Ed. PSA 9", bid: 61000,   bids: 52, hours: 33,  hue: 350, cat: "Toys",   year: 1999, image: "/src/images/Charizard.jpg" },
  { id: 6,  title: "Game-Worn 1998 Bulls Finals Jersey",            bid: 74000,   bids: 12, hours: 98,  hue: 0,   cat: "Sports Memorabilia", year: 1998, image:"/src/images/jordanjersey.jpg" },
  { id: 7,  title: "1961 Topps Roger Maris #2 PSA 8",               bid: 8200,    bids: 9,  hours: 41,  hue: 150, cat: "Trading Cards",  year: 1961, image:"/src/images/roger.jpg" },
  { id: 8,  title: "Amazing Fantasy #15 (1962) CGC 4.5",            bid: 385000,  bids: 23, hours: 64,  hue: 280, cat: "Comics",   year: 1962, image: "/src/images/spiderman.jpg" },
  { id: 9,  title: "Signed 1996 Rookie Season Jersey",              bid: 3400,    bids: 7,  hours: 120, hue: 190, cat: "Sports Memorabilia", year: 1996, image:"/src/images/rookie.jpg" },
  { id: 10, title: "1959 Hot Wheels Redline Prototype Car",         bid: 22000,   bids: 15, hours: 88,  hue: 160, cat: "Toys",    year: 1959, image:"/src/images/hotwheels.jpg" },
  { id: 11, title: "1893-S Morgan Silver Dollar AU-50",             bid: 52000,   bids: 21, hours: 27,  hue: 60,  cat: "Coins",     year: 1893, image: "/src/images/morgancoin.jpg" },
  { id: 12, title: "2018 Panini Prizm Luka Doncic RC PSA 10",       bid: 9800,    bids: 36, hours: 14,  hue: 320, cat: "Trading Cards",  year: 2018, image: "/src/images/panini.jpg" },
];

// Other files call getLot(5) to get everything about lot 5.
export function getLot(id) {
  return auctions.find((lot) => lot.id === id);
}