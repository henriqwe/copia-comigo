CREATE TABLE "operacional"."OrdemDeServico_ItensDeChecklist" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "Descricao" text NOT NULL, "Checklis_Id" jsonb NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
