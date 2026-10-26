export default function Sidebar({
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
