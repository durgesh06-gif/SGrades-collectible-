# Collecta - collectible auctions (React + Bootstrap 5)

A demo auction site built with React, React Router and Bootstrap 5. All data is sample data.

## Run it

```bash
npm install
npm run dev      # open the address shown in the terminal
npm run build    # production build in /dist
```

Needs Node 18 or newer.

## Folder guide

```
src/
  App.jsx            all routes (one line per page)
  main.jsx           starts React
  pages/             one file per page
    HomePage.jsx       promo banner, live auctions, featured, highest sales   (/)
    BrowsePage.jsx     search, filters and the lot grid                       (/browse)
    LotDetailPage.jsx  single lot with bid box                                (/lot/:id)
    GradedPage.jsx     professional grading explainer + graded lots           (/graded)
    CalendarPage.jsx   live auctions slider + auction schedule                (/calendar)
    ResultsPage.jsx    sold lots with filters, sort and paging                (/results)
    SellPage.jsx       listing form (login required)                          (/sell)
    LoginPage.jsx      log in / register                                      (/login)
  components/        pieces reused by pages (Header, Footer, PromoBanner, LotRow, ...)
  data/              sample data: auctions, schedule, sold lots, categories
  context/           AuthContext.jsx - login state
  hooks/             useDemoClock.js - pretend clock used by the countdowns
  utils/             format.js - small helpers
  styles/App.css     all custom CSS, including the 5 colour themes at the bottom
```

## Common changes

- **Add a page:** create `src/pages/MyPage.jsx`, import it in `App.jsx`, add a `<Route>`, and add a link in `components/Header.jsx`.
- **Change the lots / schedule / sold items:** edit the files in `src/data/`.
- **Change the banner slides:** edit `PROMOS` at the top of `components/PromoBanner.jsx`.
- **Add or edit a theme:** add a `:root[data-theme="name"]` block at the bottom of `styles/App.css` and an entry in `THEMES` in `components/ThemeSwitcher.jsx`.
- **Use real photos:** add an `image` field to your data and replace `<Art item={...} />` with `<img src={item.image} alt={item.title} />`.

## Things to know

- Login is fake and kept in memory (a refresh logs you out). Replace the `TODO` in `LoginPage.jsx`, `SellPage.jsx`, `Footer.jsx` and the bid button in `LotDetailPage.jsx` with real API calls. Always check login on your server too.
- The auction countdowns use a pretend clock (`hooks/useDemoClock.js`) so the sample auctions always look live.
- The images are simple SVG drawings made for this demo, not photos.
- The site is a demo and is not affiliated with any real auction house.
