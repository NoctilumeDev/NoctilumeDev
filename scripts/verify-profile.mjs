import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "README.md",
  "assets/project-journey.svg",
  "docs/repository-system-map.md",
  "docs/single-machine-engineering-environment.md",
  "docs/solo-engineering-method.md",
  "docs/solo-engineering-runtime-diagnostics.md",
  "docs/public-verification-loop.md",
  "docs/fresh-checkout-independent-audit.md",
  "docs/ai-cognitive-feedback-loop.md",
  "docs/adversarial-engineering-validation.md",
  "docs/adversarial-engineering-validation.pdf",
  "docs/protecting-zero.md",
  "docs/protecting-zero-from-answer-to-fact.pdf",
  "docs/from-tool-gain-to-collaborative-compounding.pdf",
  "docs/one-person-big-company.pdf",
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
  "VeriTrail",
];
const mappedRepositoryCount = mappedRepositories.length + 1; // Includes this profile repository.

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
const textExtensions = new Set(["", ".md", ".yml", ".yaml", ".json", ".mjs", ".svg"]);
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
  "## Repository System Map / 仓库关系图",
  "## Research / Planned",
  "## Maintenance Posture",
  "## Solo Engineering Toolkit / 单兵工程三剑客",
  "## Essays / 工程复盘与方法论",
]) {
  if (!readme.includes(heading)) fail(`README.md: missing stable profile section ${heading}`);
}

for (const invariant of [
  "### Evidence-feedback loop / 证据反馈施工回路",
  "绑定当前坐标与最小计划",
  "计划已定义\n≠ 执行完成\n≠ 资格成立\n≠ 状态生效\n≠ 下一步已授权",
  "具体门禁由各仓库自己的风险与合同决定",
]) {
  if (!readme.includes(invariant)) fail(`README.md: missing evidence-feedback invariant ${invariant}`);
}

if (readme.includes("VeriTrail#发布状态")) {
  fail("README.md: stale VeriTrail release-status anchor must not return");
}
for (const anchor of ["VeriTrail#当前状态", "VeriTrail#发布坐标"]) {
  if (!readme.includes(anchor)) fail(`README.md: missing current VeriTrail anchor ${anchor}`);
}

for (const repository of mappedRepositories) {
  const url = `https://github.com/NoctilumeDev/${repository}`;
  if (!readme.includes(url)) fail(`README.md: missing mapped repository entry ${repository}`);
}

const journeySvg = fs.readFileSync(path.join(root, "assets/project-journey.svg"), "utf8");
for (const marker of [
  "InkNarratives",
  "暗室藏书",
  "素简记",
  "素简记 Pro",
  "VeriTrail / 验迹",
  "JPyxis",
  "FlowKernel / 流核",
  "回到素简记暴露的单机边界",
]) {
  if (!journeySvg.includes(marker)) fail(`project journey: missing semantic marker ${marker}`);
}

const systemMap = fs.readFileSync(path.join(root, "docs/repository-system-map.md"), "utf8");
for (const invariant of [
  "十个被映射的体系仓库",
  "dome](https://github.com/NoctilumeDev/dome)",
  "历史归档保留在体系图之外",
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
    fail(`repository system map: missing authority invariant ${invariant}`);
  }
}

const protectingZero = fs.readFileSync(path.join(root, "docs/protecting-zero.md"), "utf8");
for (const invariant of [
  "Epistemic state / 命题状态",
  "Run result / 本轮观察或验收结果",
  "它们不是命题本身的认知状态",
]) {
  if (!protectingZero.includes(invariant)) {
    fail(`protecting zero: missing two-axis invariant ${invariant}`);
  }
}
if (protectingZero.includes("VERIFIED / REFUTED / BOUNDARY / INCONCLUSIVE")) {
  fail("protecting zero: epistemic state and run disposition are merged again");
}

const singleMachineEnvironment = fs.readFileSync(
  path.join(root, "docs/single-machine-engineering-environment.md"),
  "utf8",
);
if (singleMachineEnvironment.includes("七个仓库")) {
  fail("single-machine environment: live guidance must not depend on a historical repository count");
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
  "docs/ai-cognitive-feedback-loop.md",
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
  `Profile verification passed: ${textFiles.length} text files, ${markdownFiles.length} Markdown files, ${mappedRepositoryCount} mapped repositories represented.`,
);
