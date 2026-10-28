import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/App.css";

import { AuthProvider, RequireAuth } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

import HomePage from "./pages/HomePage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
import GradedPage from "./pages/GradedPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import SellPage from "./pages/SellPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LotDetailPage from "./pages/LotDetailPage.jsx";

// Every page of the site is listed here. To add a page: create it in
// src/pages, import it above and add a <Route> below.
export default function App() {
  // Text typed in the header search box, shared with the Browse page.
  const [query, setQuery] = useState("");

  return (
    <AuthProvider>
      <HashRouter>
        <Header query={query} setQuery={setQuery} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage query={query} setQuery={setQuery} />} />
          <Route path="/graded" element={<GradedPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/lot/:id" element={<LotDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/sell"
            element={<RequireAuth reason="Log in to sell items."><SellPage /></RequireAuth>}
          />
        </Routes>
        <Footer />
        <ThemeSwitcher />
      </HashRouter>
    </AuthProvider>
  );
}
