alter table "propostas"."Propostas" alter column "TipoDeRecorrencia_Id" drop not null;
alter table "propostas"."Propostas" add column "TipoDeRecorrencia_Id" text;
