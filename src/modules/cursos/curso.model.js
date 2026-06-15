const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // 👈 Apunta exactamente a tu archivo de conexión 'db'

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profesorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Asegúrate de que coincida con el nombre de tu tabla de profes en minúsculas/plural
      key: 'id'
    }
  }
}, {
  tableName: 'cursos',
  timestamps: true
});

module.exports = Curso;