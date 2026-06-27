import crypto from "crypto";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REGISTRY = path.join(__dirname, "..", "public", "certificates.json");
const SECRET = "ubys-string-academy-2025";

function generateCode(name, programme, date) {
  const raw = `${name}|${programme}|${date}|${SECRET}`;
  return crypto
    .createHash("sha256")
    .update(raw)
    .digest("hex")
    .slice(0, 4)
    .toUpperCase();
}

function normalizeCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/^UBY-?/, "")
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log("\nUBY'S Certificate Generator\n");
  const name = await ask("Student Name: ");
  const programme = await ask("Programme: ");
  const date = await ask("Date (YYYY-MM-DD): ");
  const level = await ask("Level (Distinction / Merit / Pass): ");
  rl.close();

  const code = generateCode(name.trim(), programme.trim(), date.trim());
  const entry = {
    code,
    name: name.trim(),
    programme: programme.trim(),
    date: date.trim(),
    level: level.trim(),
  };

  let registry = [];
  if (fs.existsSync(REGISTRY)) {
    registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8"));
  }
  registry = registry.filter((item) => normalizeCode(item.code) !== code);
  registry.push(entry);
  fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2), "utf-8");

  const verifyUrl = `https://ubysacademy.com/certification?v=${code}`;
  const qrFile = path.join(__dirname, "..", "public", `qr-${code}.png`);
  await QRCode.toFile(qrFile, verifyUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#0a1628", light: "#ffffff" },
  });

  console.log("\nCertificate generated!");
  console.log(`   Code:  ${code}`);
  console.log(`   URL:   ${verifyUrl}`);
  console.log(`   QR:    public/qr-${code}.png`);
  console.log("   Registry updated: public/certificates.json\n");
}

main();
