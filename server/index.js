const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// In-memory data store (seed data so cards show on first load)
let items = [
  {
    id: "1",
    title: "Plant Jasmeen",
    description:
      "Healthy indoor plant in a ceramic pot. Looking for a new home in Dublin.",
    price: 30,
    currency: "EUR",
    distanceKm: 0.5,
    location: {
      label: "Trinity College Dublin",
      city: "Dublin",
      address: "College Green",
      postcode: "D02 PN40",
      lat: 53.3438,
      lng: -6.2546
    },
    condition: "New",
    brand: "Local",
    co2Kg: -2.3,
    postedMinutesAgo: 30,
    imageUrl:
      "https://images.pexels.com/photos/5699666/pexels-photo-5699666.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["living", "plant"]
  }
];

// API: list items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// API: get single item
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// API: create item
app.post("/api/items", (req, res) => {
  const {
    title,
    description,
    price,
    currency = "EUR",
    location,
    condition,
    brand,
    co2Kg,
    imageUrl,
    tags
  } = req.body || {};

  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (!title || !description || (numPrice !== 0 && !numPrice)) {
    return res.status(400).json({
      error: "title, description and price are required",
      received: { title: !!title, description: !!description, price }
    });
  }

  const newItem = {
    id: String(Date.now()),
    title: String(title).trim(),
    description: String(description).trim(),
    price: Number(numPrice),
    currency: currency || "EUR",
    distanceKm: location?.distanceKm ?? 0.5,
    location: {
      label: location?.label || location?.city || "Dublin",
      city: location?.city || "Dublin",
      address: location?.address || "",
      postcode: location?.postcode || "",
      lat: location?.lat ?? 53.3438,
      lng: location?.lng ?? -6.2546
    },
    condition: condition || "Used",
    brand: brand ? String(brand).trim() : "-",
    co2Kg: co2Kg ?? -2.3,
    postedMinutesAgo: 0,
    imageUrl:
      imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("data:")
        ? imageUrl
        : imageUrl ||
          "https://images.pexels.com/photos/5699666/pexels-photo-5699666.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: Array.isArray(tags) ? tags : []
  };

  items.unshift(newItem);
  res.status(201).json(newItem);
});

// Stub: vision / AI
app.post("/api/vision/analyze", (req, res) => {
  res.json({
    status: "ok",
    suggestion: {
      title: "Pink Pot",
      description:
        "A decorative plant in a pastel pot. Perfect for desks and small spaces."
    }
  });
});

app.post("/api/ai/enhance", (req, res) => {
  const { text } = req.body || {};
  res.json({
    status: "ok",
    enhancedText: text ? `${text} (AI polished)` : "",
    originalText: text || ""
  });
});

// Optional: serve built client
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
