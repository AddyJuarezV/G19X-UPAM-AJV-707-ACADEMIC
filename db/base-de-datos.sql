--
-- PostgreSQL database dump
--

\restrict fgIvLnPO86QNJ6qc8yq1hqftt5AEEMh8GnBV35IrKhslTP1YmTq9vPI55xLKH7X

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.onboarding_onboardingdocument DROP CONSTRAINT IF EXISTS onboarding_onboardin_collaborator_id_1c3cbd4d_fk_accounts_;
ALTER TABLE IF EXISTS ONLY public.onboarding_generationmembership DROP CONSTRAINT IF EXISTS onboarding_generatio_generation_id_888be6a1_fk_onboardin;
ALTER TABLE IF EXISTS ONLY public.onboarding_generationmembership DROP CONSTRAINT IF EXISTS onboarding_generatio_collaborator_id_3771a04e_fk_accounts_;
ALTER TABLE IF EXISTS ONLY public.onboarding_automaticnotification DROP CONSTRAINT IF EXISTS onboarding_automatic_recipient_id_2f841107_fk_accounts_;
ALTER TABLE IF EXISTS ONLY public.onboarding_automaticnotification DROP CONSTRAINT IF EXISTS onboarding_automatic_document_id_777a64c8_fk_onboardin;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_user_id_c564eba6_fk_accounts_user_id;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
ALTER TABLE IF EXISTS ONLY public.accounts_user_user_permissions DROP CONSTRAINT IF EXISTS accounts_user_user_p_user_id_e4f0a161_fk_accounts_;
ALTER TABLE IF EXISTS ONLY public.accounts_user_user_permissions DROP CONSTRAINT IF EXISTS accounts_user_user_p_permission_id_113bb443_fk_auth_perm;
ALTER TABLE IF EXISTS ONLY public.accounts_user_groups DROP CONSTRAINT IF EXISTS accounts_user_groups_user_id_52b62117_fk_accounts_user_id;
ALTER TABLE IF EXISTS ONLY public.accounts_user_groups DROP CONSTRAINT IF EXISTS accounts_user_groups_group_id_bd11a704_fk_auth_group_id;
ALTER TABLE IF EXISTS ONLY public.accounts_collaboratorprofile DROP CONSTRAINT IF EXISTS accounts_collaborato_user_id_c3b124cb_fk_accounts_;
DROP INDEX IF EXISTS public.onboarding_onboardingdocument_collaborator_id_1c3cbd4d;
DROP INDEX IF EXISTS public.onboarding_generationmembership_generation_id_888be6a1;
DROP INDEX IF EXISTS public.onboarding_automaticnotification_recipient_id_2f841107;
DROP INDEX IF EXISTS public.onboarding_automaticnotification_document_id_777a64c8;
DROP INDEX IF EXISTS public.django_session_session_key_c0390e0f_like;
DROP INDEX IF EXISTS public.django_session_expire_date_a5c62663;
DROP INDEX IF EXISTS public.django_admin_log_user_id_c564eba6;
DROP INDEX IF EXISTS public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX IF EXISTS public.auth_permission_content_type_id_2f476e4b;
DROP INDEX IF EXISTS public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX IF EXISTS public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX IF EXISTS public.auth_group_name_a6ea08ec_like;
DROP INDEX IF EXISTS public.accounts_user_user_permissions_user_id_e4f0a161;
DROP INDEX IF EXISTS public.accounts_user_user_permissions_permission_id_113bb443;
DROP INDEX IF EXISTS public.accounts_user_groups_user_id_52b62117;
DROP INDEX IF EXISTS public.accounts_user_groups_group_id_bd11a704;
DROP INDEX IF EXISTS public.accounts_user_email_b2644a56_like;
DROP INDEX IF EXISTS public.accounts_collaboratorprofile_curp_04fc5761_like;
ALTER TABLE IF EXISTS ONLY public.onboarding_onboardingdocument DROP CONSTRAINT IF EXISTS unique_document_per_collaborator;
ALTER TABLE IF EXISTS ONLY public.onboarding_onboardingdocument DROP CONSTRAINT IF EXISTS onboarding_onboardingdocument_pkey;
ALTER TABLE IF EXISTS ONLY public.onboarding_generationmembership DROP CONSTRAINT IF EXISTS onboarding_generationmembership_pkey;
ALTER TABLE IF EXISTS ONLY public.onboarding_generationmembership DROP CONSTRAINT IF EXISTS onboarding_generationmembership_collaborator_id_key;
ALTER TABLE IF EXISTS ONLY public.onboarding_generation DROP CONSTRAINT IF EXISTS onboarding_generation_pkey;
ALTER TABLE IF EXISTS ONLY public.onboarding_generation DROP CONSTRAINT IF EXISTS onboarding_generation_number_key;
ALTER TABLE IF EXISTS ONLY public.onboarding_automaticnotification DROP CONSTRAINT IF EXISTS onboarding_automaticnotification_pkey;
ALTER TABLE IF EXISTS ONLY public.django_session DROP CONSTRAINT IF EXISTS django_session_pkey;
ALTER TABLE IF EXISTS ONLY public.django_migrations DROP CONSTRAINT IF EXISTS django_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_pkey;
ALTER TABLE IF EXISTS ONLY public.django_content_type DROP CONSTRAINT IF EXISTS django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE IF EXISTS ONLY public.django_admin_log DROP CONSTRAINT IF EXISTS django_admin_log_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_permission DROP CONSTRAINT IF EXISTS auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.auth_group_permissions DROP CONSTRAINT IF EXISTS auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE IF EXISTS ONLY public.auth_group DROP CONSTRAINT IF EXISTS auth_group_name_key;
ALTER TABLE IF EXISTS ONLY public.accounts_user_user_permissions DROP CONSTRAINT IF EXISTS accounts_user_user_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts_user_user_permissions DROP CONSTRAINT IF EXISTS accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq;
ALTER TABLE IF EXISTS ONLY public.accounts_user DROP CONSTRAINT IF EXISTS accounts_user_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts_user_groups DROP CONSTRAINT IF EXISTS accounts_user_groups_user_id_group_id_59c0b32f_uniq;
ALTER TABLE IF EXISTS ONLY public.accounts_user_groups DROP CONSTRAINT IF EXISTS accounts_user_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts_user DROP CONSTRAINT IF EXISTS accounts_user_email_key;
ALTER TABLE IF EXISTS ONLY public.accounts_collaboratorprofile DROP CONSTRAINT IF EXISTS accounts_collaboratorprofile_user_id_key;
ALTER TABLE IF EXISTS ONLY public.accounts_collaboratorprofile DROP CONSTRAINT IF EXISTS accounts_collaboratorprofile_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts_collaboratorprofile DROP CONSTRAINT IF EXISTS accounts_collaboratorprofile_curp_key;
DROP TABLE IF EXISTS public.onboarding_onboardingdocument;
DROP TABLE IF EXISTS public.onboarding_generationmembership;
DROP TABLE IF EXISTS public.onboarding_generation;
DROP TABLE IF EXISTS public.onboarding_automaticnotification;
DROP TABLE IF EXISTS public.django_session;
DROP TABLE IF EXISTS public.django_migrations;
DROP TABLE IF EXISTS public.django_content_type;
DROP TABLE IF EXISTS public.django_admin_log;
DROP TABLE IF EXISTS public.auth_permission;
DROP TABLE IF EXISTS public.auth_group_permissions;
DROP TABLE IF EXISTS public.auth_group;
DROP TABLE IF EXISTS public.accounts_user_user_permissions;
DROP TABLE IF EXISTS public.accounts_user_groups;
DROP TABLE IF EXISTS public.accounts_user;
DROP TABLE IF EXISTS public.accounts_collaboratorprofile;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts_collaboratorprofile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts_collaboratorprofile (
    id bigint NOT NULL,
    full_name character varying(200) NOT NULL,
    curp character varying(18) NOT NULL,
    phone character varying(20) NOT NULL,
    institutional_email character varying(254) NOT NULL,
    university character varying(200) NOT NULL,
    university_acronym character varying(20) NOT NULL,
    career character varying(200) NOT NULL,
    required_hours integer NOT NULL,
    cv character varying(100) NOT NULL,
    university_id character varying(100) NOT NULL,
    application_status character varying(30) NOT NULL,
    correction_reason text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT accounts_collaboratorprofile_required_hours_check CHECK ((required_hours >= 0))
);


--
-- Name: accounts_collaboratorprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.accounts_collaboratorprofile ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_collaboratorprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: accounts_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    role character varying(20) NOT NULL
);


--
-- Name: accounts_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


--
-- Name: accounts_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.accounts_user_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: accounts_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.accounts_user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: accounts_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: accounts_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.accounts_user_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


--
-- Name: onboarding_automaticnotification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.onboarding_automaticnotification (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    responsible character varying(40) NOT NULL,
    document_status character varying(30) NOT NULL,
    stalled_days integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    document_id bigint NOT NULL,
    recipient_id bigint NOT NULL,
    CONSTRAINT onboarding_automaticnotification_stalled_days_check CHECK ((stalled_days >= 0))
);


--
-- Name: onboarding_automaticnotification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.onboarding_automaticnotification ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.onboarding_automaticnotification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: onboarding_generation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.onboarding_generation (
    id bigint NOT NULL,
    number integer NOT NULL,
    status character varying(10) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    closed_at timestamp with time zone,
    CONSTRAINT onboarding_generation_number_check CHECK ((number >= 0))
);


--
-- Name: onboarding_generation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.onboarding_generation ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.onboarding_generation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: onboarding_generationmembership; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.onboarding_generationmembership (
    id bigint NOT NULL,
    assigned_at timestamp with time zone NOT NULL,
    collaborator_id bigint NOT NULL,
    generation_id bigint NOT NULL
);


--
-- Name: onboarding_generationmembership_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.onboarding_generationmembership ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.onboarding_generationmembership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: onboarding_onboardingdocument; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.onboarding_onboardingdocument (
    id bigint NOT NULL,
    document_type character varying(30) NOT NULL,
    status character varying(30) NOT NULL,
    company_template character varying(100),
    collaborator_file character varying(100),
    company_signed_file character varying(100),
    correction_reason text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    collaborator_id bigint NOT NULL,
    last_reminder_at timestamp with time zone
);


--
-- Name: onboarding_onboardingdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.onboarding_onboardingdocument ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.onboarding_onboardingdocument_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: accounts_collaboratorprofile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts_collaboratorprofile (id, full_name, curp, phone, institutional_email, university, university_acronym, career, required_hours, cv, university_id, application_status, correction_reason, created_at, updated_at, user_id) FROM stdin;
1	Peter Parker	PAPX000101HDFRRT01	5551234567	peter.parker@university.example.com	Universidad Politecnica del Aracnido de Mexico	UPAM	Ingenieria en Sistemas Computacionales	480	collaborators/cv/cv_peter.txt	collaborators/university_id/credencial_peter.txt	APPROVED		2026-09-30 23:41:57.726722-06	2026-10-03 18:27:45.699086-06	2
2	Miles Morales	MOMX010101HDFRRL01	5553333333	miles.morales@university.example.com	Universidad Tecnologica de Parker	UTP	Ingenieria en Tecnologias de la Informacion	480	collaborators/cv/cv_miles.txt	collaborators/university_id/credencial_miles.txt	APPROVED		2026-10-04 12:27:20.048269-06	2026-10-10 02:07:52.750893-06	3
3	Gwen Stacy	GSSG020202MDFTWN01	5554444444	gwen.stacy@university.example.com	Universidad Politécnica del Multiverso	UPM	Ingeniería en Software	480	collaborators/cv/gwen_cv.txt	collaborators/university_id/gwen_credencial.txt	APPROVED		2026-10-15 10:11:33.723555-06	2026-10-19 16:20:36.347257-06	4
4	Miguel O'Hara	OAHM990101HDFHRG01	5553333333	miguel.ohara@university.example.com	Universidad Tecnológica del Multiverso	UTM	Ingeniería en Software	500	collaborators/cv/miguel_cv.txt	collaborators/university_id/miguel_credencial.txt	APPROVED		2026-10-20 12:54:52.987181-06	2026-10-20 17:06:49.258516-06	5
\.


--
-- Data for Name: accounts_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, role) FROM stdin;
2	pbkdf2_sha256$1500000$8oRxtDAsHzHZdncrwfxyjL$i3E2IHYQD6xgU1cEenf57n08Fobe7IUla+CDCcnQK7Y=	\N	f			f	t	2026-09-30 23:41:56.422051-06	peter.parker@example.com	COLABORADOR
3	pbkdf2_sha256$1500000$XAhU6gDuwlBN0uG2TSt8za$LD/hn5mRl5glyzwRdDHQmZhkpjklbJ/RXnv85n+0Q2U=	\N	f			f	t	2026-10-04 12:27:18.654485-06	miles.morales@example.com	COLABORADOR
1	pbkdf2_sha256$1500000$xqMqEZ790m7cL5u3bU69Hg$OtHJ8X/VFLVCYWfPx6V8v9re26KzMrL+imvMbTH0vCE=	2026-10-08 13:18:55.762124-06	t			t	t	2026-09-29 16:19:53.064185-06	admin@plurione.local	ENCARGADO
4	pbkdf2_sha256$1500000$OgiTkEnbc90mpRMpn9mYlj$fNps8ocVlU6dLUyyDrocLKyWNXxayvXwY24sPWv+O/M=	\N	f			f	t	2026-10-15 10:11:31.775736-06	gwen.stacy@example.com	COLABORADOR
5	pbkdf2_sha256$1500000$QC1xMr8eX50a4ONzCeLUls$EN1mlR3yGELJdb9RA1jOMIUUqfXa+MzSE+a7QKyGKQw=	\N	f			f	t	2026-10-20 12:54:51.098507-06	miguel.ohara@example.com	COLABORADOR
\.


--
-- Data for Name: accounts_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: accounts_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	3	add_permission
6	Can change permission	3	change_permission
7	Can delete permission	3	delete_permission
8	Can view permission	3	view_permission
9	Can add group	2	add_group
10	Can change group	2	change_group
11	Can delete group	2	delete_group
12	Can view group	2	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
25	Can add collaborator profile	7	add_collaboratorprofile
26	Can change collaborator profile	7	change_collaboratorprofile
27	Can delete collaborator profile	7	delete_collaboratorprofile
28	Can view collaborator profile	7	view_collaboratorprofile
29	Can add generation	8	add_generation
30	Can change generation	8	change_generation
31	Can delete generation	8	delete_generation
32	Can view generation	8	view_generation
33	Can add generation membership	9	add_generationmembership
34	Can change generation membership	9	change_generationmembership
35	Can delete generation membership	9	delete_generationmembership
36	Can view generation membership	9	view_generationmembership
37	Can add onboarding document	10	add_onboardingdocument
38	Can change onboarding document	10	change_onboardingdocument
39	Can delete onboarding document	10	delete_onboardingdocument
40	Can view onboarding document	10	view_onboardingdocument
41	Can add automatic notification	11	add_automaticnotification
42	Can change automatic notification	11	change_automaticnotification
43	Can delete automatic notification	11	delete_automaticnotification
44	Can view automatic notification	11	view_automaticnotification
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2026-10-08 13:19:43.809995-06	1	Generación 19	1	[{"added": {}}]	8	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	contenttypes	contenttype
5	sessions	session
6	accounts	user
7	accounts	collaboratorprofile
8	onboarding	generation
9	onboarding	generationmembership
10	onboarding	onboardingdocument
11	onboarding	automaticnotification
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2026-09-29 16:09:50.367258-06
2	contenttypes	0002_remove_content_type_name	2026-09-29 16:09:50.380524-06
3	auth	0001_initial	2026-09-29 16:09:50.432764-06
4	auth	0002_alter_permission_name_max_length	2026-09-29 16:09:50.441769-06
5	auth	0003_alter_user_email_max_length	2026-09-29 16:09:50.446764-06
6	auth	0004_alter_user_username_opts	2026-09-29 16:09:50.449766-06
7	auth	0005_alter_user_last_login_null	2026-09-29 16:09:50.454763-06
8	auth	0006_require_contenttypes_0002	2026-09-29 16:09:50.455763-06
9	auth	0007_alter_validators_add_error_messages	2026-09-29 16:09:50.461294-06
10	auth	0008_alter_user_username_max_length	2026-09-29 16:09:50.465296-06
11	auth	0009_alter_user_last_name_max_length	2026-09-29 16:09:50.471288-06
12	auth	0010_alter_group_name_max_length	2026-09-29 16:09:50.481338-06
13	auth	0011_update_proxy_permissions	2026-09-29 16:09:50.486366-06
14	auth	0012_alter_user_first_name_max_length	2026-09-29 16:09:50.492404-06
15	accounts	0001_initial	2026-09-29 16:09:50.543278-06
16	admin	0001_initial	2026-09-29 16:09:50.573323-06
17	admin	0002_logentry_remove_auto_add	2026-09-29 16:09:50.58027-06
18	admin	0003_logentry_add_action_flag_choices	2026-09-29 16:09:50.586409-06
19	sessions	0001_initial	2026-09-29 16:09:50.602781-06
20	accounts	0002_collaboratorprofile	2026-09-29 17:15:41.709221-06
21	onboarding	0001_initial	2026-10-08 13:16:46.670999-06
22	onboarding	0002_onboardingdocument	2026-10-12 11:33:03.372443-06
23	onboarding	0003_onboardingdocument_last_reminder_at	2026-10-21 12:12:32.45691-06
24	onboarding	0004_automaticnotification	2026-10-22 06:10:25.246311-06
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
hmrkh6529b8st97oc8d5dxcbt3i26iak	.eJxVjEEOwiAQRe_C2hBGSAGX7j0DmWEGqRqalHZlvLtt0oVu_3vvv1XCdalp7TKnkdVFgTr9boT5KW0H_MB2n3Se2jKPpHdFH7Tr28Tyuh7u30HFXrfahOw9Q5HCFs7BRAiDZcvemRCcB4cBCTZWrIEIRBZoECtSPEYxTn2-yOY3ag:1xBgBo:lD9u13l7rliPtWzeI1i3eQwfdqOA2zSByQLuqlbBmWs	2026-10-13 16:20:44.108919-06
91xb2rjbkqxh1k17su25n1z86k0khveg	.eJxVjEEOwiAQRe_C2hBGSAGX7j0DmWEGqRqalHZlvLtt0oVu_3vvv1XCdalp7TKnkdVFgTr9boT5KW0H_MB2n3Se2jKPpHdFH7Tr28Tyuh7u30HFXrfahOw9Q5HCFs7BRAiDZcvemRCcB4cBCTZWrIEIRBZoECtSPEYxTn2-yOY3ag:1xEtdn:HclxtIPK-sEpMX4TQ0fg3uP7zebv6CBc_ng3M241Y8Y	2026-10-22 13:18:55.771426-06
\.


--
-- Data for Name: onboarding_automaticnotification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.onboarding_automaticnotification (id, title, message, responsible, document_status, stalled_days, created_at, document_id, recipient_id) FROM stdin;
1	NDA: recordatorio automático	NDA lleva 1 días sin movimiento. Publicar la plantilla del documento.	PluriOne	PENDING	1	2026-10-22 07:10:15.325131-06	11	1
2	Carta de presentación: recordatorio automático	Carta de presentación lleva 1 días sin movimiento. Completar y entregar el documento.	Colaborador	PENDING	1	2026-10-22 07:10:15.336123-06	12	4
3	Carta de aceptación: recordatorio automático	Carta de aceptación lleva 1 días sin movimiento. Publicar la plantilla del documento.	PluriOne	PENDING	1	2026-10-22 07:10:15.34015-06	13	1
\.


--
-- Data for Name: onboarding_generation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.onboarding_generation (id, number, status, created_at, closed_at) FROM stdin;
1	19	OPEN	2026-10-08 13:19:43.806988-06	\N
2	20	CLOSED	2026-10-10 01:23:58.955441-06	2026-10-10 01:25:29.950787-06
3	21	CLOSED	2026-10-20 18:17:41.992046-06	2026-10-21 00:16:45.975184-06
\.


--
-- Data for Name: onboarding_generationmembership; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.onboarding_generationmembership (id, assigned_at, collaborator_id, generation_id) FROM stdin;
1	2026-10-08 13:28:37.030914-06	1	1
2	2026-10-10 02:08:55.45734-06	2	1
4	2026-10-20 12:40:28.935212-06	3	1
\.


--
-- Data for Name: onboarding_onboardingdocument; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.onboarding_onboardingdocument (id, document_type, status, company_template, collaborator_file, company_signed_file, correction_reason, created_at, updated_at, collaborator_id, last_reminder_at) FROM stdin;
11	NDA	PENDING					2026-10-20 12:40:28.952374-06	2026-10-20 12:40:28.952374-06	3	2026-10-22 07:10:15.236132-06
12	PRESENTATION_LETTER	PENDING					2026-10-20 12:40:28.956402-06	2026-10-20 12:40:28.956402-06	3	2026-10-22 07:10:15.236132-06
13	ACCEPTANCE_LETTER	PENDING					2026-10-20 12:40:28.960404-06	2026-10-20 12:40:28.960404-06	3	2026-10-22 07:10:15.236132-06
1	NDA	COMPLETE		onboarding/collaborator_files/peter_nda_corregido.txt			2026-10-12 11:40:43.024519-06	2026-10-12 16:29:52.232147-06	1	\N
2	PRESENTATION_LETTER	COMPLETE		onboarding/collaborator_files/peter_carta_presentacion_corregida.txt	onboarding/signed/peter_carta_presentacion_firmada_empresa.txt		2026-10-12 11:40:43.031992-06	2026-10-12 16:57:45.213791-06	1	\N
3	ACCEPTANCE_LETTER	COMPLETE	onboarding/templates/plantilla_carta_aceptacion.txt	onboarding/collaborator_files/peter_carta_aceptacion_llenada.txt	onboarding/signed/peter_carta_aceptacion_firmada_empresa.txt		2026-10-12 11:40:43.038615-06	2026-10-13 10:40:48.84898-06	1	\N
5	PRESENTATION_LETTER	COMPLETE		onboarding/collaborator_files/requirements.txt	onboarding/signed/miles_carta_presentacion_firmada.txt		2026-10-12 11:40:52.094226-06	2026-10-14 18:25:11.90564-06	2	\N
4	NDA	COMPLETE	onboarding/templates/plantilla_nda_miles.txt	onboarding/collaborator_files/miles_nda_completado.txt			2026-10-12 11:40:52.087234-06	2026-10-15 01:31:45.793768-06	2	\N
6	ACCEPTANCE_LETTER	COMPLETE	onboarding/templates/plantilla_carta_aceptacion_miles.txt	onboarding/collaborator_files/miles_carta_aceptacion_llenada.txt	onboarding/signed/miles_carta_aceptacion_firmada.txt		2026-10-12 11:40:52.098233-06	2026-10-15 01:47:05.690826-06	2	\N
\.


--
-- Name: accounts_collaboratorprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accounts_collaboratorprofile_id_seq', 4, true);


--
-- Name: accounts_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accounts_user_groups_id_seq', 1, false);


--
-- Name: accounts_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accounts_user_id_seq', 5, true);


--
-- Name: accounts_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accounts_user_user_permissions_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 44, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 11, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 24, true);


--
-- Name: onboarding_automaticnotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.onboarding_automaticnotification_id_seq', 3, true);


--
-- Name: onboarding_generation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.onboarding_generation_id_seq', 3, true);


--
-- Name: onboarding_generationmembership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.onboarding_generationmembership_id_seq', 4, true);


--
-- Name: onboarding_onboardingdocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.onboarding_onboardingdocument_id_seq', 13, true);


--
-- Name: accounts_collaboratorprofile accounts_collaboratorprofile_curp_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_collaboratorprofile
    ADD CONSTRAINT accounts_collaboratorprofile_curp_key UNIQUE (curp);


--
-- Name: accounts_collaboratorprofile accounts_collaboratorprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_collaboratorprofile
    ADD CONSTRAINT accounts_collaboratorprofile_pkey PRIMARY KEY (id);


--
-- Name: accounts_collaboratorprofile accounts_collaboratorprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_collaboratorprofile
    ADD CONSTRAINT accounts_collaboratorprofile_user_id_key UNIQUE (user_id);


--
-- Name: accounts_user accounts_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user
    ADD CONSTRAINT accounts_user_email_key UNIQUE (email);


--
-- Name: accounts_user_groups accounts_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_pkey PRIMARY KEY (id);


--
-- Name: accounts_user_groups accounts_user_groups_user_id_group_id_59c0b32f_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_user_id_group_id_59c0b32f_uniq UNIQUE (user_id, group_id);


--
-- Name: accounts_user accounts_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user
    ADD CONSTRAINT accounts_user_pkey PRIMARY KEY (id);


--
-- Name: accounts_user_user_permissions accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq UNIQUE (user_id, permission_id);


--
-- Name: accounts_user_user_permissions accounts_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: onboarding_automaticnotification onboarding_automaticnotification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_automaticnotification
    ADD CONSTRAINT onboarding_automaticnotification_pkey PRIMARY KEY (id);


--
-- Name: onboarding_generation onboarding_generation_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generation
    ADD CONSTRAINT onboarding_generation_number_key UNIQUE (number);


--
-- Name: onboarding_generation onboarding_generation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generation
    ADD CONSTRAINT onboarding_generation_pkey PRIMARY KEY (id);


--
-- Name: onboarding_generationmembership onboarding_generationmembership_collaborator_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generationmembership
    ADD CONSTRAINT onboarding_generationmembership_collaborator_id_key UNIQUE (collaborator_id);


--
-- Name: onboarding_generationmembership onboarding_generationmembership_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generationmembership
    ADD CONSTRAINT onboarding_generationmembership_pkey PRIMARY KEY (id);


--
-- Name: onboarding_onboardingdocument onboarding_onboardingdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_onboardingdocument
    ADD CONSTRAINT onboarding_onboardingdocument_pkey PRIMARY KEY (id);


--
-- Name: onboarding_onboardingdocument unique_document_per_collaborator; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_onboardingdocument
    ADD CONSTRAINT unique_document_per_collaborator UNIQUE (collaborator_id, document_type);


--
-- Name: accounts_collaboratorprofile_curp_04fc5761_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_collaboratorprofile_curp_04fc5761_like ON public.accounts_collaboratorprofile USING btree (curp varchar_pattern_ops);


--
-- Name: accounts_user_email_b2644a56_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_user_email_b2644a56_like ON public.accounts_user USING btree (email varchar_pattern_ops);


--
-- Name: accounts_user_groups_group_id_bd11a704; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_user_groups_group_id_bd11a704 ON public.accounts_user_groups USING btree (group_id);


--
-- Name: accounts_user_groups_user_id_52b62117; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_user_groups_user_id_52b62117 ON public.accounts_user_groups USING btree (user_id);


--
-- Name: accounts_user_user_permissions_permission_id_113bb443; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_user_user_permissions_permission_id_113bb443 ON public.accounts_user_user_permissions USING btree (permission_id);


--
-- Name: accounts_user_user_permissions_user_id_e4f0a161; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX accounts_user_user_permissions_user_id_e4f0a161 ON public.accounts_user_user_permissions USING btree (user_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: onboarding_automaticnotification_document_id_777a64c8; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX onboarding_automaticnotification_document_id_777a64c8 ON public.onboarding_automaticnotification USING btree (document_id);


--
-- Name: onboarding_automaticnotification_recipient_id_2f841107; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX onboarding_automaticnotification_recipient_id_2f841107 ON public.onboarding_automaticnotification USING btree (recipient_id);


--
-- Name: onboarding_generationmembership_generation_id_888be6a1; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX onboarding_generationmembership_generation_id_888be6a1 ON public.onboarding_generationmembership USING btree (generation_id);


--
-- Name: onboarding_onboardingdocument_collaborator_id_1c3cbd4d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX onboarding_onboardingdocument_collaborator_id_1c3cbd4d ON public.onboarding_onboardingdocument USING btree (collaborator_id);


--
-- Name: accounts_collaboratorprofile accounts_collaborato_user_id_c3b124cb_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_collaboratorprofile
    ADD CONSTRAINT accounts_collaborato_user_id_c3b124cb_fk_accounts_ FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_groups accounts_user_groups_group_id_bd11a704_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_group_id_bd11a704_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_groups accounts_user_groups_user_id_52b62117_fk_accounts_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_user_id_52b62117_fk_accounts_user_id FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_user_permissions accounts_user_user_p_permission_id_113bb443_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_p_permission_id_113bb443_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_user_permissions accounts_user_user_p_user_id_e4f0a161_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_p_user_id_e4f0a161_fk_accounts_ FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_accounts_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_accounts_user_id FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: onboarding_automaticnotification onboarding_automatic_document_id_777a64c8_fk_onboardin; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_automaticnotification
    ADD CONSTRAINT onboarding_automatic_document_id_777a64c8_fk_onboardin FOREIGN KEY (document_id) REFERENCES public.onboarding_onboardingdocument(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: onboarding_automaticnotification onboarding_automatic_recipient_id_2f841107_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_automaticnotification
    ADD CONSTRAINT onboarding_automatic_recipient_id_2f841107_fk_accounts_ FOREIGN KEY (recipient_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: onboarding_generationmembership onboarding_generatio_collaborator_id_3771a04e_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generationmembership
    ADD CONSTRAINT onboarding_generatio_collaborator_id_3771a04e_fk_accounts_ FOREIGN KEY (collaborator_id) REFERENCES public.accounts_collaboratorprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: onboarding_generationmembership onboarding_generatio_generation_id_888be6a1_fk_onboardin; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_generationmembership
    ADD CONSTRAINT onboarding_generatio_generation_id_888be6a1_fk_onboardin FOREIGN KEY (generation_id) REFERENCES public.onboarding_generation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: onboarding_onboardingdocument onboarding_onboardin_collaborator_id_1c3cbd4d_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.onboarding_onboardingdocument
    ADD CONSTRAINT onboarding_onboardin_collaborator_id_1c3cbd4d_fk_accounts_ FOREIGN KEY (collaborator_id) REFERENCES public.accounts_collaboratorprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\unrestrict fgIvLnPO86QNJ6qc8yq1hqftt5AEEMh8GnBV35IrKhslTP1YmTq9vPI55xLKH7X

