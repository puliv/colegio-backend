const jwt = require("jsonwebtoken");
const { protegerRuta } = require("../auth.middleware");

// ─── Mock de jsonwebtoken ─────────────────────────────────────────────────────
jest.mock("jsonwebtoken");

// ─── Helpers ──────────────────────────────────────────────────────────────────
const mockRes = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

const mockReqConToken = (token) => ({
  headers: { authorization: `Bearer ${token}` },
});

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("protegerRuta middleware", () => {
  let next;

  beforeEach(() => {
    next = jest.fn();
    jest.clearAllMocks();
    process.env.JWT_SECRET = "secreto_test";
  });

  // ── Casos sin token ──────────────────────────────────────────────────────────

  test("responde 401 si no hay header Authorization", async () => {
    const req = { headers: {} };
    const res = mockRes();

    protegerRuta(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "No hay token, autorización denegada",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("responde 401 si el header no empieza con 'Bearer '", async () => {
    const req = { headers: { authorization: "Token abc123" } };
    const res = mockRes();

    protegerRuta(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "No hay token, autorización denegada",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("responde 401 si el header Authorization está vacío", () => {
    const req = { headers: { authorization: "" } };
    const res = mockRes();

    protegerRuta(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  // ── Casos con token inválido / expirado ───────────────────────────────────

  test("responde 401 si el token es inválido", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid signature");
    });

    const req = mockReqConToken("token.invalido.xyz");
    const res = mockRes();

    protegerRuta(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Token no válido o expirado",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("responde 401 si el token está expirado", () => {
    jwt.verify.mockImplementation(() => {
      const err = new Error("jwt expired");
      err.name = "TokenExpiredError";
      throw err;
    });

    const req = mockReqConToken("token.expirado.xyz");
    const res = mockRes();

    protegerRuta(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      msg: "Token no válido o expirado",
    });
    expect(next).not.toHaveBeenCalled();
  });

  // ── Caso exitoso ─────────────────────────────────────────────────────────────

  test("llama a next() e inyecta req.usuario si el token es válido", () => {
    const usuarioDecodificado = {
      id: 1,
      email: "ana@colegio.cl",
      rol: "admin",
    };
    jwt.verify.mockReturnValue(usuarioDecodificado);

    const req = mockReqConToken("token.valido.xyz");
    const res = mockRes();

    protegerRuta(req, res, next);

    // Verifica que jwt.verify recibió el token y el secret correctos
    expect(jwt.verify).toHaveBeenCalledWith("token.valido.xyz", "secreto_test");

    // El usuario decodificado queda disponible en req.usuario
    expect(req.usuario).toEqual(usuarioDecodificado);

    // Se pasa al siguiente middleware/controlador
    expect(next).toHaveBeenCalledTimes(1);

    // No debe haber enviado respuesta de error
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
