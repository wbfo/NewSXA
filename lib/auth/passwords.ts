import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const HASH_PREFIX = "sxa-scrypt";
const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH).toString("base64url");
  return `${HASH_PREFIX}$${salt}$${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [prefix, salt, expected] = storedHash.split("$");
  if (prefix !== HASH_PREFIX || !salt || !expected) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, KEY_LENGTH);
  const expectedKey = Buffer.from(expected, "base64url");

  if (derivedKey.length !== expectedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, expectedKey);
}
