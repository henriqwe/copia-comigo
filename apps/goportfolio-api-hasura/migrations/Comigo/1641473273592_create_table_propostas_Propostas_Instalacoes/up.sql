CREATE TABLE "propostas"."Propostas_Instalacoes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Proposta_Id" uuid NOT NULL, "Veiculo_Id" uuid, "Endereco" jsonb NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Proposta_Id") REFERENCES "propostas"."Propostas"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "propostas"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_propostas_Propostas_Instalacoes_updated_at"
BEFORE UPDATE ON "propostas"."Propostas_Instalacoes"
FOR EACH ROW
EXECUTE PROCEDURE "propostas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_propostas_Propostas_Instalacoes_updated_at" ON "propostas"."Propostas_Instalacoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
