import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setDocuments([]);
    setGenerations([]);
    setPendingDocuments([]);

    setEmail("");
    setPassword("");
    setError("");
  };


  const refreshAccessToken = async () => {
    const refreshToken =
      localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("La sesión ha expirado.");
    }

    const response = await fetch(
      "/api/auth/refresh/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("La sesión ha expirado.");
    }

    const data = await response.json();

    localStorage.setItem(
      "accessToken",
      data.access
    );

    return data.access;
  };


  const apiFetch = async (
    url,
    options = {}
  ) => {
    let accessToken =
      localStorage.getItem("accessToken");

    const buildOptions = (token) => ({
      ...options,

      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    let response = await fetch(
      url,
      buildOptions(accessToken)
    );

    if (response.status === 401) {
      accessToken =
        await refreshAccessToken();

      response = await fetch(
        url,
        buildOptions(accessToken)
      );
    }

    return response;
  };


  const loadCurrentUser = async () => {
    const userResponse = await apiFetch(
      "/api/accounts/me/"
    );

    if (!userResponse.ok) {
      throw new Error(
        "No fue posible recuperar la sesión."
      );
    }

    const userData =
      await userResponse.json();

    setUser(userData);

    if (userData.role === "COLABORADOR") {
      const documentsResponse =
        await apiFetch(
          "/api/onboarding/documents/mine/"
        );

      if (!documentsResponse.ok) {
        throw new Error(
          "No fue posible consultar tus documentos."
        );
      }

      const documentsData =
        await documentsResponse.json();

      setDocuments(documentsData);
      setGenerations([]);
      setPendingDocuments([]);
    }

    if (userData.role === "ENCARGADO") {
      const [
        generationsResponse,
        pendingResponse,
      ] = await Promise.all([
        apiFetch(
          "/api/onboarding/generations/"
        ),

        apiFetch(
          "/api/onboarding/documents/pending/"
        ),
      ]);

      if (!generationsResponse.ok) {
        throw new Error(
          "No fue posible consultar las generaciones."
        );
      }

      if (!pendingResponse.ok) {
        throw new Error(
          "No fue posible consultar los pendientes."
        );
      }

      const generationsData =
        await generationsResponse.json();

      const pendingData =
        await pendingResponse.json();

      setGenerations(generationsData);
      setPendingDocuments(pendingData);

      setDocuments([]);
    }
  };


  useEffect(() => {
    const restoreSession = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      const refreshToken =
        localStorage.getItem("refreshToken");

      if (!accessToken && !refreshToken) {
        setCheckingSession(false);
        return;
      }

      try {
        await loadCurrentUser();
      } catch {
        logout();
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/auth/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Correo electrónico o contraseña incorrectos."
        );
      }

      localStorage.setItem(
        "accessToken",
        data.access
      );

      localStorage.setItem(
        "refreshToken",
        data.refresh
      );

      await loadCurrentUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  if (checkingSession) {
    return (
      <div className="session-loading">
        <div className="session-logo">
          P
        </div>

        <p>Cargando sesión...</p>
      </div>
    );
  }


  if (user) {
    return (
      <Dashboard
        user={user}
        documents={documents}
        generations={generations}
        pendingDocuments={pendingDocuments}
        onLogout={logout}
      />
    );
  }


  return (
    <Login
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}


function Login({
  email,
  password,
  setEmail,
  setPassword,
  loading,
  error,
  onSubmit,
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="modern-login-page">
      <div
        className={
          showForm
            ? "auth-shell form-open"
            : "auth-shell"
        }
      >
        <section className="auth-intro">
          <div className="auth-brand">
            <div className="auth-logo">
              P
            </div>

            <div>
              <strong>PluriOne</strong>
              <span>
                Sistema de Incorporación
              </span>
            </div>
          </div>

          <div className="auth-intro-content">
            <span className="auth-kicker">
              DEVELOP TALENT & TECHNOLOGY
            </span>

            <h1>
              Tu proceso de
              <span> incorporación </span>
              en un solo lugar.
            </h1>

            <p>
              Consulta tu avance,
              documentación y actividades
              pendientes desde una experiencia
              simple y organizada.
            </p>

            {!showForm && (
              <button
                type="button"
                className="auth-start-button"
                onClick={() =>
                  setShowForm(true)
                }
              >
                Iniciar sesión
                <span>→</span>
              </button>
            )}
          </div>

          <div className="auth-intro-footer">
            <span>
              Seguimiento
            </span>

            <span>
              Documentación
            </span>

            <span>
              Pendientes
            </span>
          </div>
        </section>


        <section className="auth-form-side">
          <div className="auth-form-box">
            <button
              type="button"
              className="auth-back-button"
              onClick={() =>
                setShowForm(false)
              }
            >
              ← Volver
            </button>

            <div className="auth-form-header">
              <span>
                BIENVENIDO
              </span>

              <h2>
                Iniciar sesión
              </h2>

              <p>
                Ingresa tus credenciales para
                continuar con tu proceso de
                incorporación.
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="auth-field">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="nombre@correo.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="auth-options">
                <label>
                  <input
                    type="checkbox"
                  />
                  <span>
                    Recordarme
                  </span>
                </label>

                <button
                  type="button"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div className="login-message error-message">
                  {error}
                </div>
              )}

              <button
                className="auth-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  "Ingresando..."
                ) : (
                  <>
                    Entrar al sistema
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-register">
              <span>
                ¿Eres nuevo colaborador?
              </span>

              <button type="button">
                Crear una cuenta
              </button>
            </div>

            <p className="auth-security">
              Acceso exclusivo para
              colaboradores y encargados
              autorizados.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}


function Feature({
  number,
  title,
  description,
}) {
  return (
    <div className="feature">
      <div className="feature-number">
        {number}
      </div>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}


function Dashboard({
  user,
  documents,
  generations,
  pendingDocuments,
  onLogout,
}) {
  if (user.role === "ENCARGADO") {
    return (
      <ManagerHome
        user={user}
        generations={generations}
        pendingDocuments={
          pendingDocuments
        }
        onLogout={onLogout}
      />
    );
  }

  return (
    <CollaboratorHome
      user={user}
      documents={documents}
      onLogout={onLogout}
    />
  );
}


function CollaboratorHome({
  user,
  documents,
  onLogout,
}) {
  const profile =
    user.profile || {};

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


        <section className="content-section">
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
}) {
  const statusClass =
    document.status
      .toLowerCase()
      .replaceAll("_", "-");

  const downloadableFile =
    document.company_signed_file ||
    document.collaborator_file ||
    document.company_template;

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
        {document.document_type_label}
      </h3>

      <p className="document-description">
        Estado actual:{" "}
        <strong>
          {document.status_label}
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
                document.correction_reason
              }
            </p>
          </div>
        )
      }

      {downloadableFile ? (
        <a
          href={downloadableFile}
          target="_blank"
          rel="noreferrer"
          className="document-action"
        >
          {actionText}
          <span>↗</span>
        </a>
      ) : (
        <span className="document-muted">
          Sin archivo disponible
        </span>
      )}
    </article>
  );
}


function ManagerHome({
  user,
  generations,
  pendingDocuments,
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
  ] = useState(
    defaultGeneration?.id || null
  );

  useEffect(() => {
    if (
      !selectedGenerationId &&
      defaultGeneration
    ) {
      setSelectedGenerationId(
        defaultGeneration.id
      );
    }
  }, [
    defaultGeneration,
    selectedGenerationId,
  ]);

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

  const redCount =
    members.filter(
      (member) =>
        member.visual_status === "RED"
    ).length;

  const yellowCount =
    members.filter(
      (member) =>
        member.visual_status === "YELLOW"
    ).length;

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
            label="Requieren atención"
            value={redCount}
            description={
              `${yellowCount} en proceso`
            }
            danger={redCount > 0}
          />

          <ManagerSummary
            label="Pendientes de revisión"
            value={
              pendingDocuments.length
            }
            description="Documentos entregados"
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
          </div>


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
          className="content-section pending-section"
          id="pendientes"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                PENDIENTES
              </span>

              <h2>
                Documentos por revisar
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
                        document={
                          document
                        }
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


function PendingDocument({
  document,
}) {
  return (
    <article className="pending-item">
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

      <span className="pending-status">
        {document.status_label}
      </span>

      {
        document.collaborator_file &&
        (
          <a
            href={
              document.collaborator_file
            }
            target="_blank"
            rel="noreferrer"
            className="pending-link"
          >
            Ver archivo
          </a>
        )
      }
    </article>
  );
}


function EmptyState({
  title,
  text,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        ✓
      </div>

      <strong>
        {title}
      </strong>

      <p>
        {text}
      </p>
    </div>
  );
}


function UserChip({
  title,
  subtitle,
  avatar,
}) {
  return (
    <div className="user-chip">
      <div className="avatar">
        {avatar}
      </div>

      <div>
        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>
      </div>
    </div>
  );
}


function Sidebar({
  user,
  onLogout,
}) {
  const goTo = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="brand-icon">
            P
          </div>

          <div>
            <strong>
              PluriOne
            </strong>

            <span>
              Incorporación
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-item active"
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <span>⌂</span>
            Inicio
          </button>

          {
            user.role ===
            "COLABORADOR" ? (
              <>
                <button
                  className="nav-item"
                  type="button"
                >
                  <span>◎</span>
                  Mis datos
                </button>

                <button
                  className="nav-item"
                  type="button"
                >
                  <span>▤</span>
                  Documentación
                </button>

                <button
                  className="nav-item"
                  type="button"
                >
                  <span>○</span>
                  Notificaciones
                </button>
              </>
            ) : (
              <>
                <button
                  className="nav-item"
                  type="button"
                  onClick={() =>
                    goTo(
                      "generaciones"
                    )
                  }
                >
                  <span>▦</span>
                  Generaciones
                </button>

                <button
                  className="nav-item"
                  type="button"
                  onClick={() =>
                    goTo(
                      "pendientes"
                    )
                  }
                >
                  <span>✓</span>
                  Pendientes
                </button>
              </>
            )
          }
        </nav>
      </div>

      <div className="sidebar-bottom">
        <span className="role-badge">
          {user.role}
        </span>

        <button
          className="logout-button"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}


function firstName(
  fullName = ""
) {
  return (
    fullName
      .trim()
      .split(" ")[0] ||
    "Colaborador"
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


export default App;