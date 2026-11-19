
/* MENÚ RESPONSIVE */

const botonMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");

    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.textContent = abierto ? "✕" : "☰";
});

/* CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN */

document.querySelectorAll(".menu a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.textContent = "☰";

        document.querySelectorAll(".menu a").forEach(item => {
            item.classList.remove("activo");
        });

        enlace.classList.add("activo");
    });
});
