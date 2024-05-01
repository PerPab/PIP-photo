
const URLapi = "https://662e6c70a7dda1fa378ceb88.mockapi.io/api/v1/fotos/photos";

let ListaImagenes = [];

function CrearCard(dato) {
    let plantilla = `
    <div class="card mt-2 mb-3" style="width: 18rem;">
                        <img  src= ${dato.imagen} class="card-img-top foto-card p-2" alt="...">
                        <div class="card-body">
                        <p class="fecha-card" >${dato.fecha}</p>
                            <h5 class="titulo-card" class="card-title">${dato.titulo}</h5>
                        </div>
                    </div>
    `
    return plantilla;
}

function LoadingBar() {
    plantilla = `<p class="texto-barra">Cargando...</p>
    <div id="div-loading" class="barra">
        <div class="progreso">
        </div>
    </div>`

    document.getElementById('contenedor-barra-id').innerHTML = plantilla;
}

function OcultarLoadingBar() {
    document.getElementById('contenedor-barra-id').innerHTML = '';
}

function Renderizar() {
    let ListaCards = document.getElementById('lista');
    ListaImagenes.forEach((imagen) => {
        const div = document.createElement("div");
        div.innerHTML = CrearCard(imagen);
        if (ListaCards != null) {
            ListaCards.append(div);

        }
    })
}

function LimpiarMain() {
    let ListaCards = document.getElementById('lista');
    ListaCards.innerHTML = '';
}

function PantallaVacia() {
    let plantilla = `
    <div id="pantalla-vacia" class="m-0 p-0 pantalla-vacia">
        <img src="images/sad-boy.png" class="img-sad" alt="No photo">
        <h5 class="text-sad">No hay fotos en la galería</h5>
    </div>
    `
    document.getElementById('lista').innerHTML = plantilla;
}


function QuitarFiltro() {

    document.getElementById('overlay').classList.toggle('overlay');
    document.getElementById('lines').classList.toggle('line');
    document.getElementById('lines').classList.toggle('hidden');
    document.getElementById('lista').classList.toggle('img-byn');
    document.getElementById('header').classList.toggle('header-footer-back');
    document.getElementById('footer').classList.toggle('header-footer-back');
    document.getElementById('header').classList.toggle('textura-fondo');
    document.getElementById('footer').classList.toggle('textura-fondo');
}


LoadingBar();
function conexionAPI() {
    fetch(URLapi)
        .then((response) => response.json())
        .then((data) => ListaImagenes.push(...data))
        .then(() => {
            if (ListaImagenes.length > 0) {
                OcultarLoadingBar();
                Renderizar();
            } else {
                OcultarLoadingBar();
                PantallaVacia();
            }
        });
}

window.addEventListener('onload', setTimeout(() => {
    conexionAPI();
}, 1000));

//window.addEventListener('onload', conexionAPI());





