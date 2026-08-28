import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "README.md",
  "docs/single-machine-engineering-environment.md",
  "docs/solo-engineering-method.md",
  "docs/public-verification-loop.md",
  "docs/fresh-checkout-independent-audit.md",
  "docs/adversarial-engineering-validation.md",
  "docs/adversarial-engineering-validation.pdf",
  "docs/protecting-zero.md",
  "docs/protecting-zero-from-answer-to-fact.pdf",
  "docs/from-tool-gain-to-collaborative-compounding.pdf",
  "docs/one-person-big-company.pdf",
];
const publicRepositories = [
  "DarkRoomLibrary",
  "FlowKernel",
  "InkNarratives",
  "MiniSpringBoot",
  "PlainJournal",
  "PlainJournalPro",
  "VeriTrail",
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
  if (!fs.existsSync(path.join(root, relative))) fail(`Missing required profile artifact: ${relative}`);
}

const files = listFiles(root);
const textExtensions = new Set(["", ".md", ".yml", ".yaml", ".json", ".mjs"]);
const textFiles = files.filter((file) => textExtensions.has(path.extname(file).toLowerCase()));
const markdownFiles = textFiles.filter((file) => path.extname(file).toLowerCase() === ".md");
const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const sensitivePatterns = [
  { name: "Windows user path", pattern: /[A-Za-z]:\\Users\\/ },
  { name: "Unix home path", pattern: /\/(?:Users|home)\/[^/\s]+\// },
  { name: "private key", pattern: /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/ },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/ },
];

for (const file of textFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const content = fs.readFileSync(file, "utf8");
  if (!content.endsWith("\n")) fail(`${relative}: missing final newline`);
  content.split(/\r?\n/).forEach((line, index) => {
    if (/[ \t]+$/.test(line)) fail(`${relative}:${index + 1}: trailing whitespace`);
  });
  for (const { name, pattern } of sensitivePatterns) {
    if (pattern.test(content)) fail(`${relative}: contains ${name}`);
  }
}

for (const file of markdownFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim();
    if (/^(?:https?:\/\/|mailto:|#)/.test(target)) continue;
    const pathname = decodeURIComponent(target.split("#", 1)[0]);
    if (!pathname) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), pathname))) {
      fail(`${relative}: broken relative link ${target}`);
    }
  }
}

for (const relative of requiredFiles.filter((file) => file.endsWith(".pdf"))) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) continue;
  const bytes = fs.readFileSync(absolute);
  if (bytes.length < 1024 || bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
    fail(`${relative}: invalid or unexpectedly small PDF artifact`);
  }
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
for (const heading of [
  "## Flagship Work",
  "## Selected Experiments",
  "## Research / Planned",
  "## Maintenance Posture",
  "## Solo Engineering Toolkit / 单兵工程三剑客",
  "## Essays / 工程复盘与方法论",
]) {
  if (!readme.includes(heading)) fail(`README.md: missing stable profile section ${heading}`);
}

for (const repository of publicRepositories) {
  const url = `https://github.com/NoctilumeDev/${repository}`;
  if (!readme.includes(url)) fail(`README.md: missing public repository entry ${repository}`);
}

if (!readme.includes("implementation has not started")) {
  fail("README.md: FlowKernel planned boundary is missing");
}
if (!readme.includes("explicitly not presented as implemented software")) {
  fail("README.md: PlainJournalPro planned boundary is missing");
}
if (readme.includes("/releases/tag/")) {
  fail("README.md: duplicated release tag coordinate; keep exact versions in project repositories");
}
for (const article of [
  "docs/from-tool-gain-to-collaborative-compounding.pdf",
  "docs/protecting-zero-from-answer-to-fact.pdf",
  "docs/adversarial-engineering-validation.pdf",
]) {
  if (!readme.includes(article)) fail(`README.md: missing essay entry ${article}`);
}

const audit = fs.readFileSync(path.join(root, "docs/fresh-checkout-independent-audit.md"), "utf8");
if (!audit.includes("GLM-5.3") || audit.includes("GLM-5.2")) {
  fail("fresh checkout audit: recorded model provenance must remain GLM-5.3");
}

if (failures.length > 0) {
  console.error(`Profile verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Profile verification passed: ${textFiles.length} text files, ${markdownFiles.length} Markdown files, ${publicRepositories.length + 1} public repositories represented.`,
);
