import { Router } from "express";
import { runScript } from "../utils/runScript.js";

const router = Router();

router.get("/:domain/contacts", async (req, res) => {
  const domain = String(req.params.domain || "").trim().toLowerCase();

  if (!/^(?=.{1,253}$)[a-z0-9]+([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]+([a-z0-9-]*[a-z0-9])?)+$/.test(domain)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid company domain."
    });
  }

  if (!process.env.HUNTER_API_KEY) {
    return res.status(503).json({
      success: false,
      message: "Hunter API key is not configured."
    });
  }

  try {
    const result = await runScript("hunter.mjs", [
      "domain",
      "--domain",
      domain
    ]);

    return res.json({
      success: true,
      domain,
      contacts: result.data.people || [],
      organization: result.data.organization || null,
      pattern: result.data.pattern || null
    });
  } catch (error) {
    console.error("Hunter request failed:", error.message);

    return res.status(502).json({
      success: false,
      message: "Hunter request failed. Check API quota and credentials."
    });
  }
});

export default router;