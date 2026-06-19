const { obtenerAlumnos, crearAlumno } = require("../estudiantes.controller");

// ─── Mocks de modelos ────────────────────────────────────────────────────────
jest.mock("../estudiantes.model");
jest.mock("../../calificaciones/calificaciones.model");

const Alumno = require("../estudiantes.model");
const Calificacion = require("../../calificaciones/calificaciones.model");

// ─── Helpers ─────────────────────────────────────────────────────────────────
const mockRes = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

// ─── obtenerAlumnos ───────────────────────────────────────────────────────────
describe("obtenerAlumnos", () => {
  beforeEach(() => jest.clearAllMocks());

  test("devuelve todos los alumnos cuando no se envía cursoId", async () => {
    const alumnosMock = [
      {
        id: 1,
        nombre: "Ana",
        apellido: "Soto",
        cursoId: 1,
        calificaciones: [],
      },
      {
        id: 2,
        nombre: "Luis",
        apellido: "Vera",
        cursoId: 2,
        calificaciones: [],
      },
    ];
    Alumno.findAll.mockResolvedValue(alumnosMock);

    const req = { query: {} };
    const res = mockRes();

    await obtenerAlumnos(req, res);

    // Sin cursoId → where vacío
    expect(Alumno.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: {} })
    );
    expect(res.json).toHaveBeenCalledWith({ ok: true, alumnos: alumnosMock });
  });

  test("filtra por cursoId cuando se envía en query", async () => {
    const alumnosMock = [
      {
        id: 1,
        nombre: "Ana",
        apellido: "Soto",
        cursoId: 3,
        calificaciones: [],
      },
    ];
    Alumno.findAll.mockResolvedValue(alumnosMock);

    const req = { query: { cursoId: "3" } };
    const res = mockRes();

    await obtenerAlumnos(req, res);

    expect(Alumno.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: { cursoId: 3 } }) // número, no string
    );
    expect(res.json).toHaveBeenCalledWith({ ok: true, alumnos: alumnosMock });
  });

  test("incluye calificaciones con los atributos correctos", async () => {
    Alumno.findAll.mockResolvedValue([]);

    const req = { query: {} };
    const res = mockRes();

    await obtenerAlumnos(req, res);

    const llamada = Alumno.findAll.mock.calls[0][0];
    expect(llamada.include).toEqual([
      expect.objectContaining({
        model: Calificacion,
        as: "calificaciones",
        attributes: ["id", "nota", "fecha", "descripcion"],
      }),
    ]);
  });

  test("ordena los resultados por apellido ASC", async () => {
    Alumno.findAll.mockResolvedValue([]);

    await obtenerAlumnos({ query: {} }, mockRes());

    const llamada = Alumno.findAll.mock.calls[0][0];
    expect(llamada.order).toEqual([["apellido", "ASC"]]);
  });

  test("responde 500 si ocurre un error inesperado", async () => {
    Alumno.findAll.mockRejectedValue(new Error("DB caída"));

    const res = mockRes();
    await obtenerAlumnos({ query: {} }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Error en el servidor al obtener los alumnos",
    });
  });
});

// ─── crearAlumno ──────────────────────────────────────────────────────────────
describe("crearAlumno", () => {
  beforeEach(() => jest.clearAllMocks());

  const bodyValido = {
    rut: "12345678-9",
    nombre: "Ana",
    apellido: "Soto",
    cursoId: 1,
  };

  test("crea un alumno nuevo y responde 201 con los datos", async () => {
    Alumno.findOne.mockResolvedValue(null); // RUT no existe aún
    const alumnoCreado = { id: 10, ...bodyValido };
    Alumno.create.mockResolvedValue(alumnoCreado);

    const req = { body: bodyValido };
    const res = mockRes();

    await crearAlumno(req, res);

    expect(Alumno.findOne).toHaveBeenCalledWith({
      where: { rut: bodyValido.rut },
    });
    expect(Alumno.create).toHaveBeenCalledWith(bodyValido);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      msg: "Alumno registrado con éxito",
      alumno: alumnoCreado,
    });
  });

  test("responde 400 si el RUT ya está registrado", async () => {
    Alumno.findOne.mockResolvedValue({ id: 5, rut: bodyValido.rut }); // ya existe

    const req = { body: bodyValido };
    const res = mockRes();

    await crearAlumno(req, res);

    expect(Alumno.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "El RUT de este alumno ya está registrado",
    });
  });

  test("responde 500 si falla la búsqueda por RUT", async () => {
    Alumno.findOne.mockRejectedValue(new Error("Error de conexión"));

    const res = mockRes();
    await crearAlumno({ body: bodyValido }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Error en el servidor al registrar el alumno",
    });
  });

  test("responde 500 si falla el Alumno.create", async () => {
    Alumno.findOne.mockResolvedValue(null);
    Alumno.create.mockRejectedValue(new Error("Error al insertar"));

    const res = mockRes();
    await crearAlumno({ body: bodyValido }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Error en el servidor al registrar el alumno",
    });
  });
});
