alter table "propostas"."Propostas_Servicos" add column "created_at" timestamptz
 not null default now();
