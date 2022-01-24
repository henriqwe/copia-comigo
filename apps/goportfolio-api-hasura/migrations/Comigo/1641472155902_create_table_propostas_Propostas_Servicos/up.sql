CREATE TABLE "propostas"."Propostas_Servicos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
