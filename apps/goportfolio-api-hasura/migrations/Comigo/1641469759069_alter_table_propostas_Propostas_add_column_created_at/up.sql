alter table "propostas"."Propostas" add column "created_at" timestamptz
 not null default now();
