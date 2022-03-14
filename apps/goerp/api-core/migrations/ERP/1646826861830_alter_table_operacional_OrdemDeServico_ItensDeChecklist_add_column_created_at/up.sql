alter table "operacional"."OrdemDeServico_ItensDeChecklist" add column "created_at" timestamptz
 not null default now();
