alter table "comercial"."Produtos_Atributos" alter column "Nome" drop not null;
alter table "comercial"."Produtos_Atributos" add column "Nome" text;
