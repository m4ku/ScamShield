// Exports all interface text from the web app (lib/i18n.ts, lib/content/*) to one JSON file
// that ships inside the iOS app, so text is edited in one place for web and iOS.
//
//   npm run ios:content
//
// Writes ios/Shared/Resources/content.json.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build } from "rolldown";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmpDir = join(root, "node_modules", ".cache", "ios-content");
const entry = join(tmpDir, "entry.ts");
const out = join(tmpDir, "entry.mjs");
const target = join(root, "ios", "Shared", "Resources", "content.json");

mkdirSync(tmpDir, { recursive: true });
writeFileSync(
  entry,
  `export { STRINGS, LANGUAGE_LABELS, HTML_LANG, HELP_TOPICS } from ${JSON.stringify(join(root, "lib/i18n.ts"))};
export { SITE } from ${JSON.stringify(join(root, "lib/content/site.ts"))};
export { FEATURES } from ${JSON.stringify(join(root, "lib/content/features.ts"))};
export { GUIDES, SCAM_SLUGS } from ${JSON.stringify(join(root, "lib/content/learn.ts"))};
export { PRACTICE } from ${JSON.stringify(join(root, "lib/content/practice.ts"))};
export { LANGUAGES, SIGN_TYPES, MAX_TEXT_CHARS, MAX_FOLLOWUPS, MAX_QUESTION_CHARS } from ${JSON.stringify(join(root, "lib/schema.ts"))};
`,
);

await build({ input: entry, output: { file: out, format: "esm" }, external: ["zod"], logLevel: "silent" });
const m = await import(pathToFileURL(out).href);

const content = {
  languages: m.LANGUAGES,
  languageLabels: m.LANGUAGE_LABELS,
  languageTags: m.HTML_LANG,
  signTypes: m.SIGN_TYPES,
  helpTopics: m.HELP_TOPICS,
  scamSlugs: m.SCAM_SLUGS,
  limits: { maxTextChars: m.MAX_TEXT_CHARS, maxFollowups: m.MAX_FOLLOWUPS, maxQuestionChars: m.MAX_QUESTION_CHARS },
  strings: m.STRINGS,
  site: m.SITE,
  features: m.FEATURES,
  guides: m.GUIDES,
  practice: m.PRACTICE,
};

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(content, null, 1) + "\n");
rmSync(tmpDir, { recursive: true, force: true });
console.log(`Wrote ${target.replace(root + "/", "")} (${content.languages.length} languages)`);
