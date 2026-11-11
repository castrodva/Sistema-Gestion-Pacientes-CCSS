
const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/ccss"
    );

    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error(
      "Error al conectar MongoDB:",
      error.message
    );
    process.exitCode = 1;
    throw error;
  }
};

module.exports = conectarDB;
