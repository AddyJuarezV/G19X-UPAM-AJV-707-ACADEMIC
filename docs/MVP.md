# MVP – Sistema de Seguimiento Automático del Proceso de Incorporación

## 1. Definición

MVP significa **Minimum Viable Product**, en español **Producto Mínimo Viable**.

Para este proyecto, el MVP representa la primera versión funcional que permitirá demostrar el flujo principal del proceso de incorporación de nuevos colaboradores.

El MVP no limita el crecimiento del sistema. Una vez que las funciones principales estén funcionando correctamente, podrán agregarse mejoras, automatizaciones e integraciones adicionales.

---

## 2. Objetivo

Desarrollar una primera versión funcional que permita registrar a un nuevo colaborador, revisar su solicitud, incorporarlo a una generación y dar seguimiento básico a su documentación hasta completar su proceso de incorporación.

---

## 3. Usuarios principales

### Colaborador

Podrá:

- Crear su propia cuenta.
- Iniciar sesión.
- Registrar sus datos iniciales.
- Subir su CV.
- Subir su credencial universitaria.
- Enviar su solicitud para revisión.
- Consultar si su solicitud fue aprobada o requiere corrección.
- Corregir información cuando sea necesario.
- Consultar y atender sus documentos de incorporación una vez aprobado.
- Ver el estado general de su incorporación.

### Encargado / Administrador

Podrá:

- Iniciar sesión.
- Consultar solicitudes recibidas.
- Revisar los datos, CV y credencial del colaborador.
- Aprobar una solicitud.
- Solicitar correcciones indicando el motivo.
- Asignar colaboradores aprobados a una generación abierta.
- Consultar generaciones.
- Revisar el estado de incorporación de cada integrante.
- Revisar documentos que requieren atención por parte de la empresa.
- Marcar una incorporación como completada cuando se cumplan sus requisitos.

---

## 4. Registro inicial

El colaborador será responsable de crear su propia cuenta.

Después deberá capturar:

- Nombre completo.
- CURP.
- Teléfono.
- Correo personal.
- Correo institucional.
- Universidad.
- Siglas de la universidad.
- Carrera.
- Horas a cumplir.
- CV.
- Credencial universitaria.

Al terminar, enviará su solicitud para revisión.

---

## 5. Revisión y aprobación

Cuando el colaborador envíe su solicitud, el encargado podrá revisar la información capturada.

Tendrá dos acciones principales:

- **Aprobar**.
- **Solicitar corrección**.

Cuando se solicite una corrección, deberá indicarse el motivo.

El colaborador corregirá la información y podrá enviar nuevamente su solicitud.

Un colaborador no aparecerá dentro de una generación hasta que su solicitud haya sido aprobada.

---

## 6. Generaciones

Los colaboradores aprobados podrán ser asignados a una generación abierta.

Ejemplo:

**Generación 19**

Las generaciones podrán estar:

- Abiertas.
- Cerradas.

Mientras una generación esté abierta, podrán agregarse nuevos colaboradores aprobados aunque no hayan ingresado el mismo día.

Cuando el encargado cierre una generación, ya no se podrán agregar nuevos integrantes, pero las personas que ya pertenecen a ella podrán continuar completando sus procesos pendientes.

---

## 7. Seguimiento visual por generación

Al ingresar a una generación, el encargado podrá visualizar a sus integrantes mediante tarjetas.

Cada tarjeta mostrará información resumida como:

- Nombre completo + siglas de universidad.
- Estado general de incorporación.
- Avance documental.
- Pendientes principales.

Ejemplo ficticio:

**Peter Parker - UPAM**

Los colores permitirán identificar rápidamente el estado:

- **Verde:** incorporación completa.
- **Amarillo:** incorporación en proceso o con pendientes.
- **Rojo:** requiere atención.

El encargado podrá abrir una tarjeta para consultar el detalle.

---

## 8. Documentación de incorporación

Una vez aprobada la solicitud, el colaborador tendrá acceso a un apartado de documentación.

Para el MVP se consideran como documentos principales:

- NDA o acuerdo de confidencialidad.
- Carta de presentación.
- Carta de aceptación.

Cada documento podrá indicar como mínimo:

- Estado actual.
- Quién debe realizar la siguiente acción.
- Si requiere corrección.
- Si está completado.

### NDA

La empresa proporciona el documento, el colaborador lo descarga, lo firma y lo vuelve a subir.

### Carta de presentación

El colaborador la sube, la empresa la revisa, la firma y vuelve a subirla para que el colaborador pueda descargarla.

### Carta de aceptación

La empresa proporciona una plantilla, el colaborador la llena y la vuelve a subir. La empresa la revisa, firma y vuelve a subir la versión final para que el colaborador pueda descargarla.

Si existe un error, se podrá solicitar una corrección indicando el motivo.

---

## 9. Pendientes del encargado

El encargado tendrá un apartado donde pueda consultar las acciones que actualmente dependen de él.

Por ejemplo:

- Documentos pendientes de revisión.
- Documentos pendientes de firma.
- Documentos pendientes de devolución.
- Correcciones que debe atender la empresa.

La finalidad es que no tenga que revisar colaborador por colaborador para descubrir qué acciones le corresponden.

---

## 10. Incorporación completada

Cuando el colaborador cumpla los requisitos definidos para su incorporación:

- Su estado cambiará a **Incorporación completada**.
- Su tarjeta podrá mostrarse en verde.
- Su expediente quedará disponible para consulta.

El sistema no administrará las actividades técnicas, entregables o tareas que el colaborador realice posteriormente dentro de su proyecto asignado.

---

## 11. Stack tecnológico base

### Backend

- Python.
- Django.
- Django REST Framework.

### Frontend

- React.
- Vite.

### Base de datos

- PostgreSQL.

### Control de versiones

- Git.
- GitHub.

---

## 12. Fuera del alcance del MVP

Para mantener esta primera versión controlada, quedan fuera del MVP inicial:

- Envío automático de mensajes por WhatsApp.
- Envío automático de correos.
- Microsoft Entra ID.
- Azure OpenAI.
- Power BI.
- Redis.
- Celery.
- Automatizaciones avanzadas.
- Reportes avanzados.
- Gestión de tareas o entregables de los proyectos asignados.
- Seguimiento de código, commits, sprints o actividades técnicas.

Estas funciones podrán evaluarse e incorporarse posteriormente sin modificar el objetivo principal del sistema.

---

## 13. Posibles mejoras posteriores

Después de completar y validar el MVP podrán agregarse, entre otras:

- Avisos automáticos.
- Recordatorios por correo.
- Integración con WhatsApp.
- Alertas por días hábiles.
- Historial documental más detallado.
- Búsqueda y filtros avanzados.
- Más tipos de colaboradores.
- Más tipos de documentos.
- Dashboard con métricas.
- Integraciones empresariales.
- Inteligencia artificial cuando exista una necesidad concreta.

Estas mejoras no forman parte del compromiso mínimo del MVP y podrán desarrollarse de manera incremental.

---

## 14. Resultado esperado

El MVP se considerará funcional cuando sea posible demostrar el siguiente flujo:

**Colaborador crea cuenta → registra datos → envía solicitud → encargado revisa → aprueba o solicita corrección → colaborador aprobado entra a una generación → completa documentación → encargado atiende sus pendientes → incorporación completada.**

Con este flujo se demuestra el objetivo principal del proyecto: **dar seguimiento al proceso de incorporación de nuevos colaboradores**.
