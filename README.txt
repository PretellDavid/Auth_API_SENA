Servicio de autenticación - Evidencia GA7-220501096-AA5-EV01
============================================================

Este proyecto implementa un servicio web (API REST) sencillo para:
- Registro de usuario.
- Inicio de sesión (autenticación).

Está desarrollado con:
- Node.js
- Express

Endpoints principales
---------------------

1. Verificación del servicio
   - Método: GET
   - URL:    /api/health

2. Registro de usuario
   - Método: POST
   - URL:    /api/register
   - Cuerpo (JSON):
     {
       "username": "usuario1",
       "password": "secreta"
     }

3. Inicio de sesión
   - Método: POST
   - URL:    /api/login
   - Cuerpo (JSON):
     {
       "username": "usuario1",
       "password": "secreta"
     }

   - Si las credenciales son correctas:
     Respuesta 200 con mensaje "Autenticación satisfactoria."
   - Si las credenciales son incorrectas:
     Respuesta 401 con mensaje "Error en la autenticación. Credenciales inválidas."

Estructura del proyecto
-----------------------

Auth_API_SENA/
  package.json
  .gitignore
  README.txt
  enlace_repositorio.txt
  src/
    server.js
    usersRepository.js

Instrucciones de uso (local)
----------------------------

1. Instalar dependencias (solo si se desea ejecutar el proyecto):
   - Tener Node.js instalado.
   - Ejecutar en la carpeta del proyecto:
       npm install

2. Ejecutar el servidor:
       npm start

   El servicio quedará escuchando en:
       http://localhost:3001

3. Probar con herramientas como Postman, Thunder Client o curl.

Evidencia SENA
--------------

Este proyecto está preparado para la evidencia:
  GA7-220501096-AA5-EV01 - Diseño y desarrollo de servicios web.

Incluye:
- Comentarios en el código.
- API REST con endpoints de registro e inicio de sesión.
- Estructura simple que se puede versionar con Git/GitHub.
- Archivo "enlace_repositorio.txt" para registrar el URL del repositorio.

