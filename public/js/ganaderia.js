function activarFormularioGanaderia() {
  const razasPorEspecie = {
    Bovino: ["Gyr", "Girolando", "Brahman", "Cebù"],
    Porcino: ["Pietran", "Duroc", "Landrace"],
  };

  const especieSelect = document.getElementById("especie");
  const razaSelect = document.getElementById("raza");

  if (!especieSelect || !razaSelect) return;

  function cargarRazas() {
    const especie = especieSelect.value;

    razaSelect.innerHTML = "";

    razasPorEspecie[especie].forEach((raza) => {
      const option = document.createElement("option");

      option.value = raza;
      option.textContent = raza;

      razaSelect.appendChild(option);
    });
  }

  especieSelect.addEventListener("change", cargarRazas);

  cargarRazas();
}

function registrarAnimales() {
  const form = document.getElementById("form-animal");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const datos = {
      codigo_arete: document.getElementById("codigo_arete").value,
      especie: document.getElementById("especie").value.toUpperCase(),
      raza: document.getElementById("raza").value,
      genero: document.querySelector('input[name="genero"]:checked')?.value,
      origen: document.getElementById("origen").value,
      fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
      fecha_ingreso: document.getElementById("fecha_ingreso").value,
      peso_inicial: document.getElementById("peso_inicial").value,
      observaciones: document.getElementById("observaciones").value,
    };

    const res = await fetch("/registrar-animal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const resultado = await res.json();

    alert(resultado.message);

    if (resultado.success) {
      form.reset();
      cargarAnimales();
    }
  });
}

async function cargarAnimales() {
  const res = await fetch("/animales");
  const data = await res.json();

  const tabla = document.getElementById("tabla-animales");

  let filas = ""

data.forEach(animal => {
    filas += `
        <tr>
            <td>${animal.codigo_arete}</td>
            <td>${animal.especie}</td>
            <td>${animal.raza}</td>
            <td>${animal.estado}</td>
        </tr>
    `
})

tabla.innerHTML = filas
}
