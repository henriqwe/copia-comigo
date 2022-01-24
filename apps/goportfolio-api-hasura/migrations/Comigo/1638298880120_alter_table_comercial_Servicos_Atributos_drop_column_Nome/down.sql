alter table "comercial"."Servicos_Atributos" alter column "Nome" drop not null;
alter table "comercial"."Servicos_Atributos" add column "Nome" text;
