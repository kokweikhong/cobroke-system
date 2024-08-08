--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "cobroke-system";




--
-- Drop roles
--

DROP ROLE "cobroke@admin";


--
-- Roles
--

CREATE ROLE "cobroke@admin";
ALTER ROLE "cobroke@admin" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:wXDQhH/WmUVmEimbVD1UrA==$A4NUpIQybVtLZC6cq84QUNlPNsYEH25RIbA9zcWIAAA=:0Sj+ESDiv8HTmC5YW5Vnn7HVqftM/b9mIeHlt6VOEJY=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: cobroke@admin
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO "cobroke@admin";

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: cobroke@admin
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: cobroke@admin
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: cobroke@admin
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "cobroke-system" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cobroke-system; Type: DATABASE; Schema: -; Owner: cobroke@admin
--

CREATE DATABASE "cobroke-system" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "cobroke-system" OWNER TO "cobroke@admin";

\connect -reuse-previous=on "dbname='cobroke-system'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: cobroke@admin
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO "cobroke@admin";

--
-- Name: listing_category_enum; Type: TYPE; Schema: public; Owner: cobroke@admin
--

CREATE TYPE public.listing_category_enum AS ENUM (
    'private',
    'public'
);


ALTER TYPE public.listing_category_enum OWNER TO "cobroke@admin";

--
-- Name: listing_type_enum; Type: TYPE; Schema: public; Owner: cobroke@admin
--

CREATE TYPE public.listing_type_enum AS ENUM (
    'wts',
    'wtb',
    'wtl',
    'wtr'
);


ALTER TYPE public.listing_type_enum OWNER TO "cobroke@admin";

--
-- Name: property_type_enum; Type: TYPE; Schema: public; Owner: cobroke@admin
--

CREATE TYPE public.property_type_enum AS ENUM (
    'residential',
    'commercial',
    'industrial',
    'land'
);


ALTER TYPE public.property_type_enum OWNER TO "cobroke@admin";

--
-- Name: role_enum; Type: TYPE; Schema: public; Owner: cobroke@admin
--

CREATE TYPE public.role_enum AS ENUM (
    'superadmin',
    'admin',
    'user'
);


ALTER TYPE public.role_enum OWNER TO "cobroke@admin";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: cobroke@admin
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO "cobroke@admin";

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: cobroke@admin
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO "cobroke@admin";

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: cobroke@admin
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    listing_id uuid,
    name character varying DEFAULT ''::character varying NOT NULL,
    contact_number character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.clients OWNER TO "cobroke@admin";

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO "cobroke@admin";

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: commercials; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.commercials (
    id integer NOT NULL,
    listing_id uuid,
    property_sub_type character varying DEFAULT ''::character varying NOT NULL,
    furnishing character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.commercials OWNER TO "cobroke@admin";

--
-- Name: commercials_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.commercials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commercials_id_seq OWNER TO "cobroke@admin";

--
-- Name: commercials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.commercials_id_seq OWNED BY public.commercials.id;


--
-- Name: industrials; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.industrials (
    id integer NOT NULL,
    listing_id uuid,
    property_sub_type character varying DEFAULT ''::character varying NOT NULL,
    floor_loading numeric DEFAULT 0.00 NOT NULL,
    eaves_height numeric DEFAULT 0.00 NOT NULL,
    power_supply numeric DEFAULT 0.00 NOT NULL,
    usage character varying DEFAULT ''::character varying NOT NULL,
    is_gas_supply boolean DEFAULT false NOT NULL
);


ALTER TABLE public.industrials OWNER TO "cobroke@admin";

--
-- Name: industrials_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.industrials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.industrials_id_seq OWNER TO "cobroke@admin";

--
-- Name: industrials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.industrials_id_seq OWNED BY public.industrials.id;


--
-- Name: lands; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.lands (
    id integer NOT NULL,
    listing_id uuid,
    property_sub_type character varying DEFAULT ''::character varying NOT NULL,
    status character varying DEFAULT ''::character varying NOT NULL,
    reserve character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.lands OWNER TO "cobroke@admin";

--
-- Name: lands_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.lands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lands_id_seq OWNER TO "cobroke@admin";

--
-- Name: lands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.lands_id_seq OWNED BY public.lands.id;


--
-- Name: listings; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.listings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    project_name character varying DEFAULT ''::character varying NOT NULL,
    listing_type public.listing_type_enum DEFAULT 'wts'::public.listing_type_enum NOT NULL,
    listing_category public.listing_category_enum DEFAULT 'public'::public.listing_category_enum NOT NULL,
    property_type public.property_type_enum DEFAULT 'residential'::public.property_type_enum NOT NULL,
    tenure character varying DEFAULT ''::character varying NOT NULL,
    property_status character varying DEFAULT ''::character varying NOT NULL,
    land_area numeric DEFAULT 0.00 NOT NULL,
    built_up_area numeric DEFAULT 0.00 NOT NULL,
    price numeric DEFAULT 0.00 NOT NULL,
    current_rental numeric DEFAULT 0.00 NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    is_available boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.listings OWNER TO "cobroke@admin";

--
-- Name: property_addresses; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.property_addresses (
    id integer NOT NULL,
    listing_id uuid,
    address_line1 character varying DEFAULT ''::character varying NOT NULL,
    address_line2 character varying DEFAULT ''::character varying NOT NULL,
    city character varying DEFAULT ''::character varying NOT NULL,
    state character varying DEFAULT ''::character varying NOT NULL,
    postal_code character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.property_addresses OWNER TO "cobroke@admin";

--
-- Name: property_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.property_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.property_addresses_id_seq OWNER TO "cobroke@admin";

--
-- Name: property_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.property_addresses_id_seq OWNED BY public.property_addresses.id;


--
-- Name: residentials; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.residentials (
    id integer NOT NULL,
    listing_id uuid,
    property_sub_type character varying DEFAULT ''::character varying NOT NULL,
    bedrooms integer DEFAULT 0 NOT NULL,
    bathrooms integer DEFAULT 0 NOT NULL,
    car_parks integer DEFAULT 0 NOT NULL,
    furnishing character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.residentials OWNER TO "cobroke@admin";

--
-- Name: residentials_id_seq; Type: SEQUENCE; Schema: public; Owner: cobroke@admin
--

CREATE SEQUENCE public.residentials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.residentials_id_seq OWNER TO "cobroke@admin";

--
-- Name: residentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cobroke@admin
--

ALTER SEQUENCE public.residentials_id_seq OWNED BY public.residentials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: cobroke@admin
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role public.role_enum DEFAULT 'user'::public.role_enum NOT NULL,
    contact_number character varying DEFAULT ''::character varying NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    is_approved boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO "cobroke@admin";

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: cobroke@admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: commercials id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.commercials ALTER COLUMN id SET DEFAULT nextval('public.commercials_id_seq'::regclass);


--
-- Name: industrials id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.industrials ALTER COLUMN id SET DEFAULT nextval('public.industrials_id_seq'::regclass);


--
-- Name: lands id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.lands ALTER COLUMN id SET DEFAULT nextval('public.lands_id_seq'::regclass);


--
-- Name: property_addresses id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.property_addresses ALTER COLUMN id SET DEFAULT nextval('public.property_addresses_id_seq'::regclass);


--
-- Name: residentials id; Type: DEFAULT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.residentials ALTER COLUMN id SET DEFAULT nextval('public.residentials_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: cobroke@admin
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	81271abeea832ff6c288fb24d530761af7c697674093dc160cc54c0da8686178	1718895897741
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.clients (id, listing_id, name, contact_number, email) FROM stdin;
53	90585435-fbf8-4c09-aeff-b9de1c329e46			
49	4467b6ed-be32-40e6-b526-ac90aa7b996c			
50	7f49c254-1c5a-40b5-a882-6a41549bd68a			
51	10e42236-b2e3-42e8-9525-45a3823f52e6			
42	b1a9f9c4-a3ef-462e-9b8c-b59c36d9bc76			
43	5b096294-6fc5-4fab-97ee-226463ec60ef			
44	ebec9f23-f62c-4455-be89-0e83f175206e			
45	2248c346-119b-447f-a385-da33c1566eeb			
46	4fc31bf4-6c9d-43f3-8170-e86826f207d6			
39	84c6334d-cdb3-4063-8b26-1eae09518100			
40	0d674933-26f5-4ba4-9d72-8bf633baba59			
33	a5e591da-dfef-4887-a5fd-7560285b74cb			
29	0f22a85d-e823-48e8-aba1-48048a026dc8			
23	f9225d7b-c357-4da2-9311-c15e0c3eb2ae			
24	488a1fb1-0425-482d-9770-e926c5e21c0c			
10	a285e678-c1bf-41bc-93f2-42d74f55a880			
4	abb18c2d-ac7f-4065-af0c-51591002a50f			
54	ae310f85-35ec-4e45-939f-79ee3e6f92b0			
55	339a3252-753e-4d6f-9e6b-5bbe8b7cf89f			
56	6f90646d-b0c6-4958-943f-1b63e2d542f6			
57	332b67ba-f892-4122-8b40-3e815151da5b			
5	dbe821e4-df98-4175-8060-2d912dc7f203			
11	54f7cdad-f7c4-427e-9242-e7076070c8b7			
12	f5d9b2f6-ed63-483c-9c11-5644e0861268			
13	4558ee6a-2a26-429e-ac5f-009440e6c3ac			
15	e20b1335-2055-424b-a0e4-511f8572fae0			
16	36f5a5e6-4b53-43e7-a577-8accc3236629			
18	8a9d125d-3a31-4fc2-afeb-e16c1553e2d2			
19	bd30e175-a98a-4a5e-9b16-90d0d7fce679			
20	ca8f540e-6102-4fd9-b908-24c5540fe01e			
21	3a65ee83-e71b-4ad0-9e5f-4be22024d61e			
22	37f32797-3ef3-4937-bf16-9620752cc603			
25	3f5455a5-f2dd-4f69-ae4b-8b6043746710			
26	742d6eac-5c31-46fc-9c25-e62b34c5203e			
27	caca7baf-c3cc-4d6d-83a1-53e465a1b6bd			
28	2656c60d-86c4-440f-9930-eae4c7b15631			
30	4e3c9f7b-d94d-44cb-9e65-38cf781261de			
31	c1e22e1e-c258-40c3-b3d4-b3f52dd0ae2c			
32	9005c9a2-8119-4820-9460-0ee73be6f013			
34	c3386ae4-7189-4897-90f5-681ac0a29061			
35	814511a2-41d1-4c26-ad48-97bbd8926c1d			
36	bce6ce97-c252-4e0b-a984-3c903e138f71			
37	48b46c8b-b6d5-458a-84a5-4bf01f187967			
47	acb1ac6e-503e-490d-9a7e-c838e896467e			
48	cc4a8629-fc6b-41f6-8cb8-e0a66fe5fe01			
52	2c303292-2ba8-482a-8985-61fa1146f25d			
\.


--
-- Data for Name: commercials; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.commercials (id, listing_id, property_sub_type, furnishing) FROM stdin;
1	c1e22e1e-c258-40c3-b3d4-b3f52dd0ae2c	office	fully furnished
2	cc4a8629-fc6b-41f6-8cb8-e0a66fe5fe01	office	fully furnished
\.


--
-- Data for Name: industrials; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.industrials (id, listing_id, property_sub_type, floor_loading, eaves_height, power_supply, usage, is_gas_supply) FROM stdin;
33	ae310f85-35ec-4e45-939f-79ee3e6f92b0	detached	30	25	450	light	f
26	5b096294-6fc5-4fab-97ee-226463ec60ef	detached	30	25	450	light	f
27	ebec9f23-f62c-4455-be89-0e83f175206e	detached	30	25	450	light	f
28	2248c346-119b-447f-a385-da33c1566eeb	detached	30	25	450	light	f
29	4467b6ed-be32-40e6-b526-ac90aa7b996c	detached	30	25	450	light	f
30	7f49c254-1c5a-40b5-a882-6a41549bd68a	detached	30	25	450	light	f
31	10e42236-b2e3-42e8-9525-45a3823f52e6	detached	30	25	450	light	f
22	814511a2-41d1-4c26-ad48-97bbd8926c1d	detached	30	25	450	light	f
14	742d6eac-5c31-46fc-9c25-e62b34c5203e	detached	30	25	450	light	f
2	abb18c2d-ac7f-4065-af0c-51591002a50f	detached	30	25	450	light	f
3	dbe821e4-df98-4175-8060-2d912dc7f203	detached	30	25	450	light	f
6	a285e678-c1bf-41bc-93f2-42d74f55a880	detached	30	25	450	light	f
8	8a9d125d-3a31-4fc2-afeb-e16c1553e2d2	detached	30	25	450	light	f
9	3a65ee83-e71b-4ad0-9e5f-4be22024d61e	detached	30	25	450	light	f
10	37f32797-3ef3-4937-bf16-9620752cc603	detached	30	25	450	light	f
11	f9225d7b-c357-4da2-9311-c15e0c3eb2ae	detached	30	25	450	light	f
12	488a1fb1-0425-482d-9770-e926c5e21c0c	detached	30	25	450	light	f
13	3f5455a5-f2dd-4f69-ae4b-8b6043746710	detached	30	25	450	light	f
15	caca7baf-c3cc-4d6d-83a1-53e465a1b6bd	detached	30	25	450	light	f
16	2656c60d-86c4-440f-9930-eae4c7b15631	detached	30	25	450	light	f
17	0f22a85d-e823-48e8-aba1-48048a026dc8	detached	30	25	450	light	f
18	4e3c9f7b-d94d-44cb-9e65-38cf781261de	detached	30	25	450	light	f
19	9005c9a2-8119-4820-9460-0ee73be6f013	detached	30	25	450	light	f
20	a5e591da-dfef-4887-a5fd-7560285b74cb	detached	30	25	450	light	f
21	c3386ae4-7189-4897-90f5-681ac0a29061	detached	30	25	450	light	f
23	bce6ce97-c252-4e0b-a984-3c903e138f71	detached	30	25	450	light	f
24	48b46c8b-b6d5-458a-84a5-4bf01f187967	detached	30	25	450	light	f
32	90585435-fbf8-4c09-aeff-b9de1c329e46	detached	30	25	450	light	f
34	339a3252-753e-4d6f-9e6b-5bbe8b7cf89f	detached	30	25	450	light	f
\.


--
-- Data for Name: lands; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.lands (id, listing_id, property_sub_type, status, reserve) FROM stdin;
3	4558ee6a-2a26-429e-ac5f-009440e6c3ac			
4	36f5a5e6-4b53-43e7-a577-8accc3236629			
5	bd30e175-a98a-4a5e-9b16-90d0d7fce679			
6	ca8f540e-6102-4fd9-b908-24c5540fe01e			
7	6f90646d-b0c6-4958-943f-1b63e2d542f6			
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.listings (id, user_id, project_name, listing_type, listing_category, property_type, tenure, property_status, land_area, built_up_area, price, current_rental, description, is_active, is_available, created_at, updated_at) FROM stdin;
c1e22e1e-c258-40c3-b3d4-b3f52dd0ae2c	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Kepong	wtl	public	commercial	freehold	vacant	30000	30000	60000	0.00		f	f	2024-07-10 06:18:35.525227	2024-07-10 06:18:35.525227
a285e678-c1bf-41bc-93f2-42d74f55a880	a2320689-8edc-4180-a652-c10f0ed5dc13	seremban	wtb	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00		t	f	2024-07-05 02:16:32.927399	2024-07-05 02:16:32.927399
488a1fb1-0425-482d-9770-e926c5e21c0c	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wts	public	industrial	leasehold	under construction	43560	22000	12999999.93	0.00		f	f	2024-07-10 06:05:15.605447	2024-07-10 06:05:15.605447
ebec9f23-f62c-4455-be89-0e83f175206e	0e6e7b4a-7cea-4c3f-bac6-a33aca27ebac	Bukit Jelutong Industrial Technology Park	wts	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00	3 storey semi deatched factory for sale in Bukit Jelutong U8. Partly furnished unit.  Land size is approximately 16000 sqf , built up is approximately 11000 sqf. Power supply 200amp.	f	f	2024-07-16 05:59:51.894122	2024-07-16 05:59:51.894122
f5d9b2f6-ed63-483c-9c11-5644e0861268	a2320689-8edc-4180-a652-c10f0ed5dc13	klang	wts	public	residential	freehold	tenanted	0.00	0.00	0.00	0.00		f	f	2024-07-05 03:38:40.383526	2024-07-05 03:38:40.383526
54f7cdad-f7c4-427e-9242-e7076070c8b7	b727046c-1869-4b9f-b6d8-e03f5642019c	Palm Spring	wtr	public	residential	leasehold	vacant	0.00	950	400000	0.00		t	t	2024-07-05 03:16:55.953417	2024-07-05 03:16:55.953417
9005c9a2-8119-4820-9460-0ee73be6f013	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Kepong	wtl	public	industrial	freehold	vacant	20000	13000	50000.02	0.00		f	f	2024-07-10 06:19:58.940818	2024-07-10 06:19:58.940818
4558ee6a-2a26-429e-ac5f-009440e6c3ac	b727046c-1869-4b9f-b6d8-e03f5642019c	Kajang	wts	public	land	freehold	vacant	35000	0.00	4500000	0.00		f	t	2024-07-06 02:56:09.622832	2024-07-06 02:56:09.622832
3f5455a5-f2dd-4f69-ae4b-8b6043746710	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	industrial	leasehold	vacant	43560	50000	50000.02	0.00		f	f	2024-07-10 06:07:13.137059	2024-07-10 06:07:13.137059
dbe821e4-df98-4175-8060-2d912dc7f203	a2320689-8edc-4180-a652-c10f0ed5dc13	Ortus Park	wts	public	industrial	freehold	under construction	6000	1800	777000	0.00	Ortus Park, Spring Hill Seremban. 	t	t	2024-07-04 08:03:14.012945	2024-07-04 08:03:14.012945
7f49c254-1c5a-40b5-a882-6a41549bd68a	b935a4b1-624b-416f-aa2c-8eeeb21c9b93	Sri Edaran Industrial Kepong 	wts	public	industrial	leasehold	tenanted	0.00	0.00	0.00	0.00	1.5 stry terrace factory, 24x75 sqft, Tenanted until December 2024	f	f	2024-07-19 06:50:28.586896	2024-07-19 06:50:28.586896
a5e591da-dfef-4887-a5fd-7560285b74cb	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	industrial	leasehold	vacant	20000	10000	22000.02	0.00		f	f	2024-07-10 06:21:02.678441	2024-07-10 06:21:02.678441
caca7baf-c3cc-4d6d-83a1-53e465a1b6bd	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	industrial	leasehold	vacant	43559.96	24000	39000.01	0.00		f	f	2024-07-10 06:11:22.902231	2024-07-10 06:11:22.902231
36f5a5e6-4b53-43e7-a577-8accc3236629	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wts	public	land	leasehold	vacant	130680	0.00	9800000	0.00		f	f	2024-07-10 05:52:09.76006	2024-07-10 05:52:09.76006
abb18c2d-ac7f-4065-af0c-51591002a50f	a2320689-8edc-4180-a652-c10f0ed5dc13	Ortus Park	wts	public	industrial	freehold	under construction	6000	2400	840000	0.00	Ortus Park, Spring Hill Seremban. Freehold Semi-d Factory	t	t	2024-07-04 08:00:49.126952	2024-07-04 08:00:49.126952
8a9d125d-3a31-4fc2-afeb-e16c1553e2d2	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wts	public	industrial	leasehold	tenanted	43560	24000	12500000	0.00		f	f	2024-07-10 05:58:37.863421	2024-07-10 05:58:37.863421
2248c346-119b-447f-a385-da33c1566eeb	0e6e7b4a-7cea-4c3f-bac6-a33aca27ebac	Puncak Alam Alam Jaya Industrial Park 	wts	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00	1 acre detached factory for sale in puncak alam. Power supplt is 1000amp , floor loading is 10 ton. Built up is 24000 . Very rare in market. Asking price RM 10,000,000.00	f	f	2024-07-16 06:04:23.651202	2024-07-16 06:04:23.651202
bd30e175-a98a-4a5e-9b16-90d0d7fce679	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	land	leasehold	vacant	30000	0.00	7500	0.00		f	f	2024-07-10 05:59:50.892426	2024-07-10 05:59:50.892426
c3386ae4-7189-4897-90f5-681ac0a29061	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Bukit Raja Klang	wts	public	industrial	freehold	vacant	50000	22000	19000000.03	0.00		f	f	2024-07-10 06:22:07.59653	2024-07-10 06:22:07.59653
ca8f540e-6102-4fd9-b908-24c5540fe01e	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	land	leasehold	vacant	10000	0.00	3000	0.00	Suitable For Food Count	f	f	2024-07-10 06:01:40.410927	2024-07-10 06:01:40.410927
0f22a85d-e823-48e8-aba1-48048a026dc8	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Serendah	wts	public	industrial	leasehold	under construction	217800	0.00	9800000	0.00		f	f	2024-07-10 06:13:59.328145	2024-07-10 06:13:59.328145
3a65ee83-e71b-4ad0-9e5f-4be22024d61e	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wtl	public	industrial	leasehold	vacant	20000	12000	24000	0.00		f	f	2024-07-10 06:03:00.395569	2024-07-10 06:03:00.395569
814511a2-41d1-4c26-ad48-97bbd8926c1d	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Tago Kepong	wtl	public	industrial	freehold	vacant	19000	14000	28000	0.00		f	f	2024-07-10 06:24:00.229389	2024-07-10 06:24:00.229389
37f32797-3ef3-4937-bf16-9620752cc603	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wts	public	industrial	leasehold	vacant	30000	12000	6499999.98	0.00		f	f	2024-07-10 06:04:03.880426	2024-07-10 06:04:03.880426
2656c60d-86c4-440f-9930-eae4c7b15631	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Bandar Sri Damansara	wtl	public	industrial	freehold	vacant	43560	18000	70000.02	0.00		f	f	2024-07-10 06:13:01.447639	2024-07-10 06:13:01.447639
f9225d7b-c357-4da2-9311-c15e0c3eb2ae	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Alam Jaya	wts	public	industrial	leasehold	under construction	42000	22000	9500000	0.00		f	f	2024-07-10 06:04:59.306308	2024-07-10 06:04:59.306308
4fc31bf4-6c9d-43f3-8170-e86826f207d6	fd52c54d-63e8-4961-a9b6-3ec2e8b53655	Imperia	wtl	public	residential	freehold	vacant	0.00	1823	5200	5200	R-BH0752  For Rent  Asking Rental : RM2800 nego  Imperia @ Puteri Habour  📍Condominium 📍 2+1 bedrooms , 3 bathrooms 📍 1673sqft 📍 High floor 📍 Fully Furnished  📍 Car park 1  📍 G&G: Yes ✅ Available Now   Pls contact Jack Lee (REN15061) One Maker Realty www.wasap.my/60165415234	f	t	2024-07-17 02:19:19.568782	2024-07-17 02:19:19.568782
742d6eac-5c31-46fc-9c25-e62b34c5203e	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	kepong	wts	public	industrial	leasehold	vacant	20000	35000	13000000.03	0.00		f	f	2024-07-10 06:09:06.476584	2024-07-10 06:09:06.476584
4e3c9f7b-d94d-44cb-9e65-38cf781261de	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Bukit Serdang	wts	public	industrial	freehold	vacant	1800	3999.95	2240000.03	0.00		f	f	2024-07-10 06:17:33.735064	2024-07-10 06:17:33.735064
bce6ce97-c252-4e0b-a984-3c903e138f71	3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Setia Alam	wts	public	industrial	freehold	vacant	10500	9500	5799999.97	0.00		t	t	2024-07-10 06:25:10.432168	2024-07-10 06:25:10.432168
e20b1335-2055-424b-a0e4-511f8572fae0	b727046c-1869-4b9f-b6d8-e03f5642019c	Palm Spring	wtl	public	residential	freehold	vacant	0.00	0.00	0.00	0.00		t	t	2024-07-09 04:29:41.76932	2024-07-09 04:29:41.76932
acb1ac6e-503e-490d-9a7e-c838e896467e	fd52c54d-63e8-4961-a9b6-3ec2e8b53655	alam jaya	wtb	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00		f	f	2024-07-17 02:21:32.801212	2024-07-17 02:21:32.801212
84c6334d-cdb3-4063-8b26-1eae09518100	4542033c-cb23-42b4-adb6-de5ae1cb987b	Desa Park City	wts	private	residential	freehold	tenanted	0.00	0.00	0.00	0.00		f	f	2024-07-11 10:41:59.615618	2024-07-11 10:41:59.615618
cc4a8629-fc6b-41f6-8cb8-e0a66fe5fe01	a5d7cc29-fcdf-43e0-84a0-738c280e23e7	8Trium @ Bandar Sri Damansara	wts	public	commercial	freehold	tenanted	500	0.00	400000	0.00	Office for SALE : RM400K (nego) 500sqft, Fully Furnished, Pls contact Sean Eng 016-2694319	t	t	2024-07-19 03:37:19.269593	2024-07-19 03:37:19.269593
4467b6ed-be32-40e6-b526-ac90aa7b996c	1e32f1da-9fcc-430b-b626-fa010606b3bc	Kawasan Perindustrian SiLC, Iskandar Puteri 	wts	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00	For Sale     Iskandar Puteri - Kawasan Perindustrian SiLC    Sales at RM 2,400,000/-       Double Storey Semi-Detached Factory with Office Space - Intermediate Unit   Category of Land Use : Medium Industry   Tenure : Freehold    Address : No. x7, Jalan SiLC 2/x, Kawasan Perindustrian SiLC, 79200 Iskandar Puteri, Johor Darul Ta'zim.        Land Area : 8,515 sq.ft    Built Up Area : 7,224 sq.ft    (Ground Floor Production Area : 3,612 sq.ft +  1st Floor Production Area ; 2,420 sq.ft +  1st Floor Office Space : 1,192 sq.ft)    Ceiling Height : 41 feet    Floor Load acilities.   Non bumi	f	f	2024-07-19 06:00:00.720887	2024-07-19 06:00:00.720887
10e42236-b2e3-42e8-9525-45a3823f52e6	7088348e-bcd7-4124-8f75-081296a0ff62		wtb	public	industrial	freehold	under construction	0.00	0.00	800000	0.00		t	f	2024-07-19 09:49:06.520231	2024-07-19 09:49:06.520231
0d674933-26f5-4ba4-9d72-8bf633baba59	582d5b6b-9c69-406b-8be6-10b8422ae24a	Green Avenue	wts	public	residential	freehold	vacant	0.00	1080	430000	0.00	-Property Details	t	t	2024-07-11 10:50:22.876197	2024-07-11 10:50:22.876197
48b46c8b-b6d5-458a-84a5-4bf01f187967	b727046c-1869-4b9f-b6d8-e03f5642019c	Alam Jaya	wtr	public	industrial	freehold	vacant	0.00	0.00	0.00	0.00		t	t	2024-07-10 08:10:40.388893	2024-07-10 08:10:40.388893
b1a9f9c4-a3ef-462e-9b8c-b59c36d9bc76	582d5b6b-9c69-406b-8be6-10b8422ae24a	Greenfield	wts	public	residential	freehold	vacant	0.00	0.00	0.00	0.00	17823687126387	f	f	2024-07-15 07:52:20.319573	2024-07-15 07:52:20.319573
5b096294-6fc5-4fab-97ee-226463ec60ef	0e6e7b4a-7cea-4c3f-bac6-a33aca27ebac	Emhub Kota Damansara	wtl	public	industrial	leasehold	vacant	0.00	0.00	0.00	0.00	Facing mainroad, available on 1st October , 2623 sqf , 2 car parl. Rental asking RM 7000 nego.	f	f	2024-07-16 05:57:14.30345	2024-07-16 05:57:14.30345
2c303292-2ba8-482a-8985-61fa1146f25d	10785403-ca9b-41f8-ab10-4bf9b4ee0824	1 Petaling Residence	wts	public	residential	leasehold	vacant	0.00	1143	400000	1600	Sg Besi, Sri Petaling Property for Sales	t	t	2024-07-23 05:52:48.193028	2024-07-23 05:52:48.193028
90585435-fbf8-4c09-aeff-b9de1c329e46	ff5614e0-1f77-4a72-8c56-6c4a3c564906	Subang USJ 1	wtl	public	industrial	freehold	vacant	98010	75000	160000	0.00	For Rent	t	t	2024-07-30 08:55:31.734609	2024-07-30 08:55:31.734609
ae310f85-35ec-4e45-939f-79ee3e6f92b0	ff5614e0-1f77-4a72-8c56-6c4a3c564906	Petaling Jaya Sec.51	wts	public	industrial	leasehold	vacant	63000	35000	30000000	0.00	For Sale	t	t	2024-07-30 09:00:28.292549	2024-07-30 09:00:28.292549
339a3252-753e-4d6f-9e6b-5bbe8b7cf89f	ff5614e0-1f77-4a72-8c56-6c4a3c564906	PJS 51 A	wtl	public	industrial	leasehold	vacant	63000	35000	110000	0.00	For Rent	t	t	2024-07-30 09:04:46.13067	2024-07-30 09:04:46.13067
6f90646d-b0c6-4958-943f-1b63e2d542f6	35f25507-12dc-48fa-9814-bc798c613007	Taman Yarl OUG	wts	public	land	freehold	vacant	0.00	0.00	0.00	0.00	Bungalow Land 3pieces Combined 18000sf 	f	f	2024-08-05 05:26:48.562	2024-08-05 05:26:48.562
332b67ba-f892-4122-8b40-3e815151da5b	35f25507-12dc-48fa-9814-bc798c613007	Sri Petaling 	wts	public	residential	freehold	tenanted	2200	0.00	1350000	0.00	2sty  , Gated guarded , Basic Unit, prime location, 1.35mil 	t	t	2024-08-05 05:29:10.857009	2024-08-05 05:29:10.857009
\.


--
-- Data for Name: property_addresses; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.property_addresses (id, listing_id, address_line1, address_line2, city, state, postal_code) FROM stdin;
29	0f22a85d-e823-48e8-aba1-48048a026dc8					
28	2656c60d-86c4-440f-9930-eae4c7b15631					
26	742d6eac-5c31-46fc-9c25-e62b34c5203e					
30	4e3c9f7b-d94d-44cb-9e65-38cf781261de					
31	c1e22e1e-c258-40c3-b3d4-b3f52dd0ae2c					
32	9005c9a2-8119-4820-9460-0ee73be6f013					
33	a5e591da-dfef-4887-a5fd-7560285b74cb					
34	c3386ae4-7189-4897-90f5-681ac0a29061					
4	abb18c2d-ac7f-4065-af0c-51591002a50f			Port Dickson	negeri sembilan	
35	814511a2-41d1-4c26-ad48-97bbd8926c1d					
10	a285e678-c1bf-41bc-93f2-42d74f55a880				negeri sembilan	
12	f5d9b2f6-ed63-483c-9c11-5644e0861268					
11	54f7cdad-f7c4-427e-9242-e7076070c8b7	D-20-06		Kota Damansara 	selangor	
37	48b46c8b-b6d5-458a-84a5-4bf01f187967					
5	dbe821e4-df98-4175-8060-2d912dc7f203			Port Dickson	negeri sembilan	
36	bce6ce97-c252-4e0b-a984-3c903e138f71					
16	36f5a5e6-4b53-43e7-a577-8accc3236629					
18	8a9d125d-3a31-4fc2-afeb-e16c1553e2d2					
19	bd30e175-a98a-4a5e-9b16-90d0d7fce679					
20	ca8f540e-6102-4fd9-b908-24c5540fe01e					
21	3a65ee83-e71b-4ad0-9e5f-4be22024d61e					
22	37f32797-3ef3-4937-bf16-9620752cc603					
23	f9225d7b-c357-4da2-9311-c15e0c3eb2ae					
24	488a1fb1-0425-482d-9770-e926c5e21c0c					
25	3f5455a5-f2dd-4f69-ae4b-8b6043746710					
27	caca7baf-c3cc-4d6d-83a1-53e465a1b6bd					
39	84c6334d-cdb3-4063-8b26-1eae09518100					
40	0d674933-26f5-4ba4-9d72-8bf633baba59	Green avenue Condominium		Kuala Lumpur	kuala lumpur	57000
42	b1a9f9c4-a3ef-462e-9b8c-b59c36d9bc76					
43	5b096294-6fc5-4fab-97ee-226463ec60ef					
44	ebec9f23-f62c-4455-be89-0e83f175206e					
45	2248c346-119b-447f-a385-da33c1566eeb					
46	4fc31bf4-6c9d-43f3-8170-e86826f207d6					
47	acb1ac6e-503e-490d-9a7e-c838e896467e					
48	cc4a8629-fc6b-41f6-8cb8-e0a66fe5fe01	8trium	Jalan Kuala Selangor	Bandar Sri Damansara PJU9,	selangor	52200
49	4467b6ed-be32-40e6-b526-ac90aa7b996c					
50	7f49c254-1c5a-40b5-a882-6a41549bd68a					
51	10e42236-b2e3-42e8-9525-45a3823f52e6			Senawang	negeri sembilan	
52	2c303292-2ba8-482a-8985-61fa1146f25d	Jalan 1C/149, off Jalan Sg Besi 57100 Kuala Lumpur	Jalan Sg Besi	Sg Besi	kuala lumpur	57100
53	90585435-fbf8-4c09-aeff-b9de1c329e46	USJ 1, Subang		Subang 	selangor	
54	ae310f85-35ec-4e45-939f-79ee3e6f92b0	PJS. 51A	Petaling Jaya	Petaling Jaya	selangor	
55	339a3252-753e-4d6f-9e6b-5bbe8b7cf89f	PJS 51 A	Sec.51	Petaling Jaya	selangor	
15	e20b1335-2055-424b-a0e4-511f8572fae0					
13	4558ee6a-2a26-429e-ac5f-009440e6c3ac					
56	6f90646d-b0c6-4958-943f-1b63e2d542f6					
57	332b67ba-f892-4122-8b40-3e815151da5b	 8/149k Zone n		Seri Petaling	kuala lumpur	57100
\.


--
-- Data for Name: residentials; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.residentials (id, listing_id, property_sub_type, bedrooms, bathrooms, car_parks, furnishing) FROM stdin;
12	acb1ac6e-503e-490d-9a7e-c838e896467e	terrace	4	3	0	unfurnished
3	54f7cdad-f7c4-427e-9242-e7076070c8b7	terrace	4	3	0	unfurnished
4	f5d9b2f6-ed63-483c-9c11-5644e0861268	terrace	4	3	0	unfurnished
6	e20b1335-2055-424b-a0e4-511f8572fae0	terrace	4	3	0	unfurnished
7	84c6334d-cdb3-4063-8b26-1eae09518100	terrace	4	3	0	unfurnished
8	0d674933-26f5-4ba4-9d72-8bf633baba59	terrace	4	3	0	unfurnished
10	b1a9f9c4-a3ef-462e-9b8c-b59c36d9bc76	terrace	4	3	0	unfurnished
11	4fc31bf4-6c9d-43f3-8170-e86826f207d6	terrace	4	3	0	unfurnished
13	2c303292-2ba8-482a-8985-61fa1146f25d	terrace	4	3	0	unfurnished
14	332b67ba-f892-4122-8b40-3e815151da5b	terrace	4	3	0	unfurnished
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cobroke@admin
--

COPY public.users (id, first_name, last_name, email, password, role, contact_number, is_active, is_verified, is_approved, created_at, updated_at) FROM stdin;
f92002ac-4964-43fd-bbf8-5a4d0ae27b16	Admin	Cobroke	admin@cobroke.com	$2b$10$31/6gGI72BF4eGQ0tlmwou0teH3/tnlG60BKkzzh2cp.akxU6uP66	superadmin		t	t	t	2024-07-03 04:59:30.44868	2024-07-03 04:59:30.44868
d591d39f-98d8-4d7b-b78e-3ddbb1ba3d9f	Tee	Meng Yao	meng_yao0412@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60102003710	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d70181ac-fcfc-4c84-b804-6c67dd11f249	See	Sui Peng	ssp_carrie@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60164126348	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a2320689-8edc-4180-a652-c10f0ed5dc13	Lim	Wai Ken	andrewlim8888@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126060993	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
39a8b094-55c1-4254-8caa-071547307c5d	Chong	Kong Nam	alexckn75@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123309949	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
11cbf329-adff-425f-9a02-314d7743cf90	Seah	Thiam Biau	thiambiau1029@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60165503664	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
0559629d-01e4-4be4-952f-c73f3c73b2e3	Chai	Chin Fei	alvinchai.omr@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60128913826	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
5c0a9d53-0b99-4ca3-9866-01724c48e93c	Lee	Chew Peng	amoslee0909@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.01131E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
ddc2aa3e-8ca1-4e91-ab94-99e1f9e91e9e	Wan	Yi Chai	brendawan03@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60102325966	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
8d6b4ee8-d422-4b59-b9de-75778935731b	Lee	Pek Mun	athena_mun@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126569616	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7c3dc983-19de-457b-8665-79fc73ccaea9	Yap	Peng Yih	benyyap.realty@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123363870	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d87236c4-f93e-424e-bc8c-853ab7a8bdcd	Cheong	Tuck Chin	briancheongtc1@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122881922	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
1323efca-cc75-4a88-ac6e-20ed4d67a895	Liew	Kok Tiong	bryanliew517@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60193366231	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
883c15cc-8de3-4497-bcbb-17d0513702e5	Bryan Yik	Wei Hau	bryanyik18@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122115439	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
12dbc8e3-ac7f-494a-ba22-5df3a3641ee2	Leong	Yoke Ping	cannise2553@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60195537856	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3a613adc-a388-4221-80fe-5fbf69451432	Lerng	Chui Yee	chloelerng.pp@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60187804185	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d4adce90-45a8-4754-aa4a-0b88460b2b80	Yap	Zuen Jack	jackyap.prop@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60176354137	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
beba3fbb-15eb-4675-8003-ef6ac9e02d7c	Brian Kow	Wei Jian	briankowweijian@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126337338	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
012f92f3-c166-459d-a557-cdf9050f685e	Lim	Choon Sin	lim.choonsin899@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60163015434	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
4542033c-cb23-42b4-adb6-de5ae1cb987b	Wong	Chin Hui	terryfai2518@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166683025	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f98072b0-9918-424f-83e4-750534670d06	Liew	Xue Yi	xueliew@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122182777	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a682052d-ed7c-4181-a392-3890427a5bc8	Loo	Yu Fong	christineloo9811@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60162369811	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b2a5a2f7-c386-4b3c-aeeb-544bbab4e843	Tan	YiXing	tanyixing8874@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60129530007	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
43a15241-fe6e-49cb-8c33-f2f66cc20f65	Fan	Jia Hui	fanjiahui99@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166293215	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
50226335-d7db-4a74-8268-e9a3608ed44d	Eric Mok	Kay Hoong	realtor@ericmok.com.my	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123880356	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7b4c35cd-266b-447f-a006-9b1b8c5e91fb	Tung	Wan Ting	doristung98@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123147998	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7ccc80f7-776c-4d06-b160-18afd5e4fca7	Teoh	Sin Eng	teohsinakur@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60136125566	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f5b51c96-a1be-425a-9844-a3f0eb39a0e4	Yap	Zhi Hui	edwinyap143@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.0111E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
cab54c81-0787-4de8-ad4b-474ac8d2073b	Yap	Boon Hui	elsoncentury@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123362604	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
2b517bbb-72f0-49e6-9615-ea915c07f132	Davina Chai	Ai Chia	davinachai21@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60185788977	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a2d5d5cf-296a-4efd-9a75-c9b18e5b04a3	Siew	Jia Feng	jf.asiahome@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60136677138	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
5acfbcb1-e65b-4454-8f34-dc9ff4db807e	Chong	Chow Siong	my.eric.chong@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126833131	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
52cadd3c-5943-4ab3-b387-4f81e95452ee	Sze Tho	Loke Sau	genesis.jackysze@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60168528968	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
6e7c2eaa-c649-4ae6-a03a-12e1c835e85b	Chen	Chew Peng	janestinechen@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126616525	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3545438f-dd64-4588-a104-b7c0fb4564a2	Ho	Yueh Yu	yuehyu8288@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60193688288	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f3da29cc-2c0e-40f3-9d3e-d81954f940af	Lim	Rou Xin	rouxin.lim@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60174609318	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b4a311e8-2e24-4997-a635-5854b0f69b3e	Loh	Kok Hoong	daveloh9959@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166032229	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
443cd222-1054-43a4-8073-ee6c1fc5c61e	Bong	Kim Sin	ksb0173388004@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60143388428	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
6fe86797-a683-4371-bbca-21bb06968cff	Chan	Yik Sam	funocruz@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60103668611	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b6b70d62-a2ba-450c-9e82-55855c5ca830	Ngai	Kah Yan	jasmineyan711@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122060007	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
831a4510-d1f6-46aa-8d67-3f20bedb6242	Lim	Ye	jefflim.prop@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60127035922	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
ae284d27-7b02-4493-8402-120f438d419e	Wee	Kok Chen	johnwee2187@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123391792	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3d4cd2f2-d9d8-4dc5-aee3-33ceabac16eb	Wong	Peng Leong	wong_jinson@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60169792228	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
02ad54fd-c276-407b-8052-27675b2bc6cc	Tan	Hong Hoo	kelventan1355@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122917773	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
13cb6158-a80c-449a-a27a-5620a56fcb4a	Lin	Ji Cheng	properties.jessie@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60149828768	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
44fcb94b-c4d1-4cb4-ba88-be1193ef8370	Low	Yun Chong	patricklow7773@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60194153287	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b31650d3-717e-44ae-b58c-3bbaab36e410	Wong	Choon Lee	lawrancewong5317@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60162922284	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d890569e-ab97-4e5d-ac3f-6529d30805ca	Lee	Pui Ling	pruiney@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60162255224	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d7554ec0-679b-4edd-883c-223a2549de70	Lai	Choon Ming	laichoonming2016@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60182158131	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
0e6e7b4a-7cea-4c3f-bac6-a33aca27ebac	Sia	Han Yuen	masonsia76@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60127849468	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
bf92d94d-7b92-4be4-9e1c-97e9773f2f36	Kwah	Yin Yin	omrealty.yin@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.01116E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a28aacbe-ff84-4072-a71c-862c0273a1fd	Leong	Yenna	yennaleong2820@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60165182820	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
53ad7286-f1ef-4fe4-8fdb-28eba22ce522	Wong	Wai Leong	lucaswong1130@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60133939322	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
dd785815-67f7-46cb-a837-220772c0c34d	Gwee	Ren Hong	mansongwee193194@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60139419409	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
c26c3076-8efb-4b12-aa7f-0f379855b570	Lai	Mee Sum	laimeesum@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122363030	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
1390b1d1-41b8-48be-a9ae-eff834558948	Martin Low	Hun Lin	martinlhl@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60183648482	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
af40795f-a23e-4056-a85f-4d237e6e5791	Teo	Boon Kiat	linus92teo@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60176606008	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
c7a81df8-b311-4671-a214-201915c47f04	Tan	Mei Theng	madelyntheng@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166271494	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
742e9815-21ed-4759-9f38-3a6332abc7fb	On	Chee Yong	seanoffe@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123488142	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
ba4c221b-7558-4291-9b4e-54006c73aaff	Chong	Kar Chuon	jonathanchong.prop@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166375927	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f085f40c-9924-41cd-ae85-0aeb82f21cba	Mohamad Sopian	Bin Bajuri	sufian.sb.2014@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60182578924	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
75f453f1-09da-4c77-a986-7f13af2b2b07	Mohd Hafidz	Bin Mohd Hanif	sewabeli.property@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60192494977	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
da92af2b-a497-4109-9073-a7ef9ad73a31	Muhammad Sufi Ikhmal	Bin Abd Halim	sufiikhmal@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60124796179	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f9120c0f-fcfc-4227-ac7c-f942aac4a5ab	Hoo	Woei Keong	nelvan.omg@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122348555	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
1149cdc3-9075-4afb-8893-a0fb44b73f9e	Ng	Say Tjun	tjun.ng@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126496876	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
41bfd94b-1898-4a82-a6f3-8237ff4bac5d	Yong	Siong Jim	siongjim924@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123509190	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
0a22a6bc-ad36-4d9a-b90d-790aad3ca5b2	Ooi	Jun Yon	ooijunyon0304@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.0111E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
1bc439d9-ee0b-4dbb-be7e-40e7978fd333	Yee	Fu	kenyee85@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123334855	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
1ce031aa-4ff9-4f3d-8abd-0204d8f6a4d7	Pang	Pang Chee Vui	patrickpcv@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60198636663	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f50e4815-a353-4a46-bb18-20abdd81cd43	Rachel Kristy	Lee Yee Thing	rachel93.omr@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.01157E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f93153c4-268a-489b-89f6-29de96935c6f	Ching	Chen Seng	sam.onemaker@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123451929	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
51bd88ad-83e9-4260-bb6b-7bfb3df17687	Chong	Sim Hai	sam99chong@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60163155027	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
fe82787b-bef3-41b7-8154-ad063706e01b	Tan	Jun Pang	samsontjp@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60109399377	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f758d600-a7b2-4184-955a-586012ee8b52	Liew	Kok Seong	sean.achiever@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60139996666	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3410d4c7-e180-4955-9e1a-78a93c4508cd	Lee	Lai Jing	jesslee017@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60125232261	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
ba82de62-eab6-4d3a-927f-a45d6ebc420a	Teo	Wei Shen	teoweishen@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60162123730	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3ee22b2c-c064-427b-9090-8ceb5c8da0d0	Wong	Xin Yi	sherise.prop@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60107668278	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
3cbdefc2-c60b-4013-9af4-b2e3034b388e	Liew	Ngee Keong	simonliew57@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60122262577	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
0f75f310-5c80-46fc-8563-e0e0e08d7a32	Ship	Chern Kang	stanley.wcx@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60172392162	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
9a73d6a7-3045-4b66-9cc1-84c720bda165	Chin	Sim Yee	stephaniechinsimyee@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60164456606	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a9c7fc6e-8c6c-442a-a709-660bb0dc1cbe	Soon	Longy	stephaniesoon20@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123079109	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a869f55d-b10f-4905-b4c1-385e373703c7	Lim	Wai Chun	slwcproperty@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.JVXeMosPKceyAtXd.YXyD3N38nTBTji	user	60164489663	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7293a533-4f28-4758-9e48-dd98b89f94dc	Yap	Yong Xing	crystal_icecool@hotmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60169399355	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
51771ed8-405a-43be-a638-d135c0484f19	Yau	Kar Hao	thomasyau1997@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60183223112	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b727046c-1869-4b9f-b6d8-e03f5642019c	Leong	Chia How	charles.leongch@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60143379914	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
85b31842-fc49-40a7-9d5f-2d2f543b9b55	Christina Tan	Siew Xian	chrisytinatan@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123295752	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7088348e-bcd7-4124-8f75-081296a0ff62	Wong	Seong Leng	willahomes@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.GDgeMUwL6EWDCY0CArtAibcqa7x8cki	user	60126321123	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
d1cabfeb-26fa-4700-9a92-380931ab5173	Kwan	Joe Wai	warrenkwanjw@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60178850343	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
516a28ef-4f02-43f7-bb74-0207e55eaee4	Mior Muhammad Amerul	Bin Mohd Sahak	mioramerul@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	6.01127E+11	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
7eaabfad-dd5e-4943-b123-9f8f53883a0b	Wong	Whei Meng	wheimeng@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60192679338	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
063382b3-3460-403d-aa7e-e9207122edc4	Lau	Wan Ling	jolynlau6611@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60166655111	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
ee808171-9c03-4337-bde9-7fb0abff05b3	Yap	Hui Theng	huitheng1117@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60143478799	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
5abf644e-4308-48e0-bc31-ba7b7e4df4df	Fong	Kok Keong	alphardofficial123@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60162520216	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
26926c16-3bfe-4ed2-ad1d-d3dfcc2074b3	Sin	Sook Yin	veronica.sin@outlook.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60126191267	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
b935a4b1-624b-416f-aa2c-8eeeb21c9b93	Wallace Yap	Xun Fei	wallacexunfei@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60143506103	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
cde61c7d-ff67-45ea-a134-4e4f74c8bf4d	Foo	Kim Yan	vivianfoo.property@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60163235911	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
f4b12f5a-0696-4c54-b81d-bad28d115501	Vivien Pang	Xing Rou	vivienpang17@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60174024846	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
a455ed21-4826-428b-96ea-6471f89a967e	Wong	Chee Hong	tonywong.prop@gmail.com	$2a$10$/wWu/DTmQz6oPGeUTTLxaevewEyZLh1jhyTZig/DnlajNmq83zZPC	user	60123391362	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
4213073b-b03b-45ec-b917-8d5263609f20	Eeu	Poh Gor	pgeeu1655@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60128869013	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f9c2e2d4-8614-4e84-97ea-4e6cc571253e	Tan	Lian Huat	michaelianhuattan@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60132871111	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
bee5fef7-b4d9-4f70-8cc3-cfca4af6a00e	Wong	Wah Loon	billyagent@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60162122202	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
0224dd16-aa38-41c6-b4e5-e0342fef526c	Loh	Liang Ian	ian04093@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166152396	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
8285408c-495b-4877-a3b8-7084bebf24e8	New	Ai Yin	irene2leo@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193354301	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
90073c70-2d0c-412a-b1c3-b184fbca4288	Chan	Tjun Ping	tjping96@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122750833	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
4e286da4-a81f-4bff-9b33-05f1528b585c	Chong	Kwong Hoong	khchong28@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122722282	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
d5d9f5cd-72e0-4671-b57c-b0c814480a67	Yap	Kar Mon	firstchoicestore1@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60172437669	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
20214b34-4edd-4c72-88b0-0da83cd47e88	Lee	Hong Khai	halenlee1989@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60175896398	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
209deebe-8a8a-4d62-a6bc-c1ff44ce7cb6	How	Wei Eng	johnnyhow89@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60176308011	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
9c75c879-219f-422f-b09a-ecdc6f28ee25	Lawerance	A/L R.A. Muthu	laweranceramuthu@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193601237	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
664e1faf-f304-41d2-b6c3-2a37ed41fb58	Yap	Poo Loon	property.ci4134@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60128292686	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
19c7fd27-1cd4-4723-806e-1ffd9c5d2381	Tang	Kah Mun	alihomesagent@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60105111555	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
a8f94899-3d0b-4cac-94dc-eae42295cd52	Chin	Ping	stanleyag88@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60133432628	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
04a7ccf3-6f7e-408c-a0aa-72977c5b8b65	Chung	Lee Pau	hilda0569@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60172998838	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
75a51783-4838-4df0-97da-fd11801b23eb	Chan	Kwai Wah	andychan1383@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166797998	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
3cbb3246-96bf-4007-8a9e-d9465c55a533	Chen	Ching Wooi	glineardesign@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60163286989	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
0f71c7fc-d169-40bc-8b49-964625f0f820	Lew	Kong Jane	villmarte.services@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193022248	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
adfabe19-8eb2-490c-b98c-28c4d27b2d29	Hui	Yann Jein	janehui1@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166365670	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
ea374ae7-8b7c-4d53-8241-9dc035cf682c	Foh	Chee Tuck	ctfoh8@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60178829710	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
ef434333-35f9-47dc-b909-bec343eef293	Poh	Bee Shim	fion1969@live.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123344661	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
4afafa07-4da6-4133-be86-8b58078f0769	Yew	Yik Ming	elaineyew69@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122009208	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2855de7a-6167-44b0-bbdd-8c7866bbb29e	Leong	Siew Choo	jennifer.leong@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122288388	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2d6cb11b-c791-4b81-b582-ae16f590645f	Low	Saw Guan	isawguan@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60178725378	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
737f6419-f5be-4a75-b18a-21f09575aa87	Wong	Kum Cheong	wkc6318@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60178718136	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
c33141ce-242b-438a-bae3-8c451303d175	Lai	Ah Seng	asingalai@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122215996	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
896ae5bd-5e0f-4997-9001-3c738f94fc16	Lim	Lay Koon	mmslim7@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60162915957	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
673867d2-636e-405e-83f2-780d744fb06b	Lai	Hooi Mein	mandy_ember@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122688912	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f7081df3-debb-48ca-b072-0989fe3dab5a	Lim	Kok Eng	limkokeng11118888@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60172935367	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
64f0ceca-c1cf-453c-a648-ebfa11c98338	Lee	Mantaek	mantaek1@naver.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166503553	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
03711953-a299-4f1e-b757-b9d904b60b8a	Cheah	Chee Wing	cheewingcheah@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123320721	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f92e209e-5595-401f-ac13-5993be8f2dfc	Chang	Yeow Thong	richardchang.properties@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60128283122	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
047273a4-aa97-4306-9c78-f9020beec183	Lim	Hwa Chin	richardlim96.rl@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122739222	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
b7fb4cf5-2c4c-4cc2-b6ef-23d46bed0ccc	Fung	Yew Leng	sharonfung44@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193811483	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
ed38cf31-960f-4e2c-8ca5-87a5bde3194b	Ngo	Choon Hiok	wendyngo7@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123043338	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
412e1941-34ec-4c83-ae44-52af4e593e01	Yew	Hui Mei	meihui8872@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60142638872	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2ba66a59-1ec6-4a7b-963a-f8fc33b78ba9	Lee	Siew Ching	lee_yvonne@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123036488	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
9626acde-6641-49b2-a3fa-ffccc92535ca	Zukarman	Bin Mohd Aspar	zukarmanmohdaspar@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60129536189	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
9774d392-8a09-49c5-933c-d2f7cd9cd24e	Lau	Hieng Hung	legion3777@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193708743	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
c99d40c6-ac9a-48ad-9167-e7faadedef44	Lim	Wai Keong	anthonylim5796@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123096916	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
7d2f69cf-6ded-4570-b9ff-5c717141ea8f	Lee	Shoke Funn	tokyowalker33@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60126110816	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
d2c0ac13-9ca0-4c5f-83ac-efbcd1f7e7d4	Chan	Weng Yan	stevenwychan@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193807283	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
30d1d221-218e-44d3-acc8-0b97f0e9c009	Tan	Eng Bee	amelieteb@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60163386263	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f7f0e0d3-186e-4d0f-8447-a8833a84d599	Koh	Yee Cheong	andykoh.fullhomes@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60126029008	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e191dbbc-6239-4ca6-b159-1c1179ccd21d	Ng	Chai Nea	chainea@live.com.my	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60125129662	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
5864f1cb-7977-41a9-9955-bb3009286bb8	Wong	Pak Sim	serenawps2011@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123859828	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
41f20743-b155-4547-9d70-258c31e69a93	Liu	Meng Leong	liu3626@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123323468	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
b771aae5-77af-467d-894f-ff64f0bd25c1	Ong	Xia Xun	fullhomesagent@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60173006665	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
dff857b9-033d-494b-b1a8-d0948f82bc81	Beh	Seok Tee	ctbehmy@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60102149713	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
b020c4a7-563a-46d8-85bd-6a6b8f2cc666	Leaw	Ching Wei	cw.leaw@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122607296	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
c8a70a6c-e2ac-49c5-a797-f99ac1b4e56b	Chuah	Ai Lee	belbel917@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60174831179	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
5c932c92-61cd-4831-83c8-06f3d27ca82d	Chong	Loi Sang	alexcls08@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193206765	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2cc590c0-7497-4547-b816-f61524c30f23	Leong	Guan Yeu	steven88property@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60126181922	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
05d32f63-2e6f-4a1b-94b4-7b0745e7a471	Teh	Lay Peng	sherrenetlaypeng@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60126551206	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
ff5614e0-1f77-4a72-8c56-6c4a3c564906	Cheah	Wei Chiew	paul.cheah9885@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166063847	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
3aa73bd0-45a1-43ea-bc05-26e526d7ed8c	Yong	Lee Keng	peggyyong0206@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166264338	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e1271bf8-3a26-47d1-8577-517935dbdcd1	Eng	Yong Voon	jeremyeng2012@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60196383888	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
a408f79e-68d7-45f5-bcbf-0b4a20248368	Chi	Chi Hui Fong	hfchi@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60173752884	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
264a0c1b-ed42-4d39-a90f-89787979294f	Tu	Chong Heng	softstar11@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60163119792	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e8294c3a-4b70-4f11-a809-dab2f3630df4	Chong	Nyoke Chin	judyjudy5924@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60176399435	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
59d28459-637b-49ec-8d66-dae9c3bc97b8	Kee	Shiau Yin	keeshiauyin@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60192678765	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
910ed6f8-3092-4551-a82d-6fe1fc78a8a0	Leong	Pooi Yoke	alpy8330@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60162198392	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
60804104-cf89-424d-95e3-e2487da01870	Ng	Hong Lian	lilian88property@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122993588	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
adc6e25c-0071-42d9-901c-6c2fbffdf6f9	Yew	Siew Han	shanhan_1986@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123849384	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
26f3b591-5d5b-4d0e-8b00-dec3190dcfc5	Tan	Bee Nee	tanbnee@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60166187011	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
dad7ff6a-ed91-45f8-b2d2-232d0db1f6fc	Siti Napsa	Binti Gusman	sitinapsa1187@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60124317738	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2108d693-cd6a-441c-b866-6ce6dbc5fbb9	Teoh	Lai Heok	lhteoh@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122091213	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
cf065638-afc9-46fc-81eb-23931097967b	Lau	Kia	alice1629@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123800938	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
cc9eda61-4939-4023-9ff9-6f8463793737	Tan	Soo Khan	francine8228@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60162106970	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
1e32f1da-9fcc-430b-b626-fa010606b3bc	Tan	Wee Ling	weeling696@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	6.01127E+11	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e7cc168f-5e53-4be8-8c4f-1c0c0697e8fc	Lee	Sieh Fung	xenia_lee@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60164462856	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
b1e2edd5-c09e-4abb-8ac8-f7b02180406b	Chong	Chia Sing	chongricky@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60127172170	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f53d429d-850c-4487-a864-de8d9288af5a	Cheng	Yoke Far	shamneecheng@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60167946637	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f72e070e-089c-4482-a289-6712b01c176c	Teoh	Siew Yek	isabellecheong11@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	6.0116E+11	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
54ba03fb-f216-4743-8871-cfa088fb2cb2	Too	Wai Kit	waikit18@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60187618250	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e966a8e6-5a44-45b6-acb6-a9519437efe3	Si	Ping Yan	alwin.spy@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60177292587	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
18b992e0-196f-4910-8f9c-9176f39d57f2	Ng	Bee Huye	chiling9669@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60127558310	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
fd52c54d-63e8-4961-a9b6-3ec2e8b53655	Lee	Hoo Kit	jacklee.realestate@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60165415234	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
d5bd8b96-435e-4880-9a75-308ff215a244	Tan	Shing Yih	peiyitan96@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60193666766	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
15b4c8dd-3e6b-4917-b346-bf8ed3eb25e8	Lim	Shi Wen	siming57@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60196183496	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
7bd66415-157d-41d7-b44d-6ae220f55a7c	Tan	Song Keong	leontan.ktc@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60177801315	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
9fc16e01-f694-41e1-a71b-0a1a07ecc799	Lee	Ruoh-Zhe	leeruohzhe16@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60107956415	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
924072f9-da69-4186-a2d6-f7401e8056eb	Lee	Kim Loong	kimlee3933@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60172239923	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
34bf271c-38b7-4cc2-951a-8b3b26f209b3	Chan	Sook Peng	cannessuet1111@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123425610	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
cf8a4850-1cf5-424d-ad53-1e142cfa5dca	Wong	Joo Kim	jookim.sales@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60108326081	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
733effef-10e3-47aa-9b22-22893892eed8	Cheong	Shyang Xiong	krisxcheong1128@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60137270742	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
c1bdb286-9e35-4bab-98d0-5a2c63c17b9c	Chin	Shuey Yiing	leanncsy@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60146278685	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
626e4112-42f0-4ed7-a9ab-9f9dc44fd441	Tham	Sui Poong	vsuipoong@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60199821968	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2904e3e6-f0f9-4056-958c-fe7c315fe037	Chung	Hui Min	melodychung1868@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60124499030	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
2dc88820-d8ae-4964-83bb-f909ea866301	Tham	Sui Heong	annietham4934@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60167734934	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
8eb6c5ff-fb8c-472e-b629-d7fa16b9c41f	Wai	Chun Keat	wickywai00@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60127162800	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
e83bafea-d17b-4b9f-ad78-87a806ac0cff	Tay	Guo Jin	guojinproperty@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60196161664	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
fceaad40-c55e-418b-a65c-c11a61fd61cc	Wai	Ann Teng	annwai0928@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60199559028	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
065e7764-0df7-4d79-8b17-ed92929e3581	Heng	Tyan Chei	heng_tych@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60162037033	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
7a233328-0508-4d0b-a04b-966d9568138b	Yeow	Kim Choo	kcyeow66@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60147388223	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
140cc2c8-eafd-43ef-a860-8aca0a29301c	Yong	Yee Ngo	yee638836@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60173648233	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
f84276f0-062d-4041-afbc-9407c2474ca6	Lee	Ooi Kun	cxcgalatic1314@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60139823149	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
8585f820-f102-43f3-9170-7d7fc5e25995	Liew	She Anne	sheanne90@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60173736885	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
64bb031a-2323-4c8d-a195-cf8fda9849e8	Ng	Zhan Wei	propertykini360@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60107688057	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
a5d7cc29-fcdf-43e0-84a0-738c280e23e7	Eng	Swee Siong	sean14eng@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.QJ.TwHrQ0vg789aASXgz3C.7TT6sTVe	user	60162694319	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
46999a18-aed0-4eb4-86b3-a50f37d749e2	Ng	Lai Meng	thomeslaimeng97@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60109026547	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
45121dc9-b95f-48a9-93a9-36639b49a923	Tai	Shea Lee	miko388mode@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123888890	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
8251b3e9-f146-4156-8491-3b95ae376c40	Sim	Wen Chin	rene.property26@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60149282814	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
96bb4b39-77c7-4fb2-95de-5700b8efd2e3	Chan	Wan Yen	yen.onemakerreally@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122177160	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
0326e688-79b3-46ef-bc80-d8aa90105609	Lim	Fei Siang	flysianglim@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60127988774	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
c295d576-2438-4f0f-af8a-13aef95b7899	Guew	Mun Kam	gmunkam@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60192766833	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
5dc49c66-9ffa-41e3-9ee2-dc90ee3a4bc3	Gan	Yoong Wei	renniegan@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60139867687	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
fd2e5eaf-9b24-4721-8f61-c914b5bc89c7	Eugene Loke	Yew Juan	uginloke@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60105432150	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
fb97895a-e3ef-4480-995c-2a3c06967af4	Lee	Soo Hwa	queeniehwa@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60164202800	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
a67e2856-1d2f-45cd-ac1e-19c2334d67a9	Wan	Cheong Choy	davidwanproperty@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60122888970	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
70d642bb-45f3-4132-a0e9-b53177a898f4	Lim	Mei Yen	joannelim1688@yahoo.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123372668	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
985b41a9-3f14-43d3-b2ea-92295fe9217e	Liew	Sep Yong	sepyong@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.yi6GZJjA4Nky.HLSy5C97SEaFnhVuta	user	60122212876	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
582d5b6b-9c69-406b-8be6-10b8422ae24a	kelvin	Lai	kelvinlai5555555@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.iJWhCBsbM8W2m87vF3ttMNrZ6wvLWIK	user	0136126612	f	f	f	2024-07-11 10:47:11.094441	2024-07-11 10:47:11.094441
d0369024-ec46-4cea-a501-8d99ab73d8f2	Liew	JL	jl.onemakerrealty@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.g/cIalpxBc12mdbcC1MUdLYPvSefCpe	user		f	f	f	2024-07-17 02:16:02.778162	2024-07-17 02:16:02.778162
f2f7c28e-53a6-4841-8400-c2ad6c6939a9	Tan	Ching Koon	cktan22@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT./DPDOerADySCAzBNUy6qcpsi7gXWRo.	user	60122186122	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
7827e159-eb5c-4aac-9e56-521083088ef5	Chan	Koi Loon	chankl1962@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.uOiD1J4ANWUCN1JXQQy7rdA/5M30LqK	user	60123952078	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
10785403-ca9b-41f8-ab10-4bf9b4ee0824	Wong	Shin Mei	elise-shinmei@hotmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.wtWN2A.PgBvv3dIOS51Ocdnag/mQtNG	user	60169923508	t	t	t	2024-07-03 23:47:03.007635	2024-07-03 23:47:03.007635
42984d0c-77e8-4898-817e-acf6d778ee33	Stephanie	A/P Christopher Ramesh	s9334710@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.TsHnIyQ2iPoJAxIazt22zfi8fUiCjie	user	60162022214	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
35f25507-12dc-48fa-9814-bc798c613007	Jessie Yap	SS	jessieyapss@gmail.com	$2a$10$4.KI.PK4bE23WDq/hvwfT.XPknfXeIT5ptyPE.wIU99DtS8AYEV6G	user	60123919088	t	t	t	2024-07-10 08:08:25.320878	2024-07-10 08:08:25.320878
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: cobroke@admin
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.clients_id_seq', 57, true);


--
-- Name: commercials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.commercials_id_seq', 2, true);


--
-- Name: industrials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.industrials_id_seq', 34, true);


--
-- Name: lands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.lands_id_seq', 7, true);


--
-- Name: property_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.property_addresses_id_seq', 57, true);


--
-- Name: residentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cobroke@admin
--

SELECT pg_catalog.setval('public.residentials_id_seq', 14, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: cobroke@admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: commercials commercials_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.commercials
    ADD CONSTRAINT commercials_pkey PRIMARY KEY (id);


--
-- Name: industrials industrials_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.industrials
    ADD CONSTRAINT industrials_pkey PRIMARY KEY (id);


--
-- Name: lands lands_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_pkey PRIMARY KEY (id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: property_addresses property_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.property_addresses
    ADD CONSTRAINT property_addresses_pkey PRIMARY KEY (id);


--
-- Name: residentials residentials_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.residentials
    ADD CONSTRAINT residentials_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: clients clients_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: commercials commercials_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.commercials
    ADD CONSTRAINT commercials_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: industrials industrials_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.industrials
    ADD CONSTRAINT industrials_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: lands lands_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: listings listings_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: property_addresses property_addresses_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.property_addresses
    ADD CONSTRAINT property_addresses_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: residentials residentials_listing_id_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cobroke@admin
--

ALTER TABLE ONLY public.residentials
    ADD CONSTRAINT residentials_listing_id_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: cobroke@admin
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO "cobroke@admin";

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: cobroke@admin
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

