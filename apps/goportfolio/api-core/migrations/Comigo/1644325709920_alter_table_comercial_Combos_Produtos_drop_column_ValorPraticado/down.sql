alter table "comercial"."Combos_Produtos" alter column "ValorPraticado" drop not null;
alter table "comercial"."Combos_Produtos" add column "ValorPraticado" float8;
