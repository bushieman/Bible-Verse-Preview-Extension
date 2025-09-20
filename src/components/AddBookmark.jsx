import React, { useState } from "react";

function addBookmark({verse, content}) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/add_bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verse, content }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Bookmark saved to Notion!");
      } else {
        setMessage("❌ Error: " + result.error);
      }
    } catch (err) {
      setMessage("⚠️ Network error: " + err.message);
    }
  };
}

export default addBookmark;
