alter table "comercial"."Servicos_Oportunidades" alter column "Valor" drop not null;
alter table "comercial"."Servicos_Oportunidades" add column "Valor" text;
