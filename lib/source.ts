import { join } from "node:path";

// The shell's repo, which the site reads: its changelog (and so the version), the logo in its
// README and the install line. Next to this repo by default; CI checks it out and sets ASHEN_REPO.
export const ashenRepo = process.env.ASHEN_REPO ?? join(process.cwd(), "..", "ashen");
