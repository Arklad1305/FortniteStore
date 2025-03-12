fetch("productos.json") // Cargamos el JSON desde GitHub Pages
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (!data.data || !data.data.featured) throw new Error("Formato incorrecto");

        const categorias = agruparProductosPorCategoria(data.data.featured);
        const categoriasOrdenadas = ordenarCategorias(categorias);
        mostrarProductos(categoriasOrdenadas);
    })
    .catch(error => console.error("Error cargando JSON:", error));
