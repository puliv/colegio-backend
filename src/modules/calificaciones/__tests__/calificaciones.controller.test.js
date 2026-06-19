const {
  ingresarCalificacion,
  obtenerNotasPorAlumno,
  obtenerNotasPorCurso,
} = require("../calificaciones.controller");
const Calificacion = require("../calificaciones.model");
const Alumno = require("../../estudiantes/estudiantes.model");

jest.mock("../calificaciones.model");
jest.mock("../../estudiantes/estudiantes.model");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ─────────────────────────────────────────────
// ingresarCalificacion
// ─────────────────────────────────────────────
describe("ingresarCalificacion", () => {
  beforeEach(() => jest.clearAllMocks());

  test("400 si nombreEvaluacion está vacío", async () => {
    const req = {
      body: {
        nombreEvaluacion: "  ",
        calificaciones: [{ estudianteId: 1, nota: 6 }],
      },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si calificaciones no es un arreglo", async () => {
    const req = {
      body: { nombreEvaluacion: "Prueba 1", calificaciones: null },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si calificaciones es un arreglo vacío", async () => {
    const req = { body: { nombreEvaluacion: "Prueba 1", calificaciones: [] } };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si una nota es menor a 1", async () => {
    const req = {
      body: {
        nombreEvaluacion: "Prueba 1",
        calificaciones: [{ estudianteId: 1, nota: 0.5 }],
      },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false, msg: expect.stringContaining("1") })
    );
  });

  test("400 si una nota es mayor a 7", async () => {
    const req = {
      body: {
        nombreEvaluacion: "Prueba 1",
        calificaciones: [{ estudianteId: 2, nota: 7.5 }],
      },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false, msg: expect.stringContaining("2") })
    );
  });

  test("201 y llama bulkCreate con el formato correcto", async () => {
    Calificacion.bulkCreate.mockResolvedValue([]);

    const req = {
      body: {
        nombreEvaluacion: "  Prueba 1  ",
        calificaciones: [
          { estudianteId: 10, nota: 6.5 },
          { estudianteId: 11, nota: 4 },
        ],
      },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(Calificacion.bulkCreate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          alumnoId: 10,
          nota: 6.5,
          descripcion: "Prueba 1",
        }),
        expect.objectContaining({
          alumnoId: 11,
          nota: 4.0,
          descripcion: "Prueba 1",
        }),
      ])
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true })
    );
  });

  test("500 si bulkCreate lanza un error", async () => {
    Calificacion.bulkCreate.mockRejectedValue(new Error("DB error"));

    const req = {
      body: {
        nombreEvaluacion: "Prueba 1",
        calificaciones: [{ estudianteId: 1, nota: 5 }],
      },
    };
    const res = mockRes();

    await ingresarCalificacion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});

// ─────────────────────────────────────────────
// obtenerNotasPorAlumno
// ─────────────────────────────────────────────
describe("obtenerNotasPorAlumno", () => {
  beforeEach(() => jest.clearAllMocks());

  test("404 si el alumno no existe", async () => {
    Alumno.findByPk.mockResolvedValue(null);

    const req = { params: { alumnoId: "99" } };
    const res = mockRes();

    await obtenerNotasPorAlumno(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("retorna alumno con sus calificaciones", async () => {
    const alumnoFake = {
      id: 1,
      rut: "12345678-9",
      nombre: "Ana",
      apellido: "López",
      curso: "1°A",
      calificaciones: [
        {
          id: 1,
          nota: 6.5,
          fecha: "2025-06-01",
          descripcion: "Prueba 1",
          createdAt: "",
        },
      ],
    };
    Alumno.findByPk.mockResolvedValue(alumnoFake);

    const req = { params: { alumnoId: "1" } };
    const res = mockRes();

    await obtenerNotasPorAlumno(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        alumno: expect.objectContaining({ id: 1, nombre: "Ana" }),
        calificaciones: alumnoFake.calificaciones,
      })
    );
  });

  test("500 si findByPk lanza un error", async () => {
    Alumno.findByPk.mockRejectedValue(new Error("DB error"));

    const req = { params: { alumnoId: "1" } };
    const res = mockRes();

    await obtenerNotasPorAlumno(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});

// ─────────────────────────────────────────────
// obtenerNotasPorCurso
// ─────────────────────────────────────────────
describe("obtenerNotasPorCurso", () => {
  beforeEach(() => jest.clearAllMocks());

  test("404 si no hay alumnos para el curso", async () => {
    Alumno.findAll.mockResolvedValue([]);

    const req = { params: { cursoId: "5" } };
    const res = mockRes();

    await obtenerNotasPorCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("retorna lista de alumnos con sus calificaciones", async () => {
    const alumnosFake = [
      {
        id: 1,
        nombre: "Ana",
        apellido: "López",
        calificaciones: [{ id: 1, nota: 6.5, descripcion: "Prueba 1" }],
      },
      {
        id: 2,
        nombre: "Pedro",
        apellido: "Mora",
        calificaciones: [{ id: 2, nota: 4, descripcion: "Prueba 1" }],
      },
    ];
    Alumno.findAll.mockResolvedValue(alumnosFake);

    const req = { params: { cursoId: "3" } };
    const res = mockRes();

    await obtenerNotasPorCurso(req, res);

    expect(Alumno.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: { cursoId: "3" } })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, alumnos: alumnosFake })
    );
  });

  test("500 si findAll lanza un error", async () => {
    Alumno.findAll.mockRejectedValue(new Error("DB error"));

    const req = { params: { cursoId: "3" } };
    const res = mockRes();

    await obtenerNotasPorCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});

