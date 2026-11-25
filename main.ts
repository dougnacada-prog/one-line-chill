import { writeFileSync } from "node:fs";

// One-line horror for make.fun's "One Line, One Chill".
// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-200
// characters, not only whitespace. One sentence, one breath, one line.
const entry =
  "My doctor called to say the X-ray shows a second heartbeat, and I live alone.";

if (
  entry.length < 1 ||
  entry.length > 200 ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  entry.includes("\n")
) {
  throw new Error(
    "entry must be 1-200 characters, a single line with no leading/trailing whitespace",
  );
}
for (let i = 0; i < entry.length; i++) {
  const c = entry.charCodeAt(i);
  if (c < 0x20 || c === 0x7f) {
    throw new Error("entry must not contain control characters");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
writeFileSync(out, entry, "utf8");
