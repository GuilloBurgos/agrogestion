document.getElementById("form-admin").addEventListener("submit", async (e) => {
  e.preventDefault()

    const datos = {
        nombre_completo: nombre_completo.value,
        tipo_documento: tipo_documento.value,
        num_documento: num_documento.value,
        email: email.value,
        telefono: telefono.value,
        usuario: usuario.value,
        password: password.value
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