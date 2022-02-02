CREATE TABLE "comercial"."Propostas_Servicos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Servico_Id" uuid NOT NULL, "Proposta_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Proposta_Id") REFERENCES "comercial"."Propostas"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Servico_Id") REFERENCES "comercial"."Servicos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Propostas_Servicos_updated_at"
BEFORE UPDATE ON "comercial"."Propostas_Servicos"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Propostas_Servicos_updated_at" ON "comercial"."Propostas_Servicos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
