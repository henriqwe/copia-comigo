CREATE TABLE "prestacaoDeServicos"."Fornecedores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "prestacaoDeServicos"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_prestacaoDeServicos_Fornecedores_updated_at"
BEFORE UPDATE ON "prestacaoDeServicos"."Fornecedores"
FOR EACH ROW
EXECUTE PROCEDURE "prestacaoDeServicos"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_prestacaoDeServicos_Fornecedores_updated_at" ON "prestacaoDeServicos"."Fornecedores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
