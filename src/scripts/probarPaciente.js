
const mongoose = require("mongoose");
const conectarDB = require("../config/database");
const Paciente = require("../models/Paciente");

async function probarPaciente() {
  try {
    await conectarDB();

    // Datos completamente ficticios
    const paciente = await Paciente.findOneAndUpdate(
      { identificacion: "PRUEBA-001" },
      {
        $set: {
          nombre: "Paciente de Prueba",
          fecha_nacimiento: new Date("2000-01-15"),
          sexo_registrado: "No especificado",
          contacto: {
            telefono: "0000-0000",
            correo: "prueba@example.com",
            direccion: "Dirección ficticia"
          },
          alergias: []
        }
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    console.log("Paciente registrado:", paciente.nombre);

    // Consultar el paciente guardado
    const resultado = await Paciente.findOne({
      identificacion: "PRUEBA-001"
    });

    console.log("Paciente consultado:", resultado.nombre);
    console.log("Identificación:", resultado.identificacion);

  } catch (error) {
    console.error("Error en la prueba:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

probarPaciente();
