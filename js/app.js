import * as UI from './selectores.js';
import { consultarApi } from './api.js';

UI.formularioBusqueda.addEventListener("submit", buscarCancion);

async function buscarCancion(e) {
  e.preventDefault();
  const artista = document.querySelector("#artista").value;
  const cancion = document.querySelector("#cancion").value;
  spinner()
  // Llamando a la api publica...
  const letra = await consultarApi(artista, cancion);
  if (letra) {
    pintarLetraHTML(letra);
    UI.formularioBusqueda.reset();
  } else {
    showMessage("try another song");
  }
}

function pintarLetraHTML(letra) {
  const artista = document.querySelector("#artista").value;
  const cancion = document.querySelector("#cancion").value;
  UI.headingLetra.innerHTML = `
    <h2> ~ ${cancion} ~ </h2>
    <p>${artista}</p>
  `;
  UI.resultado.textContent = letra;
}

export function showMessage(msj) {
  UI.headingLetra.innerHTML = "";
  UI.resultado.textContent = ""
  const divMsj = document.createElement("div");
  divMsj.classList.add("error");
  divMsj.textContent = msj;

  const mensajes = document.querySelector(".error");
  if (!mensajes) {
    UI.contenedorResultado.insertBefore(divMsj, UI.resultado);
  }

  setTimeout(() => {
    divMsj.remove();
  }, 2000)
}

export function spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-chase');
  divSpinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  `;
  UI.resultado.appendChild(divSpinner);
}

function limpiarHTML(){
  while(UI.resultado.firstChild){
    UI.resultado.removeChild(UI.resultado.firstChild);
  }
}