const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Anotacion = sequelize.define(
  "Anotacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumnoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "alumnos", // Asegúrate de que coincida con el tableName de tus alumnos
        key: "id",
      },
    },
    tipo: {
      type: DataTypes.ENUM("Positiva", "Negativa"),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "anotaciones",
    timestamps: true,
  }
);

module.exports = Anotacion;
