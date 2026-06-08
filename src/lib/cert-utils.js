import QRCode from "qrcode";

const SECRET = "ubys-string-academy-2025";

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
  const a = hashHex.slice(0, 4);
  const b = hashHex.slice(4, 8);
  return `UBY-${a}-${b}`;
}

export function makeVerifyUrl(code) {
  return `https://ubysacademy.com/certification?v=${code}`;
}

export function drawQR(canvas, text, options = {}) {
  return QRCode.toCanvas(canvas, text, {
    width: options.width || 200,
    margin: 1,
    color: { dark: "#0a1628", light: "#ffffff" },
    ...options,
  });
}
