PLURIONE ONBOARDING

Sistema de Seguimiento Automático del Proceso de Incorporación

Este repositorio contiene el sistema desarrollado para dar seguimiento al proceso de incorporación de nuevos colaboradores en PluriOne.

El sistema permite registrar colaboradores, revisar solicitudes, organizar generaciones, gestionar documentos, mostrar pendientes y generar recordatorios automáticos.

Este archivo está enfocado únicamente en explicar cómo preparar, ejecutar y verificar el sistema.

El historial del desarrollo se encuentra en:

    docs/BITACORA.md

La definición funcional se encuentra en:

    docs/PRD.md
    docs/MVP.md


REQUISITOS

Para ejecutar el proyecto se necesita:

• Windows 10 u 11
• Python 3.12 o superior
• PostgreSQL
• Git
• Node.js
• npm
• Navegador web

La instalación limpia más reciente fue validada con:

• Python 3.12.10
• Django 6.1.1
• PostgreSQL 18.6
• Node.js 24.18.0
• npm 11.16.0


1.- CLONAR EL REPOSITORIO

Abrir PowerShell y ejecutar:

    git clone https://github.com/AddyJuarezV/G19X-UPAM-AJV-707-ACADEMIC.git

Entrar al proyecto:

    cd G19X-UPAM-AJV-707-ACADEMIC


2.- CREAR EL ENTORNO VIRTUAL

Crear el entorno virtual:

    python -m venv .venv

Activarlo:

    .\.venv\Scripts\Activate.ps1

Al activarse correctamente debe aparecer (.venv) al inicio de la terminal.


3.- INSTALAR LAS DEPENDENCIAS DEL BACKEND

Desde la raíz del proyecto ejecutar:

    python -m pip install -r requirements.txt

Comprobar que no existan dependencias rotas:

    pip check

El resultado esperado es:

    No broken requirements found.


4.- CONFIGURAR LAS VARIABLES DE ENTORNO

El repositorio incluye:

    .env.example

Crear una copia llamada .env:

    Copy-Item .env.example .env

Abrirla para editarla:

    notepad .env

La configuración debe tener esta estructura:

    SECRET_KEY=TU_CLAVE_SECRETA_LOCAL
    DEBUG=True
    ALLOWED_HOSTS=127.0.0.1,localhost

    DB_NAME=plurione_onboarding
    DB_USER=postgres
    DB_PASSWORD=TU_PASSWORD_DE_POSTGRESQL
    DB_HOST=127.0.0.1
    DB_PORT=5432

Para generar una SECRET_KEY nueva puede utilizarse:

    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

Cada instalación puede utilizar su propia SECRET_KEY.

El archivo .env contiene información local y sensible, por lo que no debe subirse a GitHub.


5.- CREAR LA BASE DE DATOS

Crear en PostgreSQL una base llamada:

    plurione_onboarding

Puede hacerse desde PostgreSQL con:

    CREATE DATABASE plurione_onboarding;


6.- RESTAURAR LA BASE DE DATOS

El respaldo utilizado para montar el sistema se encuentra en:

    db\base-de-datos.sql

Si psql está disponible desde PowerShell ejecutar desde la raíz:

    psql -U postgres -d plurione_onboarding -f .\db\base-de-datos.sql

El respaldo contiene la estructura y datos ficticios utilizados para demostración.


SI WINDOWS NO RECONOCE EL COMANDO PSQL

Durante una instalación limpia se encontró que PostgreSQL estaba instalado correctamente, pero PowerShell no reconocía el comando:

    psql --version

El mensaje indicaba que psql no se reconocía como comando.

Esto puede ocurrir cuando la carpeta bin de PostgreSQL no está agregada al PATH de Windows.

Primero comprobar las versiones instaladas:

    Get-ChildItem "C:\Program Files\PostgreSQL"

Si aparece la carpeta 18, comprobar psql directamente:

    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" --version

Para PostgreSQL 18 también puede restaurarse la base de esta forma:

    & "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
      -U postgres `
      -d plurione_onboarding `
      -f ".\db\base-de-datos.sql"

En la prueba realizada esta alternativa funcionó correctamente con PostgreSQL 18.6.


7.- COPIAR LOS ARCHIVOS DE DEMOSTRACIÓN

El repositorio incluye archivos ficticios dentro de:

    demo_media

Crear la carpeta utilizada por Django:

    New-Item -ItemType Directory -Force .\backend\media | Out-Null

Copiar los archivos:

    Copy-Item .\demo_media\* .\backend\media\ -Recurse -Force

Estos archivos son únicamente para demostración y no contienen información personal real.


8.- APLICAR Y COMPROBAR MIGRACIONES

Entrar al backend:

    cd backend

Ejecutar:

    python manage.py migrate

Si se restauró el respaldo actual, normalmente se mostrará:

    No migrations to apply.

Comprobar que Django está correctamente configurado:

    python manage.py check

Resultado esperado:

    System check identified no issues


9.- EJECUTAR EL BACKEND

Desde la carpeta backend:

    python manage.py runserver

El servidor estará disponible en:

    http://127.0.0.1:8000/

El administrador de Django se encuentra en:

    http://127.0.0.1:8000/admin/

La terminal del backend debe permanecer abierta mientras se utiliza el sistema.


10.- EJECUTAR EL FRONTEND

Abrir una segunda terminal.

Entrar a la carpeta frontend:

    cd C:\RUTA\DEL\PROYECTO\frontend

Instalar las dependencias:

    npm install

Ejecutar Vite:

    npm run dev

Normalmente estará disponible en:

    http://localhost:5173/

Durante el desarrollo, Vite envía las peticiones realizadas a /api hacia Django en:

    http://127.0.0.1:8000/


11.- VERIFICAR EL BACKEND

Desde backend ejecutar:

    python manage.py check

Comprobar que no existan cambios pendientes de migraciones:

    python manage.py makemigrations --check --dry-run

Ejecutar las pruebas automáticas:

    python manage.py test accounts onboarding

La validación actual ejecuta:

    11 pruebas

Resultado esperado:

    OK


12.- VERIFICAR EL SEGUIMIENTO AUTOMÁTICO

El sistema incluye un comando para detectar procesos detenidos y generar recordatorios.

Para probarlo sin modificar información:

    python manage.py revisar_pendientes --dry-run

La configuración utilizada trabaja con:

    2 días de antigüedad
    24 horas antes de repetir un recordatorio

El script utilizado para la ejecución periódica se encuentra en:

    scripts\revisar_pendientes.ps1


13.- VERIFICAR EL FRONTEND

Desde la carpeta frontend ejecutar:

    npm run lint

Después:

    npm run build

Ambos comandos deben terminar sin errores.


14.- PRUEBA MANUAL

Abrir:

    http://localhost:5173/

Comprobar:

• Inicio de sesión
• Portal del colaborador
• Mis datos
• Documentación
• Notificaciones
• Cierre de sesión
• Portal del encargado
• Generaciones
• Solicitudes pendientes
• Documentos pendientes

En la terminal de Django las peticiones correctas deben responder normalmente con código HTTP 200.


SI APARECEN ERRORES 401 AL ABRIR UNA INSTALACIÓN NUEVA

Durante la instalación limpia se observaron inicialmente respuestas:

    401 Unauthorized

Esto ocurrió porque el navegador conservaba tokens JWT generados anteriormente con otra SECRET_KEY.

Al iniciar sesión nuevamente se generaron tokens válidos para la instalación actual y las solicitudes comenzaron a responder con HTTP 200.

Si ocurre este caso:

1.- Cerrar la sesión.

2.- Volver a iniciar sesión.

3.- Si fuera necesario, limpiar los datos almacenados para localhost en el navegador.

Un 401 inicial después de cambiar SECRET_KEY no significa necesariamente que la base de datos o el backend están dañados.


PRUEBA CON DEBUG=False

Se realizó una prueba temporal del sistema con:

    DEBUG=False

Durante la prueba se comprobó:

• Django inició sin errores.
• ALLOWED_HOSTS aceptó 127.0.0.1 y localhost.
• El inicio de sesión continuó funcionando.
• El portal del colaborador cargó correctamente.
• El panel del encargado cargó correctamente.
• Las funciones principales de la API continuaron operando.
• Los registros de documentos continuaron visibles en el sistema.
• Los archivos ubicados en MEDIA dejaron de ser servidos directamente por Django.

Al intentar abrir directamente un archivo de MEDIA se obtuvo una respuesta 404 Not Found.

Este comportamiento es esperado en la configuración actual porque backend/config/urls.py sirve los archivos de MEDIA directamente sólo durante el desarrollo.

En un despliegue de producción, los archivos de MEDIA deberán ser servidos mediante la infraestructura correspondiente, por ejemplo un servidor web o un servicio de almacenamiento.

Después de terminar la prueba, el entorno local se regresó a:

    DEBUG=True


SEGUIMIENTO AUTOMÁTICO EN WINDOWS

El proyecto incluye:

    scripts\revisar_pendientes.ps1

Este script puede ejecutarse mediante el Programador de tareas de Windows.

La tarea utilizada durante el desarrollo fue:

    PluriOne Seguimiento Automatico

Para comprobar manualmente el funcionamiento antes de programarla:

    cd backend
    python manage.py revisar_pendientes --dry-run

El seguimiento identifica:

• Documento detenido
• Responsable de la siguiente acción
• Acción pendiente
• Destinatario del recordatorio

Cuando no se utiliza dry-run puede generar una notificación persistente y actualizar la fecha del último recordatorio.


ACCESOS DE PRUEBA

Las contraseñas utilizadas para evaluación no se publican directamente en el repositorio.

Los accesos de demostración se entregan de manera separada dentro de la documentación académica correspondiente.


DATOS DE PRUEBA

El repositorio utiliza datos ficticios para las demostraciones.

No deben agregarse datos personales reales al repositorio público.


DOCUMENTACIÓN DEL PROYECTO

PRD:

[Consultar PRD](docs/PRD.md)

Contiene el problema observado, necesidades, alcance y propuesta del sistema.

MVP:

[Consultar MVP](docs/MVP.md)

Contiene las funciones definidas para la primera versión funcional.

BITÁCORA:

[Consultar BITÁCORA](docs/BITACORA.md)

Contiene el registro cronológico del desarrollo, cambios realizados, pruebas, problemas encontrados, soluciones, estado del proyecto y próximos pasos.


USO DE INTELIGENCIA ARTIFICIAL

Durante el desarrollo se utilizaron herramientas de inteligencia artificial como apoyo.

Principalmente se utilizaron para:

• Analizar requerimientos.
• Proponer alternativas de implementación.
• Ayudar a localizar errores.
• Revisar fragmentos de código.
• Apoyar la reorganización del frontend.
• Preparar pruebas y comandos de validación.
• Mejorar la documentación técnica.

Las propuestas generadas con apoyo de IA fueron revisadas antes de integrarse.

Los cambios se comprobaron mediante:

• Ejecución real del sistema.
• Pruebas automatizadas.
• python manage.py check.
• npm run lint.
• npm run build.
• Instalaciones limpias.
• Pruebas visuales de los dos roles.
• Revisión de cambios con Git.

Las decisiones sobre el alcance del proyecto, implementación final, pruebas aceptadas y cambios integrados permanecieron bajo revisión del desarrollador.


INSTALACIÓN LIMPIA VALIDADA

Se realizó una prueba completa desde una carpeta nueva utilizando únicamente el contenido disponible en GitHub.

Durante esa prueba se comprobó:

• Clonación del repositorio.
• Creación de un entorno virtual nuevo.
• Instalación mediante requirements.txt.
• Restauración de PostgreSQL.
• Aplicación de migraciones.
• 11 pruebas automáticas.
• Seguimiento automático en dry-run.
• Instalación de dependencias de React.
• npm run lint.
• npm run build.
• Ejecución del backend.
• Ejecución del frontend.
• Inicio de sesión como colaborador.
• Inicio de sesión como encargado.

La instalación terminó correctamente y el repositorio de prueba permaneció sin cambios rastreados por Git.
