alter table "comercial"."Servicos_Tarifas" alter column "Valor" drop not null;
alter table "comercial"."Servicos_Tarifas" add column "Valor" float8;
