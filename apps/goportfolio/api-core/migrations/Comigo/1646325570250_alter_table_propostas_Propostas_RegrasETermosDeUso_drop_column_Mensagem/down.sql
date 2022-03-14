alter table "propostas"."Propostas_RegrasETermosDeUso" alter column "Mensagem" drop not null;
alter table "propostas"."Propostas_RegrasETermosDeUso" add column "Mensagem" text;
