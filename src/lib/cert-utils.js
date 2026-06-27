import QRCode from "qrcode";

const SECRET = "ubys-string-academy-2025";

export function normalizeCertificateCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/^UBY-?/, "")
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
}

export async function hashToCode(name, programme, date) {
  const raw = `${name}|${programme}|${date}|${SECRET}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return hashHex.slice(0, 4);
}

export function makeVerifyUrl(code) {
  return `https://ubysacademy.com/certification?v=${normalizeCertificateCode(code)}`;
}

export function drawQR(canvas, text, options = {}) {
  return QRCode.toCanvas(canvas, text, {
    width: options.width || 200,
    margin: 1,
    color: { dark: "#0a1628", light: "#ffffff" },
    ...options,
  });
}
