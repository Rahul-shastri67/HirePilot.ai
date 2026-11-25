import { Router } from "express";
import { runScript } from "../utils/runScript.js";

const router = Router();

router.get("/search", async (req, res) => {
  const query = String(req.query.query || "").trim();
  const location = String(req.query.location || "").trim();
  const days = req.query.days;

  if (!query || !location) {
    return res.status(400).json({
      success: false,
      message: "Both query and location are required."
    });
  }

  if (query.length > 120 || location.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Search query or location is too long."
    });
  }

  if (!process.env.JSEARCH_RAPIDAPI_KEY) {
    return res.status(503).json({
      success: false,
      message: "JSearch API key is not configured."
    });
  }

  if (days !== undefined &&
      (!/^\d+$/.test(String(days)) ||
       Number(days) < 1 ||
       Number(days) > 365)) {
    return res.status(400).json({
      success: false,
      message: "Days must be between 1 and 365."
    });
  }

  const args = [
    "--query", query,
    "--location", location
  ];

  if (days !== undefined) {
    args.push("--days", String(days));
  }

  try {
    const result = await runScript("search-jobs.mjs", args);

    return res.json({
      success: true,
      count: result.data.length,
      jobs: result.data,
      diagnostics: result.diagnostics
    });
  } catch (error) {
    console.error("Job search failed:", error.message);

    return res.status(502).json({
      success: false,
      message: "Job search provider failed. Check API quota and credentials."
    });
  }
});

export default router;