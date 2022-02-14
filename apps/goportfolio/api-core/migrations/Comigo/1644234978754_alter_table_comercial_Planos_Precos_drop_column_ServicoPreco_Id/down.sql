alter table "comercial"."Planos_Precos" alter column "ServicoPreco_Id" drop not null;
alter table "comercial"."Planos_Precos" add column "ServicoPreco_Id" uuid;
