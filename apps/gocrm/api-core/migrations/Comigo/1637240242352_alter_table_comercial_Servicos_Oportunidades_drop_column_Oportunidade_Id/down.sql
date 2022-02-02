alter table "comercial"."Servicos_Oportunidades" alter column "Oportunidade_Id" drop not null;
alter table "comercial"."Servicos_Oportunidades" add column "Oportunidade_Id" uuid;
