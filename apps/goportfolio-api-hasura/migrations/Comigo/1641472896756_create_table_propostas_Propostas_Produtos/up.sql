CREATE TABLE "propostas"."Propostas_Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, "Proposta_Id" uuid NOT NULL, "Veiculo" integer NOT NULL, "Veiculo_Id" uuid, "ProdutoPreco_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Proposta_Id") REFERENCES "propostas"."Propostas"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Produto_Id") REFERENCES "comercial"."Produtos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("ProdutoPreco_Id") REFERENCES "comercial"."PrestadoresDeServicos_Produtos_Precos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_propostas_Propostas_Produtos_updated_at"
BEFORE UPDATE ON "propostas"."Propostas_Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "propostas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_propostas_Propostas_Produtos_updated_at" ON "propostas"."Propostas_Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
