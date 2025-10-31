// src/units.js

// fatores em segundos (base)
export const FACTORS = Object.freeze({
  s: 1,
  min: 60,
  h: 3600,
  dia: 86400,
});

// aliases -> unidade canônica
const ALIASES = Object.freeze({
  s: "s",
  seg: "s",
  segundo: "s",
  segundos: "s",

  min: "min",
  minuto: "min",
  minutos: "min",

  h: "h",
  hora: "h",
  horas: "h",

  dia: "dia",
  dias: "dia",
});

function normalizeUnit(u) {
  if (u == null) return null;
  return ALIASES[String(u).toLowerCase()] ?? null;
}

/**
 * Converte valor de uma unidade de tempo para outra.
 * @param {number} valor
 * @param {string} de - ex.: "s", "min", "h", "dia" (ou seus aliases)
 * @param {string} para - ex.: "s", "min", "h", "dia" (ou seus aliases)
 * @returns {number} resultado ou NaN se inválido
 */
export function convert(valor, de, para) {
  const v = Number(valor);
  const from = normalizeUnit(de);
  const to = normalizeUnit(para);

  if (!Number.isFinite(v)) return NaN;
  if (!from || !to) return NaN;
  if (!(from in FACTORS) || !(to in FACTORS)) return NaN;

  const baseSegundos = v * FACTORS[from];
  return baseSegundos / FACTORS[to];
}

// opcional: útil pra UI/listas
export function supportedUnits() {
  return Object.keys(FACTORS); // ["s","min","h","dia"]
}
