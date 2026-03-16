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


async function cargarPerfil(){

    const usuario = localStorage.getItem("usuario")

    const res = await fetch(`/perfil-admin/${usuario}`)
    const datos = await res.json()

    document.getElementById("perfil-email").value = datos.email || ""
    document.getElementById("perfil-telefono").value = datos.telefono || ""
}

cargarPerfil()


document
.getElementById("form-update-perfil")
.addEventListener("submit", async (e)=>{

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