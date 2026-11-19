
const juegos = [
    {
        id: 1,
        nombre: "Valorant",
        categoria: "Acción",
        descripcion: "Juego de disparos táctico."
    },
    {
        id: 2,
        nombre: "Elden Ring",
        categoria: "RPG",
        descripcion: "Aventura de mundo abierto."
    },
    {
        id: 3,
        nombre: "God of War",
        categoria: "Aventura",
        descripcion: "Historia de Kratos y Atreus."
    },
    {
        id: 4,
        nombre: "Cyberpunk 2077",
        categoria: "RPG",
        descripcion: "Aventura futurista."
    }
];

let favoritos = JSON.parse(
    localStorage.getItem("favoritosCrazyGaming") || "[]"
);

let categoriaActual = "Todos";

function mostrarJuegos() {
    const contenedor = document.getElementById("lista-juegos");
    const busqueda = document.getElementById("buscador")
        .value.toLowerCase();

    contenedor.innerHTML = "";

    const resultados = juegos.filter(juego => {
        const coincideNombre = juego.nombre
            .toLowerCase()
            .includes(busqueda);

        const coincideCategoria =
            categoriaActual === "Todos" ||
            juego.categoria === categoriaActual;

        return coincideNombre && coincideCategoria;
    });

    resultados.forEach(juego => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const titulo = document.createElement("h3");
        titulo.textContent = juego.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = juego.descripcion;

        const boton = document.createElement("button");
        boton.textContent = favoritos.includes(juego.id)
            ? "Quitar de favoritos"
            : "Agregar a favoritos";

        boton.addEventListener("click", () => {
            agregarFavorito(juego.id);
        });

        tarjeta.append(titulo, descripcion, boton);
        contenedor.appendChild(tarjeta);
    });
}

function filtrarJuegos(categoria) {
    categoriaActual = categoria;
    mostrarJuegos();
}

function agregarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem(
        "favoritosCrazyGaming",
        JSON.stringify(favoritos)
    );

    mostrarJuegos();
    mostrarFavoritos();
}

function mostrarFavoritos() {
    const contenedor = document.getElementById("lista-favoritos");
    contenedor.innerHTML = "";

    const seleccionados = juegos.filter(juego =>
        favoritos.includes(juego.id)
    );

    if (seleccionados.length === 0) {
        contenedor.textContent = "Todavía no tienes favoritos.";
        return;
    }

    seleccionados.forEach(juego => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const titulo = document.createElement("h3");
        titulo.textContent = juego.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = juego.descripcion;

        tarjeta.append(titulo, descripcion);
        contenedor.appendChild(tarjeta);
    });
}

document.getElementById("buscador")
    .addEventListener("input", mostrarJuegos);

mostrarJuegos();
mostrarFavoritos();
