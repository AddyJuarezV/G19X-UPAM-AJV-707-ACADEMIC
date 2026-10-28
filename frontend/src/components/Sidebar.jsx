export default function Sidebar({
  user,
  onLogout,
  activeSection = "inicio",
  onSectionChange = null,
}) {
  const navClass = (section) =>
    activeSection === section
      ? "nav-item active"
      : "nav-item";

  const goTo = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
      return;
    }

    if (section === "inicio") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const element =
      document.getElementById(section);

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
            className={navClass("inicio")}
            type="button"
            onClick={() =>
              goTo("inicio")
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
                  className={
                    navClass("mis-datos")
                  }
                  type="button"
                  onClick={() =>
                    goTo("mis-datos")
                  }
                >
                  <span>◎</span>
                  Mis datos
                </button>

                <button
                  className={
                    navClass(
                      "documentacion"
                    )
                  }
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
                  className={
                    navClass(
                      "notificaciones"
                    )
                  }
                  type="button"
                  onClick={() =>
                    goTo(
                      "notificaciones"
                    )
                  }
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
