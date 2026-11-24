
// Lista de videojuegos

let juegos = [
    {
        id: 1,
        nombre: "Tekken 8",
        genero: "Lucha",
        valoracion: 4.8,
        imagen: "assets/images/tekken8.jpg"
    },
    {
        id: 2,
        nombre: "Elden Ring",
        genero: "RPG",
        valoracion: 4.9,
        imagen: "assets/images/eldenring.jpg"
    },
    {
        id: 3,
        nombre: "God of War",
        genero: "Accion",
        valoracion: 4.8,
        imagen: "assets/images/godofwar.jpg"
    },
    {
        id: 4,
        nombre: "Forza Horizon 5",
        genero: "Carreras",
        valoracion: 4.7,
        imagen: "assets/images/forza5.jpg"
    }
];

// Recuperar favoritos guardados

let favoritos = JSON.parse(
    localStorage.getItem("favoritos") || "[]"
);

// Obtener elementos del HTML

const listaJuegos = document.getElementById("lista-juegos");
const listaFavoritos = document.getElementById("lista-favoritos");
const buscador = document.getElementById("buscador");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");

// Crear tarjeta utilizando BEM

function crearTarjeta(juego) {

    const guardado = favoritos.includes(juego.id);

    return `
        <article class="card ${guardado ? "card--favorito" : ""}">

            <img
                class="card__imagen"
                src="${juego.imagen}"
                alt="${juego.nombre}"
            >

            <div class="card__contenido">

                <h3 class="card__titulo">
                    ${juego.nombre}
                </h3>

                <p class="card__genero">
                    ${juego.genero}
                </p>

                <p class="card__valoracion">
                    ★ ${juego.valoracion}
                </p>

                <button
                    class="card__boton ${guardado ? "card__boton--activo" : ""}"
                    data-id="${juego.id}"
                >
                    ${guardado ? "♥ Quitar favorito" : "♡ Añadir favorito"}
                </button>

            </div>

        </article>
    `;
}

// Mostrar videojuegos

function mostrarJuegos(lista) {

    listaJuegos.innerHTML = lista
        .map(crearTarjeta)
        .join("");

    if (lista.length === 0) {
        listaJuegos.textContent = "No se encontraron juegos.";
    }
}

// Mostrar favoritos

function mostrarFavoritos() {

    const seleccionados = juegos.filter(
        juego => favoritos.includes(juego.id)
    );

    listaFavoritos.innerHTML = seleccionados
        .map(crearTarjeta)
        .join("");

    if (seleccionados.length === 0) {
        listaFavoritos.textContent = "No tienes favoritos.";
    }
}

// Buscar videojuegos

function filtrarJuegos() {

    const texto = buscador.value.toLowerCase();

    const resultado = juegos.filter(
        juego => juego.nombre.toLowerCase().includes(texto)
    );

    mostrarJuegos(resultado);
}

buscador.addEventListener("input", filtrarJuegos);

// Agregar o eliminar favoritos

document.addEventListener("click", function(evento) {

    const boton = evento.target.closest(".card__boton");

    if (!boton) return;

    
    const id = boton.dataset.id;

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(
            favorito => favorito !== id
        );

    } else {

        favoritos.push(id);
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    filtrarJuegos();
    mostrarFavoritos();
});

// Abrir y cerrar menu responsive

menuToggle.addEventListener("click", function() {

    const abierto = menu.classList.toggle(
        "header__nav--abierto"
    );

    menuToggle.setAttribute("aria-expanded", abierto);
});

// Activar enlaces del menu

document.querySelectorAll(".header__link").forEach(enlace => {

    enlace.addEventListener("click", function() {

        document.querySelectorAll(".header__link").forEach(item => {
            item.classList.remove("header__link--activo");
        });

        enlace.classList.add("header__link--activo");

        menu.classList.remove("header__nav--abierto");

        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Ejecutar funciones iniciales


// Cargar videojuegos desde la API
async function iniciarPagina() {

    listaJuegos.textContent = "Cargando videojuegos...";

    juegos = await obtenerJuegosAPI();

    if (juegos.length === 0) {
        listaJuegos.textContent =
            "No se pudieron cargar los videojuegos.";
        mostrarFavoritos();
        return;
    }

    mostrarJuegos(juegos);
    mostrarFavoritos();
}

// Iniciar la pagina
iniciarPagina();
