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


  return (
    <section
      className="content-section my-profile-section"
      id="mis-datos"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            PERFIL
          </span>

          <h2>
            Mis datos
          </h2>
        </div>

        <span className="profile-status-badge">
          {profile.application_status}
        </span>
      </div>


      <div className="my-profile-grid">
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


      <div className="my-profile-files">
        <div>
          <span>
            CV
          </span>

          {profile.cv ? (
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
            >
              Ver CV
              <strong>↗</strong>
            </a>
          ) : (
            <p>
              Sin archivo disponible
            </p>
          )}
        </div>


        <div>
          <span>
            Credencial universitaria
          </span>

          {profile.university_id ? (
            <a
              href={
                profile.university_id
              }
              target="_blank"
              rel="noreferrer"
            >
              Ver credencial
              <strong>↗</strong>
            </a>
          ) : (
            <p>
              Sin archivo disponible
            </p>
          )}
        </div>
      </div>


      <div className="my-profile-note">
        <strong>
          Información de incorporación
        </strong>

        <p>
          Estos son los datos registrados
          actualmente en tu perfil de
          PluriOne.
        </p>
      </div>
    </section>
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


export default MyProfile;