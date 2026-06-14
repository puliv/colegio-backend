const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Alumno = require('../estudiantes/estudiantes.model');

const Asistencia = sequelize.define('Asistencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('PRESENTE', 'AUSENTE', 'JUSTIFICADO'),
    allowNull: false,
    defaultValue: 'PRESENTE'
  }
}, {
  tableName: 'asistencias',
  timestamps: true
});

// Relación: Una asistencia pertenece a un Alumno (crea la columna AlumnoId automáticamente)
Asistencia.belongsTo(Alumno, { foreignKey: 'alumnoId', as: 'alumno' });
Alumno.hasMany(Asistencia, { foreignKey: 'alumnoId', as: 'asistencias' });

module.exports = Asistencia;