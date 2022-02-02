alter table "operacional"."OrdemDeServico" alter column "DataConcluida" drop not null;
alter table "operacional"."OrdemDeServico" add column "DataConcluida" timestamptz;
