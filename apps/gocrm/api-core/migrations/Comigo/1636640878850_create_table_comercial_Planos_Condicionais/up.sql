CREATE TABLE "comercial"."Planos_Condicionais" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Condicional_Id" uuid NOT NULL, "Plano_Id" uuid NOT NULL, "Valor" integer NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Condicional_Id") REFERENCES "comercial"."Condicionais"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Plano_Id") REFERENCES "comercial"."Planos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Planos_Condicionais_updated_at"
BEFORE UPDATE ON "comercial"."Planos_Condicionais"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Planos_Condicionais_updated_at" ON "comercial"."Planos_Condicionais" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
