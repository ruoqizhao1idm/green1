import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import CartPage from "./pages/CartPage.jsx";

function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <div>
          <div className="app-title">Sustainable Swaps</div>
          <div className="app-title-sub">in Dublin</div>
        </div>
      </div>
      <div className="top-nav-icon">
        <span className="logo-mark">♻</span>
      </div>
    </header>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoute = (path) => location.pathname.startsWith(path);

  return (
    <nav className="bottom-nav">
      <button
        type="button"
        className={
          "bottom-nav-btn" + (isRoute("/map") ? " bottom-nav-btn--active" : "")
        }
        onClick={() => navigate("/map")}
      >
        <span className="bottom-nav-icon">⚓</span>
      </button>
      <button
        type="button"
        className="bottom-nav-plus"
        onClick={() => navigate("/post")}
      >
        +
      </button>
      <button
        type="button"
        className={
          "bottom-nav-btn" +
          (isRoute("/favorites") || isRoute("/cart")
            ? " bottom-nav-btn--active"
            : "")
        }
        onClick={() => navigate("/favorites")}
      >
        <span className="bottom-nav-icon">★</span>
      </button>
    </nav>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="phone-frame">
        <TopNav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/items/:id" element={<DetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

