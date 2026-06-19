const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Asistencia = sequelize.define(
  "Asistencia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("PRESENTE", "AUSENTE", "JUSTIFICADO"),
      allowNull: false,
      defaultValue: "PRESENTE",
    },
    justificacion: {
      type: DataTypes.STRING,
      allowNull: true, // opcional — solo se llena si estado es JUSTIFICADO
      defaultValue: null,
    },
  },
  {
    tableName: "asistencias",
    timestamps: true,
  }
);


module.exports = Asistencia;