const crypto = require("crypto-js");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const REGISTRY = path.join(__dirname, "..", "public", "certificates.json");
const SECRET = "ubys-string-academy-2025";

function generateCode(name, programme, date) {
  const raw = `${name}|${programme}|${date}|${SECRET}`;
  const hash = crypto.SHA256(raw).toString(crypto.enc.Hex).toUpperCase();
  const a = hash.slice(0, 4);
  const b = hash.slice(4, 8);
  const c = hash.slice(8, 12);
  return `UBY-${a}-${b}-${c}`;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log("\n🔐 UBY'S Certificate Generator\n");
  const name = await ask("Student Name: ");
  const programme = await ask("Programme (e.g. Advanced Violin): ");
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
  registry.push(entry);
  fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2), "utf-8");

  const verifyUrl = `https://ubysacademy.com/certification?v=${code}`;
  const qrFile = path.join(__dirname, "..", "public", `qr-${code}.png`);
  await QRCode.toFile(qrFile, verifyUrl, { width: 400, margin: 2, color: { dark: "#0a1628", light: "#ffffff" } });

  console.log(`\n✅ Certificate generated!`);
  console.log(`   Code:  ${code}`);
  console.log(`   URL:   ${verifyUrl}`);
  console.log(`   QR:    public/qr-${code}.png`);
  console.log(`   Registry updated: public/certificates.json\n`);
}

main();
