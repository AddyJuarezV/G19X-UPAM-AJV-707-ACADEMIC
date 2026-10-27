import { initials } from "../utils/nombres";
import { useState } from "react";

export default function PendingDocument({
  document,
  apiFetch,
  onRefresh,
}) {
  const [
    reviewing,
    setReviewing,
  ] = useState(false);

  const [
    showCorrection,
    setShowCorrection,
  ] = useState(false);

  const [
    correctionReason,
    setCorrectionReason,
  ] = useState("");

  const [
    reviewError,
    setReviewError,
  ] = useState("");

  const [
    signedFile,
    setSignedFile,
  ] = useState(null);

  const [
    signing,
    setSigning,
  ] = useState(false);

  const [
    signingError,
    setSigningError,
  ] = useState("");

  const [
    signedInputKey,
    setSignedInputKey,
  ] = useState(0);

  const [
  templateFile,
  setTemplateFile,
] = useState(null);

const [
  publishingTemplate,
  setPublishingTemplate,
] = useState(false);

const [
  templateError,
  setTemplateError,
] = useState("");

const [
  templateInputKey,
  setTemplateInputKey,
] = useState(0);

  const isDelivered =
    document.status ===
    "DELIVERED";

  const isPendingSignature =
    document.status ===
    "PENDING_SIGNATURE";

  const needsCompanyTemplate =
  document.status === "PENDING" &&
  [
    "NDA",
    "ACCEPTANCE_LETTER",
  ].includes(
    document.document_type
  );


  const sendDecision =
    async (decision) => {
      if (
        decision ===
          "REQUEST_CORRECTION" &&
        !correctionReason.trim()
      ) {
        setReviewError(
          "Escribe el motivo de la corrección."
        );

        return;
      }

      setReviewing(true);
      setReviewError("");

      try {
        const response =
          await apiFetch(
            `/api/onboarding/documents/${document.id}/review/`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                decision,

                correction_reason:
                  decision ===
                  "REQUEST_CORRECTION"
                    ? correctionReason.trim()
                    : "",
              }),
            }
          );

        const data =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.detail ||
              data.correction_reason?.[0] ||
              "No fue posible revisar el documento."
          );
        }

        await onRefresh();
      } catch (error) {
        setReviewError(
          error.message
        );
      } finally {
        setReviewing(false);
      }
    };


  const uploadSignedDocument =
    async () => {
      if (!signedFile) {
        setSigningError(
          "Selecciona el documento firmado."
        );

        return;
      }

      setSigning(true);
      setSigningError("");

      try {
        const formData =
          new FormData();

        formData.append(
          "company_signed_file",
          signedFile
        );

        const response =
          await apiFetch(
            `/api/onboarding/documents/${document.id}/company-sign/`,
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
              data.company_signed_file?.[0] ||
              "No fue posible subir el documento firmado."
          );
        }

        setSignedFile(null);

        setSignedInputKey(
          (current) =>
            current + 1
        );

        await onRefresh();
      } catch (error) {
        setSigningError(
          error.message
        );
      } finally {
        setSigning(false);
      }
    };

    const uploadCompanyTemplate =
  async () => {
    if (!templateFile) {
      setTemplateError(
        "Selecciona una plantilla antes de continuar."
      );

      return;
    }

    setPublishingTemplate(true);
    setTemplateError("");

    try {
      const formData =
        new FormData();

      formData.append(
        "company_template",
        templateFile
      );

      const response =
        await apiFetch(
          `/api/onboarding/documents/${document.id}/company-template/`,
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
            data.company_template?.[0] ||
            "No fue posible publicar la plantilla."
        );
      }

      setTemplateFile(null);

      setTemplateInputKey(
        (current) =>
          current + 1
      );

      await onRefresh();
    } catch (error) {
      setTemplateError(
        error.message
      );
    } finally {
      setPublishingTemplate(false);
    }
  };


  return (
    <article className="pending-review-card">
      <div className="pending-review-header">
        <div className="pending-review-person">
          <div className="pending-avatar">
            {
              initials(
                document.collaborator_name
              )
            }
          </div>

          <div className="pending-main">
            <strong>
              {
                document.collaborator_label
              }
            </strong>

            <span>
              {
                document.document_type_label
              }
            </span>
          </div>
        </div>

        <span className="pending-status">
          {document.status_label}
        </span>
      </div>


      <div className="pending-review-info">
        <div>
          <span>
            Documento
          </span>

          <strong>
            {
              document.document_type_label
            }
          </strong>
        </div>

        <div>
          <span>
            Estado
          </span>

          <strong>
            {
              document.status_label
            }
          </strong>
        </div>
      </div>


      {
        document.collaborator_file &&
        (
          <a
            href={
              document.collaborator_file
            }
            target="_blank"
            rel="noreferrer"
            className="pending-file-button"
          >
            Ver archivo entregado
            <span>↗</span>
          </a>
        )
      }

      {needsCompanyTemplate && (
  <div className="company-template-panel">
    <strong>
      Plantilla requerida
    </strong>

    <p>
      El colaborador todavía no puede
      entregar este documento. Publica
      primero la plantilla que deberá
      descargar y completar.
    </p>

    <label
      htmlFor={
        `template-file-${document.id}`
      }
      className="document-upload-label"
    >
      Seleccionar plantilla
    </label>

    <input
      key={templateInputKey}
      id={
        `template-file-${document.id}`
      }
      type="file"
      className="document-file-input"
      onChange={(event) => {
        setTemplateFile(
          event.target
            .files?.[0] ||
            null
        );

        setTemplateError("");
      }}
    />

    {templateFile && (
      <div className="selected-file">
        <span>
          Plantilla seleccionada
        </span>

        <strong>
          {templateFile.name}
        </strong>
      </div>
    )}

    <button
      type="button"
      className="company-template-button"
      disabled={
        publishingTemplate ||
        !templateFile
      }
      onClick={
        uploadCompanyTemplate
      }
    >
      {publishingTemplate
        ? "Publicando..."
        : "Publicar plantilla"}
    </button>

    {templateError && (
      <div className="document-feedback error">
        {templateError}
      </div>
    )}
  </div>
)}


      {isDelivered && (
        <>
          <div className="pending-review-actions">
            <button
              type="button"
              className="review-approve-button"
              disabled={reviewing}
              onClick={() =>
                sendDecision(
                  "APPROVE"
                )
              }
            >
              {reviewing
                ? "Procesando..."
                : "Aprobar"}
            </button>

            <button
              type="button"
              className="review-correction-button"
              disabled={reviewing}
              onClick={() => {
                setShowCorrection(
                  (current) =>
                    !current
                );

                setReviewError("");
              }}
            >
              Solicitar corrección
            </button>
          </div>


          {showCorrection && (
            <div className="correction-request-panel">
              <label
                htmlFor={
                  `correction-${document.id}`
                }
              >
                Motivo de la corrección
              </label>

              <textarea
                id={
                  `correction-${document.id}`
                }
                rows="4"
                placeholder="Indica qué debe corregir el colaborador."
                value={
                  correctionReason
                }
                onChange={(event) =>
                  setCorrectionReason(
                    event.target.value
                  )
                }
                disabled={reviewing}
              />

              <div className="correction-request-actions">
                <button
                  type="button"
                  className="correction-cancel-button"
                  disabled={reviewing}
                  onClick={() => {
                    setShowCorrection(
                      false
                    );

                    setCorrectionReason(
                      ""
                    );

                    setReviewError(
                      ""
                    );
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="correction-confirm-button"
                  disabled={reviewing}
                  onClick={() =>
                    sendDecision(
                      "REQUEST_CORRECTION"
                    )
                  }
                >
                  {reviewing
                    ? "Enviando..."
                    : "Enviar corrección"}
                </button>
              </div>
            </div>
          )}
        </>
      )}


      {isPendingSignature && (
        <div className="company-sign-panel">
          <strong>
            Firma de la empresa
          </strong>

          <p>
            Este documento fue aprobado.
            Ahora debe cargarse la versión
            firmada por PluriOne.
          </p>

          <label
            htmlFor={
              `signed-file-${document.id}`
            }
            className="document-upload-label"
          >
            Seleccionar documento firmado
          </label>

          <input
            key={signedInputKey}
            id={
              `signed-file-${document.id}`
            }
            type="file"
            className="document-file-input"
            onChange={(event) => {
              setSignedFile(
                event.target
                  .files?.[0] ||
                  null
              );

              setSigningError("");
            }}
          />

          {signedFile && (
            <div className="selected-file">
              <span>
                Archivo seleccionado
              </span>

              <strong>
                {signedFile.name}
              </strong>
            </div>
          )}

          <button
            type="button"
            className="company-sign-button"
            disabled={
              signing ||
              !signedFile
            }
            onClick={
              uploadSignedDocument
            }
          >
            {signing
              ? "Subiendo..."
              : "Subir documento firmado"}
          </button>

          {signingError && (
            <div className="document-feedback error">
              {signingError}
            </div>
          )}
        </div>
      )}


      {reviewError && (
        <div className="document-feedback error">
          {reviewError}
        </div>
      )}
    </article>
  );
}
