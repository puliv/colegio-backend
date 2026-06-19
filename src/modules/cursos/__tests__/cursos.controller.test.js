const { obtenerCursosPorProfesor, crearCurso } = require("../curso.controller");
const Curso = require("../curso.model");

jest.mock("../curso.model");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// obtenerCursosPorProfesor
describe("obtenerCursosPorProfesor", () => {
  beforeEach(() => jest.clearAllMocks());

  test("401 si req.usuario no existe", async () => {
    const req = { usuario: undefined };
    const res = mockRes();

    await obtenerCursosPorProfesor(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("401 si req.usuario no tiene id", async () => {
    const req = { usuario: {} };
    const res = mockRes();

    await obtenerCursosPorProfesor(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("retorna cursos del profesor autenticado", async () => {
    const cursosFake = [
      { id: 1, nombre: "1°A", profesorId: 42 },
      { id: 2, nombre: "2°B", profesorId: 42 },
    ];
    Curso.findAll.mockResolvedValue(cursosFake);

    const req = { usuario: { id: 42 } };
    const res = mockRes();

    await obtenerCursosPorProfesor(req, res);

    expect(Curso.findAll).toHaveBeenCalledWith({ where: { profesorId: 42 } });
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, cursos: cursosFake })
    );
  });

  test("retorna arreglo vacío si el profesor no tiene cursos", async () => {
    Curso.findAll.mockResolvedValue([]);

    const req = { usuario: { id: 99 } };
    const res = mockRes();

    await obtenerCursosPorProfesor(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, cursos: [] })
    );
  });

  test("500 si findAll lanza un error", async () => {
    Curso.findAll.mockRejectedValue(new Error("DB error"));

    const req = { usuario: { id: 42 } };
    const res = mockRes();

    await obtenerCursosPorProfesor(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});

// crearCurso
describe("crearCurso", () => {
  beforeEach(() => jest.clearAllMocks());

  test("400 si no hay profesorId ni req.usuario.id", async () => {
    const req = { body: { nombre: "1°A" }, usuario: undefined };
    const res = mockRes();

    await crearCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("201 usando profesorId del token (req.usuario.id)", async () => {
    const cursoFake = { id: 1, nombre: "1°A", profesorId: 42 };
    Curso.create.mockResolvedValue(cursoFake);

    const req = {
      body: { nombre: "1°A" },
      usuario: { id: 42 },
    };
    const res = mockRes();

    await crearCurso(req, res);

    expect(Curso.create).toHaveBeenCalledWith({
      nombre: "1°A",
      profesorId: 42,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, curso: cursoFake })
    );
  });

  test("201 usando profesorId del body cuando no hay token", async () => {
    const cursoFake = { id: 2, nombre: "3°C", profesorId: 7 };
    Curso.create.mockResolvedValue(cursoFake);

    const req = {
      body: { nombre: "3°C", profesorId: 7 },
      usuario: undefined,
    };
    const res = mockRes();

    await crearCurso(req, res);

    expect(Curso.create).toHaveBeenCalledWith({ nombre: "3°C", profesorId: 7 });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, curso: cursoFake })
    );
  });

  test("el token tiene prioridad sobre el profesorId del body", async () => {
    const cursoFake = { id: 3, nombre: "2°A", profesorId: 42 };
    Curso.create.mockResolvedValue(cursoFake);

    const req = {
      body: { nombre: "2°A", profesorId: 99 }, // id distinto en body
      usuario: { id: 42 }, // debe ganar el del token
    };
    const res = mockRes();

    await crearCurso(req, res);

    expect(Curso.create).toHaveBeenCalledWith({
      nombre: "2°A",
      profesorId: 42,
    });
  });

  test("500 si Curso.create lanza un error", async () => {
    Curso.create.mockRejectedValue(new Error("DB error"));

    const req = {
      body: { nombre: "1°A" },
      usuario: { id: 42 },
    };
    const res = mockRes();

    await crearCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});
