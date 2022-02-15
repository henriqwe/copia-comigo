alter table "comercial"."Combos_Servicos" alter column "ServicoPreco_Id" drop not null;
alter table "comercial"."Combos_Servicos" add column "ServicoPreco_Id" uuid;
