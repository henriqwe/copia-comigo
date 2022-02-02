alter table "comercial"."Acoes" alter column "Etapa_Id" drop not null;
alter table "comercial"."Acoes" add column "Etapa_Id" uuid;
