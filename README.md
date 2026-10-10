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




\---

## En progreso

1\. Preparar la estructura inicial del proyecto.

2\. Crear el backend base con Django.

3\. Configurar Django REST Framework.

4\. Preparar PostgreSQL.

5\. Iniciar el desarrollo paso a paso comenzando por el registro de colaboradores.---

## Próximo paso
1. Crear la API para consultar colaboradores disponibles para asignación.
2. Mostrar únicamente colaboradores aprobados sin generación.
3. Facilitar la selección desde el futuro frontend React.
4. Continuar con el seguimiento visual por generación.
5. Preparar posteriormente los estados de tarjetas.
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