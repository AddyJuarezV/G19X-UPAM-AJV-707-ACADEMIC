import {
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Register from "./Register";
import ManagerHome from "./ManagerHome";
import CollaboratorHome from "./CollaboratorHome";


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


export default App;