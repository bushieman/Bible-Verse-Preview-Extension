import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load Notion API settings from .env
const NOTION_API_KEY = process.env.NOTION_API_KEY
const DATABASE_ID = process.env.DATABASE_ID

const NOTION_HEADERS = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

// --- Add Bookmark ---
app.post("/add_bookmark", async (req, res) => {
  const { verse, content } = req.body;

  if (!verse || !content) {
    return res.status(400).json({ error: "Both 'verse' and 'content' are required" });
  }

  const payload = {
    parent: { database_id: BOOKMARKS_DB_ID },
    properties: {
      Verse: {
        title: [{ text: { content: verse } }],
      },
      Content: {
        rich_text: [{ text: { content: content } }],
      },
    },
  };

  try {
    const response = await axios.post("https://api.notion.com/v1/pages", payload, {
      headers: NOTION_HEADERS,
    });
    res.json({ success: true, notion_response: response.data });
  } catch (err) {
    res.status(err.response?.status || 500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

// --- Get All Bookmarks ---
app.get("/bookmarks", async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${BOOKMARKS_DB_ID}/query`,
      {},
      { headers: NOTION_HEADERS }
    );

    const results = response.data.results.map((page) => {
      const verse =
        page.properties?.Verse?.title?.[0]?.text?.content || "";
      const content =
        page.properties?.Content?.rich_text?.[0]?.text?.content || "";
      return { verse, content };
    });

    res.json(results);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message,
    });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});





