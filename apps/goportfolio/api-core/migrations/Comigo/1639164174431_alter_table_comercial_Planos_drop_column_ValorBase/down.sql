alter table "comercial"."Planos" alter column "ValorBase" drop not null;
alter table "comercial"."Planos" add column "ValorBase" float8;
