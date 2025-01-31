const modalNewCliente = document.getElementById('modalNuevoEvento')
const modalEventoNew = new mdb.Modal(modalNewCliente)

document.addEventListener("DOMContentLoaded", async function(event) {
    //código a ejecutar cuando existe la certeza de que el DOM está listo para recibir acciones
    sesionOk()
    await traerEventos()
});
document.getElementById("cerrarSesion").addEventListener("click",()=>{
    cerrarSesion()
})
document.getElementById("formEvento").addEventListener("submit",async (e)=>{
    e.preventDefault()
    await guardarEvento()
})


async function guardarEvento() {
    let form=new FormData(document.getElementById("formEvento"))
    await fetch('php/insertEvento.php',{
        method:"post",
        body:form,
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        console.log(json)
        modalEventoNew.hide()
        document.getElementById("formEvento").reset()
    }) 
}

function sesionOk() {
    if (localStorage.getItem("user")) {
        console.log("sesion ok")
        document.getElementById("userName").innerHTML=JSON.parse(localStorage.getItem("user")).user
    }else{
        console.log("sesion off")
        location.href="../login/login.html"
    }
}
function cerrarSesion() {
    localStorage.clear()
    location.href="../login/login.html"
}

async function traerEventos() {
    // Solicitud GET (Request).
    let form=new FormData(document.getElementById("search"))
    await fetch('php/listarEventos.php',{
        method:"post",
        body:form,
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        console.log(json)
        dibujar(json)
    })    //imprimir los datos en la consola
}
function dibujar(params) {
    let card=``
    params.forEach(element => {
        card+=`<div class="col">
          <div class="card">
            <img src="banners/${element.banner}" class="card-img-top" alt="Hollywood Sign on The Hill"/>
            <div class="card-body">
              <h5 class="card-title">${element.titulo}</h5>
              <p class="card-text">
                ${element.descripcion}
              </p>
            </div>
          </div>
        </div>`
    });
    document.getElementById("listarEventos").innerHTML=card
}


function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}