
const mongoose = require("mongoose");
const conectarDB = require("../config/database");
const Paciente = require("../models/Paciente");

async function probarCRUD() {
  try {
    await conectarDB();

    // CREATE: registrar un paciente ficticio
    const paciente = await Paciente.create({
      identificacion: "CRUD-001",
      nombre: "Paciente CRUD",
      fecha_nacimiento: new Date("1998-05-20"),
      sexo_registrado: "No especificado"
    });

    console.log("CREAR:", paciente.nombre);

    // READ: consultar el paciente
    const consulta = await Paciente.findById(paciente._id);
    console.log("CONSULTAR:", consulta.nombre);

    // UPDATE: actualizar el nombre
    const actualizado = await Paciente.findByIdAndUpdate(
      paciente._id,
      { nombre: "Paciente Actualizado" },
      { new: true, runValidators: true }
    );

    console.log("ACTUALIZAR:", actualizado.nombre);

    // DELETE: eliminar el paciente de prueba
    await Paciente.findByIdAndDelete(paciente._id);
    console.log("ELIMINAR: Paciente eliminado");

  } catch (error) {
    console.error("Error CRUD:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

probarCRUD();
