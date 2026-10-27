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
      />

      <main className="dashboard-content">
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

<MyProfile
  apiFetch={apiFetch}
/>

<NotificationsPanel
  profile={profile}
  documents={documents}
  apiFetch={apiFetch}
/>


<section
  className="content-section"
  id="documentacion"
>
  <div className="section-heading">
    <div>
      <span className="eyebrow">
        DOCUMENTACIÓN
      </span>

      <h2>
        Mis documentos
      </h2>
    </div>

    <span className="document-count">
      {completedDocuments}/
      {documents.length} completos
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
