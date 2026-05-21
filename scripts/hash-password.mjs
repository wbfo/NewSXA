#!/usr/bin/env node
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const salt = randomBytes(16).toString("base64url");
const derivedKey = scryptSync(password, salt, 64).toString("base64url");
console.log(`sxa-scrypt$${salt}$${derivedKey}`);
