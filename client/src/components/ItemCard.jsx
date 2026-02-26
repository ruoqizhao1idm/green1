import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(item.id);

  return (
    <article className="item-card">
      <button
        type="button"
        className="item-card-fav"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
        }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? "★" : "☆"}
      </button>
      <div
        className="item-card-image-wrapper"
        onClick={() => navigate(`/items/${item.id}`)}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="item-card-image"
        />
        <div className="item-card-overlay">
          <h3 className="item-card-title">{item.title}</h3>
          <div className="item-card-meta">
            {(item.distanceKm ?? 0.5).toFixed(1)}km | {item.location?.label || item.location?.city || "Trinity College"}
          </div>
          <div className="item-card-price">
            {item.price}
            <span className="item-card-price-currency">{item.currency || "€"}</span>
          </div>
          <div className="item-card-co2-badge">
            −{typeof item.co2Kg === "number" ? Math.abs(item.co2Kg).toFixed(1) : "2.3"}kg
          </div>
        </div>
      </div>
    </article>
  );
}
