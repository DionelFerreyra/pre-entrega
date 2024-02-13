const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const pCarritoVacio = document.querySelector("#p-carrito-vacio");
const contenedorProductos = document.querySelector("#div-carrito-productos");
const buttonEliminar = document.querySelector(".carrito-eliminar");
const contenedorResumen = document.querySelector("#contenedor-resumen");
const pCarritoComprado = document.querySelector("#p-carrito-comprado");

if (productosEnCarrito) {
    
    pCarritoVacio.classList.add("disable");
    contenedorProductos.classList.remove("disable");
    contenedorResumen.classList.remove("disable");
    pCarritoComprado.classList.add("disable");

    contenedorProductos.innerHTML = "";
   
    productosEnCarrito.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen "src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <h3>${producto.titulo}</h3>
            </div>
            <div class="producto-precio">
                <p>$${producto.precio}</p>
            </div>
            <div class="producto-cantidad">
                <p>${producto.cantidad}</p>
            </div>
            <button id="${producto.id}" class="carrito-eliminar">
                <svg viewBox="0 0 448 512" class="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
            </button>
        `;

        contenedorProductos.append(div);
    });

}else {
    
}