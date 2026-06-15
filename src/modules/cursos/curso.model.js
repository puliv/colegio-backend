import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js'; // Ajusta la ruta a tu conexión si es necesario

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Evita que se repita exactamente el mismo curso
  },
  profesorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Asegúrate de que coincida con el nombre de tu tabla de profes en la DB
      key: 'id'
    }
  }
}, {
  tableName: 'cursos',
  timestamps: true
});

export default Curso;