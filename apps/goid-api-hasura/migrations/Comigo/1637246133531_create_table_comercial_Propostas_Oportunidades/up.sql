CREATE TABLE "comercial"."Propostas_Oportunidades" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Proposta_Id" uuid NOT NULL, "OportunidadeProduto_Id" uuid, "OportunidadeServico_Id" uuid, PRIMARY KEY ("Id") , FOREIGN KEY ("Proposta_Id") REFERENCES "comercial"."Propostas"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("OportunidadeProduto_Id") REFERENCES "comercial"."Produtos_Oportunidades"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("OportunidadeServico_Id") REFERENCES "comercial"."Servicos_Oportunidades"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Propostas_Oportunidades_updated_at"
BEFORE UPDATE ON "comercial"."Propostas_Oportunidades"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Propostas_Oportunidades_updated_at" ON "comercial"."Propostas_Oportunidades" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
