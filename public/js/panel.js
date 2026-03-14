const usuario = localStorage.getItem("usuario")

if (usuario) {
    document.getElementById("nombreAdmin").textContent = usuario
}

async function cargarEstadisticas(){

    const resTotal = await fetch("/total-trabajadores")
    const total = await resTotal.json()

    document.getElementById("totalTrabajadores").textContent = total.total


    const resActivos = await fetch("/trabajadores-activos")
    const activos = await resActivos.json()

    document.getElementById("trabajadoresActivos").textContent = activos.activos
}

cargarEstadisticas()