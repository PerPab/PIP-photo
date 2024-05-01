let modalContenedor = document.getElementById('modal-img');
const btnCapturar = document.getElementById('btn-camara');
const imagen = document.getElementById('imgCamera');
const inputCamera = document.createElement("input");
inputCamera.type = "file"
inputCamera.id = "inputCamera"
inputCamera.accept = "camera"
inputCamera.capture = "environment-facing"



function CrearObjeto(imagenBase64, titulo) {
    let objeto = {
        id: "",
        imagen: imagenBase64,
        fecha: new Date().toLocaleString(),
        titulo: titulo
    }
    return objeto;
}

function convertirImagenAbase64() {
    const canvas = document.createElement("canvas")
    canvas.width = imagen.width
    canvas.height = imagen.height
    canvas.classList.add('hidden');
    const contex = canvas.getContext("2d")
    contex.drawImage(imagen, 0, 0, imagen.width, imagen.height)
    document.querySelector("body").appendChild(canvas)
    return canvas.toDataURL("image/jpeg")

}


if (btnCapturar != null) {
    btnCapturar.addEventListener("click", () => {
        inputCamera.click()
    })
}

function EnviarDatos(objeto) {
    const opciones = {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(objeto)
    }
    fetch(URLapi, opciones)
        .then((response) => {
            if (response.status === 201) {
                LimpiarMain(); // se eliminan los child del la lista de cards
                ListaImagenes = []; // se limpia la lista de elementos
                conexionAPI(); // vuelve a renderizar la lista en el main con los nuevos elementos
                OcultarLoadingBar();
                return response.json()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ocurrio un error",
                    text: "No se pudo generar el recurso"
                })
            }
        })
}

inputCamera.addEventListener("change", () => { //al apretar aceptar en el file se dispara este evento
    if (inputCamera.value !== "") {
        imagen.src = URL.createObjectURL(inputCamera.files[0]) // BLOB: Big Large OBject
        let objetoCreado;
        Swal.fire({
            title: "Ingrese un título",
            inputAttributes: {
                autocapitalize: "off",
                maxlength: "30"
            },
            imageUrl: imagen.src,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Imagen Personal",
            inputPlaceholder: "Máximo 30 caracteres",
            input: "text",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            showCloseButton: true,
            preConfirm: (titulo) => { // al aceptar la ventana modal entra aca
                objetoCreado = CrearObjeto(convertirImagenAbase64(), titulo); // se crea el objeto con la imagen y el titulo
                EnviarDatos(objetoCreado) // aca se envia el objeto con los datos a mockapi
                LoadingBar();
            }
        });
    }
})
