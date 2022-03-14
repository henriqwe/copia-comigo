alter table "operacional"."OrdemDeServico_CheckList" add column "created_at" timestamptz
 null default now();
