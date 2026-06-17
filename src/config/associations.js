const Usuario = require("../modules/auth/auth.model");
const Curso = require("../modules/cursos/curso.model");
const Alumno = require("../modules/estudiantes/estudiantes.model");
const Calificacion = require("../modules/calificaciones/calificaciones.model");
const Asistencia = require("../modules/asistencia/asistencia.model");

// Usuario (Profesor) → Cursos
Usuario.hasMany(Curso, { foreignKey: "profesorId", as: "cursos" });
Curso.belongsTo(Usuario, { foreignKey: "profesorId", as: "profesor" });

// Curso → Alumnos
Curso.hasMany(Alumno, { foreignKey: "cursoId", as: "alumnos" });
Alumno.belongsTo(Curso, { foreignKey: "cursoId", as: "curso" });

// Alumno → Calificaciones
Alumno.hasMany(Calificacion, { foreignKey: "alumnoId", as: "calificaciones" });
Calificacion.belongsTo(Alumno, { foreignKey: "alumnoId", as: "alumno" });

// Alumno → Asistencia
Alumno.hasMany(Asistencia, { foreignKey: "alumnoId", as: "asistencias" });
Asistencia.belongsTo(Alumno, { foreignKey: "alumnoId", as: "alumno" });

module.exports = { Usuario, Curso, Alumno, Calificacion, Asistencia };
