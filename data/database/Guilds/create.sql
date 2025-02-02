
-- Table: public.Guilds

-- DROP TABLE IF EXISTS public."Guilds";

CREATE TABLE IF NOT EXISTS public."Guilds"
(
    id bigint NOT NULL, -- ToDo: unsigned; CHECK snowflake_check
    name character(102) COLLATE pg_catalog."default",
    icon character(255) COLLATE pg_catalog."default",
    ---
    splash character(255) COLLATE pg_catalog."default",
    discovery_splash character(255) COLLATE pg_catalog."default",
    owner boolean,
    owner_id bigint,
    permissions character(255) COLLATE pg_catalog."default",
    afk_channel_id bigint,
    afk_timeout integer,
    widget_enabled boolean,
    widget_channel_id bigint,
    verification_level character(255) COLLATE pg_catalog."default",
    default_message_notifications integer,
    explicit_content_filter integer,
    roles text[] COLLATE pg_catalog."default",
    emojis character(255)[] COLLATE pg_catalog."default",
    features character(255)[] COLLATE pg_catalog."default",
    mfa_level integer,
    application_id bigint,
    system_channel_id bigint,
    system_channel_flags integer,
    rules_channel_id bigint,
    max_presences integer,
    max_members integer,
    vanity_url_code character(255) COLLATE pg_catalog."default",
    description character(255) COLLATE pg_catalog."default",
    banner character(255) COLLATE pg_catalog."default",
    premium_tier integer,
    premium_subscription_count integer,
    preferred_locale character(255) COLLATE pg_catalog."default",
    public_updates_channel_id bigint,
    max_video_channel_users integer,
    approximate_member_count integer,
    approximate_presence_count integer,
    welcome_screen text COLLATE pg_catalog."default",
    nsfw_level character(255) COLLATE pg_catalog."default",
    stickers character(255)[] COLLATE pg_catalog."default",
    premium_progress_bar_enabled boolean,
    ---
    --- https://youtu.be/vK_n9apIOlM
    discoverer_id bigint COLLATE pg_catalog."default",
    discovery_date timestamp with time zone,
    was_deleted boolean,
    deleter_id bigint COLLATE pg_catalog."default",
    delete_date timestamp with time zone,
    updater_id bigint COLLATE pg_catalog."default",
    updated timestamp with time zone,
    ---
    CONSTRAINT "Guilds_pkey" PRIMARY KEY (id),
    CONSTRAINT id UNIQUE (id),
    CONSTRAINT snowflake_check CHECK (
        id::numeric >= 0::numeric AND
        id::numeric <= '9223372036854775808'::numeric
    ) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Guilds"
    OWNER to current_user;

COMMENT ON TABLE public."Guilds"
    IS 'To write...';

COMMENT ON CONSTRAINT snowflake_check ON public."Guilds"
    IS 'Snowflake value should be greater than or equal to 0 AND should be less than or equal to 9223372036854775807.';

