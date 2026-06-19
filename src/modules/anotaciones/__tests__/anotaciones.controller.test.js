const { crearAnotacion } = require("../anotaciones.controller");
const Anotacion = require("../anotaciones.model");

jest.mock("../anotaciones.model");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("crearAnotacion", () => {
  beforeEach(() => jest.clearAllMocks());

  test("400 si falta alumnoId", async () => {
    const req = {
      body: {
        tipo: "POSITIVA",
        descripcion: "Buen trabajo",
        fecha: "2025-06-01",
      },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si falta tipo", async () => {
    const req = {
      body: { alumnoId: 1, descripcion: "Buen trabajo", fecha: "2025-06-01" },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si falta descripcion", async () => {
    const req = {
      body: { alumnoId: 1, tipo: "POSITIVA", fecha: "2025-06-01" },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("400 si falta fecha", async () => {
    const req = {
      body: { alumnoId: 1, tipo: "POSITIVA", descripcion: "Buen trabajo" },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });

  test("201 y crea anotación con datos válidos", async () => {
    const anotacionFake = {
      id: 1,
      alumnoId: 5,
      tipo: "POSITIVA",
      descripcion: "Excelente participación",
      fecha: "2025-06-01",
    };
    Anotacion.create.mockResolvedValue(anotacionFake);

    const req = {
      body: {
        alumnoId: 5,
        tipo: "POSITIVA",
        descripcion: "Excelente participación",
        fecha: "2025-06-01",
      },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(Anotacion.create).toHaveBeenCalledWith({
      alumnoId: 5,
      tipo: "POSITIVA",
      descripcion: "Excelente participación",
      fecha: "2025-06-01",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, anotacion: anotacionFake })
    );
  });

  test("201 y crea anotación de tipo NEGATIVA", async () => {
    const anotacionFake = {
      id: 2,
      alumnoId: 3,
      tipo: "NEGATIVA",
      descripcion: "No trajo materiales",
      fecha: "2025-06-02",
    };
    Anotacion.create.mockResolvedValue(anotacionFake);

    const req = {
      body: {
        alumnoId: 3,
        tipo: "NEGATIVA",
        descripcion: "No trajo materiales",
        fecha: "2025-06-02",
      },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, anotacion: anotacionFake })
    );
  });

  test("500 si Anotacion.create lanza un error", async () => {
    Anotacion.create.mockRejectedValue(new Error("DB error"));

    const req = {
      body: {
        alumnoId: 1,
        tipo: "POSITIVA",
        descripcion: "Buen trabajo",
        fecha: "2025-06-01",
      },
    };
    const res = mockRes();

    await crearAnotacion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: false })
    );
  });
});
