
// nav

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const header = document.querySelector("#header");
const body = document.querySelector("#body");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    header.classList.add("position");
    body.classList.add("overflow");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
    header.classList.remove("position");
    body.classList.remove("overflow");
})

// lista de productos 

const  productos = [
    {
        id:"pote-1/4kg",
        titulo:"pote 1/4kg",
        imagen:"../img/6341b763a6428.jpg",
        categoria: {
            nombre:"potes",
            id:"potes"
        },
        precio: 1000
    },
    {
        id:"pote-1/2kg",
        titulo:"pote 1/2kg",
        imagen:"../img/6341b763a6428.jpg",
        categoria: {
            nombre:"potes",
            id:"potes"
        },
        precio: 1500
    },
    {
        id:"pote-1kg",
        titulo:"pote 1kg",
        imagen:"../img/6341b763a6428.jpg",
        categoria: {
            nombre:"potes",
            id:"potes"
        },
        precio: 2000
    },
    {
        id:"cono-helado",
        titulo:"cono helado",
        imagen:"../img/6341b763a6428.jpg",
        categoria: {
            nombre:"conos",
            id:"conos"
        },
        precio: 1000
    },
    {
        id:"cono-vacio",
        titulo:"cono vacio",
        imagen:"../img/6341b763a6428.jpg",
        categoria: {
            nombre:"conos",
            id:"conos"
        },
        precio: 1000
    },
];

// consts

const contenedorProductos = document.querySelector("#contenedor-productos");
const buttonCategories = document.querySelectorAll(".button-categories");
const subtitulo = document.querySelector("#subtitulo");
let buttonAgregar = document.querySelectorAll(".button-agregar");
const cantidadAgregado = document.querySelector("#cantidad-agregados");

//  funcion para cargar los productos 

function cargaProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <div class="card-div1">
                <div class="card-img">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                </div>
                <div class="card-info">
                    <p class="text-title">${producto.titulo}</p>
                    <p class="text-body">3 sabores a elección</p>
                    <span class="card-precio">$${producto.precio}</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-button">
                    <p>Comprar</p>
                </div> 
                <div class="card-button button-agregar" id="${producto.id}">
                    <p>Agregar al carrito</p>
                    <svg class="svg-icon" viewBox="0 0 20 20">
                        <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                        <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                        <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                    </svg>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
    })
    actualizarButtonAgregar();

}

//condiciones para cargar los roductos

cargaProductos(productos);

buttonCategories.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonCategories.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const buttonCategories = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            subtitulo.innerText = buttonCategories.categoria.nombre;

            const productosButton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargaProductos(productosButton);
        } else {
            subtitulo.innerText = "Todos los helados";
            cargaProductos(productos);
        }
    })
});

// numero de cantidad de productos en el carrito 

function actualizarButtonAgregar() {
    buttonAgregar = document.querySelectorAll(".button-agregar");

    buttonAgregar.forEach(button => {
        button.addEventListener("click", agregaralCarrito);
    });
}

// carrtio 

const productosEnCarrito = [];

// agregar productos al carrito y almacenarlos en el localstorage
function agregaralCarrito(e) {

    const idButton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idButton);
    
    if(productosEnCarrito.some(producto => producto.id === idButton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idButton);
    productosEnCarrito[index].cantidad++; 
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarCantidadCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

function actualizarCantidadCarrito() {
    let nuevoCantidadAgregado = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadAgregado.innerText = nuevoCantidadAgregado;
    
}
