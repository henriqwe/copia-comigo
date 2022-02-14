alter table "propostas"."Propostas" alter column "TipoDePagamento_Id" drop not null;
alter table "propostas"."Propostas" add column "TipoDePagamento_Id" text;
