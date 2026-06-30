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
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'cursos', 
      key: 'id'
    }
  }
}, {
  tableName: 'alumnos',
  timestamps: true
});

module.exports = Alumno;