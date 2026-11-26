import express from "express";
import cors from "cors";

import jobsRouter from "./routes/jobs.js";
import companiesRouter from "./routes/companies.js";

try {
  process.loadEnvFile();
} catch {
  console.warn("No .env file loaded. Checking environment variables.");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]
}));

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Job Hunter backend is running!",
    services: {
      jsearch: Boolean(process.env.JSEARCH_RAPIDAPI_KEY),
      hunter: Boolean(process.env.HUNTER_API_KEY),
      serpapi: Boolean(process.env.SERPAPI_KEY)
    }
  });
});

app.use("/api/jobs", jobsRouter);
app.use("/api/companies", companiesRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Job Hunter API running on port ${PORT}`);
});