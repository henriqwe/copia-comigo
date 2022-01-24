CREATE TABLE "produtosEServicos"."Fornecedores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "produtosEServicos"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_produtosEServicos_Fornecedores_updated_at"
BEFORE UPDATE ON "produtosEServicos"."Fornecedores"
FOR EACH ROW
EXECUTE PROCEDURE "produtosEServicos"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_produtosEServicos_Fornecedores_updated_at" ON "produtosEServicos"."Fornecedores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
