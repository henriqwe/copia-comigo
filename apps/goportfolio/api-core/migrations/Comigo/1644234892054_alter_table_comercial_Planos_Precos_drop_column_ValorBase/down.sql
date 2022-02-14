alter table "comercial"."Planos_Precos" alter column "ValorBase" drop not null;
alter table "comercial"."Planos_Precos" add column "ValorBase" float8;
