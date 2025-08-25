import React, { useEffect, useState } from "react";

// Load environment variables
const BIBLE_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; 
const BIBLE_ID = "9879dbb7cfe39e4d-01"; // World English Bible translation


export default function BibleVerse({ reference, setCardHeight, setLoading, setError}) {
  const [verseContent, setVerseContent] = useState("");

  useEffect(() => {
    console.log("Fetching ", reference, " from Bible API...");
    async function fetchVerse() {
      try {
        // Step 1: Search for verse
        const searchRes = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${encodeURIComponent(
            reference
          )}`,
          {
            headers: { "api-key": BIBLE_API_KEY }
          }
        );
        const searchData = await searchRes.json();

        if (searchData.data.passages && searchData.data.passages.length > 0) {
          const verseId = searchData.data.passages[0].id;

          // Step 2: Get verse text
          const verseRes = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/${verseId}`,
            {
              headers: { "api-key": BIBLE_API_KEY }
            }
          );
          const verseData = await verseRes.json();

          let content = verseData.data.content;

          // Step 3: Parse HTML and replace <span> with <sup>
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, "text/html");

          doc.querySelectorAll("span").forEach((span) => {
            if (/^\d+$/.test(span.textContent.trim())) {
              const sup = doc.createElement("sup");
              sup.textContent = span.textContent;
              span.replaceWith(sup);
            }
          });

          // Step 4: Get the word count and set break points at regular intervals and remove one line-height (22px) space from the card height.
          const wordCount = doc.body.textContent.trim().split(/\s+/).length;

          if (wordCount < 10) {
            setCardHeight({
              cardContentValue: '217px',
              cardValue: '190px',
            });
          } else if (wordCount < 20) {
            setCardHeight({
              cardContentValue: '239px',
              cardValue: '212px',
            });
          } else if (wordCount < 30) {
            setCardHeight({
              cardContentValue: '261px',
              cardValue: '234px',
            });
          } else if (wordCount < 40) {
            setCardHeight({
              cardContentValue: '283px',
              cardValue: '256px',
            });
          } else if (wordCount < 50) {
            setCardHeight({
              cardContentValue: '305px',
              cardValue: '278px',
            });
          } else {
            setCardHeight({
              cardContentValue: '327px',
              cardValue: '300px',
            });
          }

          // Step 5: Get updated HTML
          const updatedHTML = doc.body.innerHTML;
          setVerseContent(updatedHTML);
          setLoading(false);

        } else {
          console.log("<p>Verse not found</p>");
          setError(true)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching verse:", err);
        setVerseContent("<p>Error fetching verse</p>");
      }
    }

    if (reference) {
      fetchVerse();
    }
  }, [reference]);


  return <div dangerouslySetInnerHTML={{ __html: verseContent }} />;
}

