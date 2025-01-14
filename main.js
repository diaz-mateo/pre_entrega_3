const servicios = [
    { nombre: "Mindfulness", descripcion: "Atención Plena con interés, curiosidad y aceptación.", precio: 50 },
    { nombre: "Terapia ACT", descripcion: "Modelo de psicoterapia respaldado científicamente.", precio: 80 },
    { nombre: "Terapia EMDR", descripcion: "Método de psicoterapia para traumas y salud mental.", precio: 100 },
    { nombre: "Psicología", descripcion: "Estudio de la mente y el comportamiento.", precio: 70 },
    { nombre: "Hipnoterapia", descripcion: "Herramienta poderosa para mejorar el bienestar.", precio: 90 },
    { nombre: "Psicoterapia", descripcion: "Tratamiento basado en el diálogo.", precio: 60 },
];

let carrito = [];

// DOM Elements
const servicesContainer = document.getElementById("servicesContainer");
const cartTableBody = document.querySelector("#cartTable tbody");
const totalAmount = document.getElementById("totalAmount");
const checkoutButton = document.getElementById("checkoutButton");

// Generate Services
function generarServicios() {
    servicios.forEach((servicio, index) => {
        const card = document.createElement("div");
        card.className = "service-card";
        card.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p><strong>Precio:</strong> S/ ${servicio.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar</button>
        `;
        servicesContainer.appendChild(card);
    });
}

// Add to Cart
function agregarAlCarrito(index) {
    const servicio = servicios[index];
    const item = carrito.find((item) => item.nombre === servicio.nombre);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...servicio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Update Cart
function actualizarCarrito() {
    cartTableBody.innerHTML = "";
    if (carrito.length === 0) {
        cartTableBody.innerHTML = `<tr id="emptyCartRow"><td colspan="5">Tu carrito está vacío.</td></tr>`;
        checkoutButton.disabled = true;
        totalAmount.textContent = "0.00";
    } else {
        carrito.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>S/ ${item.precio}</td>
                <td>
                    <button onclick="cambiarCantidad(${index}, -1)">-</button>
                    ${item.cantidad}
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </td>
                <td>S/ ${(item.precio * item.cantidad).toFixed(2)}</td>
                <td><button onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        totalAmount.textContent = total.toFixed(2);
        checkoutButton.disabled = false;
    }
}

// Change Quantity
function cambiarCantidad(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    actualizarCarrito();
}

// Remove from Cart
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Checkout
checkoutButton.addEventListener("click", () => {
    Swal.fire("Gracias por tu compra", `Total: S/ ${totalAmount.textContent}`, "success");
    carrito = [];
    actualizarCarrito();
});

// Initialize
generarServicios();