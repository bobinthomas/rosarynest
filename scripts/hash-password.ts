// Usage: npx tsx scripts/hash-password.ts "your-password-here"
// Prints the SHA-256 hex hash to put in ADMIN_PASSWORD_HASH (.env.local / Cloudflare secret).
import { createHash } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npx tsx scripts/hash-password.ts <password>");
  process.exit(1);
}

console.log(createHash("sha256").update(password).digest("hex"));
