CREATE TABLE "comercial"."Fornecedores_Servicos_Precos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Valor" float8 NOT NULL, "Fornecedor_Servico_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fornecedor_Servico_Id") REFERENCES "comercial"."Fornecedores_Servicos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "comercial"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_comercial_Fornecedores_Servicos_Precos_updated_at"
BEFORE UPDATE ON "comercial"."Fornecedores_Servicos_Precos"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Fornecedores_Servicos_Precos_updated_at" ON "comercial"."Fornecedores_Servicos_Precos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
