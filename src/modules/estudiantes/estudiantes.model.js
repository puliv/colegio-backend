const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Alumno = sequelize.define('Alumno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false // Ej: "4to Medio A", "1ro Básico"
  }
}, {
  tableName: 'alumnos',
  timestamps: true
});

module.exports = Alumno;