CREATE TABLE "comercial"."ContratosBase_Versoes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Versao" text NOT NULL, "ContratoBase_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("ContratoBase_Id") REFERENCES "comercial"."ContratosBase"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_ContratosBase_Versoes_updated_at"
BEFORE UPDATE ON "comercial"."ContratosBase_Versoes"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_ContratosBase_Versoes_updated_at" ON "comercial"."ContratosBase_Versoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
