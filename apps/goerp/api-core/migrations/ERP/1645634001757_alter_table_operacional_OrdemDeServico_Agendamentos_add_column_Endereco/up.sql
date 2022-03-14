alter table "operacional"."OrdemDeServico_Agendamentos" add column "Endereco" jsonb
 not null default jsonb_build_array();
