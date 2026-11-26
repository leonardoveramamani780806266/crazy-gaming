
/* ========================================
   CRAZY TEKKEN
   CONSUMO DE API REST
======================================== */

const API_URL =
    "https://raw.githubusercontent.com/joeycf/tekken-replay-database/main/data/characters.json";

const IMAGE_URL =
    "https://raw.githubusercontent.com/joeycf/tekken-replay-database/main/public";

async function obtenerPersonajesAPI() {

    try {

        console.log("Conectando con la API de Tekken 8...");

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error("Formato de datos no válido");
        }

        const personajesAPI = datos.map(personaje => ({

            id: personaje.id,

            nombre: personaje.name,

            nombreCompleto:
                personaje.extra?.["full name"] || personaje.name,

            imagen: personaje.imgPortrait
                ? IMAGE_URL + personaje.imgPortrait
                : "",

            imagenCompleta: personaje.imgSplash
                ? IMAGE_URL + personaje.imgSplash
                : "",

            alias: personaje.extra?.aliases || [],

            japones: personaje.extra?.japanese || ""

        }));

        console.log("Personajes recibidos:", personajesAPI.length);

        return personajesAPI;

    } catch (error) {

        console.error("Error al consumir la API:", error);

        return [];

    }
}
