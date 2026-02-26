const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for demo purposes
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

  if (!title || !description || typeof price !== "number") {
    return res.status(400).json({
      error: "title, description and numeric price are required"
    });
  }

  const newItem = {
    id: String(Date.now()),
    title,
    description,
    price,
    currency,
    distanceKm: location?.distanceKm ?? 0.5,
    location: {
      label: location?.label || "Dublin",
      city: location?.city || "Dublin",
      address: location?.address || "",
      postcode: location?.postcode || "",
      lat: location?.lat ?? 53.3438,
      lng: location?.lng ?? -6.2546
    },
    condition: condition || "Used",
    brand: brand || "-",
    co2Kg: co2Kg ?? -2.3,
    postedMinutesAgo: 0,
    imageUrl:
      imageUrl ||
      "https://images.pexels.com/photos/5699666/pexels-photo-5699666.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: tags || []
  };

  items.unshift(newItem);
  res.status(201).json(newItem);
});

// Stub API: image recognition (vision)
app.post("/api/vision/analyze", (req, res) => {
  res.json({
    status: "not_implemented",
    message:
      "Vision analysis API placeholder. Connect to your image recognition provider here.",
    suggestion: {
      title: "Pink Pot",
      description:
        "A decorative plant in a pastel pot. Perfect for desks and small spaces."
    }
  });
});

// Stub API: AI description enhancement
app.post("/api/ai/enhance", (req, res) => {
  const { text } = req.body || {};
  res.json({
    status: "not_implemented",
    message:
      "AI enhance API placeholder. Connect to your LLM provider here and return polished copy.",
    originalText: text || "",
    enhancedText:
      (text &&
        `${text} (This is a demo enhanced description – integrate real AI for production.)`) ||
      ""
  });
});

// Serve built frontend when available
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

