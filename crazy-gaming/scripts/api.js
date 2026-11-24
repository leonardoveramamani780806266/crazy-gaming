
// CRAZY GAMING
// Avance: consumo de API REST

// URL de la API externa
const API_URL =
    "https://www.cheapshark.com/api/1.0/deals?pageSize=20";

// Funcion para obtener videojuegos
async function obtenerJuegosAPI() {

    try {

        // Realizar peticion HTTP GET
        const respuesta = await fetch(API_URL);

        // Verificar el estado de la respuesta
        if (!respuesta.ok) {
            throw new Error("Error de conexion");
        }

        // Convertir respuesta a JSON
        const datos = await respuesta.json();

        // Adaptar datos a nuestro proyecto
        return datos.map(juego => ({
            id: juego.dealID,
            nombre: juego.title,
            genero: "PC",
            valoracion: Number(juego.steamRatingPercent) / 20,
            imagen: juego.thumb,
            precio: juego.salePrice,
            precioOriginal: juego.normalPrice,
            descuento: Math.round(Number(juego.savings)),
            enlace: "https://www.cheapshark.com/redirect?dealID="
                + encodeURIComponent(juego.dealID)
        }));

    } catch (error) {

        // Mostrar errores en consola
        console.error("Error de API:", error);

        // Devolver una lista vacia
        return [];
    }
}
