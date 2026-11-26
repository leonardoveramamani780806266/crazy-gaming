/* ========================================
   CRAZY TEKKEN
   LOGICA PRINCIPAL DE LA PAGINA
======================================== */

let personajes = [];

const listaPersonajes = document.getElementById("lista-personajes");
const buscador = document.getElementById("buscador");

const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");

// Escapar caracteres especiales
function escaparHTML(texto) {

    return String(texto ?? "").replace(/[&<>"']/g, caracter => {

        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caracter];
    });
}

// Crear tarjeta de personaje
function crearTarjeta(personaje) {

    return `
        <article class="card">

            <img
                class="card__imagen"
                src="${escaparHTML(personaje.imagen)}"
                alt="Imagen de ${escaparHTML(personaje.nombre)}"
                loading="lazy"
                onerror="this.style.display='none'"
            >

            <div class="card__contenido">

                <h3 class="card__titulo">
                    ${escaparHTML(personaje.nombre)}
                </h3>

                <p class="card__genero">
                    <strong>Nombre completo:</strong>
                    ${escaparHTML(personaje.nombreCompleto)}
                </p>

                <p class="card__genero">
                    <strong>Alias:</strong>
                    ${escaparHTML(
                        Array.isArray(personaje.alias)
                            ? personaje.alias.join(", ") || "No disponible"
                            : personaje.alias || "No disponible"
                    )}
                </p>

            </div>

        </article>
    `;
}

// Mostrar personajes
function mostrarPersonajes(lista) {

    if (!listaPersonajes) return;

    if (lista.length === 0) {

        listaPersonajes.textContent =
            "No se encontraron personajes.";

        return;
    }

    listaPersonajes.innerHTML = lista
        .map(crearTarjeta)
        .join("");
}

// Buscar personajes
function filtrarPersonajes() {

    const texto = buscador.value.toLowerCase().trim();

    const resultado = personajes.filter(personaje => {

        const nombre = (personaje.nombre || "").toLowerCase();

        const nombreCompleto =
            (personaje.nombreCompleto || "").toLowerCase();

        const alias = Array.isArray(personaje.alias)
            ? personaje.alias.join(" ").toLowerCase()
            : String(personaje.alias || "").toLowerCase();

        return nombre.includes(texto) ||
               nombreCompleto.includes(texto) ||
               alias.includes(texto);
    });

    mostrarPersonajes(resultado);
}

// Buscador
if (buscador) {
    buscador.addEventListener("input", filtrarPersonajes);
}

// Menú responsive
if (menuToggle && menu) {

    menuToggle.addEventListener("click", function() {

        const abierto = menu.classList.toggle(
            "header__nav--abierto"
        );

        menuToggle.setAttribute("aria-expanded", abierto);
    });
}

// Enlaces del menú
document.querySelectorAll(".header__link").forEach(enlace => {

    enlace.addEventListener("click", function() {

        document.querySelectorAll(".header__link").forEach(item => {
            item.classList.remove("header__link--activo");
        });

        enlace.classList.add("header__link--activo");

        if (menu && menuToggle) {

            menu.classList.remove("header__nav--abierto");

            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

// Cargar personajes
async function iniciarPagina() {

    if (!listaPersonajes) return;

    listaPersonajes.textContent =
        "Cargando luchadores de Tekken 8...";

    try {

        personajes = await obtenerPersonajesAPI();

        if (!personajes || personajes.length === 0) {

            listaPersonajes.textContent =
                "No se pudieron cargar los personajes.";

            return;
        }

        mostrarPersonajes(personajes);

        console.log("Personajes cargados:", personajes.length);

    } catch (error) {

        console.error("Error al iniciar la página:", error);

        listaPersonajes.textContent =
            "Ocurrió un error al cargar los personajes.";
    }
}

iniciarPagina();
