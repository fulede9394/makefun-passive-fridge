// The fridge has been keeping score: six days of leftovers, zero thank-yous,
// and one 2 a.m. snack raid too many. This note goes on the door screen.
import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

const NOTE =
  "Note from your fridge: I kept the leftovers cold for six days. You threw them out anyway. I will remember this the next time you open me at 2 a.m.";

class EntryWriter {
  readonly limit = 200;
  private readonly line: string;
  constructor(line: string) {
    this.line = line;
  }
  check(): void {
    if (this.line.length < 1 || this.line.length > this.limit) {
      throw new Error("note is outside the 1-200 character gate");
    }
  }
  deliver(): void {
    this.check();
    if (!this.line.toLowerCase().includes("fridge")) {
      throw new Error("note must name the fridge");
    }
    const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "entry.txt"), Buffer.from(this.line, "utf8"));
  }
}

new EntryWriter(NOTE).deliver();
