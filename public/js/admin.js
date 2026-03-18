
const usuario = localStorage.getItem("usuario")
const rol = localStorage.getItem("rol")

if(!usuario || rol !== "DUENIO"){
    window.location.href = "/index.html"
}

document.getElementById("form-admin").addEventListener("submit", async (e) => {
  e.preventDefault()

    const datos = {
        nombre_completo: document.getElementById("nombre_completo").value,
        tipo_documento: document.getElementById("tipo_documento").value,
        num_documento: document.getElementById("num_documento").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        usuario: document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
   
      await fetch("/registrar-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    
    alert("Administrador creado")
})

async function cargarAdministradores(){

    const response = await fetch("/administradores")
    const data = await response.json()

    const tabla = document.getElementById("tablaAdmins")

    tabla.innerHTML = ""

    data.forEach(admin => {

        const estadoBadge = admin.estado === "ACTIVO"
        ? '<span class="badge bg-success">Activo</span>'
        : '<span class="badge bg-danger">Inactivo</span>'

        const boton = admin.estado === "ACTIVO"
        ? `<button class="btn btn-danger btn-sm" onclick="cambiarEstado(${admin.idUsuarios},'INACTIVO')">Desactivar</button>`
        : `<button class="btn btn-success btn-sm" onclick="cambiarEstado(${admin.idUsuarios},'ACTIVO')">Activar</button>`

        tabla.innerHTML += `
            <tr>
                <td>${admin.nombre_completo}</td>
                <td>${admin.usuario}</td>
                <td>${admin.email}</td>
                <td>${admin.telefono}</td>
                <td>${estadoBadge}</td>
                <td>${boton}</td>
            </tr>
        `
    })

}

cargarAdministradores()


async function cambiarEstado(id,estado){

    await fetch(`/cambiar-estado-admin/${id}`,{
        method:"PUT",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({estado})
    })

    cargarAdministradores()

}

const btnLogout = document.getElementById("btnLogout")

if(btnLogout){
    btnLogout.addEventListener("click", () => {

        const confirmar = confirm("¿Desea cerrar sesión?")

        if(confirmar){

            localStorage.removeItem("usuario")
            localStorage.removeItem("rol")

            window.location.href = "/index.html"
        }

    })
}

const formPassword = document.getElementById("form-cambiar-password")

if(formPassword){

formPassword.addEventListener("submit", async (e)=>{

    e.preventDefault()

    const passwordActual = document.getElementById("passwordActual").value
    const passwordNueva = document.getElementById("passwordNueva").value
    const passwordConfirmar = document.getElementById("passwordConfirmar").value

    if(passwordNueva !== passwordConfirmar){
        alert("Las contraseñas nuevas no coinciden")
        return
    }

    const usuario = localStorage.getItem("usuario")

    const response = await fetch("/cambiar-password-duenio",{

        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            usuario,
            passwordActual,
            passwordNueva
        })

    })

    const data = await response.json()

    alert(data.message)

    formPassword.reset()

})
}

