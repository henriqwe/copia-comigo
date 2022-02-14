CREATE TABLE "clientes"."VeiculosPesquisados" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Placa" text, "Chassi" text, "DadosDaApi" jsonb NOT NULL DEFAULT jsonb_build_array(), PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "clientes"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_clientes_VeiculosPesquisados_updated_at"
BEFORE UPDATE ON "clientes"."VeiculosPesquisados"
FOR EACH ROW
EXECUTE PROCEDURE "clientes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_clientes_VeiculosPesquisados_updated_at" ON "clientes"."VeiculosPesquisados" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
