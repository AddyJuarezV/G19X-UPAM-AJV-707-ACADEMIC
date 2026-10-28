import {
  useEffect,
  useState,
} from "react";

import "./MyProfile.css";


function MyProfile({
  apiFetch,
}) {
  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
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
              data.detail ||
                "No fue posible consultar tus datos."
            );
          }

          if (active) {
            setProfile(data);
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


  if (loading) {
    return (
      <section
        className="content-section my-profile-section"
        id="mis-datos"
      >
        <p>
          Cargando tus datos...
        </p>
      </section>
    );
  }


  if (!profile) {
    return (
      <section
        className="content-section my-profile-section"
        id="mis-datos"
      >
        <div className="my-profile-error">
          {error}
        </div>
      </section>
    );
  }


  const statusLabels = {
    DRAFT:
      "Borrador",
    IN_REVIEW:
      "En revisión",
    NEEDS_CORRECTION:
      "Requiere corrección",
    APPROVED:
      "Aprobado",
  };

  const statusLabel =
    statusLabels[
      profile.application_status
    ] ||
    profile.application_status ||
    "Sin estado";


  return (
    <section
      className="my-profile-page"
      id="mis-datos"
    >
      <div className="my-profile-page-header">
        <div>
          <span className="eyebrow">
            PERFIL
          </span>

          <h2>
            Mis datos
          </h2>

          <p>
            Consulta la información
            registrada para tu proceso
            de incorporación.
          </p>
        </div>

        <span className="profile-status-badge">
          {statusLabel}
        </span>
      </div>


      <section className="profile-summary-grid">
        <ProfileSummary
          label="Estado"
          value={statusLabel}
          description="Situación de tu solicitud"
        />

        <ProfileSummary
          label="Universidad"
          value={
            profile.university_acronym ||
            "-"
          }
          description={
            profile.university ||
            "Sin universidad"
          }
        />

        <ProfileSummary
          label="Carrera"
          value={
            profile.career ||
            "-"
          }
          description="Programa académico"
        />

        <ProfileSummary
          label="Horas a cumplir"
          value={
            `${profile.required_hours || 0}`
          }
          description="Horas requeridas"
        />
      </section>


      <section className="profile-information-card">
        <div className="profile-block-heading">
          <div>
            <span className="eyebrow">
              INFORMACIÓN PERSONAL
            </span>

            <h3>
              Datos personales
            </h3>
          </div>

          <span>
            Información de contacto
          </span>
        </div>

        <div className="my-profile-grid personal-data-grid">
          <ProfileData
            label="Nombre completo"
            value={profile.full_name}
          />

          <ProfileData
            label="CURP"
            value={profile.curp}
          />

          <ProfileData
            label="Teléfono"
            value={profile.phone}
          />

          <ProfileData
            label="Correo personal"
            value={profile.email}
          />

          <ProfileData
            label="Correo institucional"
            value={
              profile.institutional_email
            }
          />
        </div>
      </section>


      <section className="profile-information-card">
        <div className="profile-block-heading">
          <div>
            <span className="eyebrow">
              INFORMACIÓN ACADÉMICA
            </span>

            <h3>
              Datos universitarios
            </h3>
          </div>

          <span>
            Información de estadía
          </span>
        </div>

        <div className="my-profile-grid academic-data-grid">
          <ProfileData
            label="Universidad"
            value={profile.university}
          />

          <ProfileData
            label="Siglas"
            value={
              profile.university_acronym
            }
          />

          <ProfileData
            label="Carrera"
            value={profile.career}
          />

          <ProfileData
            label="Horas a cumplir"
            value={
              `${profile.required_hours} horas`
            }
          />
        </div>
      </section>


      <section className="profile-files-card">
        <div className="profile-block-heading">
          <div>
            <span className="eyebrow">
              ARCHIVOS
            </span>

            <h3>
              Documentos registrados
            </h3>
          </div>

          <span>
            Archivos de tu perfil
          </span>
        </div>

        <div className="my-profile-files">
          <ProfileFile
            title="Currículum Vitae"
            shortTitle="CV"
            href={profile.cv}
            action="Ver CV"
          />

          <ProfileFile
            title="Credencial universitaria"
            shortTitle="ID"
            href={
              profile.university_id
            }
            action="Ver credencial"
          />
        </div>
      </section>


      <div className="my-profile-note">
        <div className="profile-note-icon">
          i
        </div>

        <div>
          <strong>
            Información de incorporación
          </strong>

          <p>
            Estos son los datos registrados
            actualmente en tu perfil de
            PluriOne.
          </p>
        </div>
      </div>
    </section>
  );
}


function ProfileSummary({
  label,
  value,
  description,
}) {
  return (
    <article className="profile-summary-card">
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


function ProfileData({
  label,
  value,
}) {
  return (
    <div className="my-profile-field">
      <span>
        {label}
      </span>

      <strong>
        {value || "-"}
      </strong>
    </div>
  );
}


function ProfileFile({
  title,
  shortTitle,
  href,
  action,
}) {
  return (
    <article className="profile-file-item">
      <div className="profile-file-icon">
        {shortTitle}
      </div>

      <div className="profile-file-content">
        <span>
          {title}
        </span>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {action}
            <strong>
              ↗
            </strong>
          </a>
        ) : (
          <p>
            Sin archivo disponible
          </p>
        )}
      </div>
    </article>
  );
}


export default MyProfile;
