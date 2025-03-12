fetch('productos.json')
.then(response => {
    if (!response.ok) throw new Error("Error en la red");
    return response.json();
})
.then(data => {
    console.log(data); // Coloca esto para ver qué estás recibiendo

    // Asegúrate de que la estructura esperada del JSON sea correcta
    if (!data.shop || !Array.isArray(data.shop)) {
    throw new Error("❌ El JSON no contiene la estructura esperada.");
    }

    const categorias = agruparProductosPorCategoria(data.shop);
    const categoriasOrdenadas = ordenarCategorias(categorias);
    mostrarProductos(categoriasOrdenadas);
})
.catch(error => {
    console.error("❌ Error al cargar el JSON:", error);
    alert("Ocurrió un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.");
});

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
    imagen: item.displayAssets?.[0]?.background || item.displayAssets?.[0]?.url,
    grupo: item.series?.name || item.set?.name || "Sin categoría",
    tipo: item.mainType
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
    const contenedorProductos = crearContenedorProductos(categoria, productos);
    contenedor.appendChild(contenedorProductos);
});
}

// Crear el título de la categoría
function crearTituloCategoria(categoria) {
const tituloCategoria = document.createElement("h2");
tituloCategoria.textContent = categoria;
tituloCategoria.className = "category-title";
return tituloCategoria;



necesitamos también que la información se actualice desde la api directo, sabe si github permite eso? 
}

// Crear el contenedor de productos
function crearContenedorProductos(categoria, productos) {
const contenedorProductos = document.createElement("div");
contenedorProductos.className = categoria === "Pistas de improvisación" ? "pistas-container" : "product-container";

const productosMostrados = categoria === "Pistas de improvisación" ? productos.slice(0, 30) : productos;

productosMostrados.forEach(producto => {
    contenedorProductos.appendChild(crearTarjetaProducto(producto));
});

if (categoria === "Pistas de improvisación" && productos.length > 30) {
    contenedorProductos.appendChild(crearBotonVerMas(productos));
}

return contenedorProductos;
}

// Crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    const productCard = document.createElement("div");
    productCard.className = producto.tipo === "bundle" ? "product-card big-product-card" : "product-card";

    productCard.innerHTML = 
        <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.onerror=null; this.src='./data/productos.json';">
        <div class="product-info">
            <h3>${producto.nombre}</h3>
            <div class="price">
                <img src="https://lh3.googleusercontent.com/d/1VGnO_T1S2sH-IqqD8TX6aHyQKD7rEYzH=s220?authuser=0" alt="V-Bucks">
                <span class="old-price">${producto.precio}</span>
                <span class="new-price">${(producto.precio * 5).toLocaleString("es-CL")} CLP</span>
            </div>
        </div>
        <button class="carrito">
            <img src="https://lh3.googleusercontent.com/d/1G3MVAV9knIYqiLI6cI7gwKob6Vuvo5MC=s220?authuser=0" alt="Añadir al carrito">
        </button>
    ;
    return productCard; // Recuerda retornar la tarjeta
}
function crearContenedorProductos(categoria, productos) {
    const contenedorProductos = document.createElement("div");
    contenedorProductos.className = categoria === "Pistas de improvisación" ? "pistas-container" : "product-container";
    
    const productosMostrados = categoria === "Pistas de improvisación" ? productos.slice(0, 30) : productos;

    // Renderizar productos
    productosMostrados.forEach(producto => {
        contenedorProductos.appendChild(crearTarjetaProducto(producto));
    });

    // Agregar el botón "Ver más" si hay más de 30
    if (categoria === "Pistas de improvisación" && productos.length > 30) {
        contenedorProductos.appendChild(crearBotonVerMas(productos));
    }

    return contenedorProductos;
}
function crearBotonVerMas(productos) {
    const btnVerMas = document.createElement("button");
    btnVerMas.textContent = "Ver más";
    btnVerMas.className = "show-more";
    
    btnVerMas.onclick = () => {
        const contenedorProductos = document.querySelector(".pistas-container") || document.querySelector(".product-container");

        const productosMostrados = productos.slice(30); // Obtener el resto de los productos
        productosMostrados.forEach(producto => {
            contenedorProductos.appendChild(crearTarjetaProducto(producto));
        });
        btnVerMas.remove(); // Elimina el botón después de añadir los productos
    };

    return btnVerMas;
}
