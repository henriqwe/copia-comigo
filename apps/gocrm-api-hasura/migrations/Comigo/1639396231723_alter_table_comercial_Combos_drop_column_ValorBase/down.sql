alter table "comercial"."Combos" alter column "ValorBase" drop not null;
alter table "comercial"."Combos" add column "ValorBase" float8;
