alter table "comercial"."Acoes" add column "Etapas_Id" jsonb
 not null default jsonb_build_array();
