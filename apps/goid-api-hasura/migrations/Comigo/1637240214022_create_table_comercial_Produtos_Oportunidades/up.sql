CREATE TABLE "comercial"."Produtos_Oportunidades" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, "Combo_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Combo_Id") REFERENCES "comercial"."Combos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Produto_Id") REFERENCES "comercial"."Produtos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Produtos_Oportunidades_updated_at"
BEFORE UPDATE ON "comercial"."Produtos_Oportunidades"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Produtos_Oportunidades_updated_at" ON "comercial"."Produtos_Oportunidades" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
