document.addEventListener("DOMContentLoaded", async function(event) {
    //código a ejecutar cuando existe la certeza de que el DOM está listo para recibir acciones
    await traerEventos()
});

async function traerEventos() {
    // Solicitud GET (Request).
    await fetch('php/php.php')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        console.log(json)
        dibujar(json)
        initializeCarousel()
    })    //imprimir los datos en la consola
}
function dibujar(params) {
    let card=``
    params.forEach(element => {
        card+=`<div class="slide" style="background-image: url('admin/principal/banners/${element.banner}');">
                        <div class="slide-content">
                            <h2 class="slide-title">${element.titulo}</h2>
                            <p class="slide-description"> ${element.descripcion}</p>
                            <div style="font-weight: bold;" class="slide-date">Fecha: ${convertirFecha(element.fechaInicio)}</div>
                        </div>
                    </div>`
    });
    document.getElementById("eventosCarrucel").innerHTML=card
}



/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* ///////////////CARUCEL CARRUCEL CARRUCEL////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */


function initializeCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

/*     let autoSlideInterval = setInterval(nextSlide, 5000); */

  /*   carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 5000)); */

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextSlide();
        } else if (touchEndX > touchStartX) {
            prevSlide();
        }
    }
}
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////// */
function convertirFecha(fecha) {
    // Crear un array con los meses en español
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Dividir la fecha en partes
    const partes = fecha.split('-');
    const año = partes[0];
    const mes = parseInt(partes[1]) - 1; // Los meses en el array empiezan en 0
    const día = parseInt(partes[2]);

    // Construir la nueva fecha en el formato deseado
    const nuevaFecha = `${día} de ${meses[mes]}, ${año}`;

    return nuevaFecha;
}

