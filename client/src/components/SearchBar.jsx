import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search plants, electronics, clothes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="voice-btn"
        title="Voice search placeholder"
      >
        🎙
      </button>
    </div>
  );
}

