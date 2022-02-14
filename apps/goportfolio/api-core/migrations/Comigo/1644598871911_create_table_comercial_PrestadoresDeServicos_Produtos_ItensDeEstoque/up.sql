CREATE TABLE "comercial"."PrestadoresDeServicos_Produtos_ItensDeEstoque" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "PrestadoresDeServicos_Produtos_Id" uuid NOT NULL, "ItemDeEstoque_Id" uuid NOT NULL, PRIMARY KEY ("Id") );
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
CREATE TRIGGER "set_comercial_PrestadoresDeServicos_Produtos_ItensDeEstoque_updated_at"
BEFORE UPDATE ON "comercial"."PrestadoresDeServicos_Produtos_ItensDeEstoque"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_PrestadoresDeServicos_Produtos_ItensDeEstoque_updated_at" ON "comercial"."PrestadoresDeServicos_Produtos_ItensDeEstoque" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
