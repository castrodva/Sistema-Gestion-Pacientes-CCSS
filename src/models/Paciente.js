
const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
  identificacion: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  sexo_registrado: {
    type: String
  },
  contacto: {
    telefono: String,
    correo: String,
    direccion: String
  },
  alergias: [{
    sustancia: String,
    reaccion: String
  }],
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Paciente",
  pacienteSchema,
  "pacientes"
);
