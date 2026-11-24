// make.fun — "The Robot Pickup Line Championship"
// Bounty: u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b
//
// Writes the funniest one-line pickup line a robot could use to
// /output/entry.txt. The line is a Wi-Fi joke with a robot's body in it:
// the robot drops every other connection and its cooling fans spin —
// a pickup line only a machine with antennas and fans could deliver.
// The robot angle is the joke: a human would say "you light up my
// life"; a robot says its fans spin, because that is what its body
// actually does when it overheats.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Are you Wi-Fi? Because every time you walk in, I drop all other connections and my cooling fans spin just for you.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return length;
}

const length = validateEntry(TEXT);
console.log(`entry OK: ${length} characters`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
