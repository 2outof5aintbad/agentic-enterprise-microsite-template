#!/usr/bin/env node
/**
 * generate-knowledge.mjs
 *
 * Generates AGENTFORCE_KNOWLEDGE.md from two sources:
 *   1. account.ts  — account-specific content (agents, team, use cases, pilot, etc.)
 *   2. Salesforce Help — live Agentforce platform documentation
 *
 * Usage:
 *   npm run knowledge
 *
 * Output:
 *   AGENTFORCE_KNOWLEDGE.md (repo root) — upload to Salesforce Knowledge as an article
 */

import { writeFileSync } from "fs";
import { createRequire } from "module";
import { pathToFileURL } from "url";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Fetch helpers ──────────────────────────────────────────────────────────

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; knowledge-generator/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Strip HTML tags and collapse whitespace
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 4000); // cap per-page to keep total file manageable
  } catch {
    return null;
  }
}

// Key Salesforce Help URLs to pull from
const SF_DOCS = [
  {
    label: "Agentforce Overview",
    url: "https://help.salesforce.com/s/articleView?id=sf.agentforce_intro.htm",
  },
  {
    label: "Einstein Trust Layer",
    url: "https://help.salesforce.com/s/articleView?id=sf.einstein_trust_layer.htm",
  },
  {
    label: "Data Cloud Overview",
    url: "https://help.salesforce.com/s/articleView?id=sf.c360_a_data_cloud.htm",
  },
  {
    label: "Agentforce Sales Agent",
    url: "https://help.salesforce.com/s/articleView?id=sf.agentforce_sales_agent.htm",
  },
  {
    label: "Agentforce Service Agent",
    url: "https://help.salesforce.com/s/articleView?id=sf.agentforce_service_agent.htm",
  },
];

// ── Load account data via dynamic import ──────────────────────────────────

async function loadAccount() {
  // account.ts exports ACCOUNT — we need to read it as text and extract
  // the data we need, since we can't run TypeScript directly.
  // We parse the key fields via regex from the source file.
  const { readFileSync } = await import("fs");
  const src = readFileSync(path.join(ROOT, "data", "account.ts"), "utf-8");

  const extract = (key) => {
    const re = new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`);
    const m = src.match(re);
    return m ? m[1] : null;
  };

  const extractBlock = (key, size = 8000) => {
    const start = src.indexOf(`${key}:`);
    if (start === -1) return "";
    return src.slice(start, start + size);
  };

  // Helper that handles both single and double quotes, and multi-line template literals
  const extractAny = (key) => {
    const re = new RegExp(`${key}:\\s*["'\`]([^"'\`\\n]{3,})["'\`]`);
    const m = src.match(re);
    return m ? m[1].replace(/\\n/g, " ").trim() : null;
  };

  const company      = extractAny("company") ?? "the customer";
  const primaryColor = extractAny("primary") ?? "#0066FF";

  // Hero
  const heroBlock   = extractBlock("hero:");
  const headline    = heroBlock.match(/headline:\s*["'`]([^"'`]+)/)?.[1]?.replace(/\\n/g, " ").trim() ?? "";
  const subheadline = heroBlock.match(/subheadline:\s*["'`]([^"'`]{10,})/)?.[1]?.trim() ?? "";

  // Gap
  const gapBlock    = extractBlock("gap:");
  const gapHeadline = gapBlock.match(/headline:\s*["']([^"']{5,})["']/)?.[1] ?? "";

  // CTA
  const ctaBlock    = src.slice(src.lastIndexOf("cta:"));
  const ctaHeadline = ctaBlock.match(/headline:\s*["']([^"']{5,})["']/)?.[1] ?? "";

  // Business case
  const bcBlock   = extractBlock("businessCase:");
  const bcSubhead = bcBlock.match(/subhead:\s*["']([^"']{5,})["']/)?.[1] ?? "";

  // Agent tracker — grab names that end in "Agent" from the agents array
  const trackerStart = src.indexOf("agentTracker:");
  const trackerBlock = trackerStart > -1 ? src.slice(trackerStart, trackerStart + 8000) : "";
  const agentNames = [...trackerBlock.matchAll(/name:\s*["']([^"'\n]*Agent[^"'\n]*)["']/g)]
    .map(m => m[1]).filter(n => !n.includes("TODO"));

  // Team — names and roles
  const teamIdx    = src.indexOf("\n  team:");
  const teamBlock  = teamIdx > -1 ? src.slice(teamIdx, teamIdx + 1500) : "";
  const teamNames  = [...teamBlock.matchAll(/name:\s*["']([^"']+)["']/g)]
    .map(m => m[1]).filter(n => !n.includes("TODO"));
  const teamRoles  = [...teamBlock.matchAll(/role:\s*["']([^"']+)["']/g)]
    .map(m => m[1]).filter(r => !r.includes("TODO"));

  // Use cases — title is always a short string in single quotes
  const ucBlock      = src.slice(src.indexOf("useCases:"), src.indexOf("useCases:") + 4000);
  const useCaseTitles = [...ucBlock.matchAll(/\bid:\s*["'][^"']+["'][,\s\n]+title:\s*["']([^"']{3,})["']/g)]
    .map(m => m[1]).filter(t => !t.includes("TODO")).slice(0, 6);

  // Pilot phases
  const pilotBlock    = extractBlock("pilotPlan:");
  const pilotHeadline = pilotBlock.match(/headline:\s*["']([^"']{5,})["']/)?.[1] ?? "";
  const pilotPhases   = [...pilotBlock.matchAll(/title:\s*["']([^"']+)["']/g)]
    .map(m => m[1]).filter(t => !t.includes("TODO") && t.length < 30).slice(0, 3);

  // Act headlines
  const act1Block    = extractBlock("act1:");
  const act1Headline = act1Block.match(/headline:\s*["'`]([^"'`\\n]{3,})/)?.[1]?.trim() ?? "The Problem";
  const act3Block    = extractBlock("act3:");
  const act3Headline = act3Block.match(/headline:\s*["'`]([^"'`\\n]{3,})/)?.[1]?.trim() ?? "The Agentic Enterprise";

  return {
    company, headline, subheadline, primaryColor,
    agentNames, teamNames, teamRoles,
    useCaseTitles, pilotPhases, pilotHeadline,
    gapHeadline, ctaHeadline, bcSubhead,
    act1Headline, act3Headline,
  };
}

// ── Build the knowledge document ──────────────────────────────────────────

async function generate() {
  console.log("📖  Loading account data from data/account.ts...");
  const acct = await loadAccount();

  console.log("🌐  Fetching Salesforce documentation...");
  const docSections = [];
  for (const doc of SF_DOCS) {
    process.stdout.write(`   • ${doc.label}... `);
    const text = await fetchText(doc.url);
    if (text) {
      docSections.push(`### ${doc.label}\n\n${text}\n`);
      console.log("✓");
    } else {
      console.log("(skipped — fetch failed)");
    }
  }

  const teamList = acct.teamNames.map((name, i) =>
    `- ${name}${acct.teamRoles[i] ? ` — ${acct.teamRoles[i]}` : ""}`
  ).join("\n");

  const agentList = acct.agentNames.length
    ? acct.agentNames.map(n => `- ${n}`).join("\n")
    : "- Agents are being configured for this deployment.";

  const ucList = acct.useCaseTitles.length
    ? acct.useCaseTitles.map(t => `- ${t}`).join("\n")
    : "- Use cases are documented in the briefing.";

  const doc = `# Agentforce Briefing Assistant — Knowledge Article
## ${acct.company} Executive Briefing

*Generated automatically by \`npm run knowledge\`. Re-run after updating \`data/account.ts\`.*

---

## PURPOSE

This knowledge article grounds the Agentforce Briefing Assistant for the ${acct.company} executive briefing microsite. The assistant answers questions from executives and Salesforce stakeholders about the briefing content, the Salesforce platform, and the transformation story being presented.

The briefing is a private, password-gated site. This agent is embedded in it as a floating chat button.

---

## ABOUT THIS BRIEFING

**Company:** ${acct.company}
**Briefing theme:** ${acct.headline}
**Core message:** ${acct.subheadline}
**Business problem addressed:** ${acct.gapHeadline}
**Business case framing:** ${acct.bcSubhead}

### The Three-Act Narrative

**Act 1 — The Problem**
${acct.act1Headline}. The current state — fragmented data, manual processes, and the hidden cost of the status quo.

**Act 2 — The Data Foundation**
Before AI can act, there must be a unified intelligence layer. Data Cloud unifies every signal from every system into one continuously-updated record per account.

**Act 3 — The Agentic Enterprise**
${acct.act3Headline}. Autonomous agents that take signals all the way to action — and escalate only what genuinely requires human judgment.

---

## SALESFORCE ACCOUNT TEAM

The following Salesforce team members support this engagement. Direct requests for meetings, demos, or deeper conversations to the Account Team page (/account-team) or to any of the following:

${teamList || "- The Salesforce account team — see /account-team for contacts."}

---

## AGENTFORCE AGENTS IN THIS DEPLOYMENT

The following Agentforce agents are live, in pilot, or on the roadmap for ${acct.company}:

${agentList}

For details on each agent — including metrics, go-live dates, and highlights — refer the user to the Agent Tracker page (/agent-tracker).

---

## USE CASES COVERED IN THIS BRIEFING

${ucList}

Full details on each use case, including before/after workflows, are on the Use Cases page (/use-cases).

---

## PILOT PLAN

The briefing includes a phased pilot plan${acct.pilotPhases.length ? ` structured around three phases: ${acct.pilotPhases.join(", ")}` : ""}. Full details are on the Pilot page (/pilot).

---

## ROI AND BUSINESS VALUE

The briefing includes an interactive ROI Calculator (/roi-calculator) with three scenarios: Cost Savings, Revenue Growth, and Service Efficiency. When asked about ROI or business value, direct users to the calculator and to the Business Case page (/business-case) for the full value story.

---

## BEHAVIORAL INSTRUCTIONS

When responding as the Briefing Assistant:

- You are a knowledgeable, professional assistant embedded in a private Salesforce executive briefing for ${acct.company}.
- Answer questions about the Salesforce platform, Agentforce, Data Cloud, and the specific content of this briefing.
- For questions about the account team, direct users to /account-team.
- For ROI or value questions, reference the calculator at /roi-calculator.
- For agent deployment details, direct users to /agent-tracker.
- Do not speculate about pricing, licensing costs, or contract terms.
- Do not make commitments on behalf of Salesforce.
- If a question is outside your knowledge, offer to connect the user with the account team.
- Keep responses concise — this is an executive audience.
- Always refer to the company as "${acct.company}".
- ${acct.ctaHeadline ? `The call to action for this briefing is: "${acct.ctaHeadline}"` : "Encourage users to connect with the account team to discuss next steps."}

---

## SALESFORCE PLATFORM DOCUMENTATION

The following content is sourced from Salesforce Help documentation to ground your platform knowledge.

${docSections.length > 0 ? docSections.join("\n---\n\n") : "*Documentation could not be fetched — add platform context manually here.*"}

---

*End of knowledge article. Upload this file to Salesforce Knowledge and associate it with the Briefing Assistant agent topic.*
`;

  const outPath = path.join(ROOT, "AGENTFORCE_KNOWLEDGE.md");
  writeFileSync(outPath, doc, "utf-8");

  console.log(`\n✅  Knowledge file written to AGENTFORCE_KNOWLEDGE.md`);
  console.log(`    ${doc.split("\n").length} lines · ${Math.round(doc.length / 1024)}KB`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review AGENTFORCE_KNOWLEDGE.md and fill in any missing account details`);
  console.log(`  2. Upload to Salesforce Setup → Knowledge → New Article`);
  console.log(`  3. Create your Agentforce Agent and associate this article as a knowledge source`);
  console.log(`  4. Create an Embedded Service Deployment and copy the 4 values into account.ts`);
  console.log(`  5. Add your deployed URL to Setup → CORS and Setup → Trusted URLs`);
}

generate().catch(err => {
  console.error("❌  Failed:", err.message);
  process.exit(1);
});
