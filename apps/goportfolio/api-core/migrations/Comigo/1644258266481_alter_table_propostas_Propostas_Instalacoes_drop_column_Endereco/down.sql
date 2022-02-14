alter table "propostas"."Propostas_Instalacoes" alter column "Endereco" drop not null;
alter table "propostas"."Propostas_Instalacoes" add column "Endereco" jsonb;
