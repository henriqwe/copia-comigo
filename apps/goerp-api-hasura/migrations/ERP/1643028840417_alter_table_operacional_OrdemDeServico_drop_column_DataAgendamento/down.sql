alter table "operacional"."OrdemDeServico" alter column "DataAgendamento" drop not null;
alter table "operacional"."OrdemDeServico" add column "DataAgendamento" timestamptz;
