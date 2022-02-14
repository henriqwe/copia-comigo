alter table "comercial"."Combos_Planos" alter column "ValorPraticado" drop not null;
alter table "comercial"."Combos_Planos" add column "ValorPraticado" float8;
