import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

const dublinCenter = [53.3438, -6.2546];

const itemIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const recycleIcon = new L.DivIcon({
  className: "recycle-marker",
  html: "♻",
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const yourLocationIcon = new L.DivIcon({
  className: "you-marker",
  html: "●",
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const RECYCLE_POINTS = [
  {
    id: "recycle-1",
    name: "DCC Recycling Centre",
    lat: 53.3465,
    lng: -6.2383
  },
  {
    id: "recycle-2",
    name: "Glass Bank",
    lat: 53.3378,
    lng: -6.2622
  }
];

export default function MapPage() {
  const { items } = useApp();
  const navigate = useNavigate();

  return (
    <div className="page map-page">
      <h2 className="section-title">Resource Map</h2>
      <div className="map-legend">
        <span className="legend-item">
          <span className="legend-dot item-dot" /> Listings
        </span>
        <span className="legend-item">
          <span className="legend-dot recycle-dot" /> Recycle points
        </span>
        <span className="legend-item">
          <span className="legend-dot you-dot" /> Your location
        </span>
      </div>
      <div className="map-wrapper">
        <MapContainer
          center={dublinCenter}
          zoom={14}
          scrollWheelZoom={false}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={dublinCenter} icon={yourLocationIcon}>
            <Popup>Your location (Trinity College Dublin area)</Popup>
          </Marker>

          {items.map((item) => (
            <Marker
              key={item.id}
              position={[item.location?.lat || dublinCenter[0], item.location?.lng || dublinCenter[1]]}
              icon={itemIcon}
            >
              <Popup>
                <div className="map-popup">
                  <img src={item.imageUrl} alt={item.title} />
                  <div className="map-popup-text">
                    <div className="map-popup-title">{item.title}</div>
                    <div className="map-popup-price">
                      {item.price}
                      <span>{item.currency || "€"}</span>
                    </div>
                    <button
                      type="button"
                      className="outline-btn small"
                      onClick={() => navigate(`/items/${item.id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {RECYCLE_POINTS.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={recycleIcon}
            >
              <Popup>{p.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

