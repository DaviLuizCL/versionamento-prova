import { convert } from "./units.js";

const $ = (sel) => document.querySelector(sel);
const valor = $("#valor");
const de = $("#de");
const para = $("#para");
const btn = $("#converter");
const saida = $("#saida");

function exibir() {
  const v = parseFloat(valor.value);
  const r = convert(v, de.value, para.value);
  if (Number.isNaN(r)) {
    saida.textContent = "Valor inválido.";
  } else {
    saida.textContent = `${v} ${de.value} = ${r} ${para.value}`;
  }
  saida.textContent = Number.isNaN(r)
  ? "Informe um número válido."
  : ${v} ${de.value} equivalem a ${r} ${para.value}.;
}

btn.addEventListener("click", exibir);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") exibir();
});
[valor, de, para].forEach(el => el.addEventListener("input", exibir));
[de, para].forEach(el => el.addEventListener("change", exibir));
exibir();
