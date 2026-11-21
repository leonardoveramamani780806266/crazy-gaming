
/* CRAZY GAMING - MENÚ DE NAVEGACIÓN */

const botonMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu");

function cerrarMenu() {
    menuPrincipal.classList.remove("abierto");
    botonMenu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
}

botonMenu.addEventListener("click", () => {
    const abierto = menuPrincipal.classList.toggle("abierto");

    botonMenu.classList.toggle("abierto", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );
});

/* Navegación y enlace activo */
document.querySelectorAll("#menu a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        document.querySelectorAll("#menu a").forEach(item => {
            item.classList.remove("activo");
        });

        enlace.classList.add("activo");
        cerrarMenu();
    });
});

/* Cerrar menú con Escape */
document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        cerrarMenu();
    }
});

/* Cerrar menú al volver a escritorio */
window.addEventListener("resize", () => {
    if (window.innerWidth > 1050) {
        cerrarMenu();
    }
});
