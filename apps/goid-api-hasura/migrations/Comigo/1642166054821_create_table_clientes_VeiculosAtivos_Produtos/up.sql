CREATE TABLE "clientes"."VeiculosAtivos_Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "VeiculoAtivo_Id" uuid NOT NULL, "Produto_Id" uuid NOT NULL, "ProdutoPreco_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("VeiculoAtivo_Id") REFERENCES "clientes"."VeiculosAtivos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_clientes_VeiculosAtivos_Produtos_updated_at"
BEFORE UPDATE ON "clientes"."VeiculosAtivos_Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "clientes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_clientes_VeiculosAtivos_Produtos_updated_at" ON "clientes"."VeiculosAtivos_Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
