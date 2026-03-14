document.getElementById("form-login").addEventListener("submit", async(event)=>{
  event.preventDefault()

  const usuario = document.getElementById("usuario").value.trim()
  const password = document.getElementById("password").value.trim()

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password })
  })

  const data = await response.json()

  if (data.success) {

    if (data.rol === "DUENIO") {
      window.location.href = "duenio.html"
    } else {
      window.location.href = "admin.html"
    }

  } else {
    alert("Credenciales incorrectas")
  }
  
})

document.getElementById("btnRecuperar").addEventListener("click", async () => {

  const email = document.getElementById("emailRecuperar").value.trim()

  const response = await fetch("/recuperar-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })

  const data = await response.json()

  if (data.success) {
    alert("Revisa tu correo")
  } else {
    alert(data.message)
  }

})

