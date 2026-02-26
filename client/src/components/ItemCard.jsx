import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useApp();
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
      </div>
      <div className="item-card-body">
        <div className="item-card-title-row">
          <h3 className="item-card-title">{item.title}</h3>
          <div className="item-card-price">
            {item.price}
            <span className="item-card-price-currency">
              {item.currency || "€"}
            </span>
          </div>
        </div>
        <div className="item-card-meta">
          <span className="item-card-location">
            {item.location?.label || item.location?.city || "Dublin"}
          </span>
          <span className="item-card-distance">
            {(item.distanceKm ?? 0.5).toFixed(1)} km
          </span>
        </div>
        <div className="item-card-co2">
          <span className="badge-co2">
            CO₂{" "}
            {typeof item.co2Kg === "number"
              ? `${item.co2Kg.toFixed(1)} kg`
              : "-"}
          </span>
          <span className="badge-ai">AI estimated</span>
        </div>
        <div className="item-card-actions">
          <button
            type="button"
            className="outline-btn"
            onClick={() => navigate(`/items/${item.id}`)}
          >
            View
          </button>
          <button
            type="button"
            className="solid-btn"
            onClick={() => addToCart(item.id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

