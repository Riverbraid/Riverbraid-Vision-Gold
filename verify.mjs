import { execSync } from "child_process"; try { execSync("node run-vectors.cjs verify", { stdio: "inherit" }); } catch(e) { process.exit(1); }
