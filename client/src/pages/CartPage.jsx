import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

export default function CartPage() {
  const { items, cart, removeFromCart } = useApp();
  const navigate = useNavigate();

  const cartItems = useMemo(
    () => items.filter((i) => cart.includes(i.id)),
    [items, cart]
  );

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="page cart-page">
      <h2 className="section-title">My Cart</h2>
      {cartItems.length === 0 && (
        <p className="soft-pill">
          Your cart is empty. Add something from the feed.
        </p>
      )}

      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-row">
            <button
              type="button"
              className="cart-row-main"
              onClick={() => navigate(`/items/${item.id}`)}
            >
              <img src={item.imageUrl} alt={item.title} />
              <div className="cart-row-text">
                <div className="cart-row-title">{item.title}</div>
                <div className="cart-row-sub">
                  {item.price}
                  <span>{item.currency || "€"}</span>
                </div>
              </div>
            </button>
            <button
              type="button"
              className="cart-row-remove"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove from cart"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>
              {total.toFixed(2)} €
            </strong>
          </div>
          <button type="button" className="primary-btn">
            Checkout (demo)
          </button>
        </div>
      )}
    </div>
  );
}

