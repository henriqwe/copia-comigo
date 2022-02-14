alter table "comercial"."Combos_Servicos" alter column "ValorPraticado" drop not null;
alter table "comercial"."Combos_Servicos" add column "ValorPraticado" float8;
