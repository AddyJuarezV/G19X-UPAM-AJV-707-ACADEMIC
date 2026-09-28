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

