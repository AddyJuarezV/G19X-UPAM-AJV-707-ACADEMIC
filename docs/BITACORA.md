# Bitácora del proyecto – PluriOne Onboarding

Este documento registra cronológicamente los avances, las decisiones, los problemas encontrados y los siguientes pasos. No sustituye al historial de Git: los commits muestran cambios en archivos y esta bitácora explica el trabajo realizado.

## Antecedentes – Preparación del proyecto

**Actividades realizadas:** Se creó el repositorio privado `plurione-onboarding` en GitHub. Se verificó la instalación de Git en Windows, se clonó el repositorio en el Escritorio y se comprobó que la rama local `main` está conectada con `origin/main`.

**Definiciones de alcance:** El sistema dará seguimiento al proceso de incorporación de colaboradores: registro, documentación, revisión, aprobación, acciones pendientes de cada responsable, capacitación de incorporación y estado general. El proyecto o área asignada podrá mostrarse como referencia, pero no se administrarán tareas, código ni entregables técnicos de los proyectos de los colaboradores.

**Propuestas acordadas:** Vista por generación con tarjetas de estado y acceso al detalle de cada persona. El caso inicial de referencia son practicantes y residentes, con posibilidad de adaptar los requisitos a otros tipos de incorporación. Los ejemplos y pruebas usarán datos ficticios.

**Decisión tecnológica:** Utilizar React + Vite en el frontend, Python + Django y Django REST Framework en el backend, y PostgreSQL como base de datos. Las demás tecnologías de la propuesta inicial se evaluarán solo si resultan necesarias.

## 25 de septiembre de 2026 – Organización documental

**Actividades realizadas:** Se creó la carpeta `docs` dentro del repositorio local. Se colocó `docs/PRB.md` con la propuesta del sistema y se reemplazó el `README.md` original por un documento de contexto y continuidad para futuras sesiones de trabajo con el asistente o Codex.

**Decisión de documentación:** El `README.md` será el único documento breve de estado actual y próximos pasos; no se creará un `START_HERE.md` separado. `docs/PRB.md` recopila la propuesta, `docs/MVP.md` definirá el producto a desarrollar y esta bitácora conservará el historial narrativo del trabajo. Los documentos no llevarán números de versión en su nombre.

**Estado al cierre de esta anotación:** Está pendiente colocar esta bitácora en `docs`, revisar los archivos con `git status`, registrar el avance con un commit y enviarlo a GitHub. Después se trabajará en el MVP, sin comenzar todavía el desarrollo del sistema.

---

## Plantilla para la siguiente sesión

### Fecha – Actividad

**Objetivo:**

**Trabajo realizado:**

**Decisiones y motivos:**

**Problemas encontrados y solución:**

**Pruebas o comprobaciones:**

**Archivos modificados / commit:**

**Pendientes y siguiente paso:**
