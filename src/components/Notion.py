# Runs in https://www.pythonanywhere.com/
# Migrate to DigitalOcean
from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

from dotenv import load_dotenv

# Load the .env file
load_dotenv()

app = Flask(__name__)

# Allow requests from your frontend domain (e.g. localhost or production)
CORS(app, resources={r"/*": {"origins": "*"}})

NOTION_API_KEY = os.getenv("NOTION_API_KEY")
DATABASE_ID = os.getenv("DATABASE_ID")

NOTION_HEADERS = {
    "Authorization": f"Bearer {NOTION_API_KEY}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}


def verse_exists(verse_name):
    """Check if the verse already exists in the Notion database."""
    query_url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    query_payload = {
        "filter": {
            "property": "Verse",
            "rich_text": {
                "equals": verse_name
            }
        }
    }
    response = requests.post(query_url, headers=NOTION_HEADERS, json=query_payload)
    if response.status_code == 200:
        results = response.json().get("results", [])
        return len(results) > 0
    else:
        print("Error querying Notion:", response.text)
        return False


@app.route("/check-verse", methods=["POST"])
def check_verse():
    data = request.json
    verse = data.get("verse")

    if not verse:
        return jsonify({"error": "Missing 'verse' parameter"}), 400

    exists = verse_exists(verse)
    return jsonify({"exists": exists})


@app.route("/add-verse", methods=["POST"])
def add_verse():
    data = request.json
    verse = data.get("verse")
    content = data.get("content")

    if not verse or not content:
        return jsonify({"error": "Both 'verse' and 'content' fields are required"}), 400

    if verse_exists(verse):
        return jsonify({"message": f"'{verse}' already exists, skipping."}), 200

    payload = {
        "parent": {"database_id": DATABASE_ID},
        "properties": {
            "Verse": {"title": [{"text": {"content": verse}}]},
            "Content": {"rich_text": [{"text": {"content": content}}]},
        },
    }

    response = requests.post("https://api.notion.com/v1/pages", headers=NOTION_HEADERS, json=payload)

    if response.status_code == 200:
        return jsonify({"success": True, "message": f"'{verse}' added successfully!"}), 200
    else:
        return jsonify({"error": response.text}), response.status_code


@app.route("/")
def home():
    return "Notion Verse API is running!"
