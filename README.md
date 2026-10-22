# PluriOne Onboarding

## Objetivo del proyecto

Desarrollar un sistema de seguimiento automático del proceso de incorporación de nuevos colaboradores para PluriOne.

El sistema permitirá centralizar información, documentación, revisiones, aprobaciones, responsables, pendientes y el estado general de cada incorporación.

El caso inicial de referencia será el de practicantes y residentes profesionales, manteniendo la posibilidad de adaptar el proceso a otros tipos de colaboradores sin salir del objetivo principal del proyecto.

\---

## Estado actual

**Fase actual:** definición y documentación inicial del proyecto.

Actualmente se está trabajando en definir con claridad qué se va a desarrollar antes de comenzar con la programación.



**Fase actual:** inicio del desarrollo.

La documentación inicial del proyecto ya fue definida y se comenzó la construcción de la base técnica del sistema.
\---

## Completado

* Repositorio privado creado en GitHub.
* Git instalado y configurado en el equipo.
* Repositorio clonado correctamente.
* Repositorio local conectado con GitHub.
* Alcance general del sistema analizado.
* Caso real de incorporación utilizado como referencia para detectar necesidades.
* Se definió que el sistema se enfocará en el seguimiento de incorporación y no en la gestión de proyectos o entregables técnicos.
* Se definió la visualización general por generaciones mediante tarjetas o cuadros de estado.
* Se definió el PRB del proyecto.
* Se definió el stack tecnológico base propuesto.
* &#x20;MVP definido y aprobado.
* &#x20;MVP agregado a la documentación del proyecto.

- Entorno virtual de Python creado.
- Django 6.1.1 instalado.
- Backend base creado con Django.
- Proyecto Django configurado en `backend/`.
- Verificación con `python manage.py check` completada correctamente.
- Servidor de desarrollo probado correctamente en `http://127.0.0.1:8000/`.
- Archivo `requirements.txt` creado.
- Archivo `.gitignore` configurado.

- PostgreSQL 18.6 instalado y configurado.
- Base de datos `plurione_onboarding` creada.
- Django conectado correctamente con PostgreSQL.
- Migraciones iniciales aplicadas correctamente.
- Django REST Framework 3.18.1 instalado y configurado.

- Se creó la aplicación Django `accounts`.
- Se implementó un usuario personalizado basado en `AbstractUser`.
- El inicio de sesión utiliza correo electrónico en lugar de username.
- Se definieron los roles iniciales: Colaborador y Encargado.
- Se creó el perfil inicial del colaborador.
- El perfil contempla datos personales, académicos, CV y credencial universitaria.
- Se implementaron los estados de solicitud: Borrador, En revisión, Requiere corrección y Aprobado.
- Se validó el acceso al administrador de Django mediante correo electrónico.
- Las migraciones del módulo `accounts` fueron aplicadas correctamente en PostgreSQL.

- Se registraron `User` y `CollaboratorProfile` en Django Admin.
- Se configuró el almacenamiento local de archivos mediante `MEDIA_ROOT` y `MEDIA_URL`.
- Se creó la primera API REST del sistema para registrar colaboradores.
- El registro crea automáticamente una cuenta con rol `COLABORADOR`.
- El registro crea también el perfil inicial del colaborador.
- Se implementaron validaciones de correo y CURP duplicados.
- Se utilizó una transacción atómica para evitar registros incompletos.
- Se probó correctamente el registro mediante una petición HTTP multipart.
- Se comprobó el almacenamiento de CV y credencial universitaria.
- Se verificó el registro completo en PostgreSQL.

- Se implementó autenticación mediante JWT para la API.
- Se configuraron tokens de acceso y renovación.
- Se creó el endpoint de inicio de sesión `POST /api/auth/login/`.
- Se creó el endpoint de renovación `POST /api/auth/refresh/`.
- Se protegieron las operaciones privadas mediante autenticación.
- Se creó el endpoint `POST /api/accounts/application/submit/`.
- El colaborador autenticado puede enviar únicamente su propia solicitud.
- Una solicitud puede pasar de `DRAFT` a `IN_REVIEW`.
- También se permite reenviar una solicitud que estaba en `NEEDS_CORRECTION`.
- Se comprobó que los tokens vencidos son rechazados.
- Se probó correctamente el envío de la solicitud de Peter Parker.

- Se creó el endpoint para listar solicitudes pendientes de revisión.
- Solo los usuarios con rol `ENCARGADO` pueden consultar solicitudes pendientes.
- Se creó el endpoint para revisar una solicitud individual.
- El encargado puede aprobar una solicitud.
- El encargado puede solicitar una corrección indicando obligatoriamente el motivo.
- Se implementaron los estados `IN_REVIEW`, `NEEDS_CORRECTION` y `APPROVED` dentro del flujo de revisión.
- Se comprobó que una solicitud corregida puede reenviarse.
- Se probó el circuito completo utilizando al colaborador ficticio Peter Parker.

- Se creó el endpoint para que el colaborador consulte su propio perfil.
- El colaborador puede consultar su estado y el motivo de una corrección.
- Se creó la actualización parcial del perfil mediante `PATCH`.
- Los perfiles en estado `DRAFT` pueden modificarse.
- Los perfiles en estado `NEEDS_CORRECTION` pueden modificarse.
- Los perfiles en estado `IN_REVIEW` no pueden modificarse.
- Los perfiles en estado `APPROVED` no pueden modificarse.
- Se comprobó el flujo real de corrección utilizando a Miles Morales.
- El motivo de corrección se elimina automáticamente cuando la solicitud es reenviada.

- Se creó la aplicación Django `onboarding`.
- Se implementó el modelo de generaciones.
- Las generaciones pueden estar en estado `OPEN` o `CLOSED`.
- Se creó la relación entre colaboradores y generaciones.
- Solo los colaboradores en estado `APPROVED` pueden pertenecer a una generación.
- Solo pueden agregarse colaboradores a generaciones abiertas.
- Un colaborador solo puede pertenecer a una generación.
- Se registraron generaciones y asignaciones en Django Admin.
- El administrador muestra únicamente colaboradores aprobados disponibles.
- El administrador muestra únicamente generaciones abiertas disponibles.
- Se creó y probó la Generación 19.
- Peter Parker fue asignado correctamente a la Generación 19.

- Se creó el serializer de generaciones.
- Se creó la API `GET /api/onboarding/generations/`.
- La API permite al encargado consultar las generaciones registradas.
- Cada generación muestra su estado, cantidad de integrantes y lista de colaboradores.
- La consulta está protegida mediante autenticación JWT.
- Solo los usuarios con rol `ENCARGADO` pueden consultar las generaciones.
- Se comprobó correctamente la Generación 19 con Peter Parker - UPAM como integrante.

- Se creó la API para crear generaciones.
- Se creó la API para asignar colaboradores a generaciones.
- Se creó la API para cerrar generaciones.
- Solo los colaboradores en estado `APPROVED` pueden asignarse.
- Se bloqueó la asignación de colaboradores en estado `IN_REVIEW`.
- Se bloqueó la asignación de colaboradores a generaciones `CLOSED`.
- Se creó y probó la Generación 20 mediante API.
- Se comprobó correctamente el cierre de una generación.

- Se creó la API para consultar colaboradores disponibles para asignación.
- La API muestra únicamente colaboradores en estado `APPROVED` que todavía no pertenecen a una generación.
- Se comprobó que un colaborador en `IN_REVIEW` no aparece disponible.
- Se comprobó que un colaborador aprobado aparece automáticamente como disponible.
- Se asignó a Miles Morales - UTP a la Generación 19 mediante API.
- Después de la asignación, Miles dejó de aparecer entre los colaboradores disponibles.
- La Generación 19 quedó con dos integrantes: Peter Parker - UPAM y Miles Morales - UTP.

- Se creó la API de detalle de una generación.
- El encargado puede consultar una generación específica por su identificador.
- El detalle incluye el estado de la generación y la cantidad de integrantes.
- Cada integrante incluye nombre, universidad, carrera y estado de solicitud.
- Se agregó el formato `card_label` para representar las tarjetas como `Nombre - SIGLAS`.
- Se comprobó correctamente la Generación 19 con Peter Parker - UPAM y Miles Morales - UTP.

- Se creó el modelo `OnboardingDocument` para controlar la documentación del proceso de incorporación.
- Se definieron los tipos de documento: NDA, Carta de presentación y Carta de aceptación.
- Se definieron estados documentales como `PENDING`, `DELIVERED`, `IN_REVIEW`, `NEEDS_CORRECTION`, `PENDING_SIGNATURE`, `SIGNED`, `DOWNLOADABLE` y `COMPLETE`.
- Se agregaron campos para plantilla de empresa, archivo del colaborador y archivo firmado por la empresa.
- Se creó y aplicó la migración `0002_onboardingdocument`.
- El modelo se registró en Django Admin.
- Se crearon seis documentos de prueba para Peter Parker y Miles Morales.
- Se validó en PostgreSQL que un colaborador no pueda tener dos documentos del mismo tipo.

- Se creó la API `GET /api/onboarding/documents/mine/`.
- La API permite que cada colaborador consulte únicamente sus propios documentos.
- Se agregaron etiquetas legibles para tipo de documento y estado.
- Se comprobó que Peter Parker recibe exactamente sus tres documentos.
- Se comprobó que los tres documentos se encuentran inicialmente en estado `PENDING`.
- Se comprobó que el rol `ENCARGADO` no puede utilizar la ruta de documentos personales.

- Se implementó la carga de archivos documentales por parte del colaborador.
- Se creó la API `POST /api/onboarding/documents/<id>/upload/`.
- La carga utiliza `multipart/form-data`.
- El colaborador solamente puede modificar documentos pertenecientes a su propia cuenta.
- Se permite la carga cuando el documento está en `PENDING` o `NEEDS_CORRECTION`.
- Al entregar un archivo, el documento cambia automáticamente a `DELIVERED`.
- Se probó el flujo con el NDA de Peter Parker.
- El archivo ficticio fue almacenado correctamente en `media/onboarding/collaborator_files/`.

- Se creó la bandeja de documentos pendientes para el encargado.
- Los documentos en estado `DELIVERED` aparecen automáticamente para revisión.
- El encargado puede aprobar un documento o solicitar corrección.
- La solicitud de corrección guarda un motivo visible para el colaborador.
- El colaborador puede volver a cargar un documento en `NEEDS_CORRECTION`.
- Al reemplazar un archivo, el sistema elimina automáticamente la versión anterior del almacenamiento.
- El NDA pasa directamente a `COMPLETE` cuando el encargado lo aprueba.
- La Carta de presentación pasa a `PENDING_SIGNATURE` cuando es aprobada.
- Se implementó la carga del documento firmado por la empresa.
- Después de la firma de la empresa, el documento pasa a `DOWNLOADABLE`.
- El colaborador puede confirmar la recepción del documento.
- Al confirmar la recepción, el documento pasa a `COMPLETE`.
- Se probó completamente el flujo del NDA de Peter Parker.
- Se probó completamente el flujo de la Carta de presentación de Peter Parker.

- Se implementó el flujo específico de la Carta de aceptación.
- La empresa puede publicar una plantilla para el colaborador.
- El colaborador no puede entregar la Carta de aceptación antes de que exista una plantilla.
- El colaborador puede consultar y utilizar la plantilla publicada.
- La Carta de aceptación puede ser entregada, revisada, firmada y devuelta.
- Se comprobó el flujo completo `PENDING → DELIVERED → PENDING_SIGNATURE → DOWNLOADABLE → COMPLETE`.
- Peter Parker completó correctamente los tres documentos principales del proceso de incorporación.
- Se comprobó la existencia física de los archivos firmados por la empresa.

- Se implementó el cálculo automático del estado visual de los colaboradores.
- Las tarjetas utilizan los estados `GREEN`, `YELLOW` y `RED`.
- `GREEN` indica que los tres documentos requeridos están en `COMPLETE`.
- `RED` indica que existe al menos un documento en `NEEDS_CORRECTION`.
- `YELLOW` representa cualquier otro estado normal del proceso.
- Se agregó el conteo de documentos completados y documentos totales.
- Se comprobó a Peter Parker - UPAM en `GREEN` con 3/3 documentos completos.
- Se comprobó a Miles Morales - UTP inicialmente en `YELLOW`.
- Después de solicitar una corrección documental a Miles Morales, su tarjeta cambió automáticamente a `RED`.

- Se inició la construcción del frontend con React y Vite.
- Se creó una interfaz visual de inicio de sesión para PluriOne.
- El login de React fue conectado con la autenticación JWT de Django.
- Los tokens `access` y `refresh` se almacenan en el navegador después de iniciar sesión.
- Se configuró el proxy de Vite para comunicar React con la API de Django durante el desarrollo.
- Se creó `GET /api/accounts/me/` para identificar al usuario autenticado y su rol.
- El frontend distingue automáticamente entre `COLABORADOR` y `ENCARGADO`.
- Se implementó restauración de sesión al recargar la página.
- Se implementó renovación automática del token de acceso utilizando el refresh token.
- Se creó el primer panel del colaborador.
- El panel del colaborador muestra nombre, universidad, carrera, estado de solicitud y progreso documental.
- El frontend consulta los documentos reales del colaborador mediante la API.
- Se comprobó a Peter Parker con 3/3 documentos completos y 100% de progreso.
- Se creó el primer panel del encargado.
- El panel del encargado consume las generaciones reales del backend.
- Se muestran las generaciones abiertas y cerradas disponibles.
- Se muestran las tarjetas de colaboradores con sus estados visuales automáticos.
- Peter Parker - UPAM aparece en verde con 3/3 documentos completos.
- Miles Morales - UTP aparece en rojo porque requiere corrección.
- Se integró el panel de documentos pendientes del encargado.
- Se mejoró el diseño visual del login y de los paneles.
- Se implementó una transición animada entre la portada del login y el formulario de acceso.

- Se implementaron tres temas visuales para la interfaz: PluriOne, Claro y Oscuro.
- La preferencia del tema se guarda en el navegador y se recupera automáticamente.
- Se aumentó nuevamente el tamaño de la tipografía para mejorar la legibilidad.
- Se mejoró la transición visual entre la portada y el formulario de inicio de sesión.
- Se creó una pantalla de transición animada durante la autenticación.
- La pantalla de transición muestra los estados de validación y preparación del espacio del usuario.
- Se agregó una silueta animada y elementos visuales de carga para evitar pantallas aparentemente congeladas.
- Las mejoras visuales mantienen intacta la autenticación JWT y la separación entre roles.

- Se integró la entrega de documentos del colaborador desde React.
- Los documentos en estado `PENDING` o `NEEDS_CORRECTION` pueden mostrar la opción de carga cuando las reglas del backend lo permiten.
- El colaborador puede seleccionar un archivo desde la interfaz y enviarlo mediante `multipart/form-data`.
- Después de una entrega correcta, React vuelve a consultar los datos del backend y actualiza automáticamente la tarjeta.
- Se comprobó el flujo utilizando a Miles Morales y su Carta de presentación en estado `NEEDS_CORRECTION`.
- Miles entregó la corrección desde React y el documento cambió correctamente a `DELIVERED`.
- El motivo de corrección anterior desapareció después de la nueva entrega.
- El archivo entregado puede consultarse desde la misma tarjeta.

- Se integró la revisión documental del encargado desde React.
- Los documentos en estado `DELIVERED` aparecen en la bandeja de pendientes.
- El encargado puede abrir el archivo entregado por el colaborador.
- Se implementó la acción de aprobar documentos desde la interfaz.
- Se implementó la acción de solicitar correcciones desde la interfaz.
- Al solicitar una corrección se exige indicar un motivo.
- Después de una decisión, el frontend vuelve a consultar automáticamente el estado del sistema.
- Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
- El encargado solicitó una nueva corrección desde React.
- El documento dejó de aparecer entre los pendientes de revisión.
- Miles volvió automáticamente al estado visual `RED`.
- El colaborador pudo consultar el nuevo motivo de corrección desde su portal.

- Se amplió la bandeja del encargado para incluir documentos en `PENDING_SIGNATURE`.
- El panel ahora distingue documentos pendientes de revisión y documentos pendientes de firma.
- Se integró desde React la carga de documentos firmados por la empresa.
- El encargado puede seleccionar el archivo firmado y enviarlo mediante `multipart/form-data`.
- La interfaz utiliza `POST /api/onboarding/documents/<id>/company-sign/`.
- Después de subir correctamente el documento firmado, el sistema actualiza nuevamente la información desde la API.
- Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
- La Carta de presentación pasó correctamente de `PENDING_SIGNATURE` a `DOWNLOADABLE`.
- El documento dejó de aparecer entre los pendientes del encargado después de completar la firma.
- Miles Morales puede consultar desde su portal el documento final firmado por la empresa.

- Se integró desde React la confirmación de recepción de documentos firmados.
- Los documentos en estado `DOWNLOADABLE` muestran al colaborador la opción de confirmar su recepción.
- El colaborador puede consultar el documento final firmado antes de confirmar.
- La interfaz utiliza `POST /api/onboarding/documents/<id>/confirm-receipt/`.
- Después de confirmar la recepción, React actualiza nuevamente la información desde la API.
- Se comprobó el flujo utilizando la Carta de presentación de Miles Morales.
- La Carta de presentación pasó correctamente de `DOWNLOADABLE` a `COMPLETE`.
- El progreso documental de Miles se actualizó automáticamente de 0/3 a 1/3 documentos completos.
- El porcentaje de progreso de Miles cambió automáticamente de 0% a 33%.
- El documento final firmado continúa disponible para consulta después de completar el flujo.

- Se integró desde React la publicación de plantillas por parte del encargado.
- La bandeja de gestión ahora incluye documentos `PENDING` que requieren una plantilla de empresa y todavía no la tienen publicada.
- Se contemplan inicialmente el NDA y la Carta de aceptación.
- El encargado puede seleccionar una plantilla desde el navegador y enviarla mediante `multipart/form-data`.
- La interfaz utiliza `POST /api/onboarding/documents/<id>/company-template/`.
- Después de publicar correctamente una plantilla, React vuelve a consultar la información del sistema.
- El documento permanece en estado `PENDING` porque la siguiente acción corresponde al colaborador.
- Después de publicar la plantilla, el documento deja de aparecer entre los pendientes del encargado.
- Se comprobó el flujo utilizando el NDA de Miles Morales.
- Miles Morales puede descargar desde su portal la plantilla del NDA publicada por PluriOne.
- Después de recibir la plantilla, Miles dispone de la opción para seleccionar y entregar el documento.

- Se comprobó desde React el flujo completo del NDA utilizando a Miles Morales.
- Miles descargó la plantilla del NDA previamente publicada por PluriOne.
- El colaborador entregó el NDA desde su portal.
- El documento pasó correctamente de `PENDING` a `DELIVERED`.
- El encargado recibió el NDA en la bandeja de documentos por gestionar.
- El encargado aprobó el NDA desde React.
- Debido a que el NDA no requiere una firma empresarial posterior, pasó directamente de `DELIVERED` a `COMPLETE`.
- El progreso documental de Miles Morales se actualizó automáticamente de 1/3 a 2/3 documentos completos.
- El porcentaje de progreso se actualizó automáticamente de 33% a 67%.
- La Carta de presentación y el NDA de Miles se encuentran actualmente en estado `COMPLETE`.

- Se comprobó desde React el flujo completo de la Carta de aceptación utilizando a Miles Morales.
- El encargado publicó la plantilla de la Carta de aceptación desde React.
- Miles descargó la plantilla y entregó el documento desde su portal.
- La Carta de aceptación pasó de `PENDING` a `DELIVERED`.
- El encargado revisó y aprobó el documento desde React.
- La Carta de aceptación pasó de `DELIVERED` a `PENDING_SIGNATURE`.
- El encargado cargó desde React la versión firmada por PluriOne.
- El documento pasó de `PENDING_SIGNATURE` a `DOWNLOADABLE`.
- Miles pudo consultar el documento final firmado.
- Miles confirmó la recepción desde su portal.
- La Carta de aceptación pasó finalmente a `COMPLETE`.
- Miles Morales alcanzó 3 de 3 documentos completados.
- El progreso documental se actualizó automáticamente a 100%.
- Se comprobó el flujo documental completo del MVP utilizando únicamente las interfaces React del colaborador y del encargado.

- Se integró desde React el registro visual de nuevos colaboradores.
- Se creó un componente independiente `Register.jsx`.
- Se creó una hoja de estilos independiente `Register.css`.
- El formulario captura nombre completo, CURP, teléfono, correo personal, correo institucional, universidad, siglas, carrera y horas a cumplir.
- Se integró la creación de contraseña para la cuenta del colaborador.
- Se agregó selección de CV y credencial universitaria desde el navegador.
- El registro utiliza `multipart/form-data`.
- React se conectó con `POST /api/accounts/register/`.
- El backend crea automáticamente la cuenta con rol `COLABORADOR`.
- El perfil inicial se crea en estado `DRAFT`.
- Se agregó una pantalla de confirmación después de un registro exitoso.
- Se mejoró visualmente la selección de archivos del formulario.
- Se evitó que el formulario de registro reutilice credenciales de inicio de sesión almacenadas por el navegador.
- Se comprobó el registro real utilizando a Gwen Stacy como colaboradora ficticia.
- Gwen pudo iniciar sesión correctamente con la cuenta creada desde React.
- Su portal muestra correctamente la solicitud en estado `DRAFT`, 0 documentos y 0% de progreso.

- Se integró desde React el envío de la solicitud inicial del colaborador.
- Los colaboradores en estado `DRAFT` visualizan la opción para enviar su solicitud a revisión.
- React se conectó con `POST /api/accounts/application/submit/`.
- Después de enviar la solicitud, el sistema actualiza nuevamente la información del colaborador.
- La solicitud cambia automáticamente de `DRAFT` a `IN_REVIEW`.
- Después del envío, el botón deja de mostrarse para impedir envíos repetidos.
- El colaborador visualiza un mensaje indicando que su información está siendo revisada por PluriOne.
- Se comprobó el flujo utilizando a Gwen Stacy.
- Gwen pasó correctamente de `DRAFT` a `IN_REVIEW` utilizando únicamente React.

- Se integró en React la consulta de solicitudes iniciales pendientes para el encargado.
- El panel del encargado consume `GET /api/accounts/applications/pending/`.
- Las solicitudes en estado `IN_REVIEW` aparecen en una bandeja independiente.
- El encargado puede consultar nombre, correo, universidad, siglas, carrera y horas a cumplir.
- Se agregó la acción para aprobar solicitudes desde React.
- React se conectó con `POST /api/accounts/applications/<id>/review/`.
- Se agregó también la interfaz para solicitar correcciones indicando un motivo obligatorio.
- Se comprobó el flujo de aprobación utilizando a Gwen Stacy.
- Gwen apareció correctamente en la bandeja del encargado con estado `IN_REVIEW`.
- El encargado aprobó la solicitud desde React.
- Después de la aprobación, Gwen dejó de aparecer entre las solicitudes pendientes.
- Al volver a iniciar sesión como colaboradora, su solicitud apareció correctamente en estado `APPROVED`.
- Gwen continúa con 0 documentos y 0% de progreso porque todavía no ha sido asignada a una generación.

- Se mejoró la asignación de colaboradores aprobados a generaciones.
- Al asignar un colaborador a una generación abierta, el backend inicializa automáticamente sus documentos de onboarding.
- Se crean los tres documentos obligatorios: NDA, Carta de presentación y Carta de aceptación.
- Los documentos iniciales se crean en estado `PENDING`.
- Se utiliza `get_or_create()` para evitar duplicados accidentales.
- La asignación y la creación documental se ejecutan dentro de una transacción atómica.
- Se validó el comportamiento utilizando a Gwen Stacy sin modificar permanentemente su estado.
- Durante la prueba Gwen fue asignada temporalmente a la Generación 19 y se generaron correctamente sus tres documentos.
- Después del rollback, Gwen continuó aprobada, sin generación y con 0 documentos, lista para probar la asignación real desde React.

- Se integró desde React la consulta de colaboradores aprobados disponibles para asignación.
- El panel del encargado consume `GET /api/onboarding/collaborators/available/`.
- Los colaboradores aprobados que todavía no pertenecen a una generación aparecen en una sección independiente.
- Se agregó un selector que muestra únicamente generaciones abiertas.
- Se agregó la acción visual para asignar colaboradores a una generación.
- React se conectó con `POST /api/onboarding/generations/<id>/members/`.
- Se comprobó el flujo utilizando a Gwen Stacy.
- Gwen apareció correctamente como colaboradora disponible en estado `APPROVED`.
- El encargado asignó a Gwen a la Generación 19 desde React.
- Después de la asignación, Gwen dejó de aparecer entre los colaboradores disponibles.
- La Generación 19 pasó de 2 a 3 colaboradores.
- Gwen apareció en el tablero como `Gwen Stacy - UPM`.
- Su estado visual inicial es amarillo, `EN PROCESO`.
- Gwen inició con 0 de 3 documentos completados.
- Al iniciar sesión como Gwen aparecieron automáticamente NDA, Carta de presentación y Carta de aceptación en estado `PENDING`.
- El NDA y la Carta de aceptación esperan la publicación de una plantilla por parte de PluriOne.
- La Carta de presentación quedó disponible para carga directa por parte de la colaboradora.


- Se completó desde React el circuito de corrección de solicitudes iniciales.
- Se utilizó a Miguel O'Hara como colaborador ficticio para validar el flujo.
- Miguel creó su cuenta y envió inicialmente su solicitud a revisión.
- El encargado utilizó la opción `Solicitar corrección` desde React.
- La solicitud cambió de `IN_REVIEW` a `NEEDS_CORRECTION`.
- El motivo indicado por el encargado se mostró directamente en el portal del colaborador.
- Se creó un componente independiente `ProfileCorrection.jsx` para gestionar las correcciones sin seguir aumentando innecesariamente `App.jsx`.
- Se creó `ProfileCorrection.css` para el diseño independiente del formulario.
- El colaborador puede consultar y editar sus datos cuando su solicitud se encuentra en `NEEDS_CORRECTION`.
- React utiliza `GET /api/accounts/profile/` para recuperar la información completa del perfil.
- React utiliza `PATCH /api/accounts/profile/` para guardar las correcciones.
- Miguel corrigió las horas a cumplir de 480 a 500.
- Se comprobó desde el panel del encargado que el nuevo valor de 500 horas quedó almacenado correctamente.
- Después de guardar las correcciones, el colaborador puede reenviar la solicitud.
- El reenvío utiliza `POST /api/accounts/application/submit/`.
- La solicitud regresó correctamente de `NEEDS_CORRECTION` a `IN_REVIEW`.
- El encargado realizó una segunda revisión y aprobó la solicitud.
- Miguel terminó correctamente en estado `APPROVED`.
- Miguel continúa con 0 documentos porque todavía no pertenece a una generación.

- Se integró desde React la creación administrativa de generaciones.
- El panel del encargado ahora incluye la opción `+ Nueva generación`.
- Se agregó un formulario para indicar el número de la nueva generación.
- React se conectó con `POST /api/onboarding/generations/create/`.
- Las nuevas generaciones se crean automáticamente en estado `OPEN`.
- Se agregó validación visual para números de generación inválidos o duplicados.
- Después de crear una generación, React actualiza automáticamente el tablero.
- Se utilizó la Generación 21 para validar el flujo.
- La Generación 21 se creó correctamente desde React.
- G21 aparece actualmente en estado `OPEN`.
- La Generación 21 inicia con 0 colaboradores asignados.
- G21 permanecerá abierta temporalmente para comprobar posteriormente el cierre de generaciones desde React.

- Se integró desde React el cierre administrativo de generaciones.
- Las generaciones en estado `OPEN` muestran la acción `Cerrar generación`.
- Antes del cierre se solicita confirmación al encargado.
- React se conectó con `POST /api/onboarding/generations/<id>/close/`.
- Se utilizó la Generación 21 para validar el flujo.
- G21 cambió correctamente de `OPEN` a `CLOSED`.
- Después del cierre, su indicador visual cambió de abierto a cerrado.
- La opción para cerrar desaparece cuando la generación ya se encuentra en estado `CLOSED`.
- Las generaciones cerradas dejan de aparecer en el selector utilizado para asignar colaboradores.
- Miguel O'Hara permaneció disponible para asignación, pero G21 dejó de aparecer entre sus opciones.
- Se realizó adicionalmente una prueba directa contra el backend intentando asignar a Miguel a la Generación 21 cerrada.
- El backend respondió con HTTP 400 y rechazó correctamente la operación.
- Miguel permaneció sin generación después del intento.
- La protección contra asignaciones a generaciones cerradas queda validada tanto en React como en Django.

- Se convirtió el apartado `Mis datos` en una sección funcional del portal del colaborador.
- Se creó el componente independiente `MyProfile.jsx`.
- Se creó la hoja de estilos `MyProfile.css`.
- La sección consulta la información completa mediante `GET /api/accounts/profile/`.
- Se muestran nombre completo, CURP, teléfono, correo personal, correo institucional, universidad, siglas, carrera y horas a cumplir.
- Se muestra el estado actual de la solicitud del colaborador.
- Se comprobó con Miguel O'Hara que la información mostrada corresponde a los datos actuales almacenados.
- La sección mostró correctamente las 500 horas modificadas durante el circuito de corrección.
- El colaborador puede consultar desde la interfaz su CV registrado.
- El colaborador puede consultar desde la interfaz su credencial universitaria.
- Se validó que ambos archivos se abren correctamente en una pestaña independiente.
- El botón `Mis datos` del menú lateral ahora desplaza al usuario hasta su perfil.
- El botón `Documentación` del menú lateral ahora desplaza al usuario hasta `Mis documentos`.

- Se integró el apartado de Notificaciones del MVP.
- Se creó el componente independiente `NotificationsPanel.jsx`.
- Se creó la hoja de estilos `NotificationsPanel.css`.
- Las notificaciones se generan dinámicamente a partir del estado real de la solicitud y de los documentos del colaborador.
- No se agregó una tabla adicional de notificaciones para el MVP; los avisos se derivan de la información actual del proceso.
- Se agregaron avisos para solicitudes en `DRAFT`, `IN_REVIEW`, `NEEDS_CORRECTION` y `APPROVED`.
- Se agregaron avisos para documentos pendientes, en revisión, con corrección solicitada, pendientes de firma y disponibles para descarga.
- El sistema distingue entre avisos informativos y acciones que realmente requieren intervención del colaborador.
- El botón `Notificaciones` del menú lateral ahora desplaza a la sección correspondiente.
- Se validó el comportamiento utilizando a Gwen Stacy.
- Gwen visualizó correctamente tres avisos relacionados con sus documentos.
- NDA y Carta de aceptación mostraron que están esperando una plantilla de PluriOne.
- Carta de presentación apareció como una acción pendiente de entrega.
- El contador indicó correctamente una acción que requiere atención.
- Se validó también el comportamiento utilizando a Miguel O'Hara.
- Miguel visualizó el aviso de que su solicitud fue aprobada y está esperando asignación a una generación.
- Para Miguel se mostró correctamente `Sin acciones urgentes`.


- Se implementó seguimiento automático de documentos detenidos en el backend.
- Se creó el comando administrativo `python manage.py revisar_pendientes`.
- El comando detecta documentos de incorporación que llevan un número configurable de días sin movimiento.
- Por defecto, se consideran detenidos los documentos con 2 días sin cambios.
- El sistema determina automáticamente quién debe realizar la siguiente acción.
- Para NDA y Carta de aceptación pendientes de plantilla, el responsable identificado es PluriOne.
- Para documentos pendientes de entrega, el responsable identificado es el colaborador.
- Para documentos entregados o en revisión, el responsable es PluriOne.
- Para documentos con corrección solicitada, el responsable vuelve a ser el colaborador.
- Para documentos pendientes de firma, el responsable es PluriOne.
- Para documentos disponibles para descarga, el responsable es el colaborador.
- Se configuró el backend de correo de consola de Django para las pruebas del MVP.
- Cada recordatorio incluye colaborador, documento, estado, último movimiento, días sin movimiento, responsable y acción requerida.
- Se agregó `last_reminder_at` a los documentos para controlar la frecuencia de los recordatorios.
- El sistema evita repetir inmediatamente un aviso ya generado.
- Por defecto, un mismo pendiente no vuelve a generar recordatorio antes de 24 horas.
- Se agregó la opción `--dry-run` para simular la revisión sin enviar correos ni modificar la base de datos.
- Se validó el seguimiento automático utilizando los tres documentos pendientes de Gwen Stacy.
- La primera ejecución detectó 3 pendientes y generó 3 recordatorios.
- Una segunda ejecución inmediata detectó 0 pendientes elegibles, comprobando el control anti-spam.

- Se agregaron pruebas automáticas para el módulo `onboarding`.
- `backend/onboarding/tests.py` dejó de estar vacío.
- Se implementaron 5 pruebas automáticas utilizando la base de datos temporal de Django.
- Se validó que un NDA aprobado pase de `DELIVERED` a `COMPLETE`.
- Se validó que una Carta de presentación aprobada pase de `DELIVERED` a `PENDING_SIGNATURE`.
- Se comprobó que un colaborador no pueda modificar documentos pertenecientes a otro colaborador.
- Se comprobó que una generación en estado `CLOSED` rechace nuevas asignaciones.
- Se agregó una prueba para el seguimiento automático de documentos detenidos.
- La prueba automática verifica que un documento detenido genere un recordatorio.
- La misma prueba verifica que el recordatorio no se repita inmediatamente debido al intervalo configurado.
- `python manage.py test onboarding` ejecutó 5 pruebas correctamente.
- El resultado final fue `OK`.

- Se agregaron pruebas automáticas para el módulo `accounts`.
- `backend/accounts/tests.py` dejó de estar vacío.
- Se implementaron 5 pruebas automáticas para el flujo de solicitudes de incorporación.
- Se comprobó que una solicitud en `DRAFT` pueda pasar a `IN_REVIEW`.
- Se comprobó que una solicitud `APPROVED` no pueda enviarse nuevamente.
- Se comprobó que un colaborador no pueda revisar ni aprobar solicitudes.
- Se comprobó que una solicitud de corrección requiera obligatoriamente un motivo.
- Se automatizó la prueba del flujo completo de corrección utilizado previamente con Miguel O'Hara.
- La prueba valida el recorrido `DRAFT → IN_REVIEW → NEEDS_CORRECTION → IN_REVIEW → APPROVED`.
- Durante la prueba de corrección se actualizan las horas a cumplir de 480 a 500.
- Después de la aprobación se conserva correctamente el nuevo valor de 500 horas.
- `python manage.py test accounts` ejecutó 5 pruebas correctamente.
- Se ejecutaron posteriormente `accounts` y `onboarding` juntos.
- `python manage.py test accounts onboarding` encontró y ejecutó 10 pruebas.
- Las 10 pruebas finalizaron correctamente con resultado `OK`.

- Se eliminó el `SECRET_KEY` fijo de `backend/config/settings.py`.
- `SECRET_KEY` ahora se obtiene desde la variable de entorno `SECRET_KEY`.
- El backend detiene el arranque si `SECRET_KEY` no está configurado.
- `DEBUG` dejó de estar fijo en `True`.
- `DEBUG` ahora se obtiene desde la variable de entorno `DEBUG`.
- Se actualizó `.env.example` con las variables `SECRET_KEY` y `DEBUG`.
- La clave real permanece únicamente en `.env`, archivo ignorado por Git.
- Se verificó la configuración con `python manage.py check`.
- Después del cambio se ejecutaron nuevamente las 10 pruebas automáticas.
- `python manage.py test accounts onboarding` finalizó correctamente con resultado `OK`.
\---

## En progreso

1. Limpiar y actualizar completamente el README.
2. Documentar todos los endpoints actuales de onboarding.
3. Documentar instalación y ejecución del frontend.
4. Renombrar `docs/PRB.md` a `docs/PRD.md`.
5. Revisar `frontend/README.md`.
6. Preparar build, base de datos y entrega reproducible final.
\---

## Próximo paso

1. Limpiar información histórica desactualizada del README.
2. Actualizar el estado actual del proyecto.
3. Agregar los endpoints de `onboarding`.
4. Agregar instrucciones completas para levantar React + Vite.
5. Renombrar `docs/PRB.md` a `docs/PRD.md`.
6. Reemplazar la plantilla predeterminada de `frontend/README.md`.
7. Después ejecutar las pruebas técnicas finales.


\---

## Idea principal del sistema

El sistema deberá permitir saber de forma clara:

* Qué información ya fue registrada.
* Qué documentos ya fueron entregados.
* Qué documentos están pendientes.
* Qué documentos están en revisión.
* Qué documentos requieren firma o devolución.
* Quién debe realizar la siguiente acción.
* Qué información está incompleta.
* Qué incorporaciones necesitan atención.
* En qué estado se encuentra cada colaborador.
* Cómo se encuentra una generación completa.

\---

## Visualización por generación

El responsable podrá ingresar a una generación o grupo de incorporación y visualizar a todos sus integrantes mediante tarjetas o cuadros.

Cada tarjeta utilizará un estado visual para facilitar la revisión:

* **Verde:** información y documentación completas.
* **Amarillo:** existen pendientes menores, elementos en revisión o acciones pendientes.
* **Rojo:** existen pendientes importantes o situaciones que requieren atención.

Al seleccionar una tarjeta, el responsable podrá revisar el detalle de los pendientes de esa persona.

\---

## Alcance

El sistema se enfocará en:

* Registro de colaboradores.
* Información personal, académica o laboral necesaria para la incorporación.
* Documentación.
* CV.
* Revisiones.
* Aprobaciones.
* Firmas.
* Devolución de documentos.
* Responsables.
* Capacitaciones relacionadas con la incorporación.
* Generaciones o grupos.
* Proyecto o área asignada como información de referencia.
* Seguimiento automático.
* Alertas y pendientes.
* Estado general de incorporación.

\---

## Fuera del alcance

El sistema no administrará el trabajo técnico que realice una persona después de ser incorporada.

Quedan fuera del alcance:

* PRB de los proyectos asignados.
* MVP de los proyectos asignados.
* Código fuente.
* Commits de los colaboradores.
* Sprints.
* Historias de usuario del proyecto asignado.
* Actividades de programación.
* Entregables académicos.
* Entregables técnicos.
* Seguimiento del desarrollo del proyecto asignado.

La asignación de un proyecto podrá registrarse como parte del proceso de incorporación, pero su desarrollo posterior será independiente.

\---

## Stack tecnológico base

La selección tecnológica se realizó considerando experiencia previa, facilidad de desarrollo, robustez y las necesidades del sistema.

### Frontend

* React
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Python
* Django
* Django REST Framework

### Base de datos

* PostgreSQL

### Control de versiones

* Git
* GitHub

### Arquitectura base

```text
React + Vite
     |
     | API REST
     v
Django REST Framework
     |
     v
Django
     |
     v
PostgreSQL
```

\---

## Tecnologías por evaluar posteriormente

Estas tecnologías no se consideran obligatorias desde el inicio. Solo se integrarán si existe una necesidad concreta que justifique su uso.

* Docker.
* GitHub Actions.
* Redis.
* Celery.
* Azure OpenAI.
* Power BI.
* Microsoft Entra ID.

No se agregará una tecnología únicamente porque aparezca en la propuesta inicial. Cada incorporación tecnológica deberá responder a una necesidad real del sistema.

\---

## Decisiones importantes

* Se utilizará Django en lugar de FastAPI como backend principal.
* Se mantendrá React para construir una interfaz dinámica.
* Django y React se comunicarán mediante una API REST.
* PostgreSQL será la base de datos principal.
* Django REST Framework se utilizará para construir la API.
* El sistema se desarrollará paso a paso.
* PRB y MVP no llevarán números de versión.
* Git será el encargado de conservar el historial de versiones.
* Se utilizarán datos ficticios en documentación, demostraciones y pruebas.
* Los ejemplos podrán utilizar nombres de personajes ficticios.
* El sistema no administrará los entregables técnicos de los colaboradores.
* El README será el documento principal para recuperar rápidamente el contexto del proyecto.

\---

## Documentos importantes

```text
README.md
docs/
├── PRB.md
├── MVP.md
└── BITACORA.md
```

### `README.md`

Indica dónde se encuentra actualmente el proyecto, qué decisiones se han tomado y cuál es el siguiente paso.

Este será el archivo principal que se podrá proporcionar a una IA o a Codex para recuperar rápidamente el contexto del proyecto.

### `docs/PRB.md`

Contiene las ideas, necesidades, problema observado, alcance y propuesta inicial del sistema.

### `docs/MVP.md`

Definirá funcionalmente qué se propone desarrollar.

### `docs/BITACORA.md`

Registrará cronológicamente el trabajo realizado, decisiones, problemas, pruebas y resultados.

La bitácora no reemplaza al historial de Git; ambos se complementan.

\---

## Regla de trabajo

Antes de comenzar una nueva sesión:

1. Leer este `README.md`.
2. Revisar el estado actual.
3. Revisar el próximo paso.
4. Trabajar únicamente en la etapa correspondiente.

Al finalizar una sesión:

1. Registrar lo realizado en `docs/BITACORA.md`.
2. Actualizar este `README.md`.
3. Revisar los cambios.
4. Crear un commit descriptivo.
5. Hacer push a GitHub.

\---

## Regla para controlar el alcance

Antes de agregar una nueva función se deberá responder:

**¿Esta función ayuda a saber cómo va la incorporación de una persona o de una generación?**

Si la respuesta es sí, podrá analizarse como parte del sistema.

Si la función administra el trabajo que la persona realiza después de incorporarse, deberá considerarse fuera del alcance.

\---

## Datos de prueba

Durante el desarrollo se utilizarán datos ficticios.

Ejemplos de nombres permitidos para pruebas:

* Peter Parker.
* Miles Morales.
* Gwen Stacy.
* Miguel O'Hara.
* Natasha Romanoff.
* Tony Stark.

No se utilizarán datos personales reales en ejemplos, demostraciones o documentación pública.







---

# Ejecución del proyecto

## Requisitos

Para ejecutar el proyecto se requiere:

- Python 3.12 o superior
- PostgreSQL
- Git
- pip
- Navegador web

## Preparar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/AddyJuarezV/G19X-UPAM-AJV-707-ACADEMIC.git
cd G19X-UPAM-AJV-707-ACADEMIC
```

Crear el entorno virtual.

### Windows PowerShell

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Instalar las dependencias:

```powershell
python -m pip install -r requirements.txt
```

## Configuración de variables de entorno

En la raíz del proyecto se incluye el archivo:

```text
.env.example
```

Crear una copia llamada:

```text
.env
```

En Windows PowerShell puede hacerse con:

```powershell
Copy-Item .env.example .env
```

Después editar `.env` y colocar la configuración local de PostgreSQL.

Ejemplo:

```env
DB_NAME=plurione_onboarding
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_LOCAL
DB_HOST=127.0.0.1
DB_PORT=5432
```

El archivo `.env` contiene información sensible y no debe subirse al repositorio.

## Base de datos

Crear una base de datos PostgreSQL llamada:

```text
plurione_onboarding
```

Ejemplo desde PostgreSQL:

```sql
CREATE DATABASE plurione_onboarding;
```

El proyecto incluye un respaldo de la base de datos en:

```text
db/base-de-datos.sql
```

Este respaldo contiene la estructura del sistema y datos ficticios utilizados para demostración.

Para importarlo:

```powershell
psql -U postgres -d plurione_onboarding -f .\db\base-de-datos.sql
```

Si `psql` no se encuentra agregado al PATH de Windows, puede utilizarse:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -U postgres `
  -d plurione_onboarding `
  -f ".\db\base-de-datos.sql"
```

## Archivos ficticios de demostración

La base de datos de prueba contiene referencias a CV y credenciales universitarias ficticias.

Estos archivos se encuentran en:

```text
demo_media/
```

Para copiarlos a la carpeta utilizada por Django:

```powershell
New-Item -ItemType Directory -Force .\backend\media | Out-Null
Copy-Item .\demo_media\* .\backend\media\ -Recurse -Force
```

Los archivos incluidos son únicamente de demostración y no contienen información real de personas.

## Ejecutar el backend

Entrar a la carpeta del backend:

```powershell
cd backend
```

Comprobar la configuración del proyecto:

```powershell
python manage.py check
```

Si la configuración es correcta se mostrará:

```text
System check identified no issues (0 silenced).
```

Iniciar el servidor:

```powershell
python manage.py runserver
```

El backend estará disponible en:

```text
http://127.0.0.1:8000/
```

El administrador de Django está disponible en:

```text
http://127.0.0.1:8000/admin/
```

## API implementada actualmente

Actualmente se encuentran implementados, entre otros, los siguientes endpoints:

```text
POST  /api/accounts/register/
POST  /api/auth/login/
POST  /api/auth/refresh/

GET   /api/accounts/profile/
PATCH /api/accounts/profile/

POST  /api/accounts/application/submit/

GET   /api/accounts/applications/pending/
POST  /api/accounts/applications/<id>/review/
```

## Flujo funcional actual

El flujo de una solicitud actualmente puede pasar por los siguientes estados:

```text
DRAFT
  ↓
IN_REVIEW
  ↓
NEEDS_CORRECTION
  ↓
IN_REVIEW
  ↓
APPROVED
```

El colaborador puede:

- crear una cuenta;
- registrar su información;
- consultar su perfil;
- modificar información cuando el estado lo permite;
- enviar su solicitud;
- consultar el motivo de una corrección;
- corregir sus datos;
- reenviar la solicitud.

El encargado puede:

- consultar solicitudes pendientes;
- solicitar correcciones;
- registrar el motivo de una corrección;
- aprobar solicitudes.

## Datos de demostración

La base de datos incluida utiliza únicamente datos ficticios.

Algunos ejemplos son:

```text
Peter Parker - UPAM
Miles Morales - UTP
```

No deben utilizarse datos personales reales dentro del repositorio público.

## Accesos de prueba

Las credenciales necesarias para evaluación no se publican directamente en el repositorio.

Los usuarios y contraseñas de prueba se proporcionarán mediante el apartado:

```text
Mis documentos → Técnicos → Accesos de prueba
```

de la plataforma académica.

## Estado actual

El proyecto continúa en desarrollo.

Entre los siguientes módulos previstos se encuentran:

- generaciones de colaboradores;
- asignación de colaboradores aprobados a generaciones abiertas;
- seguimiento de documentación de incorporación;
- estados visuales de las tarjetas;
- panel de pendientes del encargado;
- frontend con React y Vite.