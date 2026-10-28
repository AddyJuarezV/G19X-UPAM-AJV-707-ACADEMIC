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

---

## 14 de octubre de 2026

### Actividad

Integración de la entrega y corrección de documentos desde el portal React del colaborador.

### Trabajo realizado

- Se conectó el frontend con `POST /api/onboarding/documents/<id>/upload/`.
- Se agregó selección de archivos desde el navegador.
- Se implementó envío mediante `FormData`.
- Se respetan las reglas de carga definidas previamente en Django.
- Los documentos que requieren una plantilla permanecen bloqueados mientras PluriOne no la publique.
- Los documentos en `NEEDS_CORRECTION` permiten seleccionar un archivo corregido.
- Se muestran mensajes de éxito y error directamente en la tarjeta.
- Después de una carga correcta se actualiza nuevamente la información desde la API.
- Se utilizó a Miles Morales para probar una corrección real desde React.
- Su Carta de presentación cambió de `NEEDS_CORRECTION` a `DELIVERED`.
- El motivo de corrección desapareció correctamente.
- El archivo entregado quedó disponible para consulta.

### Resultado

El colaborador ya puede atender una corrección documental directamente desde la interfaz web sin utilizar peticiones manuales desde PowerShell.

La Carta de presentación corregida de Miles Morales ya se encuentra en estado `DELIVERED` y queda pendiente de revisión por parte del encargado.

### Próximo paso

Integrar en React las acciones del encargado para aprobar un documento entregado o solicitar una nueva corrección.

---

## 14 de octubre de 2026

### Actividad

Integración de la revisión documental del encargado desde React.

### Trabajo realizado

- Se conectó la bandeja de pendientes del encargado con las acciones de revisión.
- Se agregó visualización del archivo entregado por el colaborador.
- Se implementó la opción `Aprobar`.
- Se implementó la opción `Solicitar corrección`.
- Se agregó un campo obligatorio para indicar el motivo de la corrección.
- Se conectó la interfaz con `POST /api/onboarding/documents/<id>/review/`.
- Después de una decisión se actualizan nuevamente las generaciones y los pendientes.
- Se utilizó la Carta de presentación de Miles Morales para validar el flujo.
- El documento se encontraba en estado `DELIVERED`.
- El encargado solicitó una nueva corrección desde React.
- El documento pasó correctamente a `NEEDS_CORRECTION`.
- La bandeja de pendientes dejó de mostrar ese documento.
- La tarjeta de Miles cambió automáticamente a estado visual `RED`.
- Miles pudo consultar desde su portal el nuevo motivo de corrección.

### Resultado

El encargado ya puede revisar documentos entregados y solicitar correcciones directamente desde el frontend, sin utilizar Django Admin ni peticiones manuales desde PowerShell.

### Próximo paso

Implementar desde React el flujo de aprobación de documentos que requieren firma posterior por parte de la empresa.

---

## 14 de octubre de 2026

### Actividad

Integración de la firma empresarial de documentos desde React.

### Trabajo realizado

- Se amplió la consulta de documentos pendientes del encargado para incluir estados `DELIVERED` y `PENDING_SIGNATURE`.
- Se actualizó el panel del encargado para mostrar documentos pendientes de gestión.
- Los documentos `DELIVERED` mantienen las acciones de aprobación y solicitud de corrección.
- Los documentos `PENDING_SIGNATURE` muestran una acción específica para cargar la versión firmada por la empresa.
- Se implementó selección de archivos desde React.
- Se utilizó `FormData` para enviar el archivo firmado.
- Se conectó la interfaz con `POST /api/onboarding/documents/<id>/company-sign/`.
- Se mantiene la regla que impide utilizar este flujo para el NDA.
- Después de una firma correcta, la información del frontend vuelve a consultarse automáticamente.
- Se utilizó la Carta de presentación de Miles Morales para comprobar el flujo.
- El documento se encontraba previamente en `PENDING_SIGNATURE`.
- El encargado cargó correctamente un documento firmado desde React.
- El documento pasó a `DOWNLOADABLE`.
- La Carta de presentación dejó de aparecer en la bandeja de gestión del encargado.
- Miles Morales pudo consultar el documento final desde su portal.

### Resultado

El flujo de firma empresarial ya puede realizarse desde la interfaz React. El encargado no necesita utilizar Django Admin ni peticiones manuales para devolver al colaborador una Carta de presentación o Carta de aceptación firmada.

La Carta de presentación de Miles Morales se encuentra actualmente en estado `DOWNLOADABLE`.

### Próximo paso

Implementar desde React la confirmación de recepción por parte del colaborador para cambiar un documento de `DOWNLOADABLE` a `COMPLETE`.

---

## 14 de octubre de 2026

### Actividad

Integración de la confirmación de recepción de documentos desde React.

### Trabajo realizado

- Se agregó al portal del colaborador la confirmación de recepción de documentos firmados.
- La acción se muestra únicamente cuando un documento se encuentra en estado `DOWNLOADABLE`.
- Se verificó que exista un archivo firmado por la empresa antes de permitir la confirmación.
- Se conectó React con `POST /api/onboarding/documents/<id>/confirm-receipt/`.
- Después de confirmar la recepción, el frontend vuelve a consultar automáticamente la información del colaborador.
- Se utilizó la Carta de presentación de Miles Morales para comprobar el flujo.
- El documento se encontraba en estado `DOWNLOADABLE`.
- Miles confirmó correctamente su recepción desde React.
- La Carta de presentación pasó automáticamente a `COMPLETE`.
- El progreso documental de Miles cambió de 0/3 a 1/3.
- El porcentaje de progreso se actualizó automáticamente de 0% a 33%.
- El documento final firmado continúa disponible para consulta.

### Resultado

El flujo de la Carta de presentación ya puede completarse completamente desde las interfaces React del colaborador y del encargado.

El proceso comprobado fue:

`NEEDS_CORRECTION → DELIVERED → PENDING_SIGNATURE → DOWNLOADABLE → COMPLETE`

Miles Morales cuenta actualmente con 1 de 3 documentos completados.

### Próximo paso

Integrar desde React la publicación de plantillas del NDA y de la Carta de aceptación por parte del encargado.

---

## 15 de octubre de 2026

### Actividad

Integración de la publicación de plantillas desde el panel React del encargado.

### Trabajo realizado

- Se amplió la bandeja de gestión del encargado para incluir documentos en estado `PENDING` que requieren una plantilla y todavía no cuentan con ella.
- Se limitaron estos documentos al NDA y a la Carta de aceptación.
- Se agregó en React un panel específico para publicar plantillas.
- El encargado puede seleccionar una plantilla desde el navegador.
- La plantilla se envía mediante `FormData`.
- Se conectó la interfaz con `POST /api/onboarding/documents/<id>/company-template/`.
- Después de una publicación correcta, el frontend vuelve a consultar los datos desde la API.
- El documento permanece en estado `PENDING`.
- Una vez publicada la plantilla, el documento deja de aparecer entre los pendientes del encargado porque la siguiente acción corresponde al colaborador.
- Se utilizó el NDA de Miles Morales para comprobar el flujo.
- Se publicó correctamente una plantilla ficticia desde React.
- Miles Morales pudo visualizar desde su portal la opción `Descargar plantilla`.
- El portal habilitó también la selección y entrega del NDA.

### Resultado

El encargado ya puede publicar desde React las plantillas requeridas por el proceso documental.

El NDA de Miles Morales cuenta actualmente con una plantilla publicada y queda listo para que el colaborador la descargue, complete y entregue.

### Próximo paso

Completar desde React el flujo del NDA de Miles Morales: descarga de plantilla, entrega del documento, revisión por el encargado y aprobación hasta `COMPLETE`.

---

## 15 de octubre de 2026

### Actividad

Validación completa del flujo del NDA desde las interfaces React.

### Trabajo realizado

- Se utilizó la plantilla del NDA previamente publicada por el encargado.
- Miles Morales pudo descargar la plantilla desde su portal.
- Se preparó un documento ficticio como NDA completado.
- Miles entregó el NDA desde React.
- El documento cambió de `PENDING` a `DELIVERED`.
- El NDA apareció automáticamente en la bandeja de gestión del encargado.
- El encargado pudo consultar el archivo entregado.
- El encargado aprobó el NDA desde React.
- Se comprobó la regla específica del NDA: no requiere una segunda firma por parte de la empresa.
- Después de la aprobación, el NDA pasó directamente de `DELIVERED` a `COMPLETE`.
- El portal de Miles se actualizó automáticamente.
- El progreso documental cambió de 1/3 a 2/3 documentos completos.
- El porcentaje de avance cambió de 33% a 67%.
- La Carta de presentación y el NDA quedaron en estado `COMPLETE`.
- La Carta de aceptación permanece en estado `PENDING`.

### Resultado

El flujo completo del NDA funciona correctamente utilizando únicamente las interfaces React del colaborador y del encargado.

El flujo comprobado fue:

`PENDING → DELIVERED → COMPLETE`

Miles Morales cuenta actualmente con 2 de 3 documentos completados y 67% de progreso documental.

### Próximo paso

Completar desde React el flujo de la Carta de aceptación hasta alcanzar los tres documentos en estado `COMPLETE` y 100% de progreso documental.

---

## 15 de octubre de 2026

### Actividad

Validación completa del flujo de la Carta de aceptación y cierre del circuito documental del MVP.

### Trabajo realizado

- Se utilizó la funcionalidad de publicación de plantillas ya integrada en React.
- El encargado publicó la plantilla de la Carta de aceptación de Miles Morales.
- Miles pudo descargar la plantilla desde su portal.
- El colaborador completó y entregó la Carta de aceptación desde React.
- El documento cambió de `PENDING` a `DELIVERED`.
- El documento apareció automáticamente en la bandeja de gestión del encargado.
- El encargado revisó y aprobó la Carta de aceptación.
- El documento cambió de `DELIVERED` a `PENDING_SIGNATURE`.
- El encargado cargó desde React la versión firmada por PluriOne.
- La Carta de aceptación pasó a `DOWNLOADABLE`.
- Miles pudo consultar el documento final firmado.
- Miles confirmó correctamente la recepción desde React.
- La Carta de aceptación pasó finalmente a `COMPLETE`.
- El progreso documental de Miles se actualizó de 2/3 a 3/3 documentos completos.
- El porcentaje de progreso cambió de 67% a 100%.
- Se verificó que los tres documentos principales de Miles se encuentran en estado `COMPLETE`.

### Resultado

El flujo documental principal del MVP puede realizarse completamente desde las interfaces React del colaborador y del encargado.

Los tres flujos comprobados son:

- NDA: `PENDING → DELIVERED → COMPLETE`
- Carta de presentación: `DELIVERED → PENDING_SIGNATURE → DOWNLOADABLE → COMPLETE`
- Carta de aceptación: `PENDING → DELIVERED → PENDING_SIGNATURE → DOWNLOADABLE → COMPLETE`

Miles Morales cuenta actualmente con 3 de 3 documentos completados y 100% de progreso documental.

### Próximo paso

Implementar desde React el registro de nuevos colaboradores y conectar el formulario visual con la API de registro existente.

---

## 15 de octubre de 2026

### Actividad

Integración y validación del registro de nuevos colaboradores desde React.

### Trabajo realizado

- Se creó el componente `Register.jsx`.
- Se creó `Register.css` para mantener separado el diseño del formulario.
- Se conectó el botón `Crear una cuenta` del login con el formulario de registro.
- Se agregaron datos personales y académicos requeridos por el MVP.
- Se integró la carga de CV y credencial universitaria.
- El formulario envía la información mediante `FormData`.
- Se conectó React con `POST /api/accounts/register/`.
- Se agregaron mensajes de validación provenientes del backend.
- Se agregó una pantalla de registro completado.
- Se mejoró el diseño de los controles de selección de archivos.
- Se corrigió el autocompletado de credenciales dentro del formulario de registro.
- Se utilizó a Gwen Stacy como colaboradora ficticia.
- La cuenta y el perfil se crearon correctamente.
- Gwen pudo iniciar sesión utilizando la cuenta creada desde React.
- Su solicitud se encuentra correctamente en estado `DRAFT`.
- Su portal muestra actualmente 0 documentos y 0% de progreso, debido a que todavía no ha enviado la solicitud a revisión.

### Resultado

Un colaborador nuevo ya puede registrarse e iniciar sesión utilizando únicamente la interfaz React.

El flujo comprobado fue:

`Crear cuenta → crear usuario y perfil → DRAFT → iniciar sesión`

### Próximo paso

Permitir que Gwen Stacy envíe su solicitud desde React para cambiar de `DRAFT` a `IN_REVIEW`.

---

## 15 de octubre de 2026

### Actividad

Integración del envío de solicitudes iniciales desde React.

### Trabajo realizado

- Se agregó al portal del colaborador una acción específica para enviar la solicitud de incorporación.
- La acción solamente se muestra cuando la solicitud se encuentra en estado `DRAFT`.
- Se conectó React con `POST /api/accounts/application/submit/`.
- Después del envío correcto, el frontend vuelve a consultar la información del usuario.
- El estado de la solicitud cambia automáticamente de `DRAFT` a `IN_REVIEW`.
- El botón de envío desaparece después de completar la acción.
- Se agregó un mensaje visual indicando que PluriOne está revisando la solicitud.
- Se utilizó a Gwen Stacy para comprobar el flujo.
- Gwen envió correctamente su solicitud desde React.
- Su perfil pasó de `DRAFT` a `IN_REVIEW`.

### Resultado

El colaborador ya puede iniciar formalmente su proceso de incorporación desde React después de crear su cuenta.

El flujo comprobado fue:

`Crear cuenta → DRAFT → Enviar solicitud → IN_REVIEW`

### Próximo paso

Integrar en el panel del encargado la revisión de solicitudes en estado `IN_REVIEW`, permitiendo aprobarlas o solicitar correcciones.

---

## 19 de octubre de 2026

### Actividad

Integración y validación de la revisión inicial de solicitudes desde React.

### Trabajo realizado

- Se agregó al estado principal de React la colección de solicitudes pendientes.
- El panel del encargado se conectó con `GET /api/accounts/applications/pending/`.
- Se creó una sección específica para solicitudes en estado `IN_REVIEW`.
- Se muestran los datos principales del colaborador para facilitar la revisión.
- Se agregó la acción para aprobar una solicitud.
- Se agregó la interfaz para solicitar una corrección indicando el motivo.
- Se conectó la revisión con `POST /api/accounts/applications/<id>/review/`.
- Se corrigieron variables que habían quedado sin uso y se verificó nuevamente ESLint.
- Se utilizó a Gwen Stacy para validar el flujo de aprobación.
- Gwen apareció correctamente en la bandeja del encargado.
- El encargado aprobó su solicitud desde React.
- Su estado cambió de `IN_REVIEW` a `APPROVED`.
- La solicitud desapareció automáticamente de la bandeja de pendientes.
- Se inició nuevamente sesión como Gwen y se confirmó visualmente el estado `APPROVED`.
- Gwen permanece con 0 documentos y 0% de progreso porque todavía no ha sido asignada a una generación.

### Resultado

La aprobación inicial de un nuevo colaborador ya puede realizarse completamente desde las interfaces React del sistema.

El flujo validado es:

`Crear cuenta → DRAFT → Enviar solicitud → IN_REVIEW → Aprobación del encargado → APPROVED`

La interfaz para solicitar correcciones también quedó incorporada, aunque su circuito completo se validará posteriormente junto con la edición de datos del colaborador.

### Próximo paso

Integrar desde React la asignación de colaboradores aprobados a generaciones abiertas y verificar el momento adecuado para crear sus documentos iniciales de onboarding.

---

## 19 de octubre de 2026

### Actividad

Inicialización automática de documentos al asignar colaboradores a generaciones.

### Trabajo realizado

- Se revisó el flujo existente de asignación a generaciones.
- Se detectó que la membresía de generación se creaba correctamente, pero los documentos iniciales del onboarding no se generaban automáticamente.
- Se modificó `AddGenerationMemberView`.
- La operación ahora utiliza una transacción atómica.
- Después de crear la membresía se inicializan los documentos requeridos del colaborador.
- Los documentos creados son NDA, Carta de presentación y Carta de aceptación.
- Los tres documentos comienzan en estado `PENDING`.
- Se utilizó `get_or_create()` para evitar documentos duplicados.
- `python manage.py check` finalizó sin errores.
- Se realizó una prueba transaccional utilizando a Gwen Stacy y la Generación 19.
- Durante la prueba la API respondió con HTTP 201.
- Gwen fue asignada temporalmente a la Generación 19.
- Se comprobaron los tres documentos en estado `PENDING`.
- Se realizó rollback de la transacción de prueba.
- Después del rollback Gwen permaneció en estado `APPROVED`, sin generación y con 0 documentos.

### Resultado

La asignación a una generación ya funciona como punto de inicio formal del onboarding documental.

El flujo del backend queda:

`APPROVED → asignación a generación → membresía + 3 documentos PENDING`

La prueba no modificó permanentemente los datos de Gwen, por lo que podrá utilizarse para validar el siguiente flujo desde React.

### Próximo paso

Implementar desde el panel del encargado la asignación visual de colaboradores aprobados a generaciones abiertas.

---

## 20 de octubre de 2026

### Actividad

Integración y validación de la asignación de colaboradores aprobados a generaciones desde React.

### Trabajo realizado

- Se conectó React con `GET /api/onboarding/collaborators/available/`.
- Se agregó una sección de colaboradores disponibles en el panel del encargado.
- Se muestran únicamente colaboradores aprobados que todavía no pertenecen a una generación.
- Se agregó un selector de generaciones abiertas.
- Se agregó la acción para asignar colaboradores desde la interfaz.
- La asignación utiliza `POST /api/onboarding/generations/<id>/members/`.
- Se utilizó a Gwen Stacy para la validación funcional.
- Gwen apareció correctamente como colaboradora disponible en estado `APPROVED`.
- El encargado seleccionó la Generación 19 y realizó la asignación desde React.
- Gwen desapareció automáticamente de la lista de colaboradores disponibles.
- La Generación 19 pasó de 2 a 3 integrantes.
- Gwen apareció en la generación con estado visual `EN PROCESO`.
- La tarjeta de Gwen mostró 0 de 3 documentos completados.
- Se inició sesión nuevamente como Gwen.
- Su portal mostró correctamente 0% de progreso y 0 de 3 documentos completados.
- Se comprobaron los documentos NDA, Carta de presentación y Carta de aceptación en estado `PENDING`.
- NDA y Carta de aceptación quedaron esperando la publicación de su plantilla por parte de PluriOne.
- Carta de presentación quedó habilitada para carga directa por parte de la colaboradora.
- El panel del encargado mostró 2 pendientes de gestión correspondientes a las plantillas iniciales requeridas.

### Resultado

La asignación de un colaborador aprobado a una generación ya puede realizarse completamente desde React.

El flujo validado es:

`APPROVED → disponible → asignación a Generación 19 → creación automática de documentos → 0/3`

La asignación a una generación funciona como inicio formal del circuito documental del onboarding.

### Próximo paso

Completar y validar el circuito de corrección de solicitudes iniciales, incluyendo edición de datos y reenvío desde el portal del colaborador.

---

## 20 de octubre de 2026

### Actividad

Integración y validación completa del circuito de corrección de solicitudes iniciales.

### Trabajo realizado

- Se utilizó a Miguel O'Hara como colaborador ficticio para validar el flujo de corrección.
- Miguel se registró desde React y envió su solicitud inicial.
- La solicitud pasó de `DRAFT` a `IN_REVIEW`.
- El encargado utilizó desde React la opción para solicitar una corrección.
- Se indicó como motivo corregir las horas a cumplir de 480 a 500.
- La solicitud cambió de `IN_REVIEW` a `NEEDS_CORRECTION`.
- El portal de Miguel mostró correctamente el nuevo estado.
- Se creó el componente independiente `ProfileCorrection.jsx`.
- Se creó su hoja de estilos `ProfileCorrection.css`.
- El componente consulta los datos completos mediante `GET /api/accounts/profile/`.
- El motivo de corrección solicitado por el encargado se muestra al colaborador.
- El colaborador puede modificar los campos permitidos de su perfil.
- Miguel modificó sus horas a cumplir de 480 a 500.
- Los cambios se guardaron mediante `PATCH /api/accounts/profile/`.
- Después del guardado se habilitó el reenvío de la solicitud.
- El reenvío utilizó `POST /api/accounts/application/submit/`.
- La solicitud regresó de `NEEDS_CORRECTION` a `IN_REVIEW`.
- El panel del encargado mostró correctamente el nuevo valor de 500 horas.
- El encargado realizó una segunda revisión.
- Miguel fue aprobado correctamente.
- Al iniciar nuevamente sesión como Miguel se confirmó el estado `APPROVED`.
- Miguel permanece sin generación y con 0 documentos, de acuerdo con el flujo esperado.

### Resultado

El circuito de corrección inicial ya puede realizarse completamente utilizando las interfaces React del colaborador y del encargado.

El flujo validado fue:

`DRAFT → IN_REVIEW → NEEDS_CORRECTION → edición de perfil → IN_REVIEW → APPROVED`

### Próximo paso

Integrar desde React la creación y el cierre administrativo de generaciones.

---

## 20 de octubre de 2026

### Actividad

Integración y validación de la creación de generaciones desde React.

### Trabajo realizado

- Se agregó al panel del encargado la opción `+ Nueva generación`.
- Se creó un formulario administrativo para indicar el número de generación.
- Se conectó React con `POST /api/onboarding/generations/create/`.
- Se agregaron validaciones para números inválidos.
- Se muestran los errores enviados por el backend, incluyendo generaciones duplicadas.
- Después de una creación exitosa, el panel vuelve a consultar automáticamente las generaciones.
- Se utilizó la Generación 21 para validar el funcionamiento.
- La Generación 21 fue creada correctamente desde React.
- G21 apareció automáticamente en las pestañas del tablero.
- La generación fue creada en estado `OPEN`.
- G21 inició con 0 colaboradores asignados.
- Se comprobó que la nueva generación puede seleccionarse desde el panel del encargado.
- La Generación 21 se conservará abierta para validar posteriormente su cierre administrativo.

### Resultado

El encargado ya puede crear nuevas generaciones sin utilizar Django Admin ni peticiones manuales.

El flujo validado fue:

`Panel encargado → Nueva generación → POST de creación → Generación 21 OPEN`

### Próximo paso

Integrar y validar desde React el cierre de la Generación 21.

---

## 21 de octubre de 2026

### Actividad

Integración y validación del cierre administrativo de generaciones desde React.

### Trabajo realizado

- Se agregó al panel del encargado la acción para cerrar generaciones abiertas.
- La acción solamente está disponible cuando la generación se encuentra en estado `OPEN`.
- Antes de ejecutar el cierre se solicita confirmación al encargado.
- Se conectó React con `POST /api/onboarding/generations/<id>/close/`.
- Se utilizó la Generación 21 para validar el funcionamiento.
- G21 cambió correctamente de `OPEN` a `CLOSED`.
- Después del cierre, el indicador visual de G21 cambió al estado correspondiente.
- El botón para cerrar la generación dejó de mostrarse.
- Se comprobó que las generaciones cerradas ya no aparecen en los selectores de asignación.
- Miguel O'Hara permaneció aprobado y disponible para asignación.
- Para Miguel únicamente apareció la Generación 19, debido a que G20 y G21 se encuentran cerradas.
- Se realizó además una prueba directa contra el endpoint de asignación intentando agregar a Miguel a G21.
- El backend respondió con HTTP 400.
- El mensaje recibido fue: `No se pueden agregar colaboradores a una generación cerrada.`
- Después del intento, Miguel continuó sin asignación.

### Resultado

El cierre de generaciones queda protegido tanto desde la interfaz como desde el backend.

El flujo validado fue:

`OPEN → cierre desde React → CLOSED → exclusión del selector de asignación`

También se comprobó:

`intento directo de asignación a CLOSED → HTTP 400 → operación rechazada`

### Próximo paso

Continuar con Mis datos, Notificaciones, ajustes visuales y preparación de las pruebas finales del MVP.

---

## 21 de octubre de 2026

### Actividad

Integración y validación del apartado Mis datos del colaborador.

### Trabajo realizado

- Se creó el componente independiente `MyProfile.jsx`.
- Se creó la hoja de estilos `MyProfile.css`.
- La sección consulta el perfil completo mediante `GET /api/accounts/profile/`.
- Se muestran los principales datos personales y académicos registrados.
- Se muestra el estado actual de la solicitud.
- Se agregó acceso al CV registrado.
- Se agregó acceso a la credencial universitaria registrada.
- Se utilizó a Miguel O'Hara para validar el funcionamiento.
- La interfaz mostró correctamente las 500 horas actualizadas durante la corrección anterior.
- Se comprobó que el enlace `Ver CV` abre correctamente el archivo asociado al colaborador.
- Se comprobó que `Ver credencial` abre correctamente el archivo asociado.
- Debido a que los archivos utilizados durante las pruebas son ficticios y de texto, el navegador mostró su contenido en una pestaña nueva.
- Se hizo funcional el botón `Mis datos` del menú lateral mediante desplazamiento a la sección correspondiente.
- Se hizo funcional el botón `Documentación` para desplazarse a `Mis documentos`.
- `npm run lint` finalizó sin errores después de corregir una etiqueta JSX duplicada.

### Resultado

El colaborador ya puede consultar desde React su información completa de incorporación y los archivos principales que entregó durante su registro.

El apartado lateral deja de ser únicamente visual y permite navegación real hacia:

`Mis datos → información del perfil`

`Documentación → documentos del onboarding`

### Próximo paso

Implementar el apartado de Notificaciones del MVP y posteriormente comenzar el pulido y las pruebas finales.

---

## 21 de octubre de 2026

### Actividad

Integración y validación del apartado de Notificaciones del MVP.

### Trabajo realizado

- Se creó el componente independiente `NotificationsPanel.jsx`.
- Se creó la hoja de estilos `NotificationsPanel.css`.
- Los avisos se generan dinámicamente a partir del estado actual del colaborador.
- Se contemplaron estados de solicitud como `DRAFT`, `IN_REVIEW`, `NEEDS_CORRECTION` y `APPROVED`.
- Se contemplaron diferentes estados del flujo documental.
- Se diferencian avisos informativos de acciones que requieren atención del colaborador.
- Se hizo funcional el botón `Notificaciones` del menú lateral.
- Se utilizó a Gwen Stacy para validar un escenario con documentos pendientes.
- Gwen visualizó avisos para NDA, Carta de aceptación y Carta de presentación.
- NDA y Carta de aceptación indicaron correctamente que dependen de la publicación de plantillas por parte de PluriOne.
- Carta de presentación apareció como una acción pendiente del colaborador.
- El sistema indicó correctamente una acción que requiere atención.
- Se utilizó a Miguel O'Hara para validar un escenario sin documentos y con solicitud aprobada.
- Miguel visualizó correctamente el aviso de que está esperando asignación a una generación.
- El sistema indicó `Sin acciones urgentes` debido a que Miguel no tiene ninguna acción pendiente en ese momento.

### Resultado

El colaborador dispone ahora de un centro de avisos que resume su situación actual y señala claramente cuándo una acción depende de él o de PluriOne.

Las notificaciones del MVP se derivan del estado real del proceso, evitando introducir infraestructura adicional innecesaria para esta primera versión.

### Próximo paso

Realizar el pulido visual final y comenzar las pruebas técnicas completas del MVP.

---

## 21 de octubre de 2026

### Actividad

Implementación y validación del seguimiento automático de documentos detenidos.

### Trabajo realizado

- Se analizó la retroalimentación académica recibida en el Corte 2.
- Se identificó como prioridad demostrar una función que actuara automáticamente sobre pendientes del proceso.
- Se agregó el campo `last_reminder_at` al modelo `OnboardingDocument`.
- Se creó y aplicó la migración `0003_onboardingdocument_last_reminder_at`.
- Se corrigió la configuración de correo de Django utilizando `EMAIL_BACKEND`.
- Para el MVP se utiliza `django.core.mail.backends.console.EmailBackend`.
- Se creó la estructura `onboarding/management/commands/`.
- Se implementó el comando `python manage.py revisar_pendientes`.
- El comando identifica documentos que no han tenido movimiento durante un periodo configurable.
- El valor predeterminado es de 2 días.
- Se implementó la opción `--days` para modificar el umbral.
- Se implementó `--repeat-hours` para controlar cada cuánto puede repetirse un recordatorio.
- El valor predeterminado es de 24 horas.
- Se agregó `--dry-run` para ejecutar simulaciones sin enviar correos ni actualizar la base.
- El sistema determina automáticamente al responsable de la siguiente acción según el estado del documento.
- Se utilizó a Gwen Stacy para realizar la validación.
- En modo simulación se detectaron correctamente tres documentos pendientes.
- NDA y Carta de aceptación fueron identificados como responsabilidad de PluriOne debido a que requieren una plantilla.
- Carta de presentación fue identificada como responsabilidad de la colaboradora.
- En la primera ejecución real se detectaron 3 pendientes y se generaron 3 recordatorios por correo de consola.
- Después de cada envío se almacenó la fecha en `last_reminder_at`.
- Se ejecutó inmediatamente el comando una segunda vez.
- En la segunda ejecución se detectaron 0 documentos elegibles para recordatorio debido al intervalo de 24 horas.
- `python manage.py check` terminó sin errores.

### Resultado

El sistema ya cuenta con una función de seguimiento automático que actúa sobre documentos detenidos.

El flujo validado es:

`documento detenido → detección automática → identificación del responsable → recordatorio → registro de envío → control de repetición`

Esto responde directamente a la retroalimentación académica que solicitaba una función automática relacionada con alertas o recordatorios.

### Próximo paso

Agregar pruebas automáticas del backend para validar transiciones de estado, permisos y reglas críticas del proceso de incorporación.

---

## 21 de octubre de 2026

### Actividad

Implementación de pruebas automáticas del módulo onboarding.

### Trabajo realizado

- Se comenzó a atender la observación académica relacionada con los archivos `tests.py` vacíos.
- Se reemplazó el contenido inicial de `backend/onboarding/tests.py`.
- Se creó una configuración base de usuarios y colaboradores ficticios para las pruebas.
- Se agregó una prueba para verificar que un NDA en estado `DELIVERED` pase a `COMPLETE` después de ser aprobado.
- Se agregó una prueba para verificar que una Carta de presentación aprobada pase a `PENDING_SIGNATURE`.
- Se agregó una prueba de seguridad para impedir que un colaborador modifique documentos de otro usuario.
- Se agregó una prueba que confirma que una generación cerrada rechaza nuevas asignaciones.
- Se agregó una prueba para el comando automático `revisar_pendientes`.
- La prueba del seguimiento automático simula un documento detenido durante 3 días.
- Se verifica que el sistema genere un recordatorio.
- Se verifica que `last_reminder_at` sea registrado.
- Se verifica que una segunda ejecución inmediata no genere otro recordatorio.
- Para las pruebas de correo se utilizó `locmem.EmailBackend`.
- Django creó y eliminó correctamente una base de datos temporal de pruebas.
- Se ejecutó `python manage.py test onboarding`.
- Se encontraron y ejecutaron 5 pruebas.
- Las 5 pruebas terminaron correctamente con resultado `OK`.

### Resultado

Las principales reglas del módulo de onboarding cuentan ahora con pruebas automáticas reproducibles.

El comando ejecutado fue:

`python manage.py test onboarding`

Resultado:

`Ran 5 tests - OK`

### Próximo paso

Agregar pruebas automáticas del módulo accounts para validar envío, revisión, corrección y aprobación de solicitudes.

---

## 21 de octubre de 2026

### Actividad

Implementación de pruebas automáticas del módulo accounts y validación conjunta del backend.

### Trabajo realizado

- Se reemplazó el contenido inicial de `backend/accounts/tests.py`.
- Se agregaron usuarios y perfiles ficticios específicos para pruebas.
- Se creó una prueba para validar el envío de una solicitud desde `DRAFT` hacia `IN_REVIEW`.
- Se comprobó que una solicitud `APPROVED` no pueda enviarse nuevamente.
- Se comprobó que un usuario con rol colaborador no pueda revisar solicitudes.
- Se validó que una solicitud de corrección requiera un motivo.
- Se creó una prueba del flujo completo de corrección y aprobación.
- El flujo probado fue `DRAFT → IN_REVIEW → NEEDS_CORRECTION → IN_REVIEW → APPROVED`.
- Durante la corrección se cambió `required_hours` de 480 a 500.
- Se comprobó que el nuevo valor permanezca después de la aprobación.
- Se ejecutó `python manage.py test accounts`.
- Las 5 pruebas de accounts finalizaron correctamente.
- Se ejecutó después `python manage.py test accounts onboarding`.
- Django encontró 10 pruebas en total.
- Las 10 pruebas terminaron correctamente con resultado `OK`.
- Todas las pruebas se ejecutaron utilizando una base de datos temporal creada y eliminada automáticamente por Django.

### Resultado

Los módulos principales `accounts` y `onboarding` cuentan ahora con pruebas automáticas para reglas críticas del proceso.

El resultado conjunto fue:

`Found 10 test(s)`

`Ran 10 tests`

`OK`

Esto atiende directamente la observación académica que indicaba que ambos archivos `tests.py` se encontraban vacíos.

### Próximo paso

Mover `SECRET_KEY` y `DEBUG` a variables de entorno y comprobar nuevamente el backend y las pruebas automáticas.

---

## 22 de octubre de 2026

### Actividad

Externalización de configuración sensible del backend.

### Trabajo realizado

- Se atendió la observación académica relacionada con `SECRET_KEY` y `DEBUG`.
- Se eliminó la clave secreta escrita directamente en `backend/config/settings.py`.
- `SECRET_KEY` ahora se obtiene desde el archivo `.env`.
- Se agregó una validación para impedir que Django arranque sin una clave configurada.
- `DEBUG` ahora se obtiene desde una variable de entorno.
- Se actualizó `.env.example` para documentar ambas variables.
- La clave secreta real permanece únicamente en `.env`.
- Se confirmó que `.env` continúa fuera del control de versiones.
- Durante la primera prueba se detectó que `DB_PASSWORD` no estaba configurado en el `.env` local.
- PostgreSQL rechazó la conexión con el mensaje `fe_sendauth: no password supplied`.
- Se corrigió únicamente la configuración local sin publicar la contraseña.
- Después de corregirla se ejecutó nuevamente `python manage.py test accounts onboarding`.
- Django encontró 10 pruebas.
- Las 10 pruebas finalizaron correctamente con resultado `OK`.

### Resultado

La configuración sensible ya no permanece escrita directamente en el código fuente.

El backend continúa funcionando correctamente después del cambio y mantiene las 10 pruebas automáticas aprobadas.

### Próximo paso

Actualizar la documentación técnica y de reproducibilidad del repositorio.

---

## 22 de octubre de 2026

### Actividad

Integración de los recordatorios automáticos con la interfaz web de PluriOne Onboarding.

### Trabajo realizado

- Se amplió el seguimiento automático para que los recordatorios no existan únicamente como salida de consola o correo.
- Se creó el modelo `AutomaticNotification`.
- El modelo almacena el destinatario, documento relacionado, título, mensaje, responsable de la acción, estado del documento, días sin movimiento y fecha de generación.
- Se creó y aplicó la migración `0004_automaticnotification`.
- Se modificó el comando `revisar_pendientes` para identificar usuarios destinatarios además de direcciones de correo.
- Cuando el siguiente responsable es el colaborador, el recordatorio queda asociado a su cuenta.
- Cuando el siguiente responsable es PluriOne, el recordatorio queda asociado a los encargados activos.
- El comando continúa enviando correo mediante el backend configurado y ahora también registra el recordatorio en PostgreSQL.
- El modo `--dry-run` continúa sin crear recordatorios ni modificar la base de datos.
- Se conservó `last_reminder_at` para evitar la repetición de avisos antes del intervalo configurado.
- Se agregó el serializer de notificaciones automáticas.
- Se creó el endpoint `GET /api/onboarding/notifications/mine/`.
- El endpoint filtra los resultados utilizando el usuario autenticado para impedir que una persona consulte avisos dirigidos a otra.
- Se agregó una prueba automatizada para validar la consulta de notificaciones.
- Las pruebas del módulo `onboarding` aumentaron de 5 a 6 y finalizaron correctamente.
- Las pruebas combinadas de `accounts` y `onboarding` aumentaron de 10 a 11 y finalizaron correctamente.
- Se modificó `NotificationsPanel.jsx` para consultar los recordatorios automáticos desde Django.
- Los recordatorios automáticos se combinan con los avisos calculados a partir del estado actual del proceso.
- Se agregó un estilo visual específico para distinguir un recordatorio automático.
- React oculta como vigente un recordatorio histórico cuando el documento ya cambió del estado en el que fue generado.
- `npm run lint` finalizó correctamente.
- `npm run build` generó correctamente la versión de producción del frontend.
- Se realizó una prueba funcional con la colaboradora ficticia Gwen Stacy.
- El sistema mostró dentro de la sección Notificaciones un recordatorio automático correspondiente a su Carta de presentación.
- Los avisos de NDA y Carta de aceptación no fueron mostrados a Gwen porque la siguiente acción corresponde a PluriOne.

### Resultado

El seguimiento automático ya se encuentra conectado de extremo a extremo:

`Documento detenido → Django detecta el retraso → determina responsable → genera recordatorio → guarda en PostgreSQL → API filtra por destinatario → React muestra el aviso`.

Con esto, los recordatorios generados por el backend ya son visibles desde la aplicación web y no únicamente desde la terminal.

### Próximo paso

Programar la ejecución periódica del comando `revisar_pendientes` para que el proceso de detección se ejecute sin intervención manual y posteriormente continuar con la limpieza de documentación y reproducibilidad del proyecto.

---

## 22 de octubre de 2026

### Actividad

Automatización periódica del seguimiento de pendientes.

### Trabajo realizado

- Se creó `scripts/revisar_pendientes.ps1`.
- El script ejecuta el seguimiento utilizando directamente el Python del entorno virtual del proyecto.
- El script localiza automáticamente `backend/manage.py`.
- Se configuró el seguimiento normal con un umbral de 2 días y una repetición mínima de 24 horas.
- Se agregó un log local de ejecuciones.
- El log se guarda en `%LOCALAPPDATA%\PluriOne\logs\revisar_pendientes.log`.
- Se comprobó primero la ejecución manual del script.
- Posteriormente se creó una tarea en el Programador de tareas de Windows.
- La tarea fue registrada como `PluriOne Seguimiento Automatico`.
- Se configuró una ejecución cada hora.
- Se detectó inicialmente que Windows podía dejar la tarea en cola debido a las restricciones de energía.
- Se actualizó la configuración con `AllowStartIfOnBatteries`, `DontStopIfGoingOnBatteries` y `StartWhenAvailable`.
- Después del ajuste la tarea quedó en estado `Ready`.
- Se solicitó una ejecución directamente al Programador de tareas de Windows.
- La ejecución registrada ocurrió el 22 de octubre de 2026 a las 10:36 a. m.
- `LastTaskResult` devolvió `0`.
- `NumberOfMissedRuns` devolvió `0`.
- La siguiente ejecución fue programada automáticamente para las 11:27 a. m.
- El archivo de log confirmó que Django ejecutó correctamente `revisar_pendientes`.
- La ejecución terminó con código `0`.
- La prueba se realizó sin ejecutar manualmente `python manage.py revisar_pendientes`.

### Resultado

El seguimiento automático ya cuenta con ejecución periódica real dentro del entorno Windows de desarrollo.

El sistema puede revisar periódicamente los documentos detenidos, determinar al responsable, generar recordatorios persistentes y mostrarlos posteriormente en la interfaz web.

El flujo comprobado es:

`Programador de tareas → PowerShell → Django → revisar_pendientes → PostgreSQL → API → Notificaciones de React`.

Con esto queda atendida la observación académica de documentar y demostrar cómo el comando de seguimiento puede ejecutarse sin intervención manual.

### Próximo paso

Actualizar la documentación principal del repositorio, renombrar el PRD y completar las instrucciones de instalación y reproducibilidad.

---

## 22 de octubre de 2026

### Actividad

Actualización y corrección de la documentación técnica del repositorio.

### Motivo

Durante la revisión académica se detectó que el README conservaba información histórica correcta, pero también contenía secciones desactualizadas que podían generar contradicciones respecto al estado real del proyecto.

Se decidió conservar el historial detallado de desarrollo y modificar únicamente la información que ya no representaba el estado actual del sistema.

### Trabajo realizado

- Se conservó el historial detallado de funcionalidades y pruebas del `README.md`.
- Se eliminaron las dos descripciones contradictorias de `Fase actual`.
- Se definió una única fase actual correspondiente al cierre funcional del MVP, pruebas, documentación y preparación de entrega.
- Se eliminó el apartado que todavía presentaba generaciones, documentación y React como funcionalidades futuras.
- Se actualizó el estado funcional del proyecto con los módulos que ya se encuentran implementados.
- Se actualizaron las referencias documentales principales de PRB a PRD.
- `docs/PRB.md` fue renombrado a `docs/PRD.md`.
- Se actualizó el encabezado interno del documento para identificarlo como PRD.
- Se actualizó la estructura de documentos mostrada en el README.
- Se agregaron Node.js y npm como requisitos necesarios para ejecutar las herramientas de React y Vite.
- Se aclaró que Node.js no se utiliza como backend del sistema.
- Se documentó la ejecución del frontend mediante `npm install` y `npm run dev`.
- Se documentó que Django permanece disponible en `http://127.0.0.1:8000/`.
- Se documentó el proxy de Vite utilizado para las rutas `/api`.
- Se amplió la sección de API con los endpoints actuales de autenticación, cuentas, generaciones, colaboradores disponibles, documentos y notificaciones.
- Se agregó la documentación de `GET /api/onboarding/notifications/mine/`.
- Se conservó y actualizó la explicación del comando `revisar_pendientes`.
- Se mantuvo documentada la ejecución automática mediante el Programador de tareas de Windows.
- Se documentaron las variables de entorno `SECRET_KEY` y `DEBUG`.
- Se documentaron las 11 pruebas automáticas actuales.
- Se documentaron las validaciones del frontend mediante `npm run lint` y `npm run build`.
- Se reemplazó el README predeterminado de Vite en `frontend/README.md` por documentación específica de PluriOne Onboarding.

### Resultado

La documentación principal conserva el historial detallado del proyecto, pero ahora refleja correctamente el estado actual del MVP.

El repositorio documenta tanto la ejecución del backend como del frontend, los endpoints actuales, la configuración de entorno, las pruebas y el mecanismo de seguimiento automático.

### Próximo paso

Realizar las comprobaciones técnicas finales de reproducibilidad, actualizar el respaldo de PostgreSQL y revisar posibles mejoras de modularización del frontend.

## 22 de octubre de 2026 - Normalización de requirements.txt

**Actividad:** revisión de dependencias y reproducibilidad del entorno Python.

**Motivo:** durante la revisión final del repositorio se detectó que `requirements.txt` tenía un tamaño mayor al esperado y se necesitaba comprobar que pudiera utilizarse correctamente para reproducir el backend.

**Trabajo realizado:**

- Se revisó el contenido completo de `requirements.txt`.
- Se confirmó que contiene 11 dependencias con versiones específicas.
- Se ejecutó `python -m pip check`.
- No se encontraron dependencias rotas.
- Se inspeccionó la codificación mediante `Format-Hex`.
- Se detectó que el archivo estaba almacenado en UTF-16 LE con BOM.
- Se convirtió `requirements.txt` a UTF-8.
- El contenido y las versiones de las dependencias se conservaron.
- El archivo pasó de 472 bytes a 224 bytes.
- Se ejecutó `python -m pip install --dry-run -r requirements.txt`.
- pip reconoció correctamente las 11 dependencias.
- Todas las dependencias se encontraron satisfechas en el entorno virtual actual.
- Se ejecutó `git diff --check` sin detectar errores de formato.

**Resultado:** `requirements.txt` quedó normalizado en UTF-8 y validado para utilizarse como archivo reproducible de dependencias del backend.

**Próximo paso:** regenerar `db/base-de-datos.sql` utilizando el esquema actual de PostgreSQL.

## 22 de octubre de 2026 - Regeneración y validación del respaldo PostgreSQL

**Actividad:** actualización y prueba del respaldo de la base de datos del proyecto.

**Motivo:** el respaldo existente correspondía al 7 de octubre de 2026 y no contenía las últimas modificaciones del módulo de onboarding, incluyendo las notificaciones automáticas persistentes.

**Trabajo realizado:**

- Se verificó que PostgreSQL 18.6 se encuentra instalado.
- Se comprobó que todas las migraciones actuales de `accounts` y `onboarding` están aplicadas.
- Se confirmó la migración `0004_automaticnotification`.
- Se regeneró `db/base-de-datos.sql` utilizando `pg_dump`.
- El respaldo se generó en formato SQL plano y codificación UTF-8.
- Se utilizaron las opciones `--no-owner`, `--no-privileges`, `--clean` y `--if-exists`.
- Se comprobó que el respaldo incluye la tabla `onboarding_automaticnotification`.
- Se comprobaron las tablas actuales de `accounts` y `onboarding`.
- Se verificó que el respaldo registra la migración `0004_automaticnotification`.
- Se creó la base temporal `plurione_restore_test`.
- Se restauró el respaldo completo sobre la base temporal utilizando `ON_ERROR_STOP=1`.
- La restauración finalizó correctamente con código de salida `0`.
- La base restaurada contiene 15 tablas.
- Se comprobaron las seis migraciones actuales correspondientes a `accounts` y `onboarding`.
- Se validaron 5 usuarios, 4 perfiles, 3 generaciones, 3 asignaciones, 9 documentos y 3 notificaciones automáticas.
- La base temporal utilizada para la validación fue eliminada después de la prueba.

**Resultado:** `db/base-de-datos.sql` quedó actualizado con el esquema y los datos de demostración actuales, y se comprobó mediante una restauración real que el respaldo puede reconstruir correctamente la base de datos del proyecto.

**Próximo paso:** revisar la modularización adicional de los paneles del encargado sin alterar los flujos funcionales ya validados.

## 26 de octubre de 2026 - Primera modularización de App.jsx

**Actividad:** extracción del componente de revisión de solicitudes del encargado.

**Motivo:** la revisión académica identificó que `frontend/src/App.jsx` tenía aproximadamente 3,910 líneas y recomendó separar los paneles del encargado en componentes independientes.

**Trabajo realizado:**

- Se revisó la estructura actual de `frontend/src/App.jsx`.
- Se identificó `PendingApplication` como el primer componente seguro para extraer.
- El componente se encontraba dentro de `App.jsx` entre las funciones del panel del encargado.
- Se creó `frontend/src/PendingApplication.jsx`.
- El nuevo componente conserva el manejo de estado necesario para aprobar solicitudes y solicitar correcciones.
- Se mantuvieron sin cambios las propiedades `application`, `apiFetch` y `onRefresh`.
- Se mantuvo el mismo endpoint `POST /api/accounts/applications/<id>/review/`.
- Se mantuvo la validación que exige un motivo al solicitar una corrección.
- `App.jsx` importa ahora `PendingApplication` como componente independiente.
- `App.jsx` pasó de 3,910 a 3,656 líneas.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 26 módulos y generó correctamente el build de producción.

**Resultado:** la revisión de solicitudes del encargado quedó separada de `App.jsx` sin modificar el comportamiento funcional existente.

**Próximo paso:** extraer `PendingDocument` a un componente independiente y volver a validar lint y build.

## 26 de octubre de 2026 - Segunda modularización de App.jsx

**Actividad:** extracción de la revisión y gestión documental del encargado.

**Motivo:** continuar la separación de los paneles del encargado identificados durante la revisión académica y reducir el tamaño de `frontend/src/App.jsx`.

**Trabajo realizado:**

- Se identificó `PendingDocument` como un bloque independiente de 617 líneas.
- Se creó `frontend/src/PendingDocument.jsx`.
- Se mantuvieron las propiedades `document`, `apiFetch` y `onRefresh`.
- Se conservó la revisión y aprobación de documentos.
- Se conservó la solicitud de correcciones con motivo obligatorio.
- Se conservó la publicación de plantillas de empresa.
- Se conservó la carga de documentos firmados por PluriOne.
- Se mantuvieron sin cambios los endpoints del backend utilizados por el componente.
- `App.jsx` pasó de 3,656 a 3,040 líneas.
- Desde el inicio de la modularización, `App.jsx` se redujo de 3,910 a 3,040 líneas.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 27 módulos y generó el build de producción correctamente.

**Resultado:** la gestión documental del encargado quedó separada en un componente propio sin alterar el comportamiento funcional existente.

**Próximo paso:** separar la gestión de generaciones del encargado y volver a validar lint y build.

## 26 de octubre de 2026 - Modularización del panel del encargado

**Actividad:** separación del panel administrativo y de los componentes compartidos del dashboard.

**Motivo:** atender la retroalimentación académica que identificó `frontend/src/App.jsx` como un archivo demasiado grande y recomendó separar los paneles del encargado en componentes independientes.

**Trabajo realizado:**

- Se identificaron componentes compartidos por las vistas del colaborador y del encargado.
- Se creó `frontend/src/DashboardShared.jsx`.
- Se movieron a este archivo `EmptyState`, `UserChip` y `Sidebar`.
- Se creó `frontend/src/ManagerHome.jsx`.
- Se trasladó a `ManagerHome.jsx` el panel principal del encargado.
- Se mantuvo la creación y cierre de generaciones.
- Se mantuvo la selección y visualización de generaciones.
- Se mantuvo la asignación de colaboradores aprobados.
- Se mantuvieron las tarjetas de colaboradores y su estado visual.
- `ManagerHome.jsx` utiliza los componentes previamente separados `PendingApplication.jsx` y `PendingDocument.jsx`.
- No se modificaron los endpoints ni las reglas funcionales del backend.
- `App.jsx` se redujo desde las 3,910 líneas originales hasta aproximadamente 1,822 líneas.
- Se ejecutó `npm run lint` correctamente.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 29 módulos y generó correctamente el build de producción.

**Resultado:** los principales paneles administrativos dejaron de estar concentrados en `App.jsx`, manteniendo sin cambios los flujos funcionales existentes.

**Próximo paso:** revisar los componentes restantes de `App.jsx` para completar una modularización segura antes de realizar la prueba de instalación limpia.

## 26 de octubre de 2026 - Modularización del portal del colaborador

**Actividad:** extracción del portal principal del colaborador desde `App.jsx`.

**Motivo:** continuar atendiendo la retroalimentación académica que recomendó reducir el tamaño de `frontend/src/App.jsx` y separar los paneles principales en componentes independientes.

**Trabajo realizado:**

- Se creó `frontend/src/CollaboratorHome.jsx`.
- Se trasladó el portal principal del colaborador al nuevo componente.
- Se conservó el cálculo del progreso documental.
- Se conservó el envío de la solicitud inicial de incorporación.
- Se mantuvo la integración con `ProfileCorrection`.
- Se mantuvo la integración con `MyProfile`.
- Se mantuvo la integración con `NotificationsPanel`.
- Se trasladó también `DocumentCard` al módulo del colaborador.
- Se conservaron la entrega y corrección de documentos.
- Se conservó la descarga de plantillas y documentos firmados.
- Se conservó la confirmación de recepción de documentos.
- No se modificaron endpoints ni reglas funcionales.
- `App.jsx` pasó de 1,822 a 980 líneas.
- Desde el inicio de la modularización, `App.jsx` pasó de 3,910 a 980 líneas.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 30 módulos y generó correctamente el build de producción.

**Resultado:** los portales del encargado y del colaborador quedaron separados de `App.jsx`, reduciendo significativamente la concentración de lógica y presentación dentro del componente principal.

**Próximo paso:** revisar la modularización restante y comenzar la prueba de instalación limpia del repositorio.

## 26 de octubre de 2026 - Cierre de la modularización principal de App.jsx

**Actividad:** separación de las vistas de autenticación y cierre de la modularización principal del frontend.

**Motivo:** completar la recomendación académica de reducir `frontend/src/App.jsx` y dejar el componente principal concentrado principalmente en la sesión, carga de información y navegación.

**Trabajo realizado:**

- Se creó `frontend/src/AuthViews.jsx`.
- Se trasladó `ThemeSwitcher` al nuevo módulo.
- Se trasladó `LoginTransition` al nuevo módulo.
- Se trasladó la vista `Login` al nuevo módulo.
- `App.jsx` conserva la administración de sesión.
- `App.jsx` conserva la renovación de tokens JWT.
- `App.jsx` conserva la carga de información según el rol.
- `App.jsx` conserva la navegación hacia `ManagerHome` o `CollaboratorHome`.
- No se modificaron endpoints ni reglas funcionales.
- `App.jsx` pasó de 980 a 618 líneas.
- Desde el inicio de la modularización, `App.jsx` pasó de 3,910 a 618 líneas.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 31 módulos y generó correctamente el build de producción.

**Resultado:** la modularización principal del frontend quedó completada, con los portales del encargado y colaborador, las vistas de autenticación y los principales paneles separados en componentes independientes.

**Próximo paso:** realizar una instalación limpia del repositorio siguiendo únicamente la documentación actual.

## 27 de octubre de 2026 - Centralización de utilidades de nombres

**Actividad:** eliminación de funciones auxiliares duplicadas en el frontend.

**Trabajo realizado:**

- Se creó `frontend/src/utils/nombres.js`.
- Se centralizó la función `firstName`.
- Se centralizó la función `initials`.
- Se eliminaron las copias locales de estas funciones en `ManagerHome.jsx`, `CollaboratorHome.jsx`, `PendingApplication.jsx` y `PendingDocument.jsx`.
- Los cuatro componentes importan ahora las utilidades desde una única fuente.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 34 módulos.

**Resultado:** se redujo la duplicación de código y las funciones de presentación de nombres quedaron centralizadas en `src/utils/`.

**Próximo paso:** organizar los componentes administrativos dentro de `frontend/src/manager/`.

## 27 de octubre de 2026 - Organización del módulo del encargado

**Actividad:** reorganización de los componentes administrativos del frontend.

**Trabajo realizado:**

- Se creó `frontend/src/manager/`.
- Se movió `ManagerHome.jsx` al módulo administrativo.
- Se movió `PendingApplication.jsx` al módulo administrativo.
- Se movió `PendingDocument.jsx` al módulo administrativo.
- Se actualizaron las rutas hacia `utils/nombres`.
- Se actualizaron las rutas hacia los componentes compartidos de `src/components/`.
- Se actualizó `App.jsx` para importar `ManagerHome` desde `src/manager/`.
- No se modificó la lógica funcional de los componentes.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 34 módulos.

**Resultado:** los principales componentes administrativos quedaron agrupados dentro de `src/manager/`, de acuerdo con la organización recomendada en la retroalimentación.

**Próximo paso:** organizar los componentes correspondientes al portal del colaborador dentro de `frontend/src/collaborator/`.

## 27 de octubre de 2026 - Organización del portal del colaborador

**Actividad:** reorganización de los componentes correspondientes al colaborador.

**Trabajo realizado:**

- Se creó `frontend/src/collaborator/`.
- Se movió `CollaboratorHome.jsx`.
- Se movieron `MyProfile.jsx` y `MyProfile.css`.
- Se movieron `ProfileCorrection.jsx` y `ProfileCorrection.css`.
- Se movieron `NotificationsPanel.jsx` y `NotificationsPanel.css`.
- Se actualizaron las rutas hacia `utils/nombres`.
- Se actualizaron las rutas hacia los componentes compartidos.
- Se actualizó `App.jsx` para importar `CollaboratorHome` desde `src/collaborator/`.
- No se modificó la lógica funcional del portal.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 34 módulos.

**Resultado:** las vistas propias del colaborador quedaron agrupadas dentro de `src/collaborator/`, separadas del módulo administrativo y de los componentes compartidos.

**Próximo paso:** organizar las vistas relacionadas con autenticación dentro de `frontend/src/auth/`.

## 27 de octubre de 2026 - Organización del módulo de autenticación

**Actividad:** reorganización de las vistas relacionadas con autenticación y registro.

**Trabajo realizado:**

- Se creó `frontend/src/auth/`.
- Se movió `AuthViews.jsx`.
- Se movió `Register.jsx`.
- Se movió `Register.css`.
- Se actualizaron los imports correspondientes en `App.jsx`.
- Se verificó que no quedaran referencias antiguas a `./Register` ni `./AuthViews`.
- No se modificó la lógica funcional de autenticación.
- Se ejecutó `npm run lint` sin errores.
- Se ejecutó `npm run build` correctamente.
- Vite procesó 34 módulos.

**Resultado:** las vistas de autenticación quedaron separadas del resto de la aplicación dentro de `src/auth/`.

**Próximo paso:** ejecutar la aplicación completa en modo desarrollo y validar visualmente ambos roles.

## 27 de octubre de 2026 - Validación visual posterior a la reorganización

**Actividad:** comprobación funcional y visual del frontend después de la modularización.

**Validaciones realizadas:**

- Django inició correctamente y `python manage.py check` no reportó problemas.
- Vite inició correctamente en modo desarrollo.
- Se inició sesión como colaborador.
- El portal del colaborador cargó correctamente.
- Se verificaron los datos, progreso documental y navegación.
- Se inició sesión como encargado.
- El panel administrativo cargó correctamente.
- Se verificó el tablero de generaciones.
- Se verificó la sección de documentos pendientes.
- Las solicitudes observadas hacia la API respondieron con código HTTP 200.
- No se observaron errores 403, 404 ni 500 durante la validación.
- La reorganización de `auth/`, `manager/`, `collaborator/`, `components/` y `utils/` no produjo regresiones visuales detectables.

**Resultado:** la modularización del frontend queda validada mediante lint, build y prueba visual en ambos roles.

**Próximo paso:** realizar una instalación limpia del proyecto a partir del repositorio.


## 27 de octubre de 2026 - Validación mediante instalación limpia

**Actividad:** comprobación de reproducibilidad del proyecto a partir de un clon nuevo del repositorio.

**Entorno de prueba:**

- Commit probado: `8137d2f`.
- Windows.
- Python 3.12.10.
- Django 6.1.1.
- PostgreSQL 18.6.
- Node.js 24.18.0.
- npm 11.16.0.

**Validaciones realizadas:**

- Se clonó el repositorio desde GitHub en una carpeta independiente.
- Se creó un entorno virtual Python nuevo.
- Se instalaron únicamente las dependencias declaradas en `requirements.txt`.
- `pip check` no detectó dependencias rotas.
- Se creó una base PostgreSQL independiente para la prueba.
- Se restauró `db/base-de-datos.sql` con código de salida 0.
- Se recuperaron 15 tablas.
- Se comprobaron 5 usuarios, 4 perfiles, 3 generaciones, 3 asignaciones, 9 documentos y 3 notificaciones.
- `python manage.py migrate` indicó que no existían migraciones pendientes.
- `python manage.py check` no detectó problemas.
- `python manage.py makemigrations --check --dry-run` indicó que no existían cambios pendientes.
- Se ejecutaron 11 pruebas automatizadas correctamente.
- `python manage.py revisar_pendientes --dry-run` detectó 3 pendientes sin modificar información.
- Se instaló el frontend mediante `npm install`.
- npm reportó 0 vulnerabilidades.
- `npm run lint` finalizó sin errores.
- `npm run build` finalizó correctamente.
- Se ejecutaron backend y frontend desde el clon limpio.
- Se comprobó visualmente el portal de colaborador y el panel del encargado.
- Las solicitudes posteriores al inicio de sesión respondieron correctamente con HTTP 200.
- El repositorio de prueba permaneció sin modificaciones rastreadas por Git.

**Resultado:** el proyecto puede reconstruirse y ejecutarse correctamente a partir del contenido disponible en el repositorio.

**Próximo paso:** ajustar la configuración regional y de hosts de Django.

## 27 de octubre de 2026 - Ajustes de configuración de Django

**Actividad:** actualización de la configuración regional y de hosts permitidos.

**Trabajo realizado:**

- Se configuró `LANGUAGE_CODE` como `es-mx`.
- Se configuró `TIME_ZONE` como `America/Mexico_City`.
- `ALLOWED_HOSTS` pasó a obtenerse desde la variable de entorno `ALLOWED_HOSTS`.
- Se dejó como valor predeterminado `127.0.0.1,localhost`.
- Se agregó `ALLOWED_HOSTS=127.0.0.1,localhost` a `.env.example`.
- Se ejecutó `python manage.py check` sin errores.
- Se ejecutó `python manage.py makemigrations --check --dry-run` sin cambios pendientes.
- Se ejecutaron 11 pruebas automatizadas correctamente.

**Resultado:** la configuración de Django quedó adaptada al entorno del proyecto y preparada para cambiar hosts sin modificar el código fuente.

**Próximo paso:** simplificar el README principal y agregar la sección de uso de IA.

 ## 28 de octubre de 2026 - Separación de ThemeSwitcher

Actividad:

Se terminó de ordenar la estructura compartida del frontend moviendo ThemeSwitcher fuera del módulo de autenticación.

Trabajo realizado:

• Se creó frontend/src/components/ThemeSwitcher.jsx.
• Se eliminó ThemeSwitcher de frontend/src/auth/AuthViews.jsx.
• App.jsx ahora importa ThemeSwitcher desde components.
• Se verificó que AuthViews.jsx ya no contenga referencias a ThemeSwitcher.
• Se ejecutó npm run lint sin errores.
• Se ejecutó npm run build correctamente.
• Vite procesó 35 módulos.

Resultado:

ThemeSwitcher quedó ubicado como componente compartido, ya que se utiliza tanto antes como después del inicio de sesión.

Próximo paso:

1.- Trasladar al BITACORA.md el historial que todavía se encuentra dentro de README.md.
2.- Simplificar README.md para dejar únicamente instrucciones de instalación, ejecución, verificación y solución de problemas.
3.- Incluir la sección breve de uso de IA.

 ## 28 de octubre de 2026 - Historial trasladado desde README

Actividad:

Como parte de la simplificacion solicitada para README.md, se conserva en esta bitacora el historial acumulado que anteriormente se encontraba en las secciones Completado, En progreso y Proximo paso.

El contenido siguiente se traslad? antes de reducir README.md para evitar perder el registro historico del desarrollo.

HISTORIAL CONSOLIDADO

COMPLETADO

? Repositorio privado creado en GitHub.
? Git instalado y configurado en el equipo.
? Repositorio clonado correctamente.
? Repositorio local conectado con GitHub.
? Alcance general del sistema analizado.
? Caso real de incorporación utilizado como referencia para detectar necesidades.
? Se definió que el sistema se enfocará en el seguimiento de incorporación y no en la gestión de proyectos o entregables técnicos.
? Se definió la visualización general por generaciones mediante tarjetas o cuadros de estado.
? Se definió el PRD del proyecto.
? Se definió el stack tecnológico base propuesto.
? MVP definido y aprobado.
? MVP agregado a la documentación del proyecto.

? Entorno virtual de Python creado.
? Django 6.1.1 instalado.
? Backend base creado con Django.
? Proyecto Django configurado en `backend/`.
? Verificación con `python manage.py check` completada correctamente.
? Servidor de desarrollo probado correctamente en `http://127.0.0.1:8000/`.
? Archivo `requirements.txt` creado.
? Archivo `.gitignore` configurado.

? PostgreSQL 18.6 instalado y configurado.
? Base de datos `plurione_onboarding` creada.
? Django conectado correctamente con PostgreSQL.
? Migraciones iniciales aplicadas correctamente.
? Django REST Framework 3.18.1 instalado y configurado.

? Se creó la aplicación Django `accounts`.
? Se implementó un usuario personalizado basado en `AbstractUser`.
? El inicio de sesión utiliza correo electrónico en lugar de username.
? Se definieron los roles iniciales: Colaborador y Encargado.
? Se creó el perfil inicial del colaborador.
? El perfil contempla datos personales, académicos, CV y credencial universitaria.
? Se implementaron los estados de solicitud: Borrador, En revisión, Requiere corrección y Aprobado.
? Se validó el acceso al administrador de Django mediante correo electrónico.
? Las migraciones del módulo `accounts` fueron aplicadas correctamente en PostgreSQL.

? Se registraron `User` y `CollaboratorProfile` en Django Admin.
? Se configuró el almacenamiento local de archivos mediante `MEDIA_ROOT` y `MEDIA_URL`.
? Se creó la primera API REST del sistema para registrar colaboradores.
? El registro crea automáticamente una cuenta con rol `COLABORADOR`.
? El registro crea también el perfil inicial del colaborador.
? Se implementaron validaciones de correo y CURP duplicados.
? Se utilizó una transacción atómica para evitar registros incompletos.
? Se probó correctamente el registro mediante una petición HTTP multipart.
? Se comprobó el almacenamiento de CV y credencial universitaria.
? Se verificó el registro completo en PostgreSQL.

? Se implementó autenticación mediante JWT para la API.
? Se configuraron tokens de acceso y renovación.
? Se creó el endpoint de inicio de sesión `POST /api/auth/login/`.
? Se creó el endpoint de renovación `POST /api/auth/refresh/`.
? Se protegieron las operaciones privadas mediante autenticación.
? Se creó el endpoint `POST /api/accounts/application/submit/`.
? El colaborador autenticado puede enviar únicamente su propia solicitud.
? Una solicitud puede pasar de `DRAFT` a `IN_REVIEW`.
? También se permite reenviar una solicitud que estaba en `NEEDS_CORRECTION`.
? Se comprobó que los tokens vencidos son rechazados.
? Se probó correctamente el envío de la solicitud de Peter Parker.

? Se creó el endpoint para listar solicitudes pendientes de revisión.
? Solo los usuarios con rol `ENCARGADO` pueden consultar solicitudes pendientes.
? Se creó el endpoint para revisar una solicitud individual.
? El encargado puede aprobar una solicitud.
? El encargado puede solicitar una corrección indicando obligatoriamente el motivo.
? Se implementaron los estados `IN_REVIEW`, `NEEDS_CORRECTION` y `APPROVED` dentro del flujo de revisión.
? Se comprobó que una solicitud corregida puede reenviarse.
? Se probó el circuito completo utilizando al colaborador ficticio Peter Parker.

? Se creó el endpoint para que el colaborador consulte su propio perfil.
? El colaborador puede consultar su estado y el motivo de una corrección.
? Se creó la actualización parcial del perfil mediante `PATCH`.
? Los perfiles en estado `DRAFT` pueden modificarse.
? Los perfiles en estado `NEEDS_CORRECTION` pueden modificarse.
? Los perfiles en estado `IN_REVIEW` no pueden modificarse.
? Los perfiles en estado `APPROVED` no pueden modificarse.
? Se comprobó el flujo real de corrección utilizando a Miles Morales.
? El motivo de corrección se elimina automáticamente cuando la solicitud es reenviada.

? Se creó la aplicación Django `onboarding`.
? Se implementó el modelo de generaciones.
? Las generaciones pueden estar en estado `OPEN` o `CLOSED`.
? Se creó la relación entre colaboradores y generaciones.
? Solo los colaboradores en estado `APPROVED` pueden pertenecer a una generación.
? Solo pueden agregarse colaboradores a generaciones abiertas.
? Un colaborador solo puede pertenecer a una generación.
? Se registraron generaciones y asignaciones en Django Admin.
? El administrador muestra únicamente colaboradores aprobados disponibles.
? El administrador muestra únicamente generaciones abiertas disponibles.
? Se creó y probó la Generación 19.
? Peter Parker fue asignado correctamente a la Generación 19.

? Se creó el serializer de generaciones.
? Se creó la API `GET /api/onboarding/generations/`.
? La API permite al encargado consultar las generaciones registradas.
? Cada generación muestra su estado, cantidad de integrantes y lista de colaboradores.
? La consulta está protegida mediante autenticación JWT.
? Solo los usuarios con rol `ENCARGADO` pueden consultar las generaciones.
? Se comprobó correctamente la Generación 19 con Peter Parker - UPAM como integrante.

? Se creó la API para crear generaciones.
? Se creó la API para asignar colaboradores a generaciones.
? Se creó la API para cerrar generaciones.
? Solo los colaboradores en estado `APPROVED` pueden asignarse.
? Se bloqueó la asignación de colaboradores en estado `IN_REVIEW`.
? Se bloqueó la asignación de colaboradores a generaciones `CLOSED`.
? Se creó y probó la Generación 20 mediante API.
? Se comprobó correctamente el cierre de una generación.

? Se creó la API para consultar colaboradores disponibles para asignación.
? La API muestra únicamente colaboradores en estado `APPROVED` que todavía no pertenecen a una generación.
? Se comprobó que un colaborador en `IN_REVIEW` no aparece disponible.
? Se comprobó que un colaborador aprobado aparece automáticamente como disponible.
? Se asignó a Miles Morales - UTP a la Generación 19 mediante API.
? Después de la asignación, Miles dejó de aparecer entre los colaboradores disponibles.
? La Generación 19 quedó con dos integrantes: Peter Parker - UPAM y Miles Morales - UTP.

? Se creó la API de detalle de una generación.
? El encargado puede consultar una generación específica por su identificador.
? El detalle incluye el estado de la generación y la cantidad de integrantes.
? Cada integrante incluye nombre, universidad, carrera y estado de solicitud.
? Se agregó el formato `card_label` para representar las tarjetas como `Nombre - SIGLAS`.
? Se comprobó correctamente la Generación 19 con Peter Parker - UPAM y Miles Morales - UTP.

? Se creó el modelo `OnboardingDocument` para controlar la documentación del proceso de incorporación.
? Se definieron los tipos de documento: NDA, Carta de presentación y Carta de aceptación.
? Se definieron estados documentales como `PENDING`, `DELIVERED`, `IN_REVIEW`, `NEEDS_CORRECTION`, `PENDING_SIGNATURE`, `SIGNED`, `DOWNLOADABLE` y `COMPLETE`.
? Se agregaron campos para plantilla de empresa, archivo del colaborador y archivo firmado por la empresa.
? Se creó y aplicó la migración `0002_onboardingdocument`.
? El modelo se registró en Django Admin.
? Se crearon seis documentos de prueba para Peter Parker y Miles Morales.
? Se validó en PostgreSQL que un colaborador no pueda tener dos documentos del mismo tipo.

? Se creó la API `GET /api/onboarding/documents/mine/`.
? La API permite que cada colaborador consulte únicamente sus propios documentos.
? Se agregaron etiquetas legibles para tipo de documento y estado.
? Se comprobó que Peter Parker recibe exactamente sus tres documentos.
? Se comprobó que los tres documentos se encuentran inicialmente en estado `PENDING`.
? Se comprobó que el rol `ENCARGADO` no puede utilizar la ruta de documentos personales.

? Se implementó la carga de archivos documentales por parte del colaborador.
? Se creó la API `POST /api/onboarding/documents/<id>/upload/`.
? La carga utiliza `multipart/form-data`.
? El colaborador solamente puede modificar documentos pertenecientes a su propia cuenta.
? Se permite la carga cuando el documento está en `PENDING` o `NEEDS_CORRECTION`.
? Al entregar un archivo, el documento cambia automáticamente a `DELIVERED`.
? Se probó el flujo con el NDA de Peter Parker.
? El archivo ficticio fue almacenado correctamente en `media/onboarding/collaborator_files/`.

? Se creó la bandeja de documentos pendientes para el encargado.
? Los documentos en estado `DELIVERED` aparecen automáticamente para revisión.
? El encargado puede aprobar un documento o solicitar corrección.
? La solicitud de corrección guarda un motivo visible para el colaborador.
? El colaborador puede volver a cargar un documento en `NEEDS_CORRECTION`.
? Al reemplazar un archivo, el sistema elimina automáticamente la versión anterior del almacenamiento.
? El NDA pasa directamente a `COMPLETE` cuando el encargado lo aprueba.
? La Carta de presentación pasa a `PENDING_SIGNATURE` cuando es aprobada.
? Se implementó la carga del documento firmado por la empresa.
? Después de la firma de la empresa, el documento pasa a `DOWNLOADABLE`.
? El colaborador puede confirmar la recepción del documento.
? Al confirmar la recepción, el documento pasa a `COMPLETE`.
? Se probó completamente el flujo del NDA de Peter Parker.
? Se probó completamente el flujo de la Carta de presentación de Peter Parker.

? Se implementó el flujo específico de la Carta de aceptación.
? La empresa puede publicar una plantilla para el colaborador.
? El colaborador no puede entregar la Carta de aceptación antes de que exista una plantilla.
? El colaborador puede consultar y utilizar la plantilla publicada.
? La Carta de aceptación puede ser entregada, revisada, firmada y devuelta.
? Se comprobó el flujo completo `PENDING → DELIVERED → PENDING_SIGNATURE → DOWNLOADABLE → COMPLETE`.
? Peter Parker completó correctamente los tres documentos principales del proceso de incorporación.
? Se comprobó la existencia física de los archivos firmados por la empresa.

? Se implementó el cálculo automático del estado visual de los colaboradores.
? Las tarjetas utilizan los estados `GREEN`, `YELLOW` y `RED`.
? `GREEN` indica que los tres documentos requeridos están en `COMPLETE`.
? `RED` indica que existe al menos un documento en `NEEDS_CORRECTION`.
? `YELLOW` representa cualquier otro estado normal del proceso.
? Se agregó el conteo de documentos completados y documentos totales.
? Se comprobó a Peter Parker - UPAM en `GREEN` con 3/3 documentos completos.
? Se comprobó a Miles Morales - UTP inicialmente en `YELLOW`.
? Después de solicitar una corrección documental a Miles Morales, su tarjeta cambió automáticamente a `RED`.

? Se inició la construcción del frontend con React y Vite.
? Se creó una interfaz visual de inicio de sesión para PluriOne.
? El login de React fue conectado con la autenticación JWT de Django.
? Los tokens `access` y `refresh` se almacenan en el navegador después de iniciar sesión.
? Se configuró el proxy de Vite para comunicar React con la API de Django durante el desarrollo.
? Se creó `GET /api/accounts/me/` para identificar al usuario autenticado y su rol.
? El frontend distingue automáticamente entre `COLABORADOR` y `ENCARGADO`.
? Se implementó restauración de sesión al recargar la página.
? Se implementó renovación automática del token de acceso utilizando el refresh token.
? Se creó el primer panel del colaborador.
? El panel del colaborador muestra nombre, universidad, carrera, estado de solicitud y progreso documental.
? El frontend consulta los documentos reales del colaborador mediante la API.
? Se comprobó a Peter Parker con 3/3 documentos completos y 100% de progreso.
? Se creó el primer panel del encargado.
? El panel del encargado consume las generaciones reales del backend.
? Se muestran las generaciones abiertas y cerradas disponibles.
? Se muestran las tarjetas de colaboradores con sus estados visuales automáticos.
? Peter Parker - UPAM aparece en verde con 3/3 documentos completos.
? Miles Morales - UTP aparece en rojo porque requiere corrección.
? Se integró el panel de documentos pendientes del encargado.
? Se mejoró el diseño visual del login y de los paneles.
? Se implementó una transición animada entre la portada del login y el formulario de acceso.

? Se implementaron tres temas visuales para la interfaz: PluriOne, Claro y Oscuro.
? La preferencia del tema se guarda en el navegador y se recupera automáticamente.
? Se aumentó nuevamente el tamaño de la tipografía para mejorar la legibilidad.
? Se mejoró la transición visual entre la portada y el formulario de inicio de sesión.
? Se creó una pantalla de transición animada durante la autenticación.
? La pantalla de transición muestra los estados de validación y preparación del espacio del usuario.
? Se agregó una silueta animada y elementos visuales de carga para evitar pantallas aparentemente congeladas.
? Las mejoras visuales mantienen intacta la autenticación JWT y la separación entre roles.

? Se integró la entrega de documentos del colaborador desde React.
? Los documentos en estado `PENDING` o `NEEDS_CORRECTION` pueden mostrar la opción de carga cuando las reglas del backend lo permiten.
? El colaborador puede seleccionar un archivo desde la interfaz y enviarlo mediante `multipart/form-data`.
? Después de una entrega correcta, React vuelve a consultar los datos del backend y actualiza automáticamente la tarjeta.
? Se comprobó el flujo utilizando a Miles Morales y su Carta de presentación en estado `NEEDS_CORRECTION`.
? Miles entregó la corrección desde React y el documento cambió correctamente a `DELIVERED`.
? El motivo de corrección anterior desapareció después de la nueva entrega.
? El archivo entregado puede consultarse desde la misma tarjeta.

? Se integró la revisión documental del encargado desde React.
? Los documentos en estado `DELIVERED` aparecen en la bandeja de pendientes.
? El encargado puede abrir el archivo entregado por el colaborador.
? Se implementó la acción de aprobar documentos desde la interfaz.
? Se implementó la acción de solicitar correcciones desde la interfaz.
? Al solicitar una corrección se exige indicar un motivo.
? Después de una decisión, el frontend vuelve a consultar automáticamente el estado del sistema.
? Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
? El encargado solicitó una nueva corrección desde React.
? El documento dejó de aparecer entre los pendientes de revisión.
? Miles volvió automáticamente al estado visual `RED`.
? El colaborador pudo consultar el nuevo motivo de corrección desde su portal.

? Se amplió la bandeja del encargado para incluir documentos en `PENDING_SIGNATURE`.
? El panel ahora distingue documentos pendientes de revisión y documentos pendientes de firma.
? Se integró desde React la carga de documentos firmados por la empresa.
? El encargado puede seleccionar el archivo firmado y enviarlo mediante `multipart/form-data`.
? La interfaz utiliza `POST /api/onboarding/documents/<id>/company-sign/`.
? Después de subir correctamente el documento firmado, el sistema actualiza nuevamente la información desde la API.
? Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
? La Carta de presentación pasó correctamente de `PENDING_SIGNATURE` a `DOWNLOADABLE`.
? El documento dejó de aparecer entre los pendientes del encargado después de completar la firma.
? Miles Morales puede consultar desde su portal el documento final firmado por la empresa.

? Se integró desde React la confirmación de recepción de documentos firmados.
? Los documentos en estado `DOWNLOADABLE` muestran al colaborador la opción de confirmar su recepción.
? El colaborador puede consultar el documento final firmado antes de confirmar.
? La interfaz utiliza `POST /api/onboarding/documents/<id>/confirm-receipt/`.
? Después de confirmar la recepción, React actualiza nuevamente la información desde la API.
? Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
? La Carta de presentación pasó correctamente de `DOWNLOADABLE` a `COMPLETE`.
? El progreso documental de Miles se actualizó automáticamente de 0/3 a 1/3 documentos completos.
? El porcentaje de progreso de Miles cambió automáticamente de 0% a 33%.
? El documento final firmado continúa disponible para consulta después de completar el flujo.

? Se integró desde React la publicación de plantillas por parte del encargado.
? La bandeja de gestión ahora incluye documentos `PENDING` que requieren una plantilla de empresa y todavía no la tienen publicada.
? Se contemplan inicialmente el NDA y la Carta de aceptación.
? El encargado puede seleccionar una plantilla desde el navegador y enviarla mediante `multipart/form-data`.
? La interfaz utiliza `POST /api/onboarding/documents/<id>/company-template/`.
? Después de publicar correctamente una plantilla, React vuelve a consultar la información del sistema.
? El documento permanece en estado `PENDING` porque la siguiente acción corresponde al colaborador.
? Después de publicar la plantilla, el documento deja de aparecer entre los pendientes del encargado.
? Se comprobó el flujo utilizando el NDA de Miles Morales.
? Miles Morales puede descargar desde su portal la plantilla del NDA publicada por PluriOne.
? Después de recibir la plantilla, Miles dispone de la opción para seleccionar y entregar el documento.

? Se comprobó desde React el flujo completo del NDA utilizando a Miles Morales.
? Miles descargó la plantilla del NDA previamente publicada por PluriOne.
? El colaborador entregó el NDA desde su portal.
? El documento pasó correctamente de `PENDING` a `DELIVERED`.
? El encargado recibió el NDA en la bandeja de documentos por gestionar.
? El encargado aprobó el NDA desde React.
? Debido a que el NDA no requiere una firma empresarial posterior, pasó directamente de `DELIVERED` a `COMPLETE`.
? El progreso documental de Miles Morales se actualizó automáticamente de 1/3 a 2/3 documentos completos.
? El porcentaje de progreso se actualizó automáticamente de 33% a 67%.
? La Carta de presentación y el NDA de Miles se encuentran actualmente en estado `COMPLETE`.

? Se comprobó desde React el flujo completo de la Carta de aceptación utilizando a Miles Morales.
? El encargado publicó la plantilla de la Carta de aceptación desde React.
? Miles descargó la plantilla y entregó el documento desde su portal.
? La Carta de aceptación pasó de `PENDING` a `DELIVERED`.
? El encargado revisó y aprobó el documento desde React.
? La Carta de aceptación pasó de `DELIVERED` a `PENDING_SIGNATURE`.
? El encargado cargó desde React la versión firmada por PluriOne.
? El documento pasó de `PENDING_SIGNATURE` a `DOWNLOADABLE`.
? Miles pudo consultar el documento final firmado.
? Miles confirmó la recepción desde su portal.
? La Carta de aceptación pasó finalmente a `COMPLETE`.
? Miles Morales alcanzó 3 de 3 documentos completados.
? El progreso documental se actualizó automáticamente a 100%.
? Se comprobó el flujo documental completo del MVP utilizando únicamente las interfaces React del colaborador y del encargado.

? Se integró desde React el registro visual de nuevos colaboradores.
? Se creó un componente independiente `Register.jsx`.
? Se creó una hoja de estilos independiente `Register.css`.
? El formulario captura nombre completo, CURP, teléfono, correo personal, correo institucional, universidad, siglas, carrera y horas a cumplir.
? Se integró la creación de contraseña para la cuenta del colaborador.
? Se agregó selección de CV y credencial universitaria desde el navegador.
? El registro utiliza `multipart/form-data`.
? React se conectó con `POST /api/accounts/register/`.
? El backend crea automáticamente la cuenta con rol `COLABORADOR`.
? El perfil inicial se crea en estado `DRAFT`.
? Se agregó una pantalla de confirmación después de un registro exitoso.
? Se mejoró visualmente la selección de archivos del formulario.
? Se evitó que el formulario de registro reutilice credenciales de inicio de sesión almacenadas por el navegador.
? Se comprobó el registro real utilizando a Gwen Stacy como colaboradora ficticia.
? Gwen pudo iniciar sesión correctamente con la cuenta creada desde React.
? Su portal muestra correctamente la solicitud en estado `DRAFT`, 0 documentos y 0% de progreso.

? Se integró desde React el envío de la solicitud inicial del colaborador.
? Los colaboradores en estado `DRAFT` visualizan la opción para enviar su solicitud a revisión.
? React se conectó con `POST /api/accounts/application/submit/`.
? Después de enviar la solicitud, el sistema actualiza nuevamente la información del colaborador.
? La solicitud cambia automáticamente de `DRAFT` a `IN_REVIEW`.
? Después del envío, el botón deja de mostrarse para impedir envíos repetidos.
? El colaborador visualiza un mensaje indicando que su información está siendo revisada por PluriOne.
? Se comprobó el flujo utilizando a Gwen Stacy.
? Gwen pasó correctamente de `DRAFT` a `IN_REVIEW` utilizando únicamente React.

? Se integró en React la consulta de solicitudes iniciales pendientes para el encargado.
? El panel del encargado consume `GET /api/accounts/applications/pending/`.
? Las solicitudes en estado `IN_REVIEW` aparecen en una bandeja independiente.
? El encargado puede consultar nombre, correo, universidad, siglas, carrera y horas a cumplir.
? Se agregó la acción para aprobar solicitudes desde React.
? React se conectó con `POST /api/accounts/applications/<id>/review/`.
? Se agregó también la interfaz para solicitar correcciones indicando un motivo obligatorio.
? Se comprobó el flujo de aprobación utilizando a Gwen Stacy.
? Gwen apareció correctamente en la bandeja del encargado con estado `IN_REVIEW`.
? El encargado aprobó la solicitud desde React.
? Después de la aprobación, Gwen dejó de aparecer entre las solicitudes pendientes.
? Al volver a iniciar sesión como colaboradora, su solicitud apareció correctamente en estado `APPROVED`.
? Gwen continúa con 0 documentos y 0% de progreso porque todavía no ha sido asignada a una generación.

? Se mejoró la asignación de colaboradores aprobados a generaciones.
? Al asignar un colaborador a una generación abierta, el backend inicializa automáticamente sus documentos de onboarding.
? Se crean los tres documentos obligatorios: NDA, Carta de presentación y Carta de aceptación.
? Los documentos iniciales se crean en estado `PENDING`.
? Se utiliza `get_or_create()` para evitar duplicados accidentales.
? La asignación y la creación documental se ejecutan dentro de una transacción atómica.
? Se validó el comportamiento utilizando a Gwen Stacy sin modificar permanentemente su estado.
? Durante la prueba Gwen fue asignada temporalmente a la Generación 19 y se generaron correctamente sus tres documentos.
? Después del rollback, Gwen continuó aprobada, sin generación y con 0 documentos, lista para probar la asignación real desde React.

? Se integró desde React la consulta de colaboradores aprobados disponibles para asignación.
? El panel del encargado consume `GET /api/onboarding/collaborators/available/`.
? Los colaboradores aprobados que todavía no pertenecen a una generación aparecen en una sección independiente.
? Se agregó un selector que muestra únicamente generaciones abiertas.
? Se agregó la acción visual para asignar colaboradores a una generación.
? React se conectó con `POST /api/onboarding/generations/<id>/members/`.
? Se comprobó el flujo utilizando a Gwen Stacy.
? Gwen apareció correctamente como colaboradora disponible en estado `APPROVED`.
? El encargado asignó a Gwen a la Generación 19 desde React.
? Después de la asignación, Gwen dejó de aparecer entre los colaboradores disponibles.
? La Generación 19 pasó de 2 a 3 colaboradores.
? Gwen apareció en el tablero como `Gwen Stacy - UPM`.
? Su estado visual inicial es amarillo, `EN PROCESO`.
? Gwen inició con 0 de 3 documentos completados.
? Al iniciar sesión como Gwen aparecieron automáticamente NDA, Carta de presentación y Carta de aceptación en estado `PENDING`.
? El NDA y la Carta de aceptación esperan la publicación de una plantilla por parte de PluriOne.
? La Carta de presentación quedó disponible para carga directa por parte de la colaboradora.


? Se completó desde React el circuito de corrección de solicitudes iniciales.
? Se utilizó a Miguel O'Hara como colaborador ficticio para validar el flujo.
? Miguel creó su cuenta y envió inicialmente su solicitud a revisión.
? El encargado utilizó la opción `Solicitar corrección` desde React.
? La solicitud cambió de `IN_REVIEW` a `NEEDS_CORRECTION`.
? El motivo indicado por el encargado se mostró directamente en el portal del colaborador.
? Se creó un componente independiente `ProfileCorrection.jsx` para gestionar las correcciones sin seguir aumentando innecesariamente `App.jsx`.
? Se creó `ProfileCorrection.css` para el diseño independiente del formulario.
? El colaborador puede consultar y editar sus datos cuando su solicitud se encuentra en `NEEDS_CORRECTION`.
? React utiliza `GET /api/accounts/profile/` para recuperar la información completa del perfil.
? React utiliza `PATCH /api/accounts/profile/` para guardar las correcciones.
? Miguel corrigió las horas a cumplir de 480 a 500.
? Se comprobó desde el panel del encargado que el nuevo valor de 500 horas quedó almacenado correctamente.
? Después de guardar las correcciones, el colaborador puede reenviar la solicitud.
? El reenvío utiliza `POST /api/accounts/application/submit/`.
? La solicitud regresó correctamente de `NEEDS_CORRECTION` a `IN_REVIEW`.
? El encargado realizó una segunda revisión y aprobó la solicitud.
? Miguel terminó correctamente en estado `APPROVED`.
? Miguel continúa con 0 documentos porque todavía no pertenece a una generación.

? Se integró desde React la creación administrativa de generaciones.
? El panel del encargado ahora incluye la opción `+ Nueva generación`.
? Se agregó un formulario para indicar el número de la nueva generación.
? React se conectó con `POST /api/onboarding/generations/create/`.
? Las nuevas generaciones se crean automáticamente en estado `OPEN`.
? Se agregó validación visual para números de generación inválidos o duplicados.
? Después de crear una generación, React actualiza automáticamente el tablero.
? Se utilizó la Generación 21 para validar el flujo.
? La Generación 21 se creó correctamente desde React.
? G21 aparece actualmente en estado `OPEN`.
? La Generación 21 inicia con 0 colaboradores asignados.
? G21 permanecerá abierta temporalmente para comprobar posteriormente el cierre de generaciones desde React.

? Se integró desde React el cierre administrativo de generaciones.
? Las generaciones en estado `OPEN` muestran la acción `Cerrar generación`.
? Antes del cierre se solicita confirmación al encargado.
? React se conectó con `POST /api/onboarding/generations/<id>/close/`.
? Se utilizó la Generación 21 para validar el flujo.
? G21 cambió correctamente de `OPEN` a `CLOSED`.
? Después del cierre, su indicador visual cambió de abierto a cerrado.
? La opción para cerrar desaparece cuando la generación ya se encuentra en estado `CLOSED`.
? Las generaciones cerradas dejan de aparecer en el selector utilizado para asignar colaboradores.
? Miguel O'Hara permaneció disponible para asignación, pero G21 dejó de aparecer entre sus opciones.
? Se realizó adicionalmente una prueba directa contra el backend intentando asignar a Miguel a la Generación 21 cerrada.
? El backend respondió con HTTP 400 y rechazó correctamente la operación.
? Miguel permaneció sin generación después del intento.
? La protección contra asignaciones a generaciones cerradas queda validada tanto en React como en Django.

? Se convirtió el apartado `Mis datos` en una sección funcional del portal del colaborador.
? Se creó el componente independiente `MyProfile.jsx`.
? Se creó la hoja de estilos `MyProfile.css`.
? La sección consulta la información completa mediante `GET /api/accounts/profile/`.
? Se muestran nombre completo, CURP, teléfono, correo personal, correo institucional, universidad, siglas, carrera y horas a cumplir.
? Se muestra el estado actual de la solicitud del colaborador.
? Se comprobó con Miguel O'Hara que la información mostrada corresponde a los datos actuales almacenados.
? La sección mostró correctamente las 500 horas modificadas durante el circuito de corrección.
? El colaborador puede consultar desde la interfaz su CV registrado.
? El colaborador puede consultar desde la interfaz su credencial universitaria.
? Se validó que ambos archivos se abren correctamente en una pestaña independiente.
? El botón `Mis datos` del menú lateral ahora desplaza al usuario hasta su perfil.
? El botón `Documentación` del menú lateral ahora desplaza al usuario hasta `Mis documentos`.

? Se integró el apartado de Notificaciones del MVP.
? Se creó el componente independiente `NotificationsPanel.jsx`.
? Se creó la hoja de estilos `NotificationsPanel.css`.
? Las notificaciones se generan dinámicamente a partir del estado real de la solicitud y de los documentos del colaborador.
? No se agregó una tabla adicional de notificaciones para el MVP; los avisos se derivan de la información actual del proceso.
? Se agregaron avisos para solicitudes en `DRAFT`, `IN_REVIEW`, `NEEDS_CORRECTION` y `APPROVED`.
? Se agregaron avisos para documentos pendientes, en revisión, con corrección solicitada, pendientes de firma y disponibles para descarga.
? El sistema distingue entre avisos informativos y acciones que realmente requieren intervención del colaborador.
? El botón `Notificaciones` del menú lateral ahora desplaza a la sección correspondiente.
? Se validó el comportamiento utilizando a Gwen Stacy.
? Gwen visualizó correctamente tres avisos relacionados con sus documentos.
? NDA y Carta de aceptación mostraron que están esperando una plantilla de PluriOne.
? Carta de presentación apareció como una acción pendiente de entrega.
? El contador indicó correctamente una acción que requiere atención.
? Se validó también el comportamiento utilizando a Miguel O'Hara.
? Miguel visualizó el aviso de que su solicitud fue aprobada y está esperando asignación a una generación.
? Para Miguel se mostró correctamente `Sin acciones urgentes`.


? Se implementó seguimiento automático de documentos detenidos en el backend.
? Se creó el comando administrativo `python manage.py revisar_pendientes`.
? El comando detecta documentos de incorporación que llevan un número configurable de días sin movimiento.
? Por defecto, se consideran detenidos los documentos con 2 días sin cambios.
? El sistema determina automáticamente quién debe realizar la siguiente acción.
? Para NDA y Carta de aceptación pendientes de plantilla, el responsable identificado es PluriOne.
? Para documentos pendientes de entrega, el responsable identificado es el colaborador.
? Para documentos entregados o en revisión, el responsable es PluriOne.
? Para documentos con corrección solicitada, el responsable vuelve a ser el colaborador.
? Para documentos pendientes de firma, el responsable es PluriOne.
? Para documentos disponibles para descarga, el responsable es el colaborador.
? Se configuró el backend de correo de consola de Django para las pruebas del MVP.
? Cada recordatorio incluye colaborador, documento, estado, último movimiento, días sin movimiento, responsable y acción requerida.
? Se agregó `last_reminder_at` a los documentos para controlar la frecuencia de los recordatorios.
? El sistema evita repetir inmediatamente un aviso ya generado.
? Por defecto, un mismo pendiente no vuelve a generar recordatorio antes de 24 horas.
? Se agregó la opción `--dry-run` para simular la revisión sin enviar correos ni modificar la base de datos.
? Se validó el seguimiento automático utilizando los tres documentos pendientes de Gwen Stacy.
? La primera ejecución detectó 3 pendientes y generó 3 recordatorios.
? Una segunda ejecución inmediata detectó 0 pendientes elegibles, comprobando el control anti-spam.

? Se agregaron pruebas automáticas para el módulo `onboarding`.
? `backend/onboarding/tests.py` dejó de estar vacío.
? Se implementaron 5 pruebas automáticas utilizando la base de datos temporal de Django.
? Se validó que un NDA aprobado pase de `DELIVERED` a `COMPLETE`.
? Se validó que una Carta de presentación aprobada pase de `DELIVERED` a `PENDING_SIGNATURE`.
? Se comprobó que un colaborador no pueda modificar documentos pertenecientes a otro colaborador.
? Se comprobó que una generación en estado `CLOSED` rechace nuevas asignaciones.
? Se agregó una prueba para el seguimiento automático de documentos detenidos.
? La prueba automática verifica que un documento detenido genere un recordatorio.
? La misma prueba verifica que el recordatorio no se repita inmediatamente debido al intervalo configurado.
? `python manage.py test onboarding` ejecutó 5 pruebas correctamente.
? El resultado final fue `OK`.

? Se agregaron pruebas automáticas para el módulo `accounts`.
? `backend/accounts/tests.py` dejó de estar vacío.
? Se implementaron 5 pruebas automáticas para el flujo de solicitudes de incorporación.
? Se comprobó que una solicitud en `DRAFT` pueda pasar a `IN_REVIEW`.
? Se comprobó que una solicitud `APPROVED` no pueda enviarse nuevamente.
? Se comprobó que un colaborador no pueda revisar ni aprobar solicitudes.
? Se comprobó que una solicitud de corrección requiera obligatoriamente un motivo.
? Se automatizó la prueba del flujo completo de corrección utilizado previamente con Miguel O'Hara.
? La prueba valida el recorrido `DRAFT → IN_REVIEW → NEEDS_CORRECTION → IN_REVIEW → APPROVED`.
? Durante la prueba de corrección se actualizan las horas a cumplir de 480 a 500.
? Después de la aprobación se conserva correctamente el nuevo valor de 500 horas.
? `python manage.py test accounts` ejecutó 5 pruebas correctamente.
? Se ejecutaron posteriormente `accounts` y `onboarding` juntos.
? `python manage.py test accounts onboarding` encontró y ejecutó 10 pruebas.
? Las 10 pruebas finalizaron correctamente con resultado `OK`.

? Se eliminó el `SECRET_KEY` fijo de `backend/config/settings.py`.
? `SECRET_KEY` ahora se obtiene desde la variable de entorno `SECRET_KEY`.
? El backend detiene el arranque si `SECRET_KEY` no está configurado.
? `DEBUG` dejó de estar fijo en `True`.
? `DEBUG` ahora se obtiene desde la variable de entorno `DEBUG`.
? Se actualizó `.env.example` con las variables `SECRET_KEY` y `DEBUG`.
? La clave real permanece únicamente en `.env`, archivo ignorado por Git.
? Se verificó la configuración con `python manage.py check`.
? Después del cambio se ejecutaron nuevamente las 10 pruebas automáticas.
? `python manage.py test accounts onboarding` finalizó correctamente con resultado `OK`.

? Se integraron recordatorios automáticos persistentes dentro de la aplicación web.
? Se creó el modelo `AutomaticNotification` para almacenar los avisos generados por el seguimiento automático.
? Cada notificación conserva destinatario, documento relacionado, estado del documento, responsable, días sin movimiento, mensaje y fecha de generación.
? El comando `python manage.py revisar_pendientes` ahora, además de enviar el recordatorio por correo, registra el aviso en PostgreSQL.
? Se mantiene el control mediante `last_reminder_at` para evitar repetir recordatorios antes del intervalo configurado.
? Los recordatorios automáticos respetan al responsable de la siguiente acción.
? Si la acción corresponde al colaborador, el aviso se asigna únicamente a ese colaborador.
? Si la acción corresponde a PluriOne, el aviso se asigna a los encargados activos.
? Se creó la API `GET /api/onboarding/notifications/mine/`.
? Cada usuario autenticado consulta únicamente las notificaciones automáticas dirigidas a su propia cuenta.
? React consulta la API de notificaciones automáticas desde `NotificationsPanel.jsx`.
? Los recordatorios generados automáticamente se muestran dentro de la sección Notificaciones del portal.
? Los avisos automáticos se distinguen visualmente de los avisos derivados del estado actual.
? Una notificación automática deja de mostrarse como vigente cuando el documento relacionado cambia del estado en el que se generó.
? Se agregó una prueba automática para validar la consulta de notificaciones por usuario.
? Las pruebas de `onboarding` aumentaron de 5 a 6.
? Las pruebas combinadas de `accounts` y `onboarding` aumentaron de 10 a 11.
? `python manage.py test accounts onboarding` finalizó con 11 pruebas y resultado `OK`.
? `npm run lint` finalizó sin errores.
? `npm run build` generó correctamente el build de producción.
? Se comprobó visualmente el flujo utilizando a Gwen Stacy.
? Gwen recibió dentro de la página un recordatorio automático de su Carta de presentación pendiente.

? Se agregó `scripts/revisar_pendientes.ps1` para ejecutar el seguimiento automático sin activar manualmente el entorno virtual.
? El script localiza automáticamente el Python de `.venv` y el `manage.py` del backend.
? El seguimiento periódico utiliza un umbral normal de 2 días y un intervalo mínimo de 24 horas entre recordatorios.
? Se configuró el Programador de tareas de Windows para ejecutar el seguimiento cada hora.
? La tarea se registró como `PluriOne Seguimiento Automatico`.
? Se permitió la ejecución de la tarea cuando el equipo funciona con batería.
? Se configuró `StartWhenAvailable` para facilitar la recuperación de ejecuciones disponibles.
? Se comprobó una ejecución iniciada directamente desde el Programador de tareas.
? `LastTaskResult` devolvió `0`.
? `NumberOfMissedRuns` devolvió `0`.
? La tarea regresó correctamente al estado `Ready`.
? Windows registró automáticamente la siguiente ejecución una hora después.
? El script registra cada ejecución en `%LOCALAPPDATA%\PluriOne\logs\revisar_pendientes.log`.
? El log confirmó la ejecución real de Django y finalizó con código `0`.
? El seguimiento automático ya no depende de ejecutar manualmente `python manage.py revisar_pendientes`.

? Se actualizó la documentación técnica principal del proyecto.
? Se renombró `docs/PRB.md` a `docs/PRD.md` para utilizar la terminología correcta de Product Requirements Document.
? Se conservaron en la bitácora las referencias históricas al antiguo nombre `PRB.md`.
? Se creó documentación propia para `frontend/README.md`, reemplazando la plantilla predeterminada de Vite.
? Se documentaron los requisitos de Node.js y npm para ejecutar el frontend.
? Se aclaró que Node.js se utiliza únicamente para React y Vite y no forma parte del backend.
? Se documentó la ejecución del frontend mediante `npm install` y `npm run dev`.
? Se documentó el proxy de Vite hacia el backend Django en `http://127.0.0.1:8000`.
? Se actualizaron los endpoints principales actualmente implementados.
? Se documentó el endpoint `GET /api/onboarding/notifications/mine/`.
? Se documentó la ejecución periódica de `revisar_pendientes` mediante el Programador de tareas de Windows.
? Se ejecutó `python manage.py check` sin detectar problemas.
? Se ejecutó `python manage.py makemigrations --check --dry-run` y no se detectaron migraciones pendientes.
? Se ejecutaron 11 pruebas automáticas de `accounts` y `onboarding`, todas con resultado `OK`.
? Se ejecutó `npm run lint` sin errores.
? Se ejecutó `npm run build` correctamente.

? Se revisó la reproducibilidad de `requirements.txt`.
? Se detectó que `requirements.txt` estaba almacenado en UTF-16 LE con BOM.
? Se normalizó `requirements.txt` a UTF-8.
? Se conservaron las 11 dependencias y sus versiones actuales.
? El archivo pasó de 472 bytes a 224 bytes al eliminar la codificación UTF-16 innecesaria.
? Se comprobó la instalación declarada mediante `python -m pip install --dry-run -r requirements.txt`.
? Todas las dependencias declaradas fueron reconocidas correctamente por pip.
? Se ejecutó `python -m pip check` y no se encontraron dependencias rotas.
? `git diff --check` no detectó errores de formato.

? Se regeneró el respaldo `db/base-de-datos.sql` utilizando PostgreSQL 18.6.
? El respaldo fue generado a partir del estado actual de la base `plurione_onboarding`.
? El nuevo respaldo incluye la migración `0004_automaticnotification`.
? Se comprobó la presencia de las tablas actuales de `accounts` y `onboarding`.
? Se confirmó la inclusión de la tabla `onboarding_automaticnotification`.
? Se creó una base temporal `plurione_restore_test` para validar la restauración completa del respaldo.
? El respaldo fue restaurado con `ON_ERROR_STOP=1` para detener la ejecución ante cualquier error SQL.
? La restauración finalizó con código de salida `0`.
? La base restaurada contiene las 15 tablas esperadas.
? Se comprobaron las seis migraciones actuales de `accounts` y `onboarding`.
? Se validaron los datos restaurados: 5 usuarios, 4 perfiles, 3 generaciones, 3 asignaciones, 9 documentos y 3 notificaciones automáticas.
? La base temporal utilizada para la prueba fue eliminada después de completar la validación.

? Se inició la modularización de `frontend/src/App.jsx`.
? Se extrajo la revisión de solicitudes del encargado a `PendingApplication.jsx`.
? `App.jsx` se redujo de 3,910 a 3,656 líneas sin modificar el comportamiento funcional.
? Después de la extracción, `npm run lint` y `npm run build` finalizaron correctamente.

? Se extrajo la revisión y gestión documental del encargado a `PendingDocument.jsx`.
? `App.jsx` pasó de 3,656 a 3,040 líneas; `npm run lint` y `npm run build` finalizaron correctamente después de la extracción.

? Se extrajeron los componentes compartidos del dashboard a `DashboardShared.jsx` y el panel completo del encargado a `ManagerHome.jsx`.
? `App.jsx` se redujo de 3,910 a aproximadamente 1,822 líneas; `npm run lint` y `npm run build` continúan finalizando correctamente.

? Se extrajo el portal completo del colaborador a `CollaboratorHome.jsx`, incluyendo su gestión documental.
? `App.jsx` se redujo de 3,910 a 980 líneas y las validaciones `npm run lint` y `npm run build` continúan finalizando correctamente.

? Se separaron las vistas de autenticación, transición de acceso y selector de tema en `AuthViews.jsx`.
? La modularización principal del frontend quedó completada: `App.jsx` pasó de 3,910 a 618 líneas y mantiene correctamente `npm run lint` y `npm run build`.

? Se centralizaron las utilidades `firstName` e `initials` en `frontend/src/utils/nombres.js`, eliminando duplicación entre los componentes del frontend.

? Se organizó el módulo administrativo en `frontend/src/manager/`, agrupando `ManagerHome`, `PendingApplication` y `PendingDocument`.
? Después de reorganizar las rutas de importación, `npm run lint` y `npm run build` finalizaron correctamente.

? Se organizó el portal del colaborador en `frontend/src/collaborator/`, agrupando la vista principal, perfil, correcciones y notificaciones con sus estilos.
? La reorganización fue validada con `npm run lint` y `npm run build` sin errores.

? Se organizaron las vistas de autenticación en `frontend/src/auth/`, agrupando `AuthViews`, `Register` y sus estilos.
? La reorganización fue validada con `npm run lint` y `npm run build` sin errores.

? Se realizó una validación visual completa después de la reorganización del frontend. Los portales de colaborador y encargado cargan correctamente y las solicitudes al backend responden sin errores.

? Se validó una instalación limpia desde un clon nuevo del repositorio: entorno virtual, dependencias Python, restauración PostgreSQL, migraciones, 11 pruebas automatizadas, seguimiento en `dry-run`, dependencias frontend, lint, build y ejecución de ambos roles.

? Se ajustó la configuración de Django para México mediante `LANGUAGE_CODE="es-mx"` y `TIME_ZONE="America/Mexico_City"`, y `ALLOWED_HOSTS` quedó configurable mediante variables de entorno.



## EN PROGRESO

1.- Simplificar el README principal.
2.- Documentar de forma breve el uso de IA durante el desarrollo.
3.- Ejecutar las validaciones finales del proyecto.



## Próximo paso

1.- Simplificar el README y trasladar el historial detallado a la bitácora.
2.- Eliminar inconsistencias de formato pendientes.
3.- Agregar una sección breve sobre el uso de IA.
4.- Ejecutar las validaciones finales de backend y frontend.

28 de octubre de 2026 - Simplificación del README

Actividad:

Se reorganizó README.md para dejarlo enfocado en la instalación, ejecución y verificación del sistema.

Trabajo realizado:

• El README pasó de 1,385 líneas a 460 líneas.
• El historial de desarrollo ya había sido trasladado previamente a docs/BITACORA.md.
• Se eliminaron las secciones Completado, En progreso y Próximo paso del README.
• Se eliminaron los residuos de formato \--- y &#x20;.
• Se evitó el uso de encabezados con # y separadores innecesarios.
• Se reorganizaron las instrucciones utilizando numeración, puntos y texto simple.
• Se conservaron los pasos necesarios para montar el backend y frontend.
• Se incluyó la configuración de .env.
• Se incluyó la restauración de PostgreSQL.
• Se incluyó la copia de demo_media.
• Se incluyeron los comandos de pruebas del backend.
• Se incluyeron npm run lint y npm run build.
• Se incluyó revisar_pendientes --dry-run.
• Se agregó una solución alternativa para Windows cuando psql no está disponible en PATH.
• Se documentó el caso de tokens JWT inválidos después de cambiar SECRET_KEY.
• Se agregó la sección Uso de inteligencia artificial.
• Se agregó evidencia resumida de la instalación limpia validada.
• Se corrigió la codificación del README y se verificó que permaneciera en UTF-8.

Resultado:

README.md funciona ahora como manual para instalar, ejecutar y comprobar PluriOne Onboarding.

El historial detallado del desarrollo permanece en docs/BITACORA.md.

EN PROGRESO

• Revisión final de documentación.
• Validaciones finales del sistema.

PRÓXIMO PASO

1.- Revisar que README.md contenga todos los comandos necesarios.
2.- Ejecutar las validaciones finales del backend.
3.- Ejecutar las validaciones finales del frontend.
4.- Revisar el estado final del repositorio antes de la entrega.

28 de octubre de 2026 - Prueba con DEBUG=False

Actividad:

Se realizó una prueba temporal del sistema utilizando DEBUG=False para comprobar el comportamiento del proyecto fuera del modo normal de desarrollo.

Entorno probado:

• Commit probado: db23060.
• Windows.
• Python 3.12.10.
• DEBUG=False.
• ALLOWED_HOSTS efectivo: 127.0.0.1 y localhost.

Validaciones realizadas:

• python manage.py check finalizó sin problemas.
• Django reconoció DEBUG=False correctamente.
• http://127.0.0.1:8000/admin/ respondió HTTP 302.
• http://localhost:8000/admin/ respondió HTTP 302.
• El inicio de sesión continuó funcionando.
• El portal del colaborador cargó correctamente.
• Mis datos cargó correctamente.
• Documentación cargó correctamente.
• Notificaciones cargó correctamente.
• El panel del encargado cargó correctamente.
• Generaciones y pendientes cargaron correctamente.
• Los documentos permanecieron registrados y visibles dentro del sistema.

Prueba de archivos MEDIA:

Al intentar abrir directamente un documento almacenado en MEDIA se obtuvo 404 Not Found.

La prueba se realizó con el archivo:

    /media/onboarding/signed/peter_carta_aceptacion_firmada_empresa.txt

El resultado es esperado porque la configuración actual de urls.py sólo sirve MEDIA directamente cuando DEBUG está activo.

Para un despliegue de producción los archivos de MEDIA deberán ser servidos mediante infraestructura destinada a archivos estáticos o multimedia.

Observación encontrada durante la prueba:

Inicialmente Django continuaba mostrando DEBUG=True aunque .env ya contenía DEBUG=False.

Se comprobó que la sesión de PowerShell tenía una variable de entorno DEBUG=True que tenía prioridad sobre el archivo .env.

Se eliminó temporalmente de la sesión mediante:

    Remove-Item Env:DEBUG

Después de retirarla, Django reconoció correctamente DEBUG=False.

Resultado:

Las funciones principales del sistema continuaron operando con DEBUG=False. La diferencia observada fue que Django dejó de servir directamente los archivos MEDIA, comportamiento esperado para esta configuración.

Al finalizar la prueba se restauró DEBUG=True para continuar con el entorno local de desarrollo.
