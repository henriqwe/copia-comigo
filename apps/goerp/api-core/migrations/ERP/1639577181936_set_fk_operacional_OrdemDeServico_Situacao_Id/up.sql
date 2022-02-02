alter table "operacional"."OrdemDeServico"
  add constraint "OrdemDeServico_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "operacional"."OrdemDeServico_Situacoes"
  ("Valor") on update restrict on delete restrict;
