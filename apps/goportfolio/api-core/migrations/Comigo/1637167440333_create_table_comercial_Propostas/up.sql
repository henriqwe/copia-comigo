CREATE TABLE "comercial"."Propostas" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Lead_Id" uuid NOT NULL, "TipoDePagamento_Id" text NOT NULL, "TipoDeRecorrencia_Id" text NOT NULL, "Usuario_Id" uuid NOT NULL, "Ticket_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Lead_Id") REFERENCES "clientes"."Leads"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("TipoDePagamento_Id") REFERENCES "vendas"."TiposDePagamento"("Valor") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("TipoDeRecorrencia_Id") REFERENCES "vendas"."TiposDeRecorrencia"("Valor") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Usuario_Id") REFERENCES "autenticacao"."Usuarios"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Ticket_Id") REFERENCES "atendimentos"."Tickets"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
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
CREATE TRIGGER "set_comercial_Propostas_updated_at"
BEFORE UPDATE ON "comercial"."Propostas"
FOR EACH ROW
EXECUTE PROCEDURE "comercial"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_comercial_Propostas_updated_at" ON "comercial"."Propostas" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
