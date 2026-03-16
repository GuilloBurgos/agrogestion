const selectTrabajo = document.getElementById("id_tipo_trabajo")

async function cargarTiposTrabajo(){
  const selectTrabajo = document.getElementById("id_tipo_trabajo")

    if(!selectTrabajo) return

    const res = await fetch("/tipos-trabajo")
    const datos = await res.json()

    selectTrabajo.innerHTML = ""

    datos.forEach(trabajo => {

        const option = document.createElement("option")

        option.value = trabajo.id_tipo_trabajo
        option.textContent = trabajo.nombre_trabajo

        selectTrabajo.appendChild(option)

    })
}

function activarFormularioTrabajador(){

    const form = document.getElementById("form-trabajador")

    if(!form) return

    form.addEventListener("submit", async (e)=>{

        e.preventDefault()

        const datos = {

            nombre: document.getElementById("nombre").value,
            tipo_documento: document.getElementById("tipo_documento").value,
            numero_documento: document.getElementById("numero_documento").value,
            id_tipo_trabajo: document.getElementById("id_tipo_trabajo").value,
            telefono: document.getElementById("telefono").value,
            telefono_familiar: document.getElementById("telefono_familiar").value,
            direccion: document.getElementById("direccion").value,
            fecha_ingreso: document.getElementById("fecha_ingreso").value,
            observaciones: document.getElementById("observaciones").value

        }

        const res = await fetch("/registrar-trabajador",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(datos)

        })

        const resultado = await res.json()

        alert(resultado.message)

        form.reset()

    })

}

// cargarTiposTrabajo()

// document.getElementById("form-trabajador").addEventListener("submit", async(e)=>{

//     e.preventDefault()

//     const datos = {

//         nombre: document.getElementById("nombre").value,
//         tipo_documento: document.getElementById("tipo_documento").value,
//         numero_documento: document.getElementById("numero_documento").value,
//         id_tipo_trabajo: document.getElementById("id_tipo_trabajo").value,
//         telefono: document.getElementById("telefono").value,
//         telefono_familiar: document.getElementById("telefono_familiar").value,
//         direccion: document.getElementById("direccion").value,
//         fecha_ingreso: document.getElementById("fecha_ingreso").value,
//         observaciones: document.getElementById("observaciones").value

//     }

//     const res = await fetch("/registrar-trabajador",{

//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify(datos)

//     })

//     const resultado = await res.json()

//     alert(resultado.message)

// })