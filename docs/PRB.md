# PRB – Sistema de Seguimiento Automático del Proceso de Incorporación

## 1. Idea general

Se propone desarrollar un sistema que permita dar seguimiento al proceso de incorporación de nuevos colaboradores dentro de PluriOne.

La idea principal es centralizar en un solo lugar la información necesaria para conocer el estado de cada incorporación, los documentos entregados, los documentos pendientes, las revisiones realizadas, las aprobaciones necesarias y las acciones que aún deben realizar tanto el colaborador como el personal responsable de la empresa.

El sistema busca facilitar el seguimiento del proceso sin depender únicamente de mensajes, archivos separados o revisiones manuales para conocer el estado de una persona.

---

## 2. Situación observada

Durante un proceso de incorporación pueden utilizarse diferentes medios y herramientas para completar los requisitos solicitados.

Como caso de referencia, durante una incorporación pueden intervenir elementos como:

- Registro inicial mediante una plataforma.
- Comunicación mediante mensajería.
- Entrega de información personal y académica.
- Carga de documentos.
- Entrega de CV.
- Firma de políticas y acuerdos de confidencialidad.
- Uso de almacenamiento en la nube para documentación.
- Manejo de cartas mediante documentos editables.
- Firma y devolución de documentos por parte de la empresa.
- Asignación de proyecto o área.
- Asignación de responsable.
- Inicio de capacitaciones relacionadas con la incorporación.

Aunque estas herramientas permiten completar el proceso, la información puede encontrarse distribuida y puede ser necesario consultar distintos medios para conocer el estado real de una incorporación.

---

## 3. Problema identificado

Durante el proceso pueden presentarse situaciones como:

- No saber con claridad qué documentos ya fueron recibidos.
- No conocer si un documento está siendo revisado.
- Tener que preguntar directamente por el estado de una documentación.
- Solicitar nuevamente información que anteriormente ya fue proporcionada.
- Detectar posteriormente datos faltantes.
- Tener documentos pendientes de firma o devolución por parte de la empresa.
- No saber quién debe realizar la siguiente acción.
- Tener información distribuida entre distintas herramientas.
- Tener que revisar persona por persona para conocer quién todavía tiene pendientes.

Por ello, se identifica la necesidad de contar con un sistema que permita visualizar de manera centralizada el estado completo de cada incorporación.

---

## 4. Propuesta

Se propone crear un sistema de seguimiento donde cada persona tenga un proceso de incorporación asociado.

Dentro de este proceso se podrá consultar:

- Información del colaborador.
- Información académica o laboral correspondiente.
- Documentos requeridos.
- Estado de cada documento.
- Información faltante.
- Revisiones y aprobaciones.
- Capacitaciones relacionadas con la incorporación.
- Responsable de cada acción.
- Proyecto o área asignada como información de referencia.
- Estado general de la incorporación.
- Alertas o pendientes.

El sistema deberá permitir responder fácilmente preguntas como:

- ¿Qué le falta entregar a esta persona?
- ¿Qué documentos ya fueron recibidos?
- ¿Qué documentos están pendientes de revisión?
- ¿Qué debe hacer el colaborador?
- ¿Qué debe hacer la empresa?
- ¿Quién tiene actualmente una acción pendiente?
- ¿En qué estado se encuentra la incorporación?
- ¿Qué personas de una generación requieren atención?

---

## 5. Usuarios considerados

Inicialmente se consideran dos tipos principales de usuarios.

### Colaborador

Es la persona que se encuentra realizando su proceso de incorporación.

Podrá consultar información relacionada con su proceso, como:

- Datos registrados.
- Documentación solicitada.
- Documentación entregada.
- Documentos pendientes.
- Documentos en revisión.
- Documentos aprobados.
- Documentos que requieren corrección.
- Próximas acciones.
- Estado general de su incorporación.

### Responsable / Administrador

Será el personal autorizado de PluriOne encargado de dar seguimiento a las incorporaciones.

Podrá consultar:

- Personas actualmente en proceso de incorporación.
- Información de cada colaborador.
- Documentos recibidos.
- Información faltante.
- Pendientes de revisión.
- Documentos pendientes de firma.
- Acciones pendientes de la empresa.
- Estado general de cada proceso.
- Alertas relacionadas con retrasos o información pendiente.
- Generaciones o grupos de incorporación.
- Estado general de todos los integrantes de una generación.

Posteriormente podrán analizarse otros tipos de usuario si el proceso lo requiere.

---

## 6. Información del colaborador

Se propone evitar que la misma información tenga que ser solicitada repetidamente.

Los datos proporcionados durante el registro deberán poder reutilizarse durante las diferentes etapas de la incorporación.

### Información personal

- Nombre.
- CURP.
- Número telefónico.
- Correo personal.
- Correo institucional.

### Información académica

Cuando corresponda:

- Universidad.
- Carrera.
- Número de horas a cumplir.
- Credencial universitaria.

### Información relacionada con la incorporación

Cuando corresponda:

- Proyecto asignado.
- Responsable.
- Área.
- Tecnologías relacionadas con el proyecto.
- Fecha de incorporación.
- Generación o grupo de incorporación.

La información del proyecto se utilizará únicamente como referencia dentro del proceso de incorporación.

---

## 7. Gestión de documentación

La documentación será una de las partes principales del seguimiento.

Dependiendo del tipo de colaborador podrán existir diferentes requisitos.

En el caso de practicantes o residentes podrían solicitarse documentos como:

- CV.
- Credencial universitaria.
- Carta de presentación.
- Carta de aceptación.
- NDA o acuerdo de confidencialidad.
- Políticas de la empresa.
- Otros documentos requeridos.

Cada documento deberá poder mostrar su estado.

Ejemplos de estados:

- Pendiente de entrega.
- Entregado.
- En revisión.
- Requiere corrección.
- Aprobado.
- Pendiente de firma.
- Firmado.
- Pendiente de devolución.
- Completado.

No todos los documentos deberán utilizar todos los estados.

El flujo dependerá del tipo de documento.

---

## 8. Seguimiento de responsabilidades

Una de las ideas principales del sistema es que no solamente se muestre qué está pendiente, sino también quién debe realizar la siguiente acción.

### Acción del colaborador

Por ejemplo:

- Subir un documento.
- Firmar un documento.
- Corregir información.
- Completar un dato faltante.

### Acción de la empresa

Por ejemplo:

- Revisar un documento.
- Aprobarlo.
- Firmarlo.
- Solicitar una corrección.
- Devolver un documento firmado.

De esta manera se podrá identificar si una incorporación está esperando una acción del colaborador o una acción interna de la empresa.

---

## 9. Ejemplo de seguimiento de un documento

Una carta de aceptación podría pasar por diferentes estados:

1. Documento generado.
2. Documento entregado al colaborador.
3. Documento llenado por el colaborador.
4. Documento enviado a la empresa.
5. Pendiente de revisión.
6. Pendiente de firma de la empresa.
7. Documento firmado.
8. Documento devuelto al colaborador.
9. Proceso completado.

Esto permitirá conocer exactamente en qué punto se encuentra cada documento.

---

## 10. Validación de información

El sistema deberá ayudar a identificar información incompleta.

Por ejemplo, si un colaborador registró sus datos pero falta información como:

- Carrera.
- Universidad.
- Horas requeridas.
- Documento obligatorio.

El sistema deberá mostrar claramente qué información se encuentra pendiente.

La intención es evitar detectar estos datos faltantes posteriormente mediante mensajes individuales.

---

## 11. Seguimiento automático

El sistema podrá realizar determinadas verificaciones automáticamente.

Por ejemplo, si existe una fecha límite y el requisito continúa pendiente, el sistema podrá generar una alerta.

Ejemplo:

- Fecha límite: 20 de septiembre.
- Estado: Pendiente.
- Fecha actual: 21 de septiembre.
- Resultado: requisito atrasado.

También podrá mostrar información como:

- Incorporaciones con documentos pendientes.
- Incorporaciones sin actividad reciente.
- Documentos pendientes de revisión.
- Documentos pendientes de firma.
- Información incompleta.
- Procesos próximos a una fecha límite.

---

## 12. Estado de la incorporación

El sistema deberá mostrar de manera sencilla la situación de cada persona.

Algunos posibles estados generales son:

- Registro completado.
- Documentación en proceso.
- Documentación completa.
- En revisión.
- Aceptado.
- Proyecto asignado.
- Capacitación en curso.
- Incorporación completada.

Sin embargo, el proceso no deberá considerarse completamente secuencial.

Durante una incorporación pueden realizarse diferentes actividades de manera paralela.

Por ejemplo, una persona puede tener un proyecto asignado mientras todavía existe un documento administrativo pendiente.

Por esta razón, será importante mostrar el estado individual de cada requisito y no depender únicamente de un estado general.

---

## 13. Visualización general por generación

Como propuesta, el sistema contará con una vista general que permita agrupar a los colaboradores por generación, grupo o periodo de incorporación.

Por ejemplo:

**Generación 19**

El responsable podrá ingresar a esta generación y visualizar en una misma pantalla a todas las personas que se encuentran realizando su proceso de incorporación.

Cada persona podrá mostrarse mediante un cuadro o tarjeta cuyo color represente el estado general de su información y documentación.

### Interpretación propuesta

- **Verde:** información y documentación completas.
- **Amarillo:** existen pendientes menores, documentos en revisión o elementos próximos a completarse.
- **Rojo:** existen pendientes importantes, información incompleta o situaciones que requieren atención.

### Ejemplo ficticio

- Peter Parker – Verde.
- Miles Morales – Amarillo.
- Gwen Stacy – Verde.
- Miguel O'Hara – Rojo.

Esto permitirá que el responsable pueda revisar rápidamente una generación completa y detectar visualmente qué personas requieren atención.

El objetivo es evitar que tenga que abrir uno por uno todos los registros para descubrir quién tiene pendientes.

---

## 14. Revisión detallada desde la generación

Cuando el responsable identifique una persona cuya tarjeta no se encuentre en verde, podrá ingresar a su registro para conocer el motivo.

### Ejemplo ficticio

**Miles Morales**

Estado general: Amarillo.

Pendientes:

- NDA pendiente de revisión.
- Carta de aceptación pendiente de firma.

De esta manera, la vista general servirá para identificar rápidamente los casos que requieren atención y la vista individual permitirá revisar el detalle.

---

## 15. Generaciones o grupos de incorporación

Se propone que los colaboradores puedan asociarse a una generación o grupo.

Ejemplos:

- Generación 19.
- Generación 20.
- Incorporación septiembre 2026.
- Practicantes periodo septiembre-diciembre.

El nombre o forma de organizar estos grupos deberá definirse posteriormente con PluriOne.

El objetivo es que el responsable pueda consultar a un conjunto de personas que ingresaron durante un mismo periodo o proceso.

---

## 16. Diferentes tipos de incorporación

Como propuesta, el sistema podrá diseñarse de forma flexible para permitir diferentes tipos de incorporación.

El caso inicial de referencia será el de practicantes y residentes profesionales.

### Ejemplo: Practicante / Residente

Podría requerir:

- Información académica.
- CV.
- Credencial universitaria.
- Carta de presentación.
- Carta de aceptación.
- NDA.
- Políticas.
- Capacitación inicial.

En el futuro podrían existir otros tipos de colaboradores con requisitos diferentes.

La finalidad es evitar que el sistema quede limitado exclusivamente a estudiantes, manteniendo siempre el enfoque en el proceso de incorporación.

---

## 17. Proyecto asignado

Como parte de la incorporación podrá registrarse información relacionada con el proyecto o área a la que será asignada la persona.

Por ejemplo:

- Nombre del proyecto.
- Responsable.
- Tecnologías.
- Área.
- Fecha de asignación.

Esta información será únicamente de referencia para indicar que la persona ya fue asignada.

El sistema no administrará el desarrollo interno de dicho proyecto.

---

## 18. Fuera del alcance

El sistema no tendrá como objetivo controlar el trabajo técnico que posteriormente realice el colaborador.

Por lo tanto, quedan fuera del alcance:

- PRB de los proyectos asignados.
- MVP de los proyectos asignados.
- Actividades de programación.
- Código fuente de los proyectos.
- Commits.
- Sprints.
- Historias de usuario del proyecto asignado.
- Entregables académicos.
- Entregables técnicos.
- Seguimiento del desarrollo de software realizado por el colaborador.
- Evaluación de las actividades técnicas del proyecto asignado.

La responsabilidad del sistema termina en el seguimiento relacionado con la incorporación.

La asignación del proyecto podrá registrarse como parte del proceso, pero el desarrollo posterior del proyecto será independiente.

---

## 19. Idea principal del seguimiento

El sistema deberá permitir visualizar de manera clara:

- Qué ya se realizó.
- Qué falta realizar.
- Quién debe realizarlo.
- Qué se encuentra en revisión.
- Qué presenta algún retraso.
- Cuál es el estado general de la incorporación.
- Qué personas de una generación necesitan atención.

De esta manera, tanto el colaborador como el personal responsable podrán conocer el estado del proceso sin depender completamente de comunicación manual para realizar el seguimiento.

---

## 20. Resultado esperado

Se espera contar con una plataforma que permita centralizar el seguimiento del proceso de incorporación y proporcione mayor visibilidad sobre:

- Información.
- Documentación.
- Responsabilidades.
- Pendientes.
- Aprobaciones.
- Estado de cada colaborador.
- Estado general de una generación.

El sistema deberá facilitar el trabajo de las personas responsables de las incorporaciones y al mismo tiempo permitir que el colaborador conozca claramente qué ha completado y qué necesita realizar.

La visualización por generación permitirá identificar rápidamente qué incorporaciones están completas y cuáles necesitan atención.

---

## 21. Ideas que podrán analizarse posteriormente

Durante el diseño del sistema podrán estudiarse propuestas como:

- Recordatorios automáticos.
- Alertas por retrasos.
- Diferentes plantillas de incorporación.
- Historial de cambios.
- Dashboard general.
- Indicadores de avance.
- Notificaciones.
- Búsqueda y filtros.
- Integración con servicios externos.
- Uso de inteligencia artificial para apoyo al seguimiento.

Estas ideas deberán evaluarse antes de formar parte del desarrollo para evitar agregar funciones que no aporten directamente al objetivo del proyecto.

---

## 22. Enfoque del proyecto

El desarrollo deberá mantenerse enfocado en el objetivo principal:

**Dar seguimiento automático al proceso de incorporación de nuevos colaboradores.**

Cualquier nueva funcionalidad propuesta deberá analizarse preguntando:

**¿Esta función ayuda a saber cómo va la incorporación de una persona o de una generación?**

Si la respuesta es sí, podrá considerarse dentro del proyecto.

Si la función está relacionada con administrar el trabajo que la persona realiza después de incorporarse, deberá considerarse fuera del alcance.

---

## Nota sobre datos de ejemplo

Todos los nombres utilizados en este documento son ficticios y tienen únicamente fines demostrativos.

Durante el desarrollo y las pruebas se deberán utilizar datos ficticios o de prueba, evitando incluir información personal real en ejemplos, demostraciones o documentación pública.
