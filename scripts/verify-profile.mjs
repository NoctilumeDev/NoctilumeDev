import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const splitSource = "3fddab9d64401a93b6ec9be7175c5b0d2c3d9102";
const chineseRepository = "https://github.com/NoctilumeDev/NoctilumeDev-ZH";
const requiredFiles = [
  ".gitattributes",
  ".github/workflows/profile-gates.yml",
  "PROFILE_EDITION.json",
  "README.md",
  "assets/philosophers-kpi.svg",
  "assets/project-journey.svg",
  "docs/README.md",
  "docs/philosophers-kpi.md",
  "docs/repository-system-map.md",
  "docs/adversarial-engineering-validation.md",
  "docs/ai-cognitive-feedback-loop.md",
  "docs/docker-desktop-windows-socket-recovery.md",
  "docs/engineering-judgment.md",
  "docs/engineering-judgment-interview.md",
  "docs/fresh-checkout-independent-audit.md",
  "docs/iteration-decision-fact-record.md",
  "docs/protecting-zero.md",
  "docs/public-verification-loop.md",
  "docs/single-machine-engineering-environment.md",
  "docs/solo-engineering-method.md",
  "docs/solo-engineering-runtime-diagnostics.md",
  "docs/from-tool-gain-to-collaborative-compounding.md",
  "docs/one-person-big-company.md",
  "docs/protecting-zero-from-answer-to-fact.md",
  "scripts/verify-profile.mjs",
];
const mappedRepositories = [
  "DarkRoomLibrary",
  "FlowKernel",
  "InkNarratives",
  "JPyxis",
  "MiniLinux",
  "MiniSpringBoot",
  "PlainJournal",
  "PlainJournalPro",
  "Qixu",
  "VeriTrail",
];
const selectedUnpublishedPages = [
  "ai-cognitive-feedback-loop.md",
];
const legacyCompatibilityPages = [
  "docker-desktop-windows-socket-recovery.md",
  "engineering-judgment.md",
  "fresh-checkout-independent-audit.md",
  "iteration-decision-fact-record.md",
  "public-verification-loop.md",
  "single-machine-engineering-environment.md",
  "solo-engineering-method.md",
  "solo-engineering-runtime-diagnostics.md",
  "from-tool-gain-to-collaborative-compounding.md",
  "one-person-big-company.md",
  "protecting-zero-from-answer-to-fact.md",
];

function fail(message) {
  failures.push(message);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolute) : [absolute];
  });
}

for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(root, relative))) {
    fail(`Missing required English-profile artifact: ${relative}`);
  }
}

for (const removedPdf of [
  "docs/adversarial-engineering-validation.pdf",
  "docs/from-tool-gain-to-collaborative-compounding.pdf",
  "docs/one-person-big-company.pdf",
  "docs/protecting-zero-from-answer-to-fact.pdf",
]) {
  if (fs.existsSync(path.join(root, removedPdf))) {
    fail(`${removedPdf}: Chinese binary must remain owned by NoctilumeDev-ZH`);
  }
}

const files = listFiles(root);
const textExtensions = new Set(["", ".md", ".yml", ".yaml", ".json", ".mjs", ".svg"]);
const textFiles = files.filter((file) => textExtensions.has(path.extname(file).toLowerCase()));
const markdownFiles = textFiles.filter((file) => path.extname(file).toLowerCase() === ".md");
const linkPattern = /\[[^\]]+\]\(([^)]+)\)/gu;
const cjkPattern = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u;
const allowedCjkLiterals = ["中文版本"];
const sensitivePatterns = [
  { name: "Windows user path", pattern: /[A-Za-z]:\\Users\\/u },
  { name: "Unix home path", pattern: /\/(?:Users|home)\/[^/\s]+\//u },
  { name: "private key", pattern: /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/u },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/u },
];

for (const file of textFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const content = fs.readFileSync(file, "utf8");
  if (!content.endsWith("\n")) fail(`${relative}: missing final newline`);
  content.split(/\r?\n/u).forEach((line, index) => {
    if (/[ \t]+$/u.test(line)) fail(`${relative}:${index + 1}: trailing whitespace`);
  });
  for (const { name, pattern } of sensitivePatterns) {
    if (pattern.test(content)) fail(`${relative}: contains ${name}`);
  }

  const cjkCheckedContent = allowedCjkLiterals.reduce(
    (current, literal) => current.replaceAll(literal, ""),
    content,
  );
  if (cjkPattern.test(cjkCheckedContent)) {
    fail(`${relative}: canonical English surface contains CJK outside the language-route label`);
  }
}

for (const file of markdownFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim();
    if (/^(?:https?:\/\/|mailto:|#)/u.test(target)) continue;
    const pathname = decodeURIComponent(target.split("#", 1)[0]);
    if (!pathname) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), pathname))) {
      fail(`${relative}: broken relative link ${target}`);
    }
  }
}

let edition;
try {
  edition = JSON.parse(fs.readFileSync(path.join(root, "PROFILE_EDITION.json"), "utf8"));
} catch (error) {
  fail(`PROFILE_EDITION.json: invalid JSON: ${error.message}`);
}
if (edition) {
  const expected = {
    schemaVersion: 1,
    language: "en",
    role: "canonical-profile",
    splitFromMixedProfileCommit: splitSource,
    chineseEdition: chineseRepository,
    splitDate: "2026-10-04",
    projectRoutePolicy: "cataloged-and-profile-routable-only",
  };
  for (const [key, value] of Object.entries(expected)) {
    if (edition[key] !== value) fail(`PROFILE_EDITION.json: ${key} must be ${value}`);
  }
  if (JSON.stringify(Object.keys(edition).sort()) !== JSON.stringify(Object.keys(expected).sort())) {
    fail("PROFILE_EDITION.json: unexpected or missing keys");
  }
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8").replace(/\r\n/gu, "\n");
for (const heading of [
  "## The KPI Philosophers",
  "## Project Journey",
  "## Three Laboratories",
  "## Selected Work",
  "## Repository System Map",
  "## Laboratory and Distribution Surfaces",
  "## Engineering Method",
  "## Essays and Notes",
  "## Information Ownership",
]) {
  if (!readme.includes(heading)) fail(`README.md: missing stable English-profile section ${heading}`);
}
for (const invariant of [
  "[中文版本 / Chinese edition](https://github.com/NoctilumeDev/NoctilumeDev-ZH)",
  "Student” describes my current identity and age, not a project maturity level",
  "plan defined\n   != execution complete\n   != qualification established\n   != state effective\n   != next step authorized",
  "Language migration is not project-routing authorization.",
  "Implementation has not started",
  "A card will move to [Engineering Gallery]",
  "only after that project is released, has a usable Chinese edition, is cataloged, and becomes `PROFILE_ROUTABLE`",
  "[Engineering Judgment](docs/engineering-judgment-interview.md)",
  "[Protecting Zero: From Generated Answers to Qualified Facts](docs/protecting-zero.md)",
]) {
  if (!readme.includes(invariant)) fail(`README.md: missing English-profile invariant ${invariant}`);
}
if (/EngineeringGallery\/(?:tree\/main\/)?projects\//u.test(readme)) {
  fail("README.md: G3A must not route a project card into Engineering Gallery");
}
for (const repository of mappedRepositories) {
  const url = `https://github.com/NoctilumeDev/${repository}`;
  if (!readme.includes(url)) fail(`README.md: missing laboratory route for ${repository}`);
}

for (const selectedUnpublishedPage of selectedUnpublishedPages) {
  const content = fs.readFileSync(path.join(root, "docs", selectedUnpublishedPage), "utf8");
  if (!content.includes("Publication status: selected for English publication; not yet published.")) {
    fail(`docs/${selectedUnpublishedPage}: missing selected-publication status`);
  }
  if (!content.includes(chineseRepository)) {
    fail(`docs/${selectedUnpublishedPage}: missing canonical Chinese route`);
  }
}
for (const legacyCompatibilityPage of legacyCompatibilityPages) {
  const content = fs.readFileSync(path.join(root, "docs", legacyCompatibilityPage), "utf8");
  if (!content.includes("Legacy compatibility route.")) {
    fail(`docs/${legacyCompatibilityPage}: missing legacy-compatibility status`);
  }
  if (!content.includes(chineseRepository)) {
    fail(`docs/${legacyCompatibilityPage}: missing canonical Chinese route`);
  }
}
const publishedEnglishPages = [
  {
    page: "engineering-judgment-interview.md",
    sourceCommit: "37daa83b37918210561f8fe69ccb0ee9a72cdb79",
    sourcePath: "docs/engineering-judgment-interview.md",
  },
  {
    page: "philosophers-kpi.md",
    sourceCommit: "7997b43c7767e9f6cc6546046c2c7475a49de347",
    sourcePath: "docs/philosophers-kpi.md",
  },
  {
    page: "protecting-zero.md",
    sourceCommit: "7997b43c7767e9f6cc6546046c2c7475a49de347",
    sourcePath: "docs/protecting-zero-from-answer-to-fact.pdf",
  },
  {
    page: "adversarial-engineering-validation.md",
    sourceCommit: "7997b43c7767e9f6cc6546046c2c7475a49de347",
    sourcePath: "docs/adversarial-engineering-validation.md",
  },
  {
    page: "repository-system-map.md",
    sourceCommit: "7997b43c7767e9f6cc6546046c2c7475a49de347",
    sourcePath: "docs/repository-system-map.md",
  },
];
for (const { page: publishedEnglishPage, sourceCommit, sourcePath } of publishedEnglishPages) {
  const content = fs.readFileSync(path.join(root, "docs", publishedEnglishPage), "utf8");
  if (content.includes("not yet published")) {
    fail(`docs/${publishedEnglishPage}: published English article cannot be a forwarding page`);
  }
  if (!content.includes(`/NoctilumeDev-ZH/blob/${sourceCommit}/${sourcePath}`)) {
    fail(`docs/${publishedEnglishPage}: missing exact Chinese source edition ${sourceCommit}`);
  }
}

const publicationIndex = fs.readFileSync(path.join(root, "docs/README.md"), "utf8");
for (const invariant of [
  "## Published in English",
  "## Selected for Future English Publication",
  "## Publication Policy",
  "Chinese article exists\n!= English edition required",
  "English essays\n= GitHub-native Markdown",
  "A Chinese-only article creates no translation debt.",
  "They are not English publications, do not appear in the published index",
]) {
  if (!publicationIndex.includes(invariant)) {
    fail(`English publication index: missing invariant ${invariant}`);
  }
}

const protectingZero = fs.readFileSync(path.join(root, "docs/protecting-zero.md"), "utf8");
for (const marker of [
  "A model can produce an answer. It cannot own a fact.",
  "UNKNOWN\n-> UNVERIFIED\n-> VERIFIED / REFUTED",
  "PENDING / PASS / FAIL / INCONCLUSIVE / BOUNDARY",
  "Human-with-independent-evidence-in-the-loop",
  "It lowers `alpha`, but it also raises `beta`.",
]) {
  if (!protectingZero.includes(marker)) {
    fail(`protecting zero: missing published invariant ${marker}`);
  }
}

const adversarialValidation = fs.readFileSync(
  path.join(root, "docs/adversarial-engineering-validation.md"),
  "utf8",
);
for (const marker of [
  "Can a project still explain what is true after it loses its author",
  "A successful workflow is an execution fact. A required check is a governance fact.",
  "The unit of coverage is the failure mechanism",
  "M7` and `M8`. Those identifiers belong to Qixu.",
  "Now we know why we are allowed to stop.",
]) {
  if (!adversarialValidation.includes(marker)) {
    fail(`adversarial engineering validation: missing published invariant ${marker}`);
  }
}

const engineeringJudgment = fs.readFileSync(
  path.join(root, "docs/engineering-judgment-interview.md"),
  "utf8",
);
for (const marker of [
  "No Single Answer, but a Bounded Solution Space",
  "acceptable solution space Ω",
  "Use AI. Do Not Outsource Judgment.",
  "me\n!=\nmy answer",
  "37daa83b37918210561f8fe69ccb0ee9a72cdb79",
]) {
  if (!engineeringJudgment.includes(marker)) {
    fail(`engineering judgment: missing translated invariant ${marker}`);
  }
}

const journeySvg = fs.readFileSync(path.join(root, "assets/project-journey.svg"), "utf8");
for (const marker of [
  "InkNarratives",
  "DarkRoomLibrary",
  "PlainJournal",
  "PlainJournalPro",
  "Qixu",
  "IDENTITY ADAPTER · NO SHARED DATABASE",
  "VeriTrail",
  "JPyxis",
  "FlowKernel",
  "FEEDBACK TO PLAINJOURNAL'S MACHINE LIMIT",
  "Three roles may compose; implemented boundaries remain single-machine and single-node",
]) {
  if (!journeySvg.includes(marker)) fail(`project journey: missing English semantic marker ${marker}`);
}

const philosophersSvg = fs.readFileSync(path.join(root, "assets/philosophers-kpi.svg"), "utf8");
for (const marker of [
  "The KPI Philosophers",
  "REPORT ≠ FACT",
  "ABILITY ≠ AUTHORIZATION",
  "LOCAL OBSERVATION ≠ COMPLETE FACT",
  "Source-owned state",
  "END STATE ≠ LAWFUL PATH",
  "NOT SELF-CERTIFIED BY AN AGENT",
]) {
  if (!philosophersSvg.includes(marker)) fail(`KPI philosophers: missing English marker ${marker}`);
}

const systemMap = fs.readFileSync(path.join(root, "docs/repository-system-map.md"), "utf8");
for (const invariant of [
  "eleven mapped engineering repositories",
  "The seam is not SSO",
  "JPyxis != VeriTrail Plugin",
  "FlowKernel != Agent Harness",
  "GitHub != Truth Oracle",
  "Review Attention != Verdict Engine",
  "NoctilumeDev != Project Authority",
  "Intent / Claim",
  "!= Human Disposition",
  "!= Reality / Truth",
]) {
  if (!systemMap.includes(invariant)) {
    fail(`repository system map: missing English authority invariant ${invariant}`);
  }
}

if (failures.length > 0) {
  console.error(`English Profile verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `English Profile verification passed: ${textFiles.length} text files, ` +
    `${markdownFiles.length} Markdown files, ${mappedRepositories.length} laboratory routes, ` +
    `${publishedEnglishPages.length} published essays, ${selectedUnpublishedPages.length} selected ` +
    `${selectedUnpublishedPages.length === 1 ? "draft" : "drafts"}, ` +
    `${legacyCompatibilityPages.length} preserved legacy routes.`,
);
