alter table "comercial"."Planos_Servicos" alter column "ServicoPreco_Id" drop not null;
alter table "comercial"."Planos_Servicos" add column "ServicoPreco_Id" uuid;
