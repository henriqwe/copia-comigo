alter table "comercial"."Planos_Precos" alter column "Valor" drop not null;
alter table "comercial"."Planos_Precos" add column "Valor" float8;
