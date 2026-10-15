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



\---

## En progreso

1. Integrar desde React el registro de nuevos colaboradores.
2. Completar la revisión visual de solicitudes iniciales desde el panel del encargado.
3. Integrar las acciones administrativas de generaciones desde React.
4. Revisar y mejorar los apartados de Mis datos y Notificaciones.
5. Preparar posteriormente las pruebas finales y la entrega reproducible del MVP.
\---

## Próximo paso

1. Implementar el formulario de registro de nuevos colaboradores desde React.
2. Conectar el formulario con `POST /api/accounts/register/`.
3. Permitir cargar desde el registro el CV y la credencial universitaria.
4. Verificar que el nuevo colaborador se cree correctamente en PostgreSQL.
5. Comprobar que pueda iniciar sesión y continuar con su solicitud de incorporación.
6. Continuar después con la revisión inicial de solicitudes desde el panel del encargado.
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