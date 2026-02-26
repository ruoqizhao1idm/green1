import React from "react";

const CATEGORIES = [
  { id: "recommend", label: "Recommend" },
  { id: "living", label: "Living" },
  { id: "electronics", label: "Electronics" },
  { id: "sports", label: "Sports" }
];

export default function CategoryTabs({ value, onChange }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={
            "category-tab" + (value === cat.id ? " category-tab--active" : "")
          }
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

