# Frontend - PluriOne Onboarding

Interfaz web del Sistema de Seguimiento Automático del Proceso de Incorporación de PluriOne.

El frontend fue desarrollado con React y Vite y consume la API REST implementada con Django REST Framework.

---

## Tecnologías

- React
- Vite
- JavaScript
- HTML
- CSS
- npm

Node.js se utiliza como entorno de ejecución para las herramientas del frontend y para gestionar las dependencias mediante npm.

El backend del sistema no utiliza Node.js.

---

## Requisitos

Para ejecutar el frontend se requiere:

- Node.js
- npm
- Backend Django disponible en http://127.0.0.1:8000

---

## Instalación

Desde la raíz del repositorio:

cd frontend

Instalar las dependencias:

npm install

---

## Ejecutar en desarrollo

Antes de iniciar React, el backend Django debe encontrarse ejecutándose en:

http://127.0.0.1:8000/

Después, desde frontend/:

npm run dev

Vite mostrará la dirección local de la aplicación, normalmente:

http://localhost:5173/

---

## Comunicación con Django

El archivo vite.config.js configura un proxy para las peticiones que comienzan con:

/api

y las redirige hacia:

http://127.0.0.1:8000

Por ejemplo:

React
  ↓
/api/accounts/profile/
  ↓
Vite Proxy
  ↓
http://127.0.0.1:8000/api/accounts/profile/
  ↓
Django REST Framework

---

## Autenticación

El frontend utiliza JWT para comunicarse con el backend.

Se encuentran implementados:

- inicio de sesión;
- access token;
- refresh token;
- renovación automática del access token;
- restauración de sesión;
- separación de interfaz por rol;
- cierre de sesión.

Los roles principales son:

COLABORADOR
ENCARGADO

---

## Funcionalidades del colaborador

Actualmente el frontend permite:

- registrar una nueva cuenta;
- ingresar mediante correo y contraseña;
- consultar el estado de la solicitud;
- enviar una solicitud a revisión;
- consultar motivos de corrección;
- corregir información cuando el backend lo permite;
- consultar la sección Mis datos;
- consultar CV;
- consultar credencial universitaria;
- visualizar documentos de incorporación;
- descargar plantillas publicadas por PluriOne;
- entregar documentos;
- volver a entregar documentos que requieren corrección;
- consultar documentos firmados;
- confirmar recepción;
- visualizar el progreso documental;
- consultar notificaciones;
- visualizar recordatorios automáticos persistentes.

---

## Funcionalidades del encargado

Actualmente el frontend permite:

- consultar solicitudes pendientes;
- aprobar solicitudes;
- solicitar correcciones;
- consultar generaciones;
- crear generaciones;
- cerrar generaciones;
- consultar colaboradores aprobados disponibles;
- asignar colaboradores a generaciones abiertas;
- visualizar tarjetas de seguimiento;
- consultar estados de avance;
- consultar documentos pendientes;
- publicar plantillas;
- revisar documentos entregados;
- solicitar correcciones documentales;
- cargar documentos firmados por PluriOne.

---

## Estados visuales

Las tarjetas de los colaboradores pueden mostrarse como:

GREEN
YELLOW
RED

Interpretación:

- GREEN: incorporación documental completa.
- YELLOW: incorporación en proceso.
- RED: existe al menos una corrección que requiere atención.

---

## Notificaciones

El componente NotificationsPanel.jsx presenta dos tipos de avisos:

1. avisos derivados del estado actual del proceso;
2. recordatorios automáticos persistentes generados por Django.

Los recordatorios persistentes se consultan mediante:

GET /api/onboarding/notifications/mine/

Cada usuario autenticado consulta únicamente los avisos dirigidos a su cuenta.

Si el documento relacionado cambia de estado, una notificación automática creada para el estado anterior deja de mostrarse como vigente.

---

## Seguimiento automático

La generación de los recordatorios no se realiza directamente en React.

Django contiene el comando:

python manage.py revisar_pendientes

El backend determina:

- qué documento lleva tiempo sin movimiento;
- quién debe realizar la siguiente acción;
- qué mensaje debe generarse;
- quién debe recibir el recordatorio.

El recordatorio se almacena como una notificación persistente y posteriormente React lo consulta mediante la API.

En el entorno de desarrollo Windows, el comando se ejecuta periódicamente mediante el Programador de tareas.

El flujo general es:

Programador de tareas de Windows
        ↓
Django
        ↓
revisar_pendientes
        ↓
AutomaticNotification
        ↓
PostgreSQL
        ↓
API REST
        ↓
React

---

## Temas visuales

La aplicación incluye tres temas:

- PluriOne;
- Claro;
- Oscuro.

La preferencia seleccionada se almacena en el navegador.

---

## Validación de código

Para revisar el frontend mediante ESLint:

npm run lint

El comando permite detectar errores y problemas de calidad en el código JavaScript y React.

La validación actual del proyecto termina sin errores.

---

## Build

Para comprobar que la aplicación puede compilarse:

npm run build

Una ejecución correcta genera:

frontend/dist/

Durante la validación actual del MVP se ejecutaron correctamente:

npm run lint
npm run build

---

## Relación con el backend

La lógica principal del proceso de incorporación no se implementa en React.

Django controla:

- usuarios;
- autenticación;
- permisos;
- solicitudes;
- generaciones;
- asignaciones;
- documentos;
- estados;
- validaciones;
- notificaciones persistentes;
- seguimiento automático;
- conexión con PostgreSQL.

React funciona como la interfaz gráfica que permite al colaborador y al encargado utilizar dichas funcionalidades mediante la API REST.

---

## Estructura general

Usuario
  ↓
React + Vite
  ↓
API REST / JWT
  ↓
Django REST Framework
  ↓
Django
  ↓
PostgreSQL

---

## Ejecución completa del sistema

Para utilizar el frontend es necesario mantener también el backend Django en ejecución.

### Terminal 1 - Backend

Desde la raíz del proyecto:

.\.venv\Scripts\Activate.ps1
cd backend
python manage.py runserver

Backend:

http://127.0.0.1:8000/

### Terminal 2 - Frontend

Desde la raíz del proyecto:

cd frontend
npm run dev

Frontend, normalmente:

http://localhost:5173/

---

## Comandos principales

Instalar dependencias:

npm install

Ejecutar frontend:

npm run dev

Validar código:

npm run lint

Generar build:

npm run build

---

## Proyecto principal

La documentación general del sistema, instalación completa, API, seguimiento automático, pruebas y estado actual del proyecto se encuentran en:

../README.md
