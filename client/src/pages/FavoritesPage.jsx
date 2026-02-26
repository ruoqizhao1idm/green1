import React, { useMemo } from "react";
import { useApp } from "../state/AppContext.jsx";
import ItemCard from "../components/ItemCard.jsx";

export default function FavoritesPage() {
  const { items, favorites, toggleFavorite } = useApp();

  const favItems = useMemo(
    () => items.filter((i) => favorites.includes(i.id)),
    [items, favorites]
  );

  return (
    <div className="page favorites-page">
      <h2 className="section-title">Favorites</h2>
      {favItems.length === 0 && (
        <p className="soft-pill">
          You do not have any favorites yet. Tap the star on a card to save it.
        </p>
      )}
      <div className="home-grid">
        {favItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {favItems.length > 0 && (
        <button
          type="button"
          className="outline-btn danger"
          onClick={() => {
            favItems.forEach((i) => toggleFavorite(i.id));
          }}
        >
          Remove all favorites
        </button>
      )}
    </div>
  );
}

