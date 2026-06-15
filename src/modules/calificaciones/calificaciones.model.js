const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Alumno = require('../estudiantes/estudiantes.model');

const Calificacion = sequelize.define('Calificacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nota: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: 1.0,
      max: 7.0
    }
  },
  fecha: {
    type: DataTypes.DATEONLY, // fecha real de la evaluación (YYYY-MM-DD)
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false // Ej: "Control de Lectura: Papelucho"
  }
}, {
  tableName: 'calificaciones',
  timestamps: true
});

// Relaciones
Calificacion.belongsTo(Alumno, { foreignKey: 'alumnoId', as: 'alumno' });
Alumno.hasMany(Calificacion, { foreignKey: 'alumnoId', as: 'calificaciones' });

module.exports = Calificacion;