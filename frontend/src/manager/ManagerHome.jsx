import { initials } from "../utils/nombres";
import { useState } from "react";
import PendingApplication from "./PendingApplication";
import PendingDocument from "./PendingDocument";
import EmptyState from "../components/EmptyState";
import UserChip from "../components/UserChip";
import Sidebar from "../components/Sidebar";

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

  const [pendingActionFilter, setPendingActionFilter] =
    useState("ALL");

  const pendingActionCounts = {
    ALL: pendingDocuments.length,
    TEMPLATE: pendingDocuments.filter(
      (doc) => doc.status === "PENDING"
    ).length,
    REVIEW: pendingDocuments.filter(
      (doc) => doc.status === "DELIVERED"
    ).length,
    SIGNATURE: pendingDocuments.filter(
      (doc) => doc.status === "PENDING_SIGNATURE"
    ).length,
  };

  const filteredManagerPendingDocuments =
    pendingDocuments.filter((doc) => {
      if (pendingActionFilter === "ALL") {
        return true;
      }

      const statuses = {
        TEMPLATE: "PENDING",
        REVIEW: "DELIVERED",
        SIGNATURE: "PENDING_SIGNATURE",
      };

      return doc.status === statuses[pendingActionFilter];
    });

  const pendingFilterOptions = [
    { id: "ALL", label: "Todos" },
    { id: "TEMPLATE", label: "Publicar plantilla" },
    { id: "REVIEW", label: "Revisar entregas" },
    { id: "SIGNATURE", label: "Pendientes de firma" },
  ];



  const [
    memberFilter,
    setMemberFilter,
  ] = useState("ALL");

  const filteredMembers =
    memberFilter === "ALL"
      ? members
      : members.filter(
          (member) =>
            member.visual_status ===
            memberFilter
        );


  const [
    selectedMemberId,
    setSelectedMemberId,
  ] = useState(null);

  const selectedMember =
    members.find(
      (member) =>
        member.collaborator_id ===
        selectedMemberId
    ) || null;

  const selectedMemberPendingDocuments =
    selectedMember
      ? pendingDocuments.filter(
          (document) =>
            document.collaborator_id ===
            selectedMember.collaborator_id
        )
      : [];

  const selectedMemberApplicationLabel =
    selectedMember
      ? {
          DRAFT: "Borrador",
          IN_REVIEW: "En revisión",
          NEEDS_CORRECTION:
            "Requiere corrección",
          APPROVED: "Aprobada",
        }[
          selectedMember
            .application_status
        ] ||
        selectedMember
          .application_status
      : "";

  const selectedMemberProgress =
    selectedMember &&
    selectedMember.documents_total > 0
      ? Math.round(
          (
            selectedMember
              .documents_completed /
            selectedMember
              .documents_total
          ) * 100
        )
      : 0;

  const greenCount =
    members.filter(
      (member) =>
        member.visual_status === "GREEN"
    ).length;


  const yellowCount =
    members.filter(
      (member) =>
        member.visual_status === "YELLOW"
    ).length;

  const redCount =
    members.filter(
      (member) =>
        member.visual_status === "RED"
    ).length;

  const selectedGenerationStatusLabel =
    selectedGeneration?.status === "OPEN"
      ? "Abierta"
      : selectedGeneration?.status === "CLOSED"
        ? "Cerrada"
        : "Sin estado";

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

        <section className="manager-summary-grid manager-home-summary">
          <ManagerSummary
            label="Generación activa"
            value={
              selectedGeneration
                ? `Generación ${selectedGeneration.number}`
                : "Sin generación"
            }
            description={
              selectedGeneration
                ? selectedGenerationStatusLabel
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


        <div className="manager-home-main-grid">
          <section
            className="content-section available-section manager-home-available"
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
                {availableCollaborators.length}
                {" "}
                disponibles
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


          <section className="content-section manager-attention-card">
            <div>
              <span className="eyebrow">
                ESTADO OPERATIVO
              </span>

              <h2>
                Atención requerida
              </h2>

              <p className="manager-attention-description">
                Resumen de los elementos que
                actualmente requieren gestión.
              </p>
            </div>


            <div className="manager-attention-list">
              <div>
                <span>
                  Solicitudes por revisar
                </span>

                <strong>
                  {pendingApplications.length}
                </strong>
              </div>

              <div>
                <span>
                  Documentos por gestionar
                </span>

                <strong>
                  {pendingDocuments.length}
                </strong>
              </div>

              <div>
                <span>
                  Colaboradores sin asignar
                </span>

                <strong>
                  {availableCollaborators.length}
                </strong>
              </div>
            </div>


            {(
              pendingApplications.length +
              pendingDocuments.length
            ) > 0 ? (
              <div className="manager-attention-footer attention">
                <div>
                  <strong>
                    Hay gestiones pendientes
                  </strong>

                  <span>
                    Revisa las solicitudes o
                    documentos que necesitan
                    intervención.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSectionChange(
                      "pendientes"
                    )
                  }
                >
                  Ver pendientes
                </button>
              </div>
            ) : (
              <div className="manager-attention-footer clear">
                <div>
                  <strong>
                    Gestión al día
                  </strong>

                  <span>
                    No hay solicitudes ni
                    documentos esperando
                    revisión.
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>


          </>
        )}


        {activeSection === "generaciones" && (
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

                    <section
            className="generation-summary-grid"
            aria-label="Filtros de colaboradores"
          >
            <button
              type="button"
              className={
                memberFilter === "ALL"
                  ? "generation-summary-card active"
                  : "generation-summary-card"
              }
              onClick={() =>
                setMemberFilter("ALL")
              }
            >
              <span>
                Colaboradores asignados
              </span>

              <strong>
                {members.length}
              </strong>

              <p>
                Total en la generación
              </p>
            </button>


            <button
              type="button"
              className={
                memberFilter === "GREEN"
                  ? "generation-summary-card complete active"
                  : "generation-summary-card complete"
              }
              onClick={() =>
                setMemberFilter("GREEN")
              }
            >
              <span>
                Completos
              </span>

              <strong>
                {greenCount}
              </strong>

              <p>
                Proceso terminado
              </p>
            </button>


            <button
              type="button"
              className={
                memberFilter === "YELLOW"
                  ? "generation-summary-card process active"
                  : "generation-summary-card process"
              }
              onClick={() =>
                setMemberFilter("YELLOW")
              }
            >
              <span>
                En proceso
              </span>

              <strong>
                {yellowCount}
              </strong>

              <p>
                Incorporación en curso
              </p>
            </button>


            <button
              type="button"
              className={
                memberFilter === "RED"
                  ? "generation-summary-card danger active"
                  : redCount > 0
                    ? "generation-summary-card danger"
                    : "generation-summary-card"
              }
              onClick={() =>
                setMemberFilter("RED")
              }
            >
              <span>
                Requieren atención
              </span>

              <strong>
                {redCount}
              </strong>

              <p>
                Casos con observaciones
              </p>
            </button>
          </section>


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
      selectedGenerationStatusLabel
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


              {filteredMembers.length > 0 ? (
                <div className="member-grid">
                  {filteredMembers.map(
                    (member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        onOpen={() =>
                          setSelectedMemberId(
                            member.collaborator_id
                          )
                        }
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

        )}


        {activeSection === "generaciones" &&
          selectedMember && (
          <div
            className="member-detail-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setSelectedMemberId(
                  null
                );
              }
            }}
          >
            <section
              className="member-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="member-detail-title"
            >
              <header className="member-detail-header">
                <div>
                  <span className="eyebrow">
                    COLABORADOR
                  </span>

                  <h2 id="member-detail-title">
                    {selectedMember.full_name}
                  </h2>

                  <p>
                    {
                      selectedMember
                        .university
                    }
                  </p>
                </div>

                <button
                  type="button"
                  className="member-detail-close"
                  aria-label="Cerrar detalle"
                  onClick={() =>
                    setSelectedMemberId(
                      null
                    )
                  }
                >
                  ×
                </button>
              </header>


              <div className="member-detail-summary">
                <div>
                  <span>
                    Universidad
                  </span>

                  <strong>
                    {
                      selectedMember
                        .university_acronym
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Carrera
                  </span>

                  <strong>
                    {
                      selectedMember
                        .career
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Solicitud
                  </span>

                  <strong>
                    {
                      selectedMemberApplicationLabel
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Documentos
                  </span>

                  <strong>
                    {
                      selectedMember
                        .documents_completed
                    }
                    /
                    {
                      selectedMember
                        .documents_total
                    }
                  </strong>
                </div>
              </div>


              <section className="member-detail-progress">
                <div>
                  <span>
                    AVANCE DOCUMENTAL
                  </span>

                  <strong>
                    {selectedMemberProgress}%
                  </strong>
                </div>

                <div className="member-detail-progress-track">
                  <div
                    style={{
                      width:
                        `${selectedMemberProgress}%`,
                    }}
                  ></div>
                </div>
              </section>


              <div className="member-detail-management-heading">
                <div>
                  <span className="eyebrow">
                    GESTIÓN
                  </span>

                  <h3>
                    Pendientes del encargado
                  </h3>
                </div>

                <span className="document-count">
                  {
                    selectedMemberPendingDocuments
                      .length
                  }{" "}
                  pendientes
                </span>
              </div>


              {
                selectedMemberPendingDocuments
                  .length > 0 ? (
                  <div className="member-detail-pending-list">
                    {
                      selectedMemberPendingDocuments
                        .map(
                          (document) => (
                            <PendingDocument
                              key={
                                document.id
                              }
                              document={
                                document
                              }
                              apiFetch={
                                apiFetch
                              }
                              onRefresh={
                                onRefresh
                              }
                            />
                          )
                        )
                    }
                  </div>
                ) : (
                  <div className="member-detail-clear">
                    <div>
                      ?
                    </div>

                    <strong>
                      Sin acciones pendientes
                      para el encargado
                    </strong>

                    <p>
                      Actualmente no existen
                      documentos de este
                      colaborador que requieran
                      gestión de PluriOne.
                    </p>
                  </div>
                )
              }
            </section>
          </div>
        )}


        {activeSection === "pendientes" && (
          <>
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

          <div className="manager-pending-action-filters">
            <span className="eyebrow">
              FILTRAR POR ACCIÓN
            </span>

            <div
              className="manager-pending-filter-buttons"
              role="group"
              aria-label="Filtrar documentos"
            >
              {pendingFilterOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={
                    pendingActionFilter === option.id
                      ? "manager-pending-filter active"
                      : "manager-pending-filter"
                  }
                  aria-pressed={
                    pendingActionFilter === option.id
                  }
                  onClick={() =>
                    setPendingActionFilter(option.id)
                  }
                >
                  <span>{option.label}</span>
                  <strong>
                    {pendingActionCounts[option.id]}
                  </strong>
                </button>
              ))}
            </div>
          </div>


          {filteredManagerPendingDocuments.length > 0 ? (
              <div className="pending-list">
                {
                  filteredManagerPendingDocuments.map(
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
                title={
                  pendingActionFilter === "ALL"
                    ? "Todo al día"
                    : "Sin documentos en esta categoría"
                }
                text={
                  pendingActionFilter === "ALL"
                    ? "No hay documentos que requieran gestión."
                    : "No hay documentos para el filtro seleccionado."
                }
              />
            )
          }
        </section>
          </>
        )}
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
  onOpen,
}) {
  const visual =
    member.visual_status || "YELLOW";

  const statusLabel = {
    GREEN: "Completo",
    YELLOW: "En proceso",
    RED: "Requiere atención",
  }[visual];

  const applicationStatusLabel = {
    DRAFT: "Borrador",
    IN_REVIEW: "En revisión",
    NEEDS_CORRECTION:
      "Requiere corrección",
    APPROVED: "Aprobada",
  }[member.application_status] ||
    member.application_status;


  return (
    <article
      className={
        `member-card member-card-clickable ${visual.toLowerCase()}`
      }
      role="button"
      tabIndex="0"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onOpen();
        }
      }}
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
              applicationStatusLabel
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
