function activarFormularioGanaderia(){

    const razasPorEspecie = {

        Bovino: ["Holstein","Angus","Brahman"],
        Porcino: ["Pietran","Duroc","Landrace"]

    }

    const especieSelect = document.getElementById("especie")
    const razaSelect = document.getElementById("raza")

    if(!especieSelect || !razaSelect) return

    function cargarRazas(){

        const especie = especieSelect.value

        razaSelect.innerHTML = ""

        razasPorEspecie[especie].forEach(raza => {

            const option = document.createElement("option")

            option.value = raza
            option.textContent = raza

            razaSelect.appendChild(option)

        })
    }

    especieSelect.addEventListener("change", cargarRazas)

    cargarRazas()

}