export function ThemeSwitcher({
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
