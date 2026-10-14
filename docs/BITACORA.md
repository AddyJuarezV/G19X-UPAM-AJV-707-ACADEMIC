# Bitácora del proyecto – PluriOne Onboarding

Este documento registra cronológicamente los avances, las decisiones, los problemas encontrados y los siguientes pasos. No sustituye al historial de Git: los commits muestran cambios en archivos y esta bitácora explica el trabajo realizado.

## Antecedentes – Preparación del proyecto

**Actividades realizadas:** Se creó el repositorio privado `plurione-onboarding` en GitHub. Se verificó la instalación de Git en Windows, se clonó el repositorio en el Escritorio y se comprobó que la rama local `main` está conectada con `origin/main`.

**Definiciones de alcance:** El sistema dará seguimiento al proceso de incorporación de colaboradores: registro, documentación, revisión, aprobación, acciones pendientes de cada responsable, capacitación de incorporación y estado general. El proyecto o área asignada podrá mostrarse como referencia, pero no se administrarán tareas, código ni entregables técnicos de los proyectos de los colaboradores.

**Propuestas acordadas:** Vista por generación con tarjetas de estado y acceso al detalle de cada persona. El caso inicial de referencia son practicantes y residentes, con posibilidad de adaptar los requisitos a otros tipos de incorporación. Los ejemplos y pruebas usarán datos ficticios.

**Decisión tecnológica:** Utilizar React + Vite en el frontend, Python + Django y Django REST Framework en el backend, y PostgreSQL como base de datos. Las demás tecnologías de la propuesta inicial se evaluarán solo si resultan necesarias.

## 25 de septiembre de 2026 – Organización documental

**Actividades realizadas:** Se creó la carpeta `docs` dentro del repositorio local. Se colocó `docs/PRB.md` con la propuesta del sistema y se reemplazó el `README.md` original por un documento de contexto y continuidad para futuras sesiones de trabajo con el asistente o Codex.

**Decisión de documentación:** El `README.md` será el único documento breve de estado actual y próximos pasos; no se creará un `START\_HERE.md` separado. `docs/PRB.md` recopila la propuesta, `docs/MVP.md` definirá el producto a desarrollar y esta bitácora conservará el historial narrativo del trabajo. Los documentos no llevarán números de versión en su nombre.

**Estado al cierre de esta anotación:** Está pendiente colocar esta bitácora en `docs`, revisar los archivos con `git status`, registrar el avance con un commit y enviarlo a GitHub. Después se trabajará en el MVP, sin comenzar todavía el desarrollo del sistema.

\---

## Plantilla para la siguiente sesión

### Fecha – Actividad

**Objetivo:**

**Trabajo realizado:**

**Decisiones y motivos:**

**Problemas encontrados y solución:**

**Pruebas o comprobaciones:**

**Archivos modificados / commit:**

**Pendientes y siguiente paso:**





**---**



**## 27 de septiembre de 2026**



**### Actividad**



**Definición del MVP del Sistema de Seguimiento Automático del Proceso de Incorporación.**



**### Trabajo realizado**



**- Se analizaron las funcionalidades mínimas necesarias para que el sistema pueda demostrar el proceso principal de incorporación.**

**- Se definió que el colaborador será responsable de crear su propia cuenta.**

**- Se definió el registro inicial con datos personales, académicos, CV y credencial universitaria.**

**- Se estableció el flujo de revisión de solicitudes por parte del encargado.**

**- Se definieron las acciones Aprobar y Solicitar corrección.**

**- Se estableció que un colaborador solamente aparecerá en una generación después de ser aprobado.**

**- Se definieron generaciones abiertas y cerradas.**

**- Se definió la visualización mediante tarjetas con nombre y siglas de universidad.**

**- Se definió el seguimiento básico de NDA, carta de presentación y carta de aceptación.**

**- Se estableció un apartado de pendientes para el encargado.**

**- Se redujo el alcance del MVP para mantener únicamente las funciones necesarias para demostrar el seguimiento de incorporación.**



**### Decisiones tomadas**



**- El MVP representa el mínimo funcional comprometido y no limita futuras mejoras.**

**- El encargado no creará cuentas ni contraseñas para los colaboradores.**

**- El sistema utilizará Django, Django REST Framework, React, Vite y PostgreSQL.**

**- Funciones como WhatsApp automático, correos automáticos, Microsoft Entra ID, Azure OpenAI, Power BI, Redis y otras automatizaciones avanzadas quedan fuera del MVP inicial y podrán evaluarse posteriormente.**

**- El sistema no administrará tareas, entregables o avances técnicos de los proyectos asignados a los colaboradores.**



**### Resultado**



**Se creó el documento `docs/MVP.md` con el flujo funcional mínimo que deberá cumplir la primera versión del sistema.**



**### Próximo paso**



**Preparar la estructura inicial del proyecto y comenzar el desarrollo del backend con Django.**


---

## 28 de septiembre de 2026

### Actividad

Inicio del desarrollo del backend del sistema.

### Trabajo realizado

- Se verificó Python 3.12.10.
- Se creó el entorno virtual `.venv`.
- Se instaló Django 6.1.1.
- Se creó la carpeta `backend`.
- Se creó el proyecto base de Django con configuración `config`.
- Se ejecutó `python manage.py check` sin errores.
- Se levantó el servidor de desarrollo correctamente.
- Se verificó el funcionamiento desde `http://127.0.0.1:8000/`.
- Se creó `.gitignore`.
- Se creó `requirements.txt`.

### Resultado

El backend base de Django se encuentra funcionando correctamente y está listo para comenzar su configuración.

### Próximo paso

Configurar PostgreSQL, Django REST Framework y posteriormente comenzar el módulo de registro de colaboradores.

---

## 28 de septiembre de 2026

### Actividad

Configuración de PostgreSQL y Django REST Framework.

### Trabajo realizado

- Se instaló PostgreSQL 18.6.
- Se creó la base de datos `plurione_onboarding`.
- Se instaló `psycopg` para conectar Django con PostgreSQL.
- Se creó el archivo `.env` para almacenar la configuración sensible.
- Se configuró Django para utilizar PostgreSQL.
- Se aplicaron las migraciones iniciales correctamente.
- Se instaló Django REST Framework 3.18.1.
- Se agregó `rest_framework` a las aplicaciones instaladas.
- Se verificó la configuración mediante `python manage.py check`.

### Resultado

Django se encuentra conectado correctamente con PostgreSQL y Django REST Framework está disponible para comenzar a desarrollar la API que utilizará React.

### Próximo paso

Crear la estructura inicial de aplicaciones Django y comenzar con el módulo de cuentas y colaboradores.


---

## 29 de septiembre de 2026

### Actividad

Creación del módulo de cuentas y perfil inicial del colaborador.

### Trabajo realizado

- Se creó la aplicación Django `accounts`.
- Se implementó un modelo de usuario personalizado.
- Se configuró el correo electrónico como identificador de inicio de sesión.
- Se agregaron los roles Colaborador y Encargado.
- Se creó un administrador personalizado de usuarios.
- Se reinició la base de datos de desarrollo para establecer correctamente el modelo de usuario desde la primera migración.
- Se creó y validó un superusuario.
- Se comprobó el acceso al Django Admin mediante correo electrónico.
- Se creó el modelo `CollaboratorProfile`.
- Se agregaron los datos personales y académicos requeridos por el MVP.
- Se agregaron los campos para CV y credencial universitaria.
- Se implementaron los estados Borrador, En revisión, Requiere corrección y Aprobado.
- Se agregó el campo para indicar el motivo de una corrección.
- Se crearon y aplicaron correctamente las migraciones en PostgreSQL.

### Resultado

El backend ya cuenta con la base de autenticación y el perfil inicial del colaborador necesarios para comenzar el flujo real de registro y aprobación.

### Próximo paso

Registrar los modelos en Django Admin y comenzar a construir la API de registro de colaboradores con Django REST Framework.

---

## 30 de septiembre de 2026

### Actividad

Implementación y prueba de la primera API REST del sistema.

### Trabajo realizado

- Se registraron los modelos de usuarios y perfiles en Django Admin.
- Se configuró `MEDIA_ROOT` y `MEDIA_URL`.
- Se creó `CollaboratorRegistrationSerializer`.
- Se creó el endpoint `POST /api/accounts/register/`.
- Se implementó el registro automático de usuario y perfil.
- Los nuevos usuarios reciben el rol `COLABORADOR`.
- Las nuevas solicitudes comienzan en estado `DRAFT`.
- Se implementó validación para evitar correos y CURP duplicados.
- Se utilizó una transacción atómica para mantener consistencia.
- Se realizó una prueba utilizando información ficticia de Peter Parker.
- La API creó correctamente el usuario y el perfil.
- Se almacenaron correctamente CV y credencial universitaria.
- Se confirmó la información mediante Django Admin y PostgreSQL.

### Resultado

El sistema ya permite registrar un colaborador mediante una API REST, almacenar sus datos personales y académicos, guardar sus documentos iniciales y persistir toda la información en PostgreSQL.

### Próximo paso

Implementar el envío de la solicitud del colaborador para cambiar su estado de `DRAFT` a `IN_REVIEW`.


---

## 3 de octubre de 2026

### Actividad

Implementación de autenticación JWT y envío de solicitudes a revisión.

### Trabajo realizado

- Se instaló y configuró `djangorestframework-simplejwt`.
- Se configuró JWT como método de autenticación de Django REST Framework.
- Se creó el endpoint `POST /api/auth/login/`.
- Se creó el endpoint `POST /api/auth/refresh/`.
- Se comprobó el inicio de sesión mediante correo electrónico y contraseña.
- Se comprobó la generación de tokens `access` y `refresh`.
- Se verificó que un token de acceso vencido sea rechazado.
- Se creó el endpoint protegido `POST /api/accounts/application/submit/`.
- El endpoint identifica al colaborador mediante su token.
- Se restringió el envío de solicitudes únicamente a usuarios con rol `COLABORADOR`.
- Se implementó el cambio de estado `DRAFT` a `IN_REVIEW`.
- Se permitió reenviar solicitudes desde `NEEDS_CORRECTION`.
- Se realizó una prueba real con el colaborador ficticio Peter Parker.
- La solicitud cambió correctamente a estado `IN_REVIEW` en PostgreSQL.

### Resultado

El sistema ya puede autenticar colaboradores mediante JWT y permite que un colaborador autenticado envíe su propia solicitud para revisión.

### Próximo paso

Implementar el flujo del encargado para revisar solicitudes, aprobarlas o solicitar correcciones.

---

## 3 de octubre de 2026

### Actividad

Implementación del flujo de revisión de solicitudes por parte del encargado.

### Trabajo realizado

- Se creó una API para listar solicitudes en estado `IN_REVIEW`.
- Se restringió la consulta de pendientes al rol `ENCARGADO`.
- Se creó el serializer para las decisiones de revisión.
- Se creó el endpoint para revisar una solicitud.
- Se implementó la decisión `APPROVE`.
- Se implementó la decisión `REQUEST_CORRECTION`.
- Se estableció como obligatorio indicar un motivo al solicitar una corrección.
- Se probó el cambio de `IN_REVIEW` a `NEEDS_CORRECTION`.
- Se comprobó que el motivo de corrección queda almacenado.
- Se comprobó el reenvío de una solicitud desde `NEEDS_CORRECTION` a `IN_REVIEW`.
- Se probó posteriormente la aprobación de la solicitud.
- Peter Parker terminó correctamente en estado `APPROVED`.

### Resultado

Se completó el primer circuito administrativo del sistema:

`DRAFT → IN_REVIEW → NEEDS_CORRECTION → IN_REVIEW → APPROVED`.

El encargado ya puede consultar solicitudes pendientes, solicitar correcciones y aprobar colaboradores.

### Próximo paso

Implementar la consulta y edición del perfil del colaborador para que pueda atender realmente una corrección antes de reenviar su solicitud.


---

## 4 de octubre de 2026

### Actividad

Implementación de consulta y corrección del perfil del colaborador.

### Trabajo realizado

- Se creó `GET /api/accounts/profile/`.
- Se creó `PATCH /api/accounts/profile/`.
- El colaborador puede consultar su información y el estado de su solicitud.
- El colaborador puede consultar el motivo de una corrección.
- Se permite editar en `DRAFT`.
- Se permite editar en `NEEDS_CORRECTION`.
- Se bloquea la edición en `IN_REVIEW`.
- Se bloquea la edición en `APPROVED`.
- Se verificó el bloqueo utilizando a Peter Parker aprobado.
- Se utilizó a Miles Morales para probar el flujo de corrección.
- Miles pudo modificar realmente su información.
- Miles volvió a enviar su solicitud.
- La solicitud regresó a `IN_REVIEW`.
- El motivo de corrección anterior se eliminó automáticamente.

### Resultado

El colaborador ya puede consultar su perfil, conocer correcciones solicitadas, modificar su información cuando corresponda y reenviar su solicitud.

### Próximo paso

Implementar el módulo de generaciones y la asignación de colaboradores aprobados.

---

## 8 de octubre de 2026

### Actividad

Implementación inicial del módulo de generaciones.

### Trabajo realizado

- Se creó la aplicación Django `onboarding`.
- Se creó el modelo `Generation`.
- Se implementaron los estados `OPEN` y `CLOSED`.
- Se creó el modelo `GenerationMembership`.
- Se estableció la relación entre colaboradores y generaciones.
- Se restringió la asignación a colaboradores en estado `APPROVED`.
- Se restringió la asignación a generaciones abiertas.
- Se evitó que un colaborador pueda pertenecer a más de una generación.
- Se crearon y aplicaron las migraciones correspondientes en PostgreSQL.
- Se registraron los modelos en Django Admin.
- Se creó la Generación 19.
- Se asignó a Peter Parker - UPAM a la Generación 19.
- Se comprobó que Miles Morales no puede asignarse mientras se encuentra en `IN_REVIEW`.
- Se mejoró el formulario administrativo para mostrar únicamente opciones válidas.

### Resultado

El sistema ya puede crear generaciones y relacionar colaboradores aprobados con una generación abierta respetando las reglas principales del proceso.

### Próximo paso

Crear las APIs del módulo de generaciones para que posteriormente el frontend React pueda administrar generaciones sin depender del Django Admin.

---

## 9 de octubre de 2026

### Actividad

Implementación de la primera API del módulo de generaciones.

### Trabajo realizado

- Se creó `GenerationSerializer`.
- Se creó `GenerationMemberSerializer`.
- Se creó la ruta `GET /api/onboarding/generations/`.
- Se conectó el módulo `onboarding` con las URLs principales del proyecto.
- Se protegió la consulta mediante autenticación JWT.
- Se restringió el acceso al rol `ENCARGADO`.
- La API devuelve el número de generación.
- La API devuelve el estado de la generación.
- La API devuelve la cantidad de integrantes.
- La API devuelve los colaboradores asignados.
- Se realizó una prueba con la Generación 19.
- La API devolvió correctamente a Peter Parker - UPAM como integrante aprobado.

### Resultado

El encargado ya puede consultar las generaciones y visualizar sus integrantes mediante una API REST.

### Próximo paso

Implementar las APIs para crear generaciones, asignar colaboradores aprobados y cerrar generaciones.

---

## 10 de octubre de 2026

### Actividad

Implementación de administración de generaciones mediante API REST.

### Trabajo realizado

- Se creó la API para crear generaciones.
- Las nuevas generaciones se crean en estado `OPEN`.
- Se creó la API para asignar colaboradores a una generación.
- Se validó que solo colaboradores `APPROVED` puedan ser asignados.
- Se validó que un colaborador no pueda pertenecer a más de una generación.
- Se creó la API para cerrar generaciones.
- Se validó que las generaciones cerradas no acepten nuevos integrantes.
- Se creó la Generación 20 mediante API.
- Se comprobó que Miles Morales no puede asignarse mientras está en `IN_REVIEW`.
- Se cerró correctamente la Generación 20.
- Se comprobó que una generación `CLOSED` rechaza nuevas asignaciones.

### Resultado

El encargado ya puede crear, consultar, administrar y cerrar generaciones mediante API REST respetando las reglas principales del proceso.

### Próximo paso

Crear una API que muestre únicamente colaboradores aprobados que todavía no pertenecen a ninguna generación.

---

## 10 de octubre de 2026

### Actividad

Implementación de consulta de colaboradores disponibles para generaciones.

### Trabajo realizado

- Se creó la API `GET /api/onboarding/collaborators/available/`.
- Se restringió el acceso al rol `ENCARGADO`.
- La consulta devuelve únicamente colaboradores `APPROVED`.
- Se excluyen colaboradores que ya pertenecen a una generación.
- Se comprobó que Peter Parker no aparece disponible porque ya pertenece a la Generación 19.
- Se comprobó que Miles Morales no aparece mientras se encontraba en `IN_REVIEW`.
- Se aprobó a Miles Morales.
- Miles apareció automáticamente como colaborador disponible.
- Se asignó a Miles Morales - UTP a la Generación 19 mediante API.
- Después de la asignación, Miles dejó de aparecer como disponible.
- La Generación 19 quedó con dos integrantes.

### Resultado

El sistema ya puede determinar automáticamente qué colaboradores aprobados están disponibles para asignarse a una generación.

### Próximo paso

Crear el detalle de una generación y preparar la información necesaria para representar visualmente a sus integrantes.

---

## 12 de octubre de 2026

### Actividad

Implementación del detalle de generaciones y preparación de tarjetas de colaboradores.

### Trabajo realizado

- Se creó la API de detalle de una generación.
- Se implementó `GET /api/onboarding/generations/<id>/`.
- Se amplió la información de los integrantes de una generación.
- Se agregó el identificador del colaborador.
- Se agregó universidad y carrera.
- Se agregó el estado de la solicitud.
- Se creó el campo `card_label`.
- El formato de tarjeta utiliza `Nombre completo - SIGLAS`.
- Se probó la Generación 19.
- El detalle devolvió correctamente a Peter Parker - UPAM.
- El detalle devolvió correctamente a Miles Morales - UTP.
- La Generación 19 reportó correctamente dos integrantes.

### Resultado

El backend ya entrega la información necesaria para que el futuro frontend represente visualmente las tarjetas de colaboradores dentro de una generación.

### Próximo paso

Definir el estado visual de las tarjetas y comenzar el módulo de documentación del proceso de incorporación.

---

## 12 de octubre de 2026

### Actividad

Creación del modelo de documentación del proceso de incorporación.

### Trabajo realizado

- Se creó el modelo `OnboardingDocument`.
- Se definieron tres tipos de documentos:
  - NDA.
  - Carta de presentación.
  - Carta de aceptación.
- Se incorporaron diferentes estados para representar el flujo documental.
- Se agregaron campos para almacenar:
  - plantilla proporcionada por la empresa;
  - archivo entregado por el colaborador;
  - archivo firmado o devuelto por la empresa;
  - motivo de corrección.
- Se creó la migración `0002_onboardingdocument`.
- La migración fue aplicada correctamente en PostgreSQL.
- El modelo fue registrado en Django Admin.
- Se crearon tres documentos iniciales para Peter Parker.
- Se crearon tres documentos iniciales para Miles Morales.
- Se verificó un total de seis documentos.
- Se comprobó la restricción de unicidad intentando crear un segundo NDA para Peter Parker.
- PostgreSQL rechazó correctamente el duplicado mediante `unique_document_per_collaborator`.

### Resultado

El sistema ya cuenta con una estructura persistente para controlar los documentos que forman parte del proceso de incorporación de cada colaborador.

### Próximo paso

Crear la API mediante la cual cada colaborador pueda consultar el estado de sus propios documentos de incorporación.

---

## 12 de octubre de 2026

### Actividad

Implementación de la API de documentos personales del colaborador.

### Trabajo realizado

- Se creó la API `GET /api/onboarding/documents/mine/`.
- La API obtiene al colaborador a partir del usuario autenticado mediante JWT.
- No se utiliza un identificador manual del colaborador para consultar sus documentos.
- Se creó el serializador de documentos de incorporación.
- Se incluyen tipo de documento, nombre legible, estado, archivos y motivo de corrección.
- Se inició sesión como Peter Parker.
- Peter recibió exactamente tres documentos.
- Los tres documentos se encontraron en estado `PENDING`.
- No se mostraron documentos pertenecientes a Miles Morales.
- Se intentó acceder a la misma ruta con el rol `ENCARGADO`.
- El backend rechazó correctamente el acceso del encargado.

### Resultado

Cada colaborador puede consultar únicamente la documentación asociada a su propia cuenta, manteniendo separación entre usuarios y roles.

### Próximo paso

Implementar las acciones de carga y avance documental, comenzando con el flujo del NDA.

---

## 12 de octubre de 2026

### Actividad

Implementación de la entrega de documentos por parte del colaborador.

### Trabajo realizado

- Se creó la API para cargar archivos documentales.
- Se configuró el procesamiento de solicitudes `multipart/form-data`.
- Se restringió la acción al rol `COLABORADOR`.
- Se validó que un colaborador solo pueda cargar archivos en sus propios documentos.
- Se permitió la carga en estados `PENDING` y `NEEDS_CORRECTION`.
- Al entregar un archivo, el estado cambia automáticamente a `DELIVERED`.
- Se utilizó un archivo ficticio para probar el NDA de Peter Parker.
- El NDA cambió correctamente de `PENDING` a `DELIVERED`.
- El archivo fue almacenado físicamente en `backend/media/onboarding/collaborator_files/`.
- Los otros documentos de Peter permanecieron en estado `PENDING`.

### Resultado

El sistema ya permite que un colaborador entregue documentación real y mantiene sincronizados el archivo almacenado y el estado del proceso.

### Próximo paso

Implementar la bandeja de documentos entregados para que el encargado pueda revisarlos, aceptarlos o solicitar correcciones.

---

## 12 de octubre de 2026

### Actividad

Implementación del flujo de revisión, corrección, firma y finalización de documentos.

### Trabajo realizado

- Se creó la bandeja de documentos pendientes para el encargado.
- La bandeja muestra documentos en estado `DELIVERED`.
- Se implementó la revisión documental por parte del encargado.
- El encargado puede aprobar o solicitar corrección.
- La solicitud de corrección requiere un motivo.
- El colaborador puede consultar el motivo desde su propia cuenta.
- Se comprobó el ciclo `DELIVERED → NEEDS_CORRECTION → DELIVERED`.
- Se implementó eliminación automática de archivos anteriores al subir una corrección.
- Se comprobó que los archivos reemplazados ya no permanecen en `media`.
- Se definió que el NDA pasa a `COMPLETE` al ser aprobado.
- Se completó el flujo completo del NDA de Peter Parker.
- Se definió que las cartas pasan a `PENDING_SIGNATURE` después de ser aprobadas.
- Se implementó la carga del documento firmado por la empresa.
- El documento firmado pasa a estado `DOWNLOADABLE`.
- Se implementó la confirmación de recepción por parte del colaborador.
- Después de confirmar la recepción, el documento pasa a `COMPLETE`.
- Se completó el flujo completo de la Carta de presentación de Peter Parker.

### Resultado

El sistema ya soporta revisión, correcciones, reemplazo de archivos, firma por parte de la empresa, devolución al colaborador y finalización de documentos.

Actualmente Peter Parker tiene:

- NDA: `COMPLETE`.
- Carta de presentación: `COMPLETE`.
- Carta de aceptación: `PENDING`.

### Próximo paso

Implementar el flujo específico de la Carta de aceptación, comenzando con la publicación de una plantilla por parte de la empresa.

---

## 13 de octubre de 2026

### Actividad

Implementación y validación del flujo completo de la Carta de aceptación.

### Trabajo realizado

- Se implementó la publicación de plantillas por parte del encargado.
- Se restringió la entrega de la Carta de aceptación hasta que exista una plantilla.
- Se comprobó que el sistema rechaza correctamente una entrega sin plantilla.
- El encargado publicó una plantilla ficticia para Peter Parker.
- Peter pudo consultar la plantilla desde su cuenta.
- Peter entregó la Carta de aceptación llenada.
- El documento apareció automáticamente en los pendientes del encargado.
- El encargado aprobó la Carta de aceptación.
- El documento pasó a `PENDING_SIGNATURE`.
- La empresa cargó la versión firmada.
- El documento pasó a `DOWNLOADABLE`.
- Peter confirmó la recepción del documento.
- La Carta de aceptación pasó finalmente a `COMPLETE`.
- Se verificó que los archivos firmados se almacenan correctamente.

### Resultado

Peter Parker completó los tres documentos principales del proceso de incorporación:

- NDA: `COMPLETE`.
- Carta de presentación: `COMPLETE`.
- Carta de aceptación: `COMPLETE`.

El sistema ya soporta los principales flujos documentales definidos para el MVP.

### Próximo paso

Utilizar el estado de los documentos para calcular automáticamente el estado visual de cada colaborador dentro de las generaciones.

---

## 13 de octubre de 2026

### Actividad

Implementación del estado visual automático de las tarjetas de colaboradores.

### Trabajo realizado

- Se agregó el cálculo del estado visual en las tarjetas de generación.
- Se definieron tres estados:
  - `GREEN`: todos los documentos requeridos están completos.
  - `YELLOW`: incorporación en proceso sin correcciones pendientes.
  - `RED`: existe al menos un documento que requiere corrección.
- Se agregó el número de documentos completados.
- Se agregó el número total de documentos.
- Se optimizaron las consultas precargando la documentación de los colaboradores.
- Peter Parker fue identificado automáticamente como `GREEN` con 3 de 3 documentos completos.
- Miles Morales fue identificado inicialmente como `YELLOW`.
- Miles entregó una Carta de presentación de prueba.
- El encargado solicitó una corrección.
- La tarjeta de Miles cambió automáticamente de `YELLOW` a `RED`.

### Resultado

El tablero de generaciones ya puede determinar automáticamente el estado visual de cada colaborador a partir de su avance documental.

Ejemplo comprobado:

- Peter Parker - UPAM: `GREEN`, 3/3 documentos completos.
- Miles Morales - UTP: `RED`, 0/3 documentos completos y una corrección pendiente.

### Próximo paso

Preparar el detalle documental de cada tarjeta y comenzar la construcción del frontend React del tablero de generaciones.

---

## 13 de octubre de 2026

### Actividad

Inicio del frontend React e integración con el backend de PluriOne.

### Trabajo realizado

- Se creó el proyecto frontend utilizando React y Vite.
- Se instaló y configuró el entorno inicial de React.
- Se creó una interfaz visual para el inicio de sesión.
- Se configuró Vite para redirigir las peticiones `/api` hacia Django durante el desarrollo.
- Se conectó el formulario de inicio de sesión con `POST /api/auth/login/`.
- Se comprobó correctamente el inicio de sesión de Peter Parker desde la interfaz.
- Se almacenan los tokens JWT de acceso y renovación en el navegador.
- Se creó el endpoint `GET /api/accounts/me/`.
- El nuevo endpoint permite conocer el correo y rol del usuario autenticado.
- Para colaboradores también devuelve la información principal de su perfil.
- Se implementó detección automática del rol después del inicio de sesión.
- Los colaboradores y encargados reciben interfaces diferentes.
- Se implementó restauración de sesión después de recargar el navegador.
- Se agregó renovación automática del access token mediante el refresh token.
- Se creó el primer dashboard del colaborador.
- Se conectó el dashboard con los documentos reales almacenados en el backend.
- Peter Parker mostró correctamente 100% de progreso y 3/3 documentos completos.
- Se creó el primer dashboard del encargado.
- El panel administrativo consume las generaciones reales mediante la API.
- Se comprobó visualmente la Generación 19.
- Peter Parker - UPAM se mostró automáticamente en estado verde.
- Miles Morales - UTP se mostró automáticamente en estado rojo.
- Se integró la consulta de documentos pendientes del encargado.
- Se agregó navegación básica en la barra lateral.
- Se comenzó a mejorar la experiencia visual mediante animaciones y una nueva transición de inicio de sesión.
- Se aumentó la legibilidad general de la interfaz.

### Resultado

El proyecto ya cuenta con un frontend funcional conectado al backend.

El mismo formulario de acceso identifica automáticamente el tipo de usuario:

- `COLABORADOR`: accede al portal personal y consulta su progreso documental.
- `ENCARGADO`: accede al tablero administrativo de generaciones y pendientes.

Los datos mostrados en React provienen de las APIs de Django y de PostgreSQL y no están escritos manualmente en la interfaz.

### Próximo paso

Agregar un sistema de tres temas visuales, mejorar nuevamente el tamaño de la tipografía e implementar una pantalla de transición animada mientras se valida el inicio de sesión.

---

## 13 de octubre de 2026

### Actividad

Mejora de experiencia visual, temas y transición de autenticación del frontend.

### Trabajo realizado

- Se implementó un selector de tres temas visuales:
  - PluriOne.
  - Claro.
  - Oscuro.
- La selección del tema se almacena mediante `localStorage`.
- El tema seleccionado permanece después de recargar o volver a abrir el sistema.
- Se aumentó el tamaño general de la tipografía del dashboard.
- Se aumentó el tamaño de textos, tarjetas, indicadores, menús y encabezados.
- Se mejoró la transición entre la portada de acceso y el formulario.
- Se agregaron movimientos más suaves y naturales durante la apertura del formulario.
- Se creó una pantalla intermedia de carga durante la autenticación.
- La pantalla muestra una silueta animada y elementos de progreso.
- Se implementaron mensajes visuales de validación, preparación y acceso completado.
- Se estableció una duración mínima de la transición para evitar cambios abruptos entre pantallas.
- Se comprobó que estas mejoras no alteran el funcionamiento de JWT, roles ni paneles.

### Resultado

El frontend cuenta ahora con una experiencia visual más completa y consistente.

El usuario puede elegir entre diferentes temas, la interfaz mantiene su preferencia y el inicio de sesión utiliza transiciones que muestran claramente que el sistema está procesando el acceso.

### Próximo paso

Continuar con las funciones interactivas del MVP desde React, comenzando por la gestión real de documentos del colaborador y posteriormente las acciones de revisión del encargado.
