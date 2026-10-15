import {
  useState,
} from "react";

import "./Register.css";


function registrationError(data) {
  if (
    data &&
    typeof data === "object"
  ) {
    for (
      const value
      of Object.values(data)
    ) {
      if (
        Array.isArray(value) &&
        value.length > 0
      ) {
        return String(value[0]);
      }

      if (
        typeof value ===
        "string"
      ) {
        return value;
      }
    }
  }

  return "No fue posible crear la cuenta.";
}


function Register({
  onBack,
  onRegistered,
}) {
  const [
    form,
    setForm,
  ] = useState({
    email: "",
    password: "",
    full_name: "",
    curp: "",
    phone: "",
    institutional_email: "",
    university: "",
    university_acronym: "",
    career: "",
    required_hours: "480",
  });

  const [
    cv,
    setCv,
  ] = useState(null);

  const [
    universityId,
    setUniversityId,
  ] = useState(null);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  const updateField =
  (event) => {
    const field =
      event.target.dataset.field ||
      event.target.name;

    const {
      value,
    } = event.target;

    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );

    setError("");
  };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (!cv) {
        setError(
          "Selecciona tu CV."
        );

        return;
      }

      if (!universityId) {
        setError(
          "Selecciona tu credencial universitaria."
        );

        return;
      }

      setSubmitting(true);
      setError("");
      setSuccess("");

      try {
        const formData =
          new FormData();

        Object.entries(
          form
        ).forEach(
          ([key, value]) => {
            formData.append(
              key,
              value
            );
          }
        );

        formData.append(
          "cv",
          cv
        );

        formData.append(
          "university_id",
          universityId
        );

        const response =
          await fetch(
            "/api/accounts/register/",
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
            registrationError(
              data
            )
          );
        }

        setSuccess(
          data.message ||
            "Cuenta creada correctamente."
        );
      } catch (submitError) {
        setError(
          submitError.message
        );
      } finally {
        setSubmitting(false);
      }
    };


  if (success) {
    return (
      <main className="register-page">
        <section className="register-success">
          <div className="register-success-icon">
            ✓
          </div>

          <span>
            REGISTRO COMPLETADO
          </span>

          <h1>
            Tu cuenta fue creada
          </h1>

          <p>
            Tu registro inicial quedó en
            estado borrador. Ya puedes
            iniciar sesión para continuar
            con tu incorporación.
          </p>

          <button
            type="button"
            onClick={() =>
              onRegistered(
                form.email
              )
            }
          >
            Ir a iniciar sesión
          </button>
        </section>
      </main>
    );
  }


  return (
    <main className="register-page">
      <section className="register-shell">
        <header className="register-header">
          <button
            type="button"
            className="register-back"
            onClick={onBack}
          >
            ← Volver
          </button>

          <span>
            NUEVO COLABORADOR
          </span>

          <h1>
            Crear una cuenta
          </h1>

          <p>
            Registra tu información
            personal y académica para
            comenzar el proceso de
            incorporación.
          </p>
        </header>


        <form
          className="register-form"
          onSubmit={
           handleSubmit
          }
          autoComplete="off"
        >
          <div className="register-grid">
            <label>
              <span>
                Nombre completo
              </span>

              <input
                name="full_name"
                value={
                  form.full_name
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                CURP
              </span>

              <input
                name="curp"
                maxLength="18"
                value={
                  form.curp
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Teléfono
              </span>

              <input
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Correo personal
              </span>

              <input
                type="email"
                name="registration_personal_email"
                data-field="email"
                autoComplete="off"
                placeholder="nombre@correo.com"
                value={
                  form.email
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Correo institucional
              </span>

              <input
                type="email"
                name="institutional_email"
                value={
                  form.institutional_email
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Contraseña
              </span>

              <input
                type="password"
                name="registration_new_password"
                data-field="password"
                autoComplete="new-password"
                placeholder="Crea una contraseña"
                minLength="8"
                value={
                 form.password
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label className="register-wide">
              <span>
                Universidad
              </span>

              <input
                name="university"
                value={
                  form.university
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Siglas
              </span>

              <input
                name="university_acronym"
                value={
                  form.university_acronym
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label>
              <span>
                Horas a cumplir
              </span>

              <input
                type="number"
                min="1"
                name="required_hours"
                value={
                  form.required_hours
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label className="register-wide">
              <span>
                Carrera
              </span>

              <input
                name="career"
                value={
                  form.career
                }
                onChange={
                  updateField
                }
                required
              />
            </label>


            <label className="register-file">
              <span>
                CV
              </span>

              <input
                type="file"
                onChange={(event) =>
                  setCv(
                    event.target
                      .files?.[0] ||
                      null
                  )
                }
                required
              />

              {cv && (
                <small>
                  {cv.name}
                </small>
              )}
            </label>


            <label className="register-file">
              <span>
                Credencial universitaria
              </span>

              <input
                type="file"
                onChange={(event) =>
                  setUniversityId(
                    event.target
                      .files?.[0] ||
                      null
                  )
                }
                required
              />

              {universityId && (
                <small>
                  {
                    universityId.name
                  }
                </small>
              )}
            </label>
          </div>


          {error && (
            <div className="register-message error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="register-submit"
            disabled={
              submitting
            }
          >
            {submitting
              ? "Creando cuenta..."
              : "Crear cuenta"}
          </button>
        </form>
      </section>
    </main>
  );
}


export default Register;