alter table "operacional"."OrdemDeServico_ItensDeChecklist" add column "updated_at" timestamptz
 not null default now();
