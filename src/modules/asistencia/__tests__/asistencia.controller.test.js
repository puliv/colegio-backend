const {
  registrarAsistencia,
  obtenerAsistenciaPorCurso,
} = require("../asistencia.controller");
const Asistencia = require("../asistencia.model");
const Alumno = require("../../estudiantes/estudiantes.model");

// Mock de los modelos
jest.mock("../asistencia.model");
jest.mock("../../estudiantes/estudiantes.model");

// Helper para crear req/res mockeados
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ─────────────────────────────────────────────
// registrarAsistencia
// ─────────────────────────────────────────────
describe("registrarAsistencia", () => {
  beforeEach(() => jest.clearAllMocks());

  test("400 si faltan campos obligatorios", async () => {
    const req = { body: { cursoId: 1, fecha: "2025-06-01" } }; // sin registros
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si registros es un arreglo vacío", async () => {
    const req = { body: { cursoId: 1, fecha: "2025-06-01", registros: [] } };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("registra como PRESENTE cuando item.presente = true", async () => {
    const registroMock = { estado: "", justificacion: null, save: jest.fn() };
    Asistencia.findOrCreate.mockResolvedValue([registroMock, true]); // creado = true

    const req = {
      body: {
        cursoId: 1,
        fecha: "2025-06-01",
        registros: [{ estudianteId: 10, presente: true }],
      },
    };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(Asistencia.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        defaults: expect.objectContaining({ estado: "PRESENTE" }),
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true })
    );
  });

  test("registra como JUSTIFICADO cuando hay justificacion y presente = false", async () => {
    const registroMock = { estado: "", justificacion: null, save: jest.fn() };
    Asistencia.findOrCreate.mockResolvedValue([registroMock, true]);

    const req = {
      body: {
        cursoId: 1,
        fecha: "2025-06-01",
        registros: [
          { estudianteId: 11, presente: false, justificacion: "  Médico  " },
        ],
      },
    };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(Asistencia.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        defaults: expect.objectContaining({
          estado: "JUSTIFICADO",
          justificacion: "Médico",
        }),
      })
    );
  });

  test("registra como AUSENTE cuando presente = false y sin justificacion", async () => {
    const registroMock = { estado: "", justificacion: null, save: jest.fn() };
    Asistencia.findOrCreate.mockResolvedValue([registroMock, true]);

    const req = {
      body: {
        cursoId: 1,
        fecha: "2025-06-01",
        registros: [{ estudianteId: 12, presente: false }],
      },
    };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(Asistencia.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        defaults: expect.objectContaining({
          estado: "AUSENTE",
          justificacion: null,
        }),
      })
    );
  });

  test("actualiza registro existente (creado = false)", async () => {
    const registroMock = {
      estado: "PRESENTE",
      justificacion: null,
      save: jest.fn(),
    };
    Asistencia.findOrCreate.mockResolvedValue([registroMock, false]); // ya existía

    const req = {
      body: {
        cursoId: 1,
        fecha: "2025-06-01",
        registros: [
          { estudianteId: 10, presente: false, justificacion: "Viaje" },
        ],
      },
    };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(registroMock.save).toHaveBeenCalled();
    expect(registroMock.estado).toBe("JUSTIFICADO");
    expect(registroMock.justificacion).toBe("Viaje");
  });

  test("500 si findOrCreate lanza un error", async () => {
    Asistencia.findOrCreate.mockRejectedValue(new Error("DB error"));

    const req = {
      body: {
        cursoId: 1,
        fecha: "2025-06-01",
        registros: [{ estudianteId: 10, presente: true }],
      },
    };
    const res = mockRes();

    await registrarAsistencia(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});

// ─────────────────────────────────────────────
// obtenerAsistenciaPorCurso
// ─────────────────────────────────────────────
describe("obtenerAsistenciaPorCurso", () => {
  beforeEach(() => jest.clearAllMocks());

  test("400 si faltan cursoId o fecha", async () => {
    const req = { query: { cursoId: "1" } }; // sin fecha
    const res = mockRes();

    await obtenerAsistenciaPorCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("retorna lista de asistencia correctamente", async () => {
    const listaFake = [
      {
        id: 1,
        estado: "PRESENTE",
        alumno: { id: 10, rut: "12345678-9", nombre: "Ana", apellido: "López" },
      },
      {
        id: 2,
        estado: "AUSENTE",
        alumno: {
          id: 11,
          rut: "98765432-1",
          nombre: "Pedro",
          apellido: "Mora",
        },
      },
    ];
    Asistencia.findAll.mockResolvedValue(listaFake);

    const req = { query: { cursoId: "3", fecha: "2025-06-01" } };
    const res = mockRes();

    await obtenerAsistenciaPorCurso(req, res);

    expect(Asistencia.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: { fecha: "2025-06-01" } })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        totalAlumnos: 2,
        cursoId: 3,
        reporte: listaFake,
      })
    );
  });

  test("retorna totalAlumnos = 0 cuando no hay registros", async () => {
    Asistencia.findAll.mockResolvedValue([]);

    const req = { query: { cursoId: "3", fecha: "2025-06-01" } };
    const res = mockRes();

    await obtenerAsistenciaPorCurso(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, totalAlumnos: 0 })
    );
  });

  test("500 si findAll lanza un error", async () => {
    Asistencia.findAll.mockRejectedValue(new Error("DB error"));

    const req = { query: { cursoId: "3", fecha: "2025-06-01" } };
    const res = mockRes();

    await obtenerAsistenciaPorCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});
