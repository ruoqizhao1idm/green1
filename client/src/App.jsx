import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import CartPage from "./pages/CartPage.jsx";

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const goHome = () => navigate("/");

  if (isHome) {
    return (
      <header className="top-nav">
        <div className="top-nav-left">
          <div>
            <div className="app-title">Sustainable Swaps</div>
            <div className="app-title-sub">in Dublin</div>
          </div>
        </div>
        <div className="top-nav-icon">
          <div className="app-logo-wrap">
            <img
              src="/logo.png"
              alt="Logo"
              className="app-logo"
              onError={(e) => {
                e.target.style.display = "none";
                const wrap = e.target.closest(".app-logo-wrap");
                const ph = wrap?.querySelector(".app-logo-placeholder");
                if (ph) ph.style.display = "inline-flex";
              }}
            />
            <span className="app-logo-placeholder" style={{ display: "none" }}>
              ♻
            </span>
          </div>
        </div>
      </header>
    );
  }

  const titles = {
    "/post": "Plant Jasmeen",
    "/map": "Map",
    "/favorites": "Favorites",
    "/cart": "My Cart"
  };
  const pathKey = location.pathname.startsWith("/items/")
    ? null
    : Object.keys(titles).find((k) => location.pathname === k);
  const pageTitle = pathKey ? titles[pathKey] : "Detail";

  return (
    <header className="page-header">
      <button type="button" className="back-btn" onClick={goHome} aria-label="Back to home">
        ←
      </button>
      <h1 className="page-header-title">{pageTitle}</h1>
      <div style={{ width: 36 }} />
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
        aria-label="Map"
      >
        <span className="bottom-nav-icon">📍</span>
      </button>
      <button
        type="button"
        className="bottom-nav-plus"
        onClick={() => navigate("/post")}
        aria-label="Post"
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
        aria-label="Favorites"
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
