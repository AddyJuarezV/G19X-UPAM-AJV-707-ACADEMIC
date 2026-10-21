import "./NotificationsPanel.css";


function buildNotifications(
  profile,
  documents
) {
  const notifications = [];

  const applicationStatus =
    profile?.application_status;


  if (
    applicationStatus ===
    "DRAFT"
  ) {
    notifications.push({
      id: "application-draft",
      type: "action",
      title:
        "Envía tu solicitud de incorporación",
      text:
        "Tu registro está guardado, pero todavía debes enviarlo para que PluriOne pueda revisarlo.",
    });
  }


  if (
    applicationStatus ===
    "IN_REVIEW"
  ) {
    notifications.push({
      id: "application-review",
      type: "info",
      title:
        "Solicitud en revisión",
      text:
        "PluriOne está revisando tu información inicial. Por ahora no necesitas realizar otra acción.",
    });
  }


  if (
    applicationStatus ===
    "NEEDS_CORRECTION"
  ) {
    notifications.push({
      id: "application-correction",
      type: "danger",
      title:
        "Tu solicitud requiere correcciones",
      text:
        profile.correction_reason ||
        "Revisa y corrige la información indicada por el encargado.",
    });
  }


  if (
    applicationStatus ===
      "APPROVED" &&
    documents.length === 0
  ) {
    notifications.push({
      id: "generation-waiting",
      type: "info",
      title:
        "Solicitud aprobada",
      text:
        "Tu registro ya fue aprobado. Actualmente estás esperando asignación a una generación.",
    });
  }


  documents.forEach(
    (document) => {
      const name =
        document.document_type_label;

      const requiresTemplate = [
        "NDA",
        "ACCEPTANCE_LETTER",
      ].includes(
        document.document_type
      );


      if (
        document.status ===
        "PENDING"
      ) {
        if (
          requiresTemplate &&
          !document.company_template
        ) {
          notifications.push({
            id:
              `document-${document.id}-template`,
            type: "info",
            title:
              `${name}: esperando plantilla`,
            text:
              "PluriOne debe publicar primero la plantilla de este documento. No necesitas realizar ninguna acción todavía.",
          });
        } else {
          notifications.push({
            id:
              `document-${document.id}-pending`,
            type: "action",
            title:
              `${name}: pendiente de entrega`,
            text:
              "El documento está listo para que lo completes y lo entregues desde la sección Documentación.",
          });
        }
      }


      if (
        document.status ===
        "NEEDS_CORRECTION"
      ) {
        notifications.push({
          id:
            `document-${document.id}-correction`,
          type: "danger",
          title:
            `${name}: corrección solicitada`,
          text:
            document.correction_reason ||
            "PluriOne solicitó una corrección en este documento.",
        });
      }


      if (
        [
          "DELIVERED",
          "IN_REVIEW",
        ].includes(
          document.status
        )
      ) {
        notifications.push({
          id:
            `document-${document.id}-review`,
          type: "info",
          title:
            `${name}: en revisión`,
          text:
            "Tu archivo fue entregado y está esperando revisión por parte de PluriOne.",
        });
      }


      if (
        document.status ===
        "PENDING_SIGNATURE"
      ) {
        notifications.push({
          id:
            `document-${document.id}-signature`,
          type: "info",
          title:
            `${name}: pendiente de firma`,
          text:
            "El documento fue aprobado y ahora está esperando la firma de PluriOne.",
        });
      }


      if (
        document.status ===
        "DOWNLOADABLE"
      ) {
        notifications.push({
          id:
            `document-${document.id}-download`,
          type: "action",
          title:
            `${name}: documento listo`,
          text:
            "La versión firmada ya está disponible. Descárgala y confirma su recepción.",
        });
      }
    }
  );


  if (
    documents.length > 0 &&
    documents.every(
      (document) =>
        document.status ===
        "COMPLETE"
    )
  ) {
    notifications.push({
      id: "documents-complete",
      type: "success",
      title:
        "Documentación completada",
      text:
        "Todos tus documentos de incorporación están completos.",
    });
  }


  return notifications;
}


function NotificationsPanel({
  profile,
  documents,
}) {
  const notifications =
    buildNotifications(
      profile,
      documents
    );

  const actionCount =
    notifications.filter(
      (notification) =>
        [
          "action",
          "danger",
        ].includes(
          notification.type
        )
    ).length;


  return (
    <section
      className="content-section notifications-section"
      id="notificaciones"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            NOTIFICACIONES
          </span>

          <h2>
            Avisos y acciones
          </h2>
        </div>

        <span className="notification-count">
          {actionCount > 0
            ? `${actionCount} requieren atención`
            : "Sin acciones urgentes"}
        </span>
      </div>


      {notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map(
            (notification) => (
              <article
                key={
                  notification.id
                }
                className={
                  `notification-card ${notification.type}`
                }
              >
                <div
                  className="notification-indicator"
                  aria-hidden="true"
                >
                  {
                    notification.type ===
                    "danger"
                      ? "!"
                      : notification.type ===
                          "success"
                        ? "✓"
                        : notification.type ===
                            "action"
                          ? "→"
                          : "i"
                  }
                </div>

                <div>
                  <strong>
                    {
                      notification.title
                    }
                  </strong>

                  <p>
                    {
                      notification.text
                    }
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <div className="notifications-empty">
          <strong>
            Sin notificaciones
          </strong>

          <p>
            Actualmente no tienes avisos pendientes.
          </p>
        </div>
      )}
    </section>
  );
}


export default NotificationsPanel;