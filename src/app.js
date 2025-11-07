// src/app.js
import { convert } from "./units.js";

const $ = (sel) => document.querySelector(sel);
const valor = $("#valor");
const de = $("#de");
const para = $("#para");
const btn = $("#converter");
const saida = $("#saida");
const prideButton = $("#pride-button");

// formata número no padrão pt-BR (sem exagerar nas casas decimais)
const nf = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 6,
});

const nomes = {
  s: ["segundo", "segundos"],
  min: ["minuto", "minutos"],
  h: ["hora", "horas"],
  dia: ["dia", "dias"],
};

function plural(unit, v) {
  const [sing, plur] = nomes[unit] || [unit, unit + "s"];
  return Math.abs(v) === 1 ? sing : plur;
}

function exibir() {
  const v = Number.parseFloat(valor.value);
  if (!Number.isFinite(v)) {
    saida.textContent = "Informe um número válido.";
    return;
  }

  const r = convert(v, de.value, para.value);
  if (!Number.isFinite(r)) {
    saida.textContent = "Não foi possível converter.";
    return;
  }

  const vFmt = nf.format(v);
  const rFmt = nf.format(r);
  const deNome = plural(de.value, v);
  const paraNome = plural(para.value, r);

  // mensagem mais amigável
  saida.textContent = `${vFmt} ${deNome} equivalem a ${rFmt} ${paraNome}.`;
}

// ----- Pride mode 🌈 -----
// ----- Pride mode 🌈 -----
let prideIntervalId = null;
let prideHue = 0;
let prideActive = false;

function togglePrideMode() {
  if (!prideActive) {
    prideActive = true;
    if (prideButton) {
      prideButton.textContent = "Desligar viadagem 🌈";
    }

    prideIntervalId = setInterval(() => {
      // muda de cor bem rápido
      prideHue = (prideHue + 40) % 360;
      // você pode brincar com saturação e luminosidade aqui também
      document.body.style.background = `hsl(${prideHue} 80% 50%)`;
    }, 40); // 40ms = bem mais insano que 100ms
  } else {
    prideActive = false;
    if (prideButton) {
      prideButton.textContent = "viadagem button 🌈";
    }
    if (prideIntervalId !== null) {
      clearInterval(prideIntervalId);
      prideIntervalId = null;
    }
    // volta pro background padrão do CSS
    document.body.style.background = "";
  }
}


// Clique no botão
btn.addEventListener("click", exibir);

// Enter em qualquer lugar da página
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") exibir();
});

if (prideButton) {
  prideButton.addEventListener("click", togglePrideMode);
}

// Atualização em tempo real ao digitar/trocar selects
[valor, de, para].forEach((el) => {
  el.addEventListener("input", exibir);
  el.addEventListener("change", exibir);
});

// mostra um resultado inicial ao carregar
document.addEventListener("DOMContentLoaded", exibir);
