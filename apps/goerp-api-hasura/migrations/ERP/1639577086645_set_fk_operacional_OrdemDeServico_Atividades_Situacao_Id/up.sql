alter table "operacional"."OrdemDeServico_Atividades"
  add constraint "OrdemDeServico_Atividades_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "operacional"."OrdemDeServico_Situacoes"
  ("Valor") on update restrict on delete restrict;
