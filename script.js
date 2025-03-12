fetch(productos.json") // Carga desde el archivo en GitHub
    .then(response => {
        if (!response.ok) throw new Error("Error en la red");
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica que el JSON se esté cargando correctamente

        if (!data.data || !data.data.featured) throw new Error("Formato incorrecto");

        const categorias = agruparProductosPorCategoria(data.data.featured);
        const categoriasOrdenadas = ordenarCategorias(categorias);
        mostrarProductos(categoriasOrdenadas);
    })
    .catch(error => console.error("❌ Error al cargar JSON:", error));

// Agrupar productos por categoría
function agruparProductosPorCategoria(shopItems) {
    return shopItems.reduce((acc, item) => {
        const categoria = item.section?.name || item.mainType || "Otros";

        if (!acc[categoria]) {
            acc[categoria] = [];
        }

        acc[categoria].push({
            nombre: item.displayName,
            precio: item.price.finalPrice,
            imagen: item.displayAssets?.[0]?.background || item.displayAssets?.[0]?.url
        });

        return acc;
    }, {});
}

// Ordenar categorías
function ordenarCategorias(categorias) {
    return Object.entries(categorias).sort(([a], [b]) => {
        return a === "Pistas de improvisación" ? 1 : b === "Pistas de improvisación" ? -1 : 0;
    });
}

// Mostrar productos en la web
function mostrarProductos(categorias) {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    categorias.forEach(([categoria, productos]) => {
        contenedor.appendChild(crearTituloCategoria(categoria));
        const contenedorProductos = crearContenedorProductos(productos);
        contenedor.appendChild(contenedorProductos);
    });
}

// Crear el título de la categoría
function crearTituloCategoria(categoria) {
    const tituloCategoria = document.createElement("h2");
    tituloCategoria.textContent = categoria;
    tituloCategoria.className = "category-title";
    return tituloCategoria;
}

// Crear el contenedor de productos
function crearContenedorProductos(productos) {
    const contenedorProductos = document.createElement("div");
    contenedorProductos.className = "product-container";

    productos.forEach(producto => {
        contenedorProductos.appendChild(crearTarjetaProducto(producto));
    });

    return contenedorProductos;
}

// Crear una tarjeta de producto (sin botones ni carrito)
function crearTarjetaProducto(producto) {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.onerror=null; this.src='default.jpg';">
        <div class="product-info">
            <h3>${producto.nombre}</h3>
            <div class="price">
                <span class="new-price">${producto.precio} V-Bucks</span>
            </div>
        </div>
    `;
    return productCard;
}
