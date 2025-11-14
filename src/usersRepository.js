// usersRepository.js
// -----------------------------------------------------------------------------
// Este módulo simula un repositorio de usuarios en memoria.
// En un proyecto real se reemplazaría por una base de datos (MySQL, MongoDB, etc).

/**
 * Arreglo en memoria que representa la "tabla" de usuarios.
 * Cada usuario tiene:
 *  - username: nombre de usuario único
 *  - password: contraseña en texto plano (solo para efecto didáctico)
 */
const users = [];

/**
 * Busca un usuario por su nombre de usuario.
 * @param {string} username - Nombre de usuario a buscar.
 * @returns {object|null} Usuario encontrado o null si no existe.
 */
function findByUsername(username) {
  return users.find((u) => u.username === username) || null;
}

/**
 * Crea un nuevo usuario y lo almacena en memoria.
 * @param {string} username - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {object} El usuario creado.
 */
function createUser(username, password) {
  const user = { username, password };
  users.push(user);
  return user;
}

module.exports = {
  findByUsername,
  createUser,
};
