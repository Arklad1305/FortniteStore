const API_KEY = "TU_API_KEY_AQUI"; // 🔥 Reemplaza con tu clave real

fetch("https://fortnite-api.com/v2/shop/br", {
    headers: {
        "Authorization": cebdad29-0f19766b-2a9ed0ee-13087548 // 👈 Aquí enviamos la API Key
    }
})
    .then(response => {
        if (!response.ok) throw new Error("Error en la red");
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica en la consola si los datos llegan bien

        if (!data.data || !data.data.featured || !Array.isArray(data.data.featured)) {
            throw new Error("❌ La API no contiene la estructura esperada.");
        }

        const categorias = agruparProductosPorCategoria(data.data.featured);
        const categoriasOrdenadas = ordenarCategorias(categorias);
        mostrarProductos(categoriasOrdenadas);
    })
    .catch(error => {
        console.error("❌ Error al cargar la API:", error);
        alert("Ocurrió un error al cargar los productos. Inténtalo más tarde.");
    });

