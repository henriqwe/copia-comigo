CREATE TABLE "comercial"."Propostas_Combos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Proposta_Id" uuid NOT NULL, "Combo_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Combo_Id") REFERENCES "comercial"."Combos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Proposta_Id") REFERENCES "comercial"."Propostas"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Propostas_Combos_updated_at"
BEFORE UPDATE ON "comercial"."Propostas_Combos"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Propostas_Combos_updated_at" ON "comercial"."Propostas_Combos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
