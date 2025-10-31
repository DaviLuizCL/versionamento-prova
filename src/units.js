export const factors = {
  s: 1,
  min: 60,
  h: 3600,
  dia: 86400
};

export function convert(valor, de, para) {
  if (typeof valor !== "number" || Number.isNaN(valor)) return NaN;
  const baseSegundos = valor * factors[de];
  return baseSegundos / factors[para];
}
