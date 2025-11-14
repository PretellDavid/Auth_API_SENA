// server.js
// -----------------------------------------------------------------------------
// Servicio web (API REST) sencillo para registro e inicio de sesión.
// Evidencia: GA7-220501096-AA5-EV01 - Diseño y desarrollo de servicios web.
// Framework: Node.js + Express.
//
// Endpoints principales:
//   POST /api/register  -> Registro de usuario.
//   POST /api/login     -> Inicio de sesión (autenticación).

const express = require('express');
const morgan = require('morgan');
const { findByUsername, createUser } = require('./usersRepository');

// Crear aplicación de Express
const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware de logging para ver las peticiones en consola (útil en desarrollo)
app.use(morgan('dev'));

// Puerto de escucha. En producción se recomienda usar una variable de entorno.
const PORT = process.env.PORT || 3001;

/**
 * Endpoint de prueba para verificar que el servicio está en línea.
 * Método: GET
 * Ruta:   /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servicio de autenticación operativo.' });
});

/**
 * Registro de usuario.
 * Método: POST
 * Ruta:   /api/register
 *
 * Cuerpo esperado (JSON):
 * {
 *   "username": "usuario1",
 *   "password": "secreta"
 * }
 *
 * Reglas básicas:
 * - username y password son obligatorios.
 * - No se permite registrar dos veces el mismo username.
 */
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Validación de campos obligatorios
  if (!username || !password) {
    return res.status(400).json({
      error: 'username y password son obligatorios para el registro.',
    });
  }

  // Verificar si el usuario ya existe
  const existing = findByUsername(username);
  if (existing) {
    return res.status(409).json({
      error: 'Ya existe un usuario registrado con ese nombre de usuario.',
    });
  }

  // Crear el usuario en el repositorio en memoria
  const newUser = createUser(username, password);

  // Responder con mensaje de éxito
  return res.status(201).json({
    message: 'Usuario registrado correctamente.',
    user: {
      username: newUser.username,
    },
  });
});

/**
 * Inicio de sesión.
 * Método: POST
 * Ruta:   /api/login
 *
 * Cuerpo esperado (JSON):
 * {
 *   "username": "usuario1",
 *   "password": "secreta"
 * }
 *
 * Comportamiento:
 * - Si las credenciales son correctas -> mensaje de autenticación satisfactoria.
 * - Si son incorrectas -> error de autenticación.
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validación de campos obligatorios
  if (!username || !password) {
    return res.status(400).json({
      error: 'username y password son obligatorios para el inicio de sesión.',
    });
  }

  const user = findByUsername(username);

  // Validar usuario y contraseña
  if (!user || user.password !== password) {
    // Error de autenticación
    return res.status(401).json({
      message: 'Error en la autenticación. Credenciales inválidas.',
    });
  }

  // Autenticación satisfactoria
  return res.json({
    message: 'Autenticación satisfactoria.',
    user: {
      username: user.username,
    },
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de autenticación escuchando en http://localhost:${PORT}`);
});
