alter table "operacional"."OrdemDeServico_CheckList" add column "updated_at" timestamptz
 null default now();
