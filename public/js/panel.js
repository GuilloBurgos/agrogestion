const usuario = localStorage.getItem("usuario")

if(usuario){
    document.getElementById("nombreAdmin").textContent = usuario
}

if(!usuario){
    window.location.href = "/index.html"
}

const rol = localStorage.getItem("rol")

if(rol !== "ADMIN"){
    window.location.href = "/index.html"
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


async function cargarPerfil(){

    const usuario = localStorage.getItem("usuario")

    const res = await fetch(`/perfil-admin/${usuario}`)
    const datos = await res.json()

    document.getElementById("perfil-email").value = datos.email || ""
    document.getElementById("perfil-telefono").value = datos.telefono || ""
}

cargarPerfil()


document.getElementById("form-update-perfil").addEventListener("submit", async (e)=>{

    e.preventDefault()

    const usuario = localStorage.getItem("usuario")

    const datos = {

        email: document.getElementById("perfil-email").value,
        telefono: document.getElementById("perfil-telefono").value,
        password: document.getElementById("perfil-password").value
    }

    const res = await fetch(`/actualizar-perfil/${usuario}`,{

        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)

    })

    const resultado = await res.json()

    alert(resultado.message)

})

document.getElementById("btnLogout").addEventListener("click", () => {

    const confirmar = confirm("¿Desea cerrar sesión?")

    if(confirmar){

        // eliminar datos de sesión
        localStorage.removeItem("usuario")

        // redirigir al login
        window.location.href = "/index.html"
    }

})




async function cargarModulo(modulo){

    const contenedor = document.getElementById("contenido-principal")

    const res = await fetch(`/modulos/${modulo}.html`)
    const html = await res.text()

    contenedor.innerHTML = html

    if(modulo === "trabajadores"){
        cargarTiposTrabajo()
        activarFormularioTrabajador()
    }

    if(modulo === "ganaderia"){
        activarFormularioGanaderia()
    }

}

document.getElementById("btn-trabajadores").addEventListener("click", () => {

    cargarModulo("trabajadores")
})

document.getElementById("btn-ganaderia").addEventListener("click", () => {

    cargarModulo("ganaderia")
})

document.getElementById("btn-inventario").addEventListener("click", () => {

    cargarModulo("inventario")
})

document.getElementById("btn-dashboard").addEventListener("click", () => {

    cargarModulo("dashboard")
})

cargarModulo("dashboard")