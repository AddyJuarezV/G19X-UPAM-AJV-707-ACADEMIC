import {
  useEffect,
  useState,
} from "react";

import "./ProfileCorrection.css";


function getApiError(data) {
  if (data?.detail) {
    return data.detail;
  }

  for (const value of Object.values(
    data || {}
  )) {
    if (
      Array.isArray(value) &&
      value.length > 0
    ) {
      return value[0];
    }

    if (typeof value === "string") {
      return value;
    }
  }

  return "No fue posible completar la operación.";
}


function ProfileCorrection({
  correctionReason,
  apiFetch,
  onRefresh,
}) {
  const [
    form,
    setForm,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    feedback,
    setFeedback,
  ] = useState("");


  useEffect(() => {
    let active = true;

    const loadProfile =
      async () => {
        try {
          const response =
            await apiFetch(
              "/api/accounts/profile/"
            );

          const data =
            await response
              .json()
              .catch(() => ({}));

          if (!response.ok) {
            throw new Error(
              getApiError(data)
            );
          }

          if (active) {
            setForm({
              full_name:
                data.full_name || "",
              curp:
                data.curp || "",
              phone:
                data.phone || "",
              institutional_email:
                data.institutional_email || "",
              university:
                data.university || "",
              university_acronym:
                data.university_acronym || "",
              career:
                data.career || "",
              required_hours:
                String(
                  data.required_hours ||
                  ""
                ),
            });
          }
        } catch (err) {
          if (active) {
            setError(
              err.message
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

    loadProfile();

    return () => {
      active = false;
    };
  }, [apiFetch]);


  const updateField =
    (event) => {
      const {
        name,
        value,
      } = event.target;

      setForm(
        (current) => ({
          ...current,
          [name]: value,
        })
      );

      setSaved(false);
      setFeedback("");
      setError("");
    };


  const saveProfile =
    async (event) => {
      event.preventDefault();

      setSaving(true);
      setError("");
      setFeedback("");

      try {
        const response =
          await apiFetch(
            "/api/accounts/profile/",
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                ...form,

                required_hours:
                  Number(
                    form.required_hours
                  ),
              }),
            }
          );

        const data =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            getApiError(data)
          );
        }

        setSaved(true);

        setFeedback(
          data.message ||
            "Datos actualizados correctamente."
        );

        await onRefresh();
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setSaving(false);
      }
    };


  const resubmitApplication =
    async () => {
      if (!saved) {
        setError(
          "Guarda primero los datos corregidos."
        );

        return;
      }

      setSubmitting(true);
      setError("");
      setFeedback("");

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
            getApiError(data)
          );
        }

        await onRefresh();
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setSubmitting(false);
      }
    };


  if (loading) {
    return (
      <section className="profile-correction-card">
        <p>
          Cargando información para corrección...
        </p>
      </section>
    );
  }


  if (!form) {
    return (
      <section className="profile-correction-card">
        <div className="profile-correction-error">
          {error ||
            "No fue posible consultar tus datos."}
        </div>
      </section>
    );
  }


  return (
    <section className="profile-correction-card">
      <div className="profile-correction-heading">
        <div>
          <span className="profile-correction-kicker">
            CORRECCIÓN REQUERIDA
          </span>

          <h2>
            Revisa tu información
          </h2>

          <p>
            PluriOne encontró información
            que necesita ser corregida antes
            de continuar con tu incorporación.
          </p>
        </div>
      </div>


      <div className="profile-correction-reason">
        <strong>
          Motivo indicado por el encargado
        </strong>

        <p>
          {correctionReason ||
            "Se solicitaron correcciones en tu información."}
        </p>
      </div>


      <form
        className="profile-correction-form"
        onSubmit={saveProfile}
      >
        <div className="profile-correction-grid">
          <label>
            <span>
              Nombre completo
            </span>

            <input
              type="text"
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
              type="text"
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
              type="text"
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


          <label className="profile-correction-wide">
            <span>
              Universidad
            </span>

            <input
              type="text"
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
              type="text"
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
              name="required_hours"
              min="1"
              value={
                form.required_hours
              }
              onChange={
                updateField
              }
              required
            />
          </label>


          <label className="profile-correction-wide">
            <span>
              Carrera
            </span>

            <input
              type="text"
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
        </div>


        <div className="profile-correction-actions">
          <button
            type="submit"
            className="profile-save-button"
            disabled={
              saving ||
              submitting
            }
          >
            {saving
              ? "Guardando..."
              : "Guardar correcciones"}
          </button>

          <button
            type="button"
            className="profile-resubmit-button"
            disabled={
              !saved ||
              saving ||
              submitting
            }
            onClick={
              resubmitApplication
            }
          >
            {submitting
              ? "Reenviando..."
              : "Reenviar solicitud"}
          </button>
        </div>
      </form>


      {feedback && (
        <div className="profile-correction-feedback success">
          {feedback}
        </div>
      )}


      {error && (
        <div className="profile-correction-feedback error">
          {error}
        </div>
      )}
    </section>
  );
}


export default ProfileCorrection;