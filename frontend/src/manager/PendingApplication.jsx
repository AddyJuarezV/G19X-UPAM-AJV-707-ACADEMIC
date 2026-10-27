import { initials } from "../utils/nombres";
import { useState } from "react";

export default function PendingApplication({
  application,
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


  const reviewApplication =
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
            `/api/accounts/applications/${application.id}/review/`,
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
              "No fue posible revisar la solicitud."
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


  return (
    <article className="application-manager-card">
      <div className="application-manager-top">
        <div className="pending-review-person">
          <div className="pending-avatar">
            {initials(
              application.full_name
            )}
          </div>

          <div>
            <strong className="application-manager-name">
              {application.full_name}
            </strong>

            <span className="application-manager-email">
              {application.email}
            </span>
          </div>
        </div>

        <span className="pending-status">
          {application.application_status}
        </span>
      </div>


      <div className="application-manager-details">
        <div>
          <span>Universidad</span>

          <strong>
            {application.university}
          </strong>
        </div>

        <div>
          <span>Siglas</span>

          <strong>
            {application.university_acronym}
          </strong>
        </div>

        <div>
          <span>Carrera</span>

          <strong>
            {application.career}
          </strong>
        </div>

        <div>
          <span>Horas</span>

          <strong>
            {application.required_hours}
          </strong>
        </div>
      </div>


      <div className="pending-review-actions">
        <button
          type="button"
          className="review-approve-button"
          disabled={reviewing}
          onClick={() =>
            reviewApplication(
              "APPROVE"
            )
          }
        >
          {reviewing
            ? "Procesando..."
            : "Aprobar solicitud"}
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
              `application-correction-${application.id}`
            }
          >
            Motivo de la corrección
          </label>

          <textarea
            id={
              `application-correction-${application.id}`
            }
            rows="4"
            placeholder="Indica qué información debe corregir el colaborador."
            value={correctionReason}
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
                setShowCorrection(false);
                setCorrectionReason("");
                setReviewError("");
              }}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="correction-confirm-button"
              disabled={reviewing}
              onClick={() =>
                reviewApplication(
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


      {reviewError && (
        <div className="document-feedback error">
          {reviewError}
        </div>
      )}
    </article>
  );
}
