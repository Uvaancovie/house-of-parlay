import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __dirname = import.meta.dirname;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Initialize Gemini AI
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API endpoint for generating luxury product descriptions and copy
  app.post("/api/ai/generate-description", async (req, res) => {
    try {
      if (!ai) {
        return res.status(400).json({
          error: "Gemini API Key is not configured in server environment.",
        });
      }

      const { title, category, metal, gemstone, collection, customPrompt } = req.body;

      const prompt = `You are the master brand copywriter for "House of Parlay", an ultra-exclusive luxury jewellery house known for timeless beauty, bespoke craftsmanship, and understated opulence.
      
Generate a sophisticated, captivating product description and romance tagline for a piece with these details:
- Product Title: ${title || "Untitled Masterpiece"}
- Category: ${category || "High Jewellery"}
- Metal: ${metal || "18K Gold"}
- Gemstones: ${gemstone || "D-Flawless Diamond"}
- Collection: ${collection || "Details Hidden"}
- Additional Context: ${customPrompt || "Focus on timeless elegance and craftsmanship."}

Respond in clean JSON format with two fields:
{
  "tagline": "A short 6-12 word evocative tagline in uppercase or titlecase (e.g. 'DETAILS HIDDEN. EXCELLENCE REVEALED.')",
  "description": "A 2-3 paragraph editorial luxury product description highlighting light refraction, metal alloy purity, hand-setting precision, and emotional grandeur."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);

      return res.json({
        success: true,
        tagline: parsed.tagline || "EXCELLENCE REVEALED IN EVERY FACET.",
        description: parsed.description || "Crafted with unyielding devotion to perfection.",
      });
    } catch (error: any) {
      console.error("Error generating luxury copy:", error);
      return res.status(500).json({
        error: "Failed to generate luxury product description.",
        details: error?.message || String(error),
      });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", brand: "House of Parlay" });
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "..", "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`House of Parlay Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
