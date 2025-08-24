// Standardize and normalize Bible verse references to match most probable book names and formats.
// Map of common book name variations to standard form
const bookMap = {
  "gen": "Genesis",
  "exod": "Exodus",
  "lev": "Leviticus",
  "num": "Numbers",
  "deut": "Deuteronomy",
  "jos": "Joshua",
  "judg": "Judges",
  "ruth": "Ruth",
  "1 sam": "1 Samuel",
  "2 sam": "2 Samuel",
  "1 kings": "1 Kings",
  "2 kings": "2 Kings",
  "1 chr": "1 Chronicles",
  "2 chr": "2 Chronicles",
  "ezra": "Ezra",
  "neh": "Nehemiah",
  "esth": "Esther",
  "job": "Job",
  "ps": "Psalms",
  "prov": "Proverbs",
  "eccl": "Ecclesiastes",
  "song": "Song of Solomon",
  "isa": "Isaiah",
  "jer": "Jeremiah",
  "lam": "Lamentations",
  "ezek": "Ezekiel",
  "dan": "Daniel",
  "hos": "Hosea",
  "joel": "Joel",
  "amos": "Amos",
  "obad": "Obadiah",
  "jonah": "Jonah",
  "mic": "Micah",
  "nah": "Nahum",
  "hab": "Habakkuk",
  "zeph": "Zephaniah",
  "hag": "Haggai",
  "zech": "Zechariah",
  "mal": "Malachi",
  "matt": "Matthew",
  "mark": "Mark",
  "luke": "Luke",
  "john": "John",
  "acts": "Acts",
  "rom": "Romans",
  "1 cor": "1 Corinthians",
  "2 cor": "2 Corinthians",
  "gal": "Galatians",
  "eph": "Ephesians",
  "phi": "Philippians",
  "col": "Colossians",
  "1 thes": "1 Thessalonians",
  "2 thes": "2 Thessalonians",
  "1 tim": "1 Timothy",
  "2 tim": "2 Timothy",
  "titus": "Titus",
  "phil": "Philemon",
  "heb": "Hebrews",
  "james": "James",
  "1 pet": "1 Peter",
  "2 pet": "2 Peter",
  "1 john": "1 John",
  "2 john": "2 John",
  "3 john": "3 John",
  "jude": "Jude",
  "rev": "Revelation"
};

// Normalize verse reference input
export default function normalizeReference(input) {
  if (!input) return null;

  // Step 1: clean spacing and punctuation
  let cleaned = input
    .toLowerCase()
    .replace(/\s+/g, " ")   // collapse spaces
    .replace(/\s*:\s*/g, ":") // remove spaces around colon
    .replace(/\s*-\s*/g, "-") // remove spaces around dash
    .replace(/^(\d)(st|nd|rd|th)\s+/, "$1 "); // "1st Corinthians" -> "1 Corinthians"

  // Step 2: Extract parts (book, chapter, verses)
  const match = cleaned.match(/^(\d?\s?[a-z]+)\s+(\d+):(\d+(-\d+)?)/);
  if (!match) return null;

  let [_, bookRaw, chapter, versePart] = match;
  bookRaw = bookRaw.trim();

  // Step 3: Find standardized book name
  let standardBook = null;
  for (let key in bookMap) {
    const regex = new RegExp("^" + key.replace(/\s/g, "\\s*"));
    if (regex.test(bookRaw)) {
      standardBook = bookMap[key];
      break;
    }
  }

  if (!standardBook) return null;

  // Step 4: Return standardized format
  return `${standardBook} ${chapter}:${versePart}`;
}


