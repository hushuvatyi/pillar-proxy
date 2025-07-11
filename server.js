import express from "express";
import axios from "axios";

import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Дозволяємо CORS з будь-якого домену (можна обмежити, якщо треба)
app.use(cors());

// Проксі для /api/pillars/within
app.get("/api/pillars/within", async (req, res) => {
  try {
    const query = req.originalUrl.split("?")[1] || "";
    const backendURL = `http://44.201.203.206/api/pillars/within?${query}`;

    const response = await axios.get(backendURL);
    res.json(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Proxy failed" });
  }
});

// Health-check
app.get("/", (req, res) => {
  res.send("Pillar Proxy is running.");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
