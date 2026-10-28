import {
  useEffect,
  useState,
} from "react";

import "./NotificationsPanel.css";


function buildNotifications(
  profile,
  documents,
  automaticNotifications
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


  automaticNotifications.forEach(
    (automaticNotification) => {
      const currentDocument =
        documents.find(
          (document) =>
            document.id ===
            automaticNotification.document_id
        );

      if (
        currentDocument &&
        currentDocument.status !==
          automaticNotification.document_status
      ) {
        return;
      }

      const generatedAt =
        new Date(
          automaticNotification.created_at
        ).toLocaleString(
          "es-MX",
          {
            dateStyle: "medium",
            timeStyle: "short",
          }
        );

      notifications.unshift({
        id:
          `automatic-${automaticNotification.id}`,
        type: "automatic",
        title:
          automaticNotification.title,
        text:
          automaticNotification.message,
        meta:
          `Generado automáticamente · ${generatedAt}`,
      });
    }
  );


  return notifications;
}


function NotificationsPanel({
  profile,
  documents,
  apiFetch,
}) {
  const [
    automaticNotifications,
    setAutomaticNotifications,
  ] = useState([]);

  const [
    loadingAutomatic,
    setLoadingAutomatic,
  ] = useState(true);

  const [
    automaticError,
    setAutomaticError,
  ] = useState("");


  useEffect(
    () => {
      let mounted = true;

      const loadAutomaticNotifications =
        async () => {
          setLoadingAutomatic(true);
          setAutomaticError("");

          try {
            const response =
              await apiFetch(
                "/api/onboarding/notifications/mine/"
              );

            const data =
              await response
                .json()
                .catch(
                  () => []
                );

            if (!response.ok) {
              throw new Error(
                "No fue posible consultar los recordatorios automáticos."
              );
            }

            if (mounted) {
              setAutomaticNotifications(
                Array.isArray(data)
                  ? data
                  : []
              );
            }
          } catch (error) {
            if (mounted) {
              setAutomaticError(
                error.message
              );
            }
          } finally {
            if (mounted) {
              setLoadingAutomatic(
                false
              );
            }
          }
        };

      loadAutomaticNotifications();

      return () => {
        mounted = false;
      };
    },
    [
      apiFetch,
      documents,
    ]
  );


  const notifications =
    buildNotifications(
      profile,
      documents,
      automaticNotifications
    );


  const actionCount =
    notifications.filter(
      (notification) =>
        [
          "action",
          "danger",
          "automatic",
        ].includes(
          notification.type
        )
    ).length;


  const automaticCount =
    notifications.filter(
      (notification) =>
        notification.type ===
        "automatic"
    ).length;


  return (
        <section
      className="notifications-page"
      id="notificaciones"
    >
      <div className="notifications-page-header">
        <div>
          <span className="eyebrow">
            NOTIFICACIONES
          </span>

          <h2>
            Avisos y acciones
          </h2>

          <p>
            Consulta las acciones pendientes,
            avisos y recordatorios de tu
            proceso de incorporación.
          </p>
        </div>

        <span className="notification-count">
          {actionCount > 0
            ? `${actionCount} requieren atención`
            : "Todo al día"}
        </span>
      </div>


      <section className="notifications-summary-grid">
        <article>
          <span>
            Requieren atención
          </span>

          <strong>
            {actionCount}
          </strong>

          <p>
            Acciones que debes revisar
          </p>
        </article>

        <article>
          <span>
            Avisos totales
          </span>

          <strong>
            {notifications.length}
          </strong>

          <p>
            Información disponible
          </p>
        </article>

        <article>
          <span>
            Recordatorios
          </span>

          <strong>
            {automaticCount}
          </strong>

          <p>
            Generados automáticamente
          </p>
        </article>
      </section>


      <section
        className={
          actionCount > 0
            ? "notifications-status-panel attention"
            : "notifications-status-panel clear"
        }
      >
        <div className="notifications-status-icon">
          {actionCount > 0
            ? "!"
            : "?"}
        </div>

        <div>
          <span className="eyebrow">
            ESTADO GENERAL
          </span>

          <strong>
            {actionCount > 0
              ? "Tienes acciones por revisar"
              : "No tienes acciones urgentes"}
          </strong>

          <p>
            {actionCount > 0
              ? "Revisa los avisos que requieren tu atención para continuar con tu proceso."
              : "Tu proceso se encuentra al día. Aquí aparecerán nuevos avisos cuando exista alguna actualización."}
          </p>
        </div>
      </section>


      {loadingAutomatic && (
        <div className="automatic-notification-status">
          Consultando recordatorios automáticos...
        </div>
      )}


      {automaticError && (
        <div className="automatic-notification-error">
          {automaticError}
        </div>
      )}


      <div className="notifications-list-heading">
        <div>
          <span className="eyebrow">
            ACTIVIDAD
          </span>

          <h3>
            Notificaciones actuales
          </h3>
        </div>

        <span>
          {notifications.length}
          {" "}
          {notifications.length === 1
            ? "aviso"
            : "avisos"}
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
                          : notification.type ===
                              "automatic"
                            ? "⏱"
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

                  {notification.meta && (
                    <span className="notification-meta">
                      {
                        notification.meta
                      }
                    </span>
                  )}
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
