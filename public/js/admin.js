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