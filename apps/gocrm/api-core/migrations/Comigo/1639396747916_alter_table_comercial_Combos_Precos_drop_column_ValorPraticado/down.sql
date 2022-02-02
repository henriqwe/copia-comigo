alter table "comercial"."Combos_Precos" alter column "ValorPraticado" drop not null;
alter table "comercial"."Combos_Precos" add column "ValorPraticado" float8;
