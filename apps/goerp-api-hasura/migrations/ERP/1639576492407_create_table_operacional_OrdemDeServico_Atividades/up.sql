CREATE TABLE "operacional"."OrdemDeServico_Atividades" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz NOT NULL, "Nome" text NOT NULL, "MotivoRecusado" text, "OrdemDeServico_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("OrdemDeServico_Id") REFERENCES "operacional"."OrdemDeServico"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "operacional"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_operacional_OrdemDeServico_Atividades_updated_at"
BEFORE UPDATE ON "operacional"."OrdemDeServico_Atividades"
FOR EACH ROW
EXECUTE PROCEDURE "operacional"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_operacional_OrdemDeServico_Atividades_updated_at" ON "operacional"."OrdemDeServico_Atividades" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
