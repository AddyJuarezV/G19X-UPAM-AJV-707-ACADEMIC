import {
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Register from "./Register";
import ProfileCorrection from "./ProfileCorrection";
import MyProfile from "./MyProfile";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [
  pendingApplications,
  setPendingApplications,
] = useState([]);

  const [
  availableCollaborators,
  setAvailableCollaborators,
] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loginStage, setLoginStage] = useState("VALIDATING");
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const [
  showRegister,
  setShowRegister,
] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme =
      localStorage.getItem("plurioneTheme");

    const validThemes = [
      "plurione",
      "light",
      "dark",
    ];

    return validThemes.includes(savedTheme)
      ? savedTheme
      : "plurione";
  });


  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      "plurioneTheme",
      theme
    );
  }, [theme]);


  const sleep = (milliseconds) =>
    new Promise((resolve) =>
      setTimeout(resolve, milliseconds)
    );


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setDocuments([]);
    setGenerations([]);
    setPendingDocuments([]);
    setPendingApplications([]);
    setAvailableCollaborators([]);

    setEmail("");
    setPassword("");
    setError("");
  };


const refreshAccessToken = useCallback(
  async () => {
    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    if (!refreshToken) {
      throw new Error(
        "La sesión ha expirado."
      );
    }

    const response = await fetch(
      "/api/auth/refresh/",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "La sesión ha expirado."
      );
    }

    const data =
      await response.json();

    localStorage.setItem(
      "accessToken",
      data.access
    );

    return data.access;
  },
  []
);


const apiFetch = useCallback(
  async (
    url,
    options = {}
  ) => {
    let accessToken =
      localStorage.getItem(
        "accessToken"
      );

    if (!accessToken) {
      accessToken =
        await refreshAccessToken();
    }

    const buildOptions = (
      token
    ) => ({
      ...options,

      headers: {
        ...(options.headers || {}),
        Authorization:
          `Bearer ${token}`,
      },
    });

    let response =
      await fetch(
        url,
        buildOptions(
          accessToken
        )
      );

    if (
      response.status === 401
    ) {
      accessToken =
        await refreshAccessToken();

      response =
        await fetch(
          url,
          buildOptions(
            accessToken
          )
        );
    }

    return response;
  },
  [refreshAccessToken]
);


const loadCurrentUser =
  useCallback(
    async () => {
      const userResponse =
        await apiFetch(
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

      if (
        userData.role ===
        "COLABORADOR"
      ) {
        const documentsResponse =
          await apiFetch(
            "/api/onboarding/documents/mine/"
          );

        if (
          !documentsResponse.ok
        ) {
          throw new Error(
            "No fue posible consultar tus documentos."
          );
        }

        const documentsData =
          await documentsResponse.json();

        setDocuments(
          documentsData
        );

        setGenerations([]);
        setPendingDocuments([]);
      }

      if (
        userData.role ===
        "ENCARGADO"
      ) {
        const [
          generationsResponse,
          pendingResponse,
          applicationsResponse,
          availableResponse,
          ] = await Promise.all([
            apiFetch(
              "/api/onboarding/generations/"
            ),

            apiFetch(
               "/api/onboarding/documents/pending/"
            ),

            apiFetch(
              "/api/accounts/applications/pending/"
            ),

            apiFetch(
               "/api/onboarding/collaborators/available/"
            ),
          ]);

        if (
          !generationsResponse.ok
        ) {
          throw new Error(
            "No fue posible consultar las generaciones."
          );
        }

        if (
          !pendingResponse.ok
        ) {
          throw new Error(
            "No fue posible consultar los pendientes."
          );
        }

        if (
          !applicationsResponse.ok
        ) {
          throw new Error(
            "No fue posible consultar las solicitudes pendientes."
          );
        }

        if (
           !availableResponse.ok
        ) {
          throw new Error(
            "No fue posible consultar los colaboradores disponibles."
          );
        }

        const generationsData =
          await generationsResponse.json();

        const pendingData =
          await pendingResponse.json();

        const applicationsData =
          await applicationsResponse.json();

        const availableData =
          await availableResponse.json();

        setGenerations(
          generationsData
        );

        setPendingDocuments(
          pendingData
        );

        setPendingApplications(
          applicationsData
        );

        setAvailableCollaborators(
          availableData
        );

        setDocuments([]);
      }
    },
    [apiFetch]
  );


  useEffect(() => {
    const restoreSession =
      async () => {
        const accessToken =
          localStorage.getItem(
            "accessToken"
          );

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        if (
          !accessToken &&
          !refreshToken
        ) {
          setCheckingSession(false);
          return;
        }

        try {
          await loadCurrentUser();
        } catch {
          localStorage.removeItem(
            "accessToken"
          );

          localStorage.removeItem(
            "refreshToken"
          );

          setUser(null);
        } finally {
          setCheckingSession(false);
        }
      };

    restoreSession();
  }, [loadCurrentUser]);


  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const startedAt =
        Date.now();

      setLoading(true);
      setError("");
      setLoginStage(
        "VALIDATING"
      );

      try {
        const response =
          await fetch(
            "/api/auth/login/",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

        const data =
          await response.json();

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

        setLoginStage(
          "PREPARING"
        );

        await sleep(350);

        await loadCurrentUser();

        setLoginStage(
          "READY"
        );
      } catch (err) {
        setError(err.message);
      } finally {
        const elapsed =
          Date.now() -
          startedAt;

        const minimumDuration =
          1800;

        if (
          elapsed <
          minimumDuration
        ) {
          await sleep(
            minimumDuration -
              elapsed
          );
        }

        setLoading(false);
      }
    };


  if (checkingSession) {
    return (
      <div className="session-loading">
        <div className="session-logo">
          P
        </div>

        <p>
          Recuperando tu sesión...
        </p>
      </div>
    );
  }


  if (loading) {
    return (
      <LoginTransition
        stage={loginStage}
      />
    );
  }


  if (user) {
    return (
      <>
        <ThemeSwitcher
          theme={theme}
          setTheme={setTheme}
        />

        <Dashboard
          user={user}
          documents={documents}
          generations={generations}
          pendingDocuments={
             pendingDocuments
          }
          pendingApplications={
             pendingApplications
          }
          availableCollaborators={
            availableCollaborators
          }
          apiFetch={apiFetch}
          onRefresh={loadCurrentUser}
          onLogout={logout}
        />
      </>
    );
  }

  if (showRegister) {
  return (
    <>
      <ThemeSwitcher
        theme={theme}
        setTheme={setTheme}
      />

      <Register
        onBack={() =>
          setShowRegister(false)
        }
        onRegistered={() => {
         setEmail("");
         setPassword("");
         setError("");
         setShowRegister(false);
        }}
      />
    </>
  );
}


  return (
    <>
      <ThemeSwitcher
        theme={theme}
        setTheme={setTheme}
      />

      <Login
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        onRegister={() => {
         setEmail("");
         setPassword("");
         setError("");
         setShowRegister(true);
        }}
      />
    </>
  );
}

function ThemeSwitcher({
  theme,
  setTheme,
}) {
  const themes = [
    {
      id: "plurione",
      label: "PluriOne",
    },
    {
      id: "light",
      label: "Claro",
    },
    {
      id: "dark",
      label: "Oscuro",
    },
  ];

  return (
    <div className="theme-switcher">
      {themes.map(
        (themeOption) => (
          <button
            key={themeOption.id}
            type="button"
            className={
              theme ===
              themeOption.id
                ? "theme-option active"
                : "theme-option"
            }
            onClick={() =>
              setTheme(
                themeOption.id
              )
            }
          >
            <span
              className={
                `theme-preview ${themeOption.id}`
              }
            ></span>

            {themeOption.label}
          </button>
        )
      )}
    </div>
  );
}


function LoginTransition({
  stage,
}) {
  const messages = {
    VALIDATING: {
      title:
        "Validando tu acceso",
      text:
        "Estamos verificando tus credenciales.",
    },

    PREPARING: {
      title:
        "Preparando tu espacio",
      text:
        "Cargando tu información y permisos.",
    },

    READY: {
      title:
        "Todo listo",
      text:
        "Entrando a tu espacio de PluriOne.",
    },
  };

  const current =
    messages[stage] ||
    messages.VALIDATING;

  return (
    <div className="login-transition-page">
      <div className="transition-background-orb orb-one"></div>
      <div className="transition-background-orb orb-two"></div>

      <div className="transition-brand">
        <div className="transition-brand-logo">
          P
        </div>

        <strong>
          PluriOne
        </strong>
      </div>

      <div className="transition-content">
        <div className="transition-visual">
          <div className="orbit orbit-one">
            <span></span>
          </div>

          <div className="orbit orbit-two">
            <span></span>
          </div>

          <div className="person-silhouette">
            <div className="silhouette-head"></div>

            <div className="silhouette-body">
              <div className="silhouette-line line-one"></div>
              <div className="silhouette-line line-two"></div>
            </div>
          </div>
        </div>

        <div className="transition-copy">
          <span className="transition-kicker">
            ACCESO SEGURO
          </span>

          <h1>
            {current.title}
          </h1>

          <p>
            {current.text}
          </p>

          <div className="transition-progress">
            <div></div>
          </div>

          <div className="transition-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
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
  onRegister,
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

            <form
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <div className="auth-field">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="off"
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
                  autoComplete="off"
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

              <button
                type="button"
                onClick={onRegister}
              >
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


function Dashboard({
  user,
  documents,
  generations,
  pendingDocuments,
  pendingApplications,
  availableCollaborators,
  apiFetch,
  onRefresh,
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
        pendingApplications={
          pendingApplications
        }
        availableCollaborators={
         availableCollaborators
        }
        apiFetch={apiFetch}
        onRefresh={onRefresh}
         onLogout={onLogout}
      />
    );
  }

  return (
    <CollaboratorHome
      user={user}
      documents={documents}
      apiFetch={apiFetch}
      onRefresh={onRefresh}
      onLogout={onLogout}
    />
  );
}


function CollaboratorHome({
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


function ManagerHome({
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

function PendingApplication({
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


function PendingDocument({
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
                  onClick={() =>
                    goTo(
                      "mis-datos"
                    )
                  }
                >
                  <span>◎</span>
                  Mis datos
                  </button>

                <button
                  className="nav-item"
                  type="button"
                  onClick={() =>
                    goTo(
                      "documentacion"
                    )
                  }
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