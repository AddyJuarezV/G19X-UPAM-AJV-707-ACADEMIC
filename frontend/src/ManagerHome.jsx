import { useState } from "react";
import PendingApplication from "./PendingApplication";
import PendingDocument from "./PendingDocument";
import {
  EmptyState,
  UserChip,
  Sidebar,
} from "./DashboardShared";

export default function ManagerHome({
  user,
  generations,
  pendingDocuments,
  pendingApplications,
  availableCollaborators,
  apiFetch,
  onRefresh,
  onLogout,
}) {
 const firstOpenGeneration =
  generations.find(
    (generation) =>
      generation.status === "OPEN"
  );

const defaultGeneration =
  firstOpenGeneration ||
  generations[0] ||
  null;

const [
  selectedGenerationId,
  setSelectedGenerationId,
] = useState(null);

const selectedGeneration =
  generations.find(
    (generation) =>
      generation.id ===
      selectedGenerationId
  ) ||
  defaultGeneration;

  const members =
    selectedGeneration?.members || [];

  const greenCount =
    members.filter(
      (member) =>
        member.visual_status === "GREEN"
    ).length;

    const [
  showGenerationForm,
  setShowGenerationForm,
] = useState(false);

const [
  generationNumber,
  setGenerationNumber,
] = useState("");

const [
  creatingGeneration,
  setCreatingGeneration,
] = useState(false);

const [
  generationError,
  setGenerationError,
] = useState("");

const [
  generationFeedback,
  setGenerationFeedback,
] = useState("");

const [
  closingGenerationId,
  setClosingGenerationId,
] = useState(null);

const createGeneration =
  async (event) => {
    event.preventDefault();

    const number =
      Number(generationNumber);

    if (
      !Number.isInteger(number) ||
      number <= 0
    ) {
      setGenerationError(
        "Escribe un número de generación válido."
      );

      return;
    }

    setCreatingGeneration(true);
    setGenerationError("");
    setGenerationFeedback("");

    try {
      const response =
        await apiFetch(
          "/api/onboarding/generations/create/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              number,
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
            data.number?.[0] ||
            "No fue posible crear la generación."
        );
      }

      setGenerationFeedback(
        `Generación ${number} creada correctamente.`
      );

      setGenerationNumber("");
      setShowGenerationForm(false);

      await onRefresh();
    } catch (error) {
      setGenerationError(
        error.message
      );
    } finally {
      setCreatingGeneration(false);
    }
  };

  const closeGeneration =
  async (generation) => {
    if (
      generation.status !==
      "OPEN"
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        `¿Cerrar la Generación ${generation.number}? Después del cierre ya no podrán agregarse nuevos colaboradores.`
      );

    if (!confirmed) {
      return;
    }

    setClosingGenerationId(
      generation.id
    );

    setGenerationError("");
    setGenerationFeedback("");

    try {
      const response =
        await apiFetch(
          `/api/onboarding/generations/${generation.id}/close/`,
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
            "No fue posible cerrar la generación."
        );
      }

      setGenerationFeedback(
        data.message ||
          `Generación ${generation.number} cerrada correctamente.`
      );

      await onRefresh();
    } catch (error) {
      setGenerationError(
        error.message
      );
    } finally {
      setClosingGenerationId(
        null
      );
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
              PANEL DEL ENCARGADO
            </span>

            <h1>
              Administración de incorporación
            </h1>

            <p>
              Consulta generaciones,
              colaboradores y pendientes
              desde un solo lugar.
            </p>
          </div>

          <UserChip
            title="Encargado"
            subtitle={user.email}
            avatar="E"
          />
        </header>

        <section
  className="content-section available-section"
  id="disponibles"
>
  <div className="section-heading">
    <div>
      <span className="eyebrow">
        INCORPORACIÓN
      </span>

      <h2>
        Colaboradores disponibles
      </h2>
    </div>

    <span className="document-count">
      {availableCollaborators.length} disponibles
    </span>
  </div>


  {availableCollaborators.length > 0 ? (
    <div className="available-collaborators-grid">
      {availableCollaborators.map(
  (collaborator) => (
    <AvailableCollaboratorCard
      key={collaborator.id}
      collaborator={collaborator}
      generations={generations}
      apiFetch={apiFetch}
      onRefresh={onRefresh}
    />
  )
)}
    </div>
  ) : (
    <EmptyState
      title="Sin colaboradores disponibles"
      text="No hay colaboradores aprobados esperando asignación a una generación."
    />
  )}
</section>


        <section className="manager-summary-grid">
          <ManagerSummary
            label="Generación activa"
            value={
              selectedGeneration
                ? `Generación ${selectedGeneration.number}`
                : "Sin generación"
            }
            description={
              selectedGeneration
                ? selectedGeneration.status
                : "No disponible"
            }
          />

          <ManagerSummary
            label="Colaboradores"
            value={members.length}
            description={
              `${greenCount} completos`
            }
          />

          <ManagerSummary
            label="Solicitudes pendientes"
            value={
             pendingApplications.length
            }
            description="Esperando revisión"
            danger={
              pendingApplications.length > 0
            }
          />

          <ManagerSummary
            label="Pendientes de gestión"
            value={
              pendingDocuments.length
            }
            description="Revisión o firma"
          />
        </section>


        <section
          className="content-section"
          id="generaciones"
        >
          <div className="section-heading manager-heading">
            <div>
              <span className="eyebrow">
                GENERACIONES
              </span>

              <h2>
                Tablero de colaboradores
              </h2>
            </div>

            <div className="generation-manager-actions">
  <div className="generation-tabs">
    {generations.map(
      (generation) => (
        <button
          key={generation.id}
          type="button"
          className={
            selectedGeneration?.id ===
            generation.id
              ? "generation-tab active"
              : "generation-tab"
          }
          onClick={() =>
            setSelectedGenerationId(
              generation.id
            )
          }
        >
          G{generation.number}

          <span
            className={
              generation.status ===
              "OPEN"
                ? "generation-dot open"
                : "generation-dot closed"
            }
          ></span>
        </button>
      )
    )}
  </div>

  <button
    type="button"
    className="generation-create-toggle"
    onClick={() => {
      setShowGenerationForm(
        (current) =>
          !current
      );

      setGenerationError("");
      setGenerationFeedback("");
    }}
  >
    + Nueva generación
  </button>
</div>
          </div>

          {showGenerationForm && (
  <form
    className="generation-create-panel"
    onSubmit={createGeneration}
  >
    <div>
      <span className="eyebrow">
        NUEVA GENERACIÓN
      </span>

      <h3>
        Crear grupo de incorporación
      </h3>

      <p>
        La nueva generación comenzará
        abierta y podrá recibir
        colaboradores aprobados.
      </p>
    </div>

    <div className="generation-create-controls">
      <label
        htmlFor="generation-number"
      >
        Número de generación
      </label>

      <div>
        <input
          id="generation-number"
          type="number"
          min="1"
          inputMode="numeric"
          placeholder="Ej. 21"
          value={generationNumber}
          disabled={
            creatingGeneration
          }
          onChange={(event) => {
            setGenerationNumber(
              event.target.value
            );

            setGenerationError("");
          }}
          required
        />

        <button
          type="submit"
          disabled={
            creatingGeneration
          }
        >
          {creatingGeneration
            ? "Creando..."
            : "Crear generación"}
        </button>
      </div>
    </div>
  </form>
)}


{generationFeedback && (
  <div className="generation-feedback success">
    {generationFeedback}
  </div>
)}


{generationError && (
  <div className="generation-feedback error">
    {generationError}
  </div>
)}


          {selectedGeneration ? (
            <>
              <div className="generation-info">
                <div>
                  <h3>
                    Generación{" "}
                    {
                      selectedGeneration.number
                    }
                  </h3>

                  <p>
                    {
                      selectedGeneration
                        .members_count
                    }{" "}
                    colaboradores asignados
                  </p>
                </div>

                <div className="generation-info-actions">
  <span
    className={
      selectedGeneration
        .status === "OPEN"
        ? "generation-status open"
        : "generation-status closed"
    }
  >
    {
      selectedGeneration
        .status
    }
  </span>


  {selectedGeneration.status ===
    "OPEN" && (
    <button
      type="button"
      className="generation-close-button"
      disabled={
        closingGenerationId ===
        selectedGeneration.id
      }
      onClick={() =>
        closeGeneration(
          selectedGeneration
        )
      }
    >
      {closingGenerationId ===
      selectedGeneration.id
        ? "Cerrando..."
        : "Cerrar generación"}
    </button>
  )}
</div>
              </div>


              {members.length > 0 ? (
                <div className="member-grid">
                  {members.map(
                    (member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState
                  title="Sin colaboradores"
                  text="Esta generación todavía no tiene colaboradores asignados."
                />
              )}
            </>
          ) : (
            <EmptyState
              title="Sin generaciones"
              text="Todavía no existen generaciones registradas."
            />
          )}
        </section>

        <section
          className="content-section application-manager-section"
          id="solicitudes"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                SOLICITUDES
              </span>

              <h2>
               Solicitudes por revisar
              </h2>
          </div>

          <span className="document-count">
            {pendingApplications.length} pendientes
          </span>
         </div>

         {pendingApplications.length > 0 ? (
          <div className="application-manager-list">
            {pendingApplications.map(
             (application) => (
                <PendingApplication
                  key={application.id}
                  application={application}
                  apiFetch={apiFetch}
                  onRefresh={onRefresh}
                />
              )
            )}
          </div>
        ) : (
          <EmptyState
            title="Sin solicitudes pendientes"
            text="No hay colaboradores esperando revisión inicial."
          />
         )}
        </section>




        <section
          className="content-section pending-section"
          id="pendientes"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                PENDIENTES
              </span>

              <h2>
                 Documentos por gestionar
              </h2>
            </div>

            <span className="document-count">
              {
                pendingDocuments.length
              }{" "}
              pendientes
            </span>
          </div>

          {
            pendingDocuments.length >
            0 ? (
              <div className="pending-list">
                {
                  pendingDocuments.map(
                    (document) => (
                     <PendingDocument
                       key={document.id}
                       document={document}
                       apiFetch={apiFetch}
                       onRefresh={onRefresh}
                     />
                    )
                  )
                }
              </div>
            ) : (
              <EmptyState
                title="Todo al día"
                text="No hay documentos entregados esperando revisión."
              />
            )
          }
        </section>
      </main>
    </div>
  );
}

function AvailableCollaboratorCard({
  collaborator,
  generations,
  apiFetch,
  onRefresh,
}) {
  const openGenerations =
    generations.filter(
      (generation) =>
        generation.status === "OPEN"
    );

  const [
    generationId,
    setGenerationId,
  ] = useState(
    openGenerations[0]?.id
      ? String(
          openGenerations[0].id
        )
      : ""
  );

  const [
    assigning,
    setAssigning,
  ] = useState(false);

  const [
    assignmentError,
    setAssignmentError,
  ] = useState("");

  const [
    assignmentFeedback,
    setAssignmentFeedback,
  ] = useState("");


  const assignCollaborator =
    async () => {
      if (!generationId) {
        setAssignmentError(
          "Selecciona una generación abierta."
        );

        return;
      }

      setAssigning(true);
      setAssignmentError("");
      setAssignmentFeedback("");

      try {
        const response =
          await apiFetch(
            `/api/onboarding/generations/${generationId}/members/`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                collaborator_id:
                  collaborator.id,
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
              data.collaborator_id?.[0] ||
              "No fue posible asignar al colaborador."
          );
        }

        setAssignmentFeedback(
          data.message ||
            "Colaborador asignado correctamente."
        );

        await onRefresh();
      } catch (error) {
        setAssignmentError(
          error.message
        );
      } finally {
        setAssigning(false);
      }
    };


  return (
    <article className="available-collaborator-card">
      <div className="available-collaborator-header">
        <div className="pending-avatar">
          {initials(
            collaborator.full_name
          )}
        </div>

        <div>
          <strong>
            {collaborator.full_name}
          </strong>

          <span>
            {collaborator.email}
          </span>
        </div>
      </div>


      <div className="available-collaborator-info">
        <div>
          <span>
            Universidad
          </span>

          <strong>
            {
              collaborator
                .university_acronym
            }
          </strong>
        </div>

        <div>
          <span>
            Carrera
          </span>

          <strong>
            {collaborator.career}
          </strong>
        </div>

        <div>
          <span>
            Horas
          </span>

          <strong>
            {
              collaborator
                .required_hours
            }
          </strong>
        </div>

        <div>
          <span>
            Estado
          </span>

          <strong>
            {
              collaborator
                .application_status
            }
          </strong>
        </div>
      </div>


      {openGenerations.length > 0 ? (
        <div className="generation-assignment-panel">
          <label
            htmlFor={
              `generation-${collaborator.id}`
            }
          >
            Asignar a generación
          </label>

          <div className="generation-assignment-controls">
            <select
              id={
                `generation-${collaborator.id}`
              }
              value={generationId}
              disabled={assigning}
              onChange={(event) => {
                setGenerationId(
                  event.target.value
                );

                setAssignmentError("");
              }}
            >
              {openGenerations.map(
                (generation) => (
                  <option
                    key={generation.id}
                    value={generation.id}
                  >
                    Generación{" "}
                    {generation.number}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              disabled={
                assigning ||
                !generationId
              }
              onClick={
                assignCollaborator
              }
            >
              {assigning
                ? "Asignando..."
                : "Asignar colaborador"}
            </button>
          </div>
        </div>
      ) : (
        <div className="available-note">
          No existen generaciones abiertas.
        </div>
      )}


      {assignmentFeedback && (
        <div className="document-feedback success">
          {assignmentFeedback}
        </div>
      )}


      {assignmentError && (
        <div className="document-feedback error">
          {assignmentError}
        </div>
      )}
    </article>
  );
}


function ManagerSummary({
  label,
  value,
  description,
  danger = false,
}) {
  return (
    <article
      className={
        danger
          ? "manager-summary-card danger"
          : "manager-summary-card"
      }
    >
      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

      <p>
        {description}
      </p>
    </article>
  );
}


function MemberCard({
  member,
}) {
  const visual =
    member.visual_status || "YELLOW";

  const statusLabel = {
    GREEN: "Completo",
    YELLOW: "En proceso",
    RED: "Requiere atención",
  }[visual];

  return (
    <article
      className={
        `member-card ${visual.toLowerCase()}`
      }
    >
      <div className="member-card-top">
        <div
          className={
            `visual-indicator ${visual.toLowerCase()}`
          }
        ></div>

        <span
          className={
            `visual-badge ${visual.toLowerCase()}`
          }
        >
          {statusLabel}
        </span>
      </div>

      <h3>
        {member.card_label}
      </h3>

      <p className="member-career">
        {member.career}
      </p>

      <div className="member-meta">
        <div>
          <span>
            Solicitud
          </span>

          <strong>
            {
              member.application_status
            }
          </strong>
        </div>

        <div>
          <span>
            Documentos
          </span>

          <strong>
            {
              member.documents_completed
            }
            /
            {
              member.documents_total
            }
          </strong>
        </div>
      </div>

      <div className="member-progress">
        <div
          style={{
            width:
              member.documents_total > 0
                ? `${
                    (
                      member.documents_completed /
                      member.documents_total
                    ) * 100
                  }%`
                : "0%",
          }}
        ></div>
      </div>
    </article>
  );
}


function initials(
  fullName = ""
) {
  const names =
    fullName
      .trim()
      .split(" ")
      .filter(Boolean);

  if (names.length === 0) {
    return "C";
  }

  if (names.length === 1) {
    return names[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    names[0][0] +
    names[1][0]
  ).toUpperCase();
}
