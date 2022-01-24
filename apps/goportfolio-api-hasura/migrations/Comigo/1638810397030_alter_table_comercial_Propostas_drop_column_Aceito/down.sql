alter table "comercial"."Propostas" alter column "Aceito" set default false;
alter table "comercial"."Propostas" alter column "Aceito" drop not null;
alter table "comercial"."Propostas" add column "Aceito" bool;
