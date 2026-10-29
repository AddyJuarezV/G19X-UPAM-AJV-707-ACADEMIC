import { firstName, initials } from "../utils/nombres";
import { useState } from "react";
import ProfileCorrection from "./ProfileCorrection";
import MyProfile from "./MyProfile";
import NotificationsPanel from "./NotificationsPanel";
import UserChip from "../components/UserChip";
import Sidebar from "../components/Sidebar";

export default function CollaboratorHome({
  user,
  documents,
  apiFetch,
  onRefresh,
  onLogout,
}) {
  const profile =
    user.profile || {};

  const [
    activeSection,
    setActiveSection,
  ] = useState("inicio");

  const handleSectionChange = (
    section
  ) => {
    setActiveSection(section);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    const [
    submittingApplication,
    setSubmittingApplication,
  ] = useState(false);

  const [
    applicationFeedback,
    setApplicationFeedback,
  ] = useState("");

  const [
    applicationError,
    setApplicationError,
  ] = useState("");

  const completedDocuments =
    documents.filter(
      (document) =>
        document.status === "COMPLETE"
    ).length;

  const remainingDocuments =
    documents.length -
    completedDocuments;

  const documentsInReview =
    documents.filter(
      (document) =>
        [
          "DELIVERED",
          "IN_REVIEW",
          "PENDING_SIGNATURE",
          "SIGNED",
          "DOWNLOADABLE",
        ].includes(
          document.status
        )
    ).length;

  const documentsPendingAction =
    documents.filter(
      (document) =>
        [
          "PENDING",
          "NEEDS_CORRECTION",
        ].includes(
          document.status
        )
    ).length;

  const applicationApproved =
    profile.application_status ===
    "APPROVED";

  const documentationComplete =
    documents.length > 0 &&
    remainingDocuments === 0;

  const nextAction =
    profile.application_status ===
    "DRAFT"
      ? {
          title:
            "Enviar tu solicitud",
          text:
            "Revisa tus datos y envia tu solicitud para iniciar la revision.",
          target:
            "mis-datos",
          button:
            "Revisar mis datos",
        }
      : profile.application_status ===
        "NEEDS_CORRECTION"
        ? {
            title:
              "Corregir tu informacion",
            text:
              "PluriOne solicito cambios en tu registro. Revisa la observacion y corrige tus datos.",
            target:
              "mis-datos",
            button:
              "Ir a mis datos",
          }
        : profile.application_status ===
          "IN_REVIEW"
          ? {
              title:
                "Solicitud en revision",
              text:
                "Tu informacion esta siendo revisada. Puedes consultar tus avisos mientras esperas.",
              target:
                "notificaciones",
              button:
                "Ver notificaciones",
            }
          : documentationComplete
            ? {
                title:
                  "Proceso documental completo",
                text:
                  "Tus documentos se encuentran completos. Consulta tus avisos para cualquier nueva indicacion.",
                target:
                  "notificaciones",
                button:
                  "Ver notificaciones",
              }
            : {
                title:
                  "Continuar documentación",
                text:
                  `Tienes ${remainingDocuments} documento${remainingDocuments === 1 ? "" : "s"} por completar.`,
                target:
                  "documentacion",
                button:
                  "Ir a documentación",
              };

  const progress =
    documents.length > 0
      ? Math.round(
          (
            completedDocuments /
            documents.length
          ) * 100
        )
      : 0;

    const canSubmitApplication =
    profile.application_status ===
    "DRAFT";


  const handleSubmitApplication =
    async () => {
      setSubmittingApplication(true);
      setApplicationFeedback("");
      setApplicationError("");

      try {
        const response =
          await apiFetch(
            "/api/accounts/application/submit/",
            {
              method: "POST",
            }
          );

        const data =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.detail ||
              "No fue posible enviar la solicitud."
          );
        }

        setApplicationFeedback(
          data.message ||
            "Solicitud enviada correctamente."
        );

        await onRefresh();
      } catch (error) {
        setApplicationError(
          error.message
        );
      } finally {
        setSubmittingApplication(false);
      }
    };

  return (
    <div className="dashboard-layout">
      <Sidebar
        user={user}
        onLogout={onLogout}
        activeSection={
          activeSection
        }
        onSectionChange={
          handleSectionChange
        }
      />

      <main className="dashboard-content">
        {activeSection === "inicio" && (
          <>
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">
              PORTAL DEL COLABORADOR
            </span>

            <h1>
              Hola,{" "}
              {firstName(
                profile.full_name
              )}
            </h1>

            <p>
              Aquí puedes consultar el
              avance de tu proceso de
              incorporación.
            </p>
          </div>

          <UserChip
            title={
              profile.full_name
            }
            subtitle={
              profile.university_acronym
            }
            avatar={
              initials(
                profile.full_name
              )
            }
          />
        </header>


        <section className="summary-grid">
          <article className="summary-card primary-summary">
            <span className="summary-label">
              Progreso documental
            </span>

            <div className="progress-value">
              {progress}%
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    `${progress}%`,
                }}
              ></div>
            </div>

            <p>
              {completedDocuments} de{" "}
              {documents.length} documentos
              completados
            </p>
          </article>


          <article className="summary-card">
            <span className="summary-label">
              Solicitud
            </span>

            <strong className="summary-main">
              {
                ({
                  DRAFT: "Borrador",
                  IN_REVIEW: "En revisión",
                  NEEDS_CORRECTION: "Requiere corrección",
                  APPROVED: "Aprobada",
                })[profile.application_status] ||
                profile.application_status ||
                "Sin información"
              }
            </strong>

            <p>
              Estado de tu registro inicial.
            </p>
          </article>


          <article className="summary-card">
            <span className="summary-label">
              Universidad
            </span>

            <strong className="summary-main">
              {
                profile.university_acronym ||
                "-"
              }
            </strong>

            <p>
              {
                profile.career ||
                "Carrera no disponible"
              }
            </p>
          </article>
        </section>
        <section className="collaborator-home-panels">
          <article className="content-section process-overview-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  ESTADO DEL PROCESO
                </span>

                <h2>
                  Tu incorporación
                </h2>
              </div>

              <span className="document-count">
                {progress}% documental
              </span>
            </div>

            <div className="process-steps">
              <div className="process-step done">
                <span className="process-step-number">
                  1
                </span>

                <div>
                  <strong>
                    Registro
                  </strong>

                  <span>
                    Datos registrados
                  </span>
                </div>
              </div>

              <div
                className={
                  applicationApproved
                    ? "process-step done"
                    : "process-step current"
                }
              >
                <span className="process-step-number">
                  2
                </span>

                <div>
                  <strong>
                    Solicitud
                  </strong>

                  <span>
                    {applicationApproved
                      ? "Aprobada"
                      : "En proceso"}
                  </span>
                </div>
              </div>

              <div
                className={
                  documentationComplete
                    ? "process-step done"
                    : applicationApproved
                      ? "process-step current"
                      : "process-step"
                }
              >
                <span className="process-step-number">
                  3
                </span>

                <div>
                  <strong>
                    Documentación
                  </strong>

                  <span>
                    {completedDocuments}/
                    {documents.length} completos
                  </span>
                </div>
              </div>

              <div
                className={
                  documentationComplete
                    ? "process-step done"
                    : "process-step"
                }
              >
                <span className="process-step-number">
                  4
                </span>

                <div>
                  <strong>
                    Finalizacion
                  </strong>

                  <span>
                    {documentationComplete
                      ? "Completado"
                      : "Pendiente"}
                  </span>
                </div>
              </div>
            </div>
          </article>


          <article className="content-section next-action-card">
            <span className="eyebrow">
              PRÓXIMA ACCIÓN
            </span>

            <h2>
              {nextAction.title}
            </h2>

            <p>
              {nextAction.text}
            </p>

            <button
              type="button"
              className="home-action-button"
              onClick={() =>
                handleSectionChange(
                  nextAction.target
                )
              }
            >
              {nextAction.button}
            </button>
          </article>


          <article className="content-section document-home-summary">
            <span className="eyebrow">
              DOCUMENTOS
            </span>

            <h2>
              Resumen documental
            </h2>

            <div className="document-home-stats">
              <div>
                <strong>
                  {completedDocuments}
                </strong>

                <span>
                  Completos
                </span>
              </div>

              <div>
                <strong>
                  {documentsInReview}
                </strong>

                <span>
                  En revision
                </span>
              </div>

              <div>
                <strong>
                  {remainingDocuments}
                </strong>

                <span>
                  Pendientes
                </span>
              </div>
            </div>
          </article>


          <article className="content-section quick-access-card">
            <div>
              <span className="eyebrow">
                ACCESOS RÁPIDOS
              </span>

              <h2>
                ¿Qué quieres consultar?
              </h2>
            </div>

            <div className="quick-access-grid">
              <button
                type="button"
                onClick={() =>
                  handleSectionChange(
                    "mis-datos"
                  )
                }
              >
                <strong>
                  Mis datos
                </strong>

                <span>
                  Consulta tu información
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSectionChange(
                    "documentacion"
                  )
                }
              >
                <strong>
                  Documentación
                </strong>

                <span>
                  Revisa tus documentos
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSectionChange(
                    "notificaciones"
                  )
                }
              >
                <strong>
                  Notificaciones
                </strong>

                <span>
                  Consulta avisos y acciones
                </span>
              </button>
            </div>
          </article>
        </section>


        {profile.application_status ===
          "NEEDS_CORRECTION" && (
          <ProfileCorrection
            correctionReason={
              profile.correction_reason
            }
            apiFetch={apiFetch}
            onRefresh={onRefresh}
          />
        )}

                {canSubmitApplication && (
          <section className="application-submit-card">
            <div>
              <span className="eyebrow">
                SOLICITUD DE INCORPORACIÓN
              </span>

              <h2>
                Tu registro está listo
              </h2>

              <p>
                Revisa que tus datos sean
                correctos y envía tu solicitud
                para que PluriOne pueda
                revisarla.
              </p>
            </div>

            <button
              type="button"
              className="application-submit-button"
              disabled={
                submittingApplication
              }
              onClick={
                handleSubmitApplication
              }
            >
              {submittingApplication
                ? "Enviando..."
                : "Enviar solicitud a revisión"}
            </button>
          </section>
        )}


        {profile.application_status ===
          "IN_REVIEW" && (
          <section className="application-review-message">
            <strong>
              Solicitud enviada
            </strong>

            <p>
              Tu información está siendo
              revisada por PluriOne. Te
              mostraremos aquí cualquier
              cambio de estado.
            </p>
          </section>
        )}


        {applicationFeedback && (
          <div className="application-feedback success">
            {applicationFeedback}
          </div>
        )}


        {applicationError && (
          <div className="application-feedback error">
            {applicationError}
          </div>
        )}
          </>
        )}

{activeSection === "mis-datos" && (
<MyProfile
  apiFetch={apiFetch}
/>
)}

{activeSection === "notificaciones" && (
<NotificationsPanel
  profile={profile}
  documents={documents}
  apiFetch={apiFetch}
/>
)}

{activeSection === "documentacion" && (
<section
  className="document-page"
  id="documentacion"
>
  <div className="document-page-header">
    <div>
      <span className="eyebrow">
        DOCUMENTACIÓN
      </span>

      <h2>
        Mis documentos
      </h2>

      <p>
        Consulta el avance y estado de
        los documentos de tu proceso
        de incorporación.
      </p>
    </div>

    <span className="document-count">
      {completedDocuments}/
      {documents.length} completos
    </span>
  </div>


  <section className="document-page-summary">
    <article>
      <span>
        Progreso
      </span>

      <strong>
        {progress}%
      </strong>

      <p>
        Avance documental
      </p>
    </article>

    <article>
      <span>
        Completos
      </span>

      <strong>
        {completedDocuments}
      </strong>

      <p>
        Documentos terminados
      </p>
    </article>

    <article>
      <span>
        En revisión
      </span>

      <strong>
        {documentsInReview}
      </strong>

      <p>
        En proceso con PluriOne
      </p>
    </article>

    <article>
      <span>
        Pendientes
      </span>

      <strong>
        {documentsPendingAction}
      </strong>

      <p>
        Requieren tu atención
      </p>
    </article>
  </section>


  <section className="document-progress-panel">
    <div className="document-progress-heading">
      <div>
        <span className="eyebrow">
          ESTADO DOCUMENTAL
        </span>

        <h3>
          Avance de documentación
        </h3>
      </div>

      <strong>
        {completedDocuments} de{" "}
        {documents.length}
      </strong>
    </div>

    <div className="document-progress-track">
      <div
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>

    <div className="document-progress-message">
      {documentationComplete ? (
        <>
          <strong>
            Documentación completa
          </strong>

          <span>
            Todos tus documentos se
            encuentran completados.
          </span>
        </>
      ) : documentsInReview > 0 ? (
        <>
          <strong>
            Documentos en proceso
          </strong>

          <span>
            PluriOne está revisando
            parte de tu documentación.
          </span>
        </>
      ) : (
        <>
          <strong>
            Continúa con tus documentos
          </strong>

          <span>
            Tienes documentos pendientes
            de completar o entregar.
          </span>
        </>
      )}
    </div>
  </section>


  <div className="document-list-heading">
    <div>
      <span className="eyebrow">
        ARCHIVOS
      </span>

      <h3>
        Documentos asignados
      </h3>
    </div>

    <span>
      {documents.length} documentos
    </span>
  </div>


  <div className="documents-grid">
    {documents.map(
      (document) => (
        <DocumentCard
          key={document.id}
          document={document}
          apiFetch={apiFetch}
          onRefresh={onRefresh}
        />
      )
    )}
  </div>
</section>
)}
      </main>
    </div>
  );
}


function DocumentCard({
  document,
  apiFetch,
  onRefresh,
}) {
  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const [
    uploadError,
    setUploadError,
  ] = useState("");

  const [
    fileInputKey,
    setFileInputKey,
  ] = useState(0);

  const [
  confirming,
  setConfirming,
] = useState(false);

const [
  confirmError,
  setConfirmError,
] = useState("");




  const statusClass =
    document.status
      .toLowerCase()
      .replaceAll("_", "-");


  const downloadableFile =
    document.company_signed_file ||
    document.collaborator_file ||
    document.company_template;


  const requiresTemplate = [
    "NDA",
    "ACCEPTANCE_LETTER",
  ].includes(
    document.document_type
  );


  const uploadStatusAllowed = [
    "PENDING",
    "NEEDS_CORRECTION",
  ].includes(
    document.status
  );


  const templateAvailable =
    !requiresTemplate ||
    Boolean(
      document.company_template
    );


  const canUpload =
    uploadStatusAllowed &&
    templateAvailable;

  const canConfirmReceipt =
  document.status ===
    "DOWNLOADABLE" &&
  Boolean(
    document.company_signed_file
  );


  let actionText =
    "Ver documento";

  if (
    document.company_signed_file
  ) {
    actionText =
      "Ver documento final";
  } else if (
    document.collaborator_file
  ) {
    actionText =
      "Ver archivo entregado";
  } else if (
    document.company_template
  ) {
    actionText =
      "Ver plantilla";
  }


  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0] ||
      null;

    setSelectedFile(file);
    setFeedback("");
    setUploadError("");
  };


  const handleUpload =
    async () => {
      if (!selectedFile) {
        setUploadError(
          "Selecciona un archivo antes de continuar."
        );

        return;
      }

      setUploading(true);
      setFeedback("");
      setUploadError("");

      try {
        const formData =
          new FormData();

        formData.append(
          "collaborator_file",
          selectedFile
        );

        const response =
          await apiFetch(
            `/api/onboarding/documents/${document.id}/upload/`,
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.detail ||
              "No fue posible entregar el documento."
          );
        }

        setFeedback(
          data.message ||
            "Documento entregado correctamente."
        );

        setSelectedFile(null);

        setFileInputKey(
          (current) =>
            current + 1
        );

        await onRefresh();
      } catch (error) {
        setUploadError(
          error.message
        );
      } finally {
        setUploading(false);
      }
    };

  const handleConfirmReceipt =
  async () => {
    setConfirming(true);
    setFeedback("");
    setConfirmError("");

    try {
      const response =
        await apiFetch(
          `/api/onboarding/documents/${document.id}/confirm-receipt/`,
          {
            method: "POST",
          }
        );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "No fue posible confirmar la recepción."
        );
      }

      setFeedback(
        data.message ||
          "Recepción confirmada correctamente."
      );

      await onRefresh();
    } catch (error) {
      setConfirmError(
        error.message
      );
    } finally {
      setConfirming(false);
    }
  };


  return (
    <article className="document-card">
      <div className="document-top">
        <div className="document-icon">
          DOC
        </div>

        <span
          className={
            `status-badge ${statusClass}`
          }
        >
          {document.status_label}
        </span>
      </div>


      <h3>
        {
          document
            .document_type_label
        }
      </h3>


      <p className="document-description">
        Estado actual:{" "}
        <strong>
          {
            document
              .status_label
          }
        </strong>
      </p>


      {
        document.correction_reason &&
        (
          <div className="correction-box">
            <strong>
              Corrección solicitada
            </strong>

            <p>
              {
                document
                  .correction_reason
              }
            </p>
          </div>
        )
      }


      {
        requiresTemplate &&
        document.company_template &&
        uploadStatusAllowed &&
        (
          <a
            href={
              document
                .company_template
            }
            target="_blank"
            rel="noreferrer"
            className="document-template-link"
          >
            Descargar plantilla
            <span>↗</span>
          </a>
        )
      }


      {
        uploadStatusAllowed &&
        !templateAvailable &&
        (
          <div className="document-waiting">
            Esperando que PluriOne publique
            la plantilla de este documento.
          </div>
        )
      }


      {canUpload && (
        <div className="document-upload-area">
          <label
            className="document-upload-label"
            htmlFor={
              `document-file-${document.id}`
            }
          >
            {
              document.status ===
              "NEEDS_CORRECTION"
                ? "Seleccionar archivo corregido"
                : "Seleccionar archivo"
            }
          </label>

          <input
            key={fileInputKey}
            id={
              `document-file-${document.id}`
            }
            className="document-file-input"
            type="file"
            onChange={
              handleFileChange
            }
          />

          {
            selectedFile && (
              <div className="selected-file">
                <span>
                  Archivo seleccionado
                </span>

                <strong>
                  {
                    selectedFile.name
                  }
                </strong>
              </div>
            )
          }

          <button
            type="button"
            className="document-upload-button"
            disabled={
              uploading ||
              !selectedFile
            }
            onClick={
              handleUpload
            }
          >
            {
              uploading
                ? "Entregando..."
                : document.status ===
                    "NEEDS_CORRECTION"
                  ? "Entregar corrección"
                  : "Entregar documento"
            }
          </button>
        </div>
      )}


      {feedback && (
        <div className="document-feedback success">
          {feedback}
        </div>
      )}


      {uploadError && (
        <div className="document-feedback error">
          {uploadError}
        </div>
      )}

      {confirmError && (
        <div className="document-feedback error">
          {confirmError}
        </div>
      )}


      {
        !canUpload &&
        downloadableFile &&
        (
          <a
            href={
              downloadableFile
            }
            target="_blank"
            rel="noreferrer"
            className="document-action"
          >
            {actionText}
            <span>↗</span>
          </a>
        )
      }

      {canConfirmReceipt && (
  <div className="receipt-confirm-panel">
    <strong>
      Documento listo para ti
    </strong>

    <p>
      Descarga y revisa el documento
      firmado. Después confirma que lo
      recibiste correctamente.
    </p>

    <button
      type="button"
      className="receipt-confirm-button"
      disabled={confirming}
      onClick={
        handleConfirmReceipt
      }
    >
      {confirming
        ? "Confirmando..."
        : "Confirmar recepción"}
    </button>
  </div>
)}


      {
        !canUpload &&
        !downloadableFile &&
        templateAvailable &&
        (
          <span className="document-muted">
            Sin archivo disponible
          </span>
        )
      }
    </article>
  );
}
