import { useState } from "react";

export function LoginTransition({
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


export function Login({
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
  const [showPassword, setShowPassword] = useState(false);

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

                <div className="auth-password-wrap">
  <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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

  <button
    type="button"
    className="auth-password-toggle"
    onClick={() => setShowPassword((value) => !value)}
    aria-label={
      showPassword
        ? "Ocultar contrase\u00f1a"
        : "Mostrar contrase\u00f1a"
    }
    aria-pressed={showPassword}
    title={
      showPassword
        ? "Ocultar contrase\u00f1a"
        : "Mostrar contrase\u00f1a"
    }
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {showPassword && (
        <path d="M3 3l18 18" />
      )}
    </svg>
  </button>
</div>
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
