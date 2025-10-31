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
}

btn.addEventListener("click", exibir);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") exibir();
});
