alter table "comercial"."Planos" alter column "Valor" drop not null;
alter table "comercial"."Planos" add column "Valor" float8;
