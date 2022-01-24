alter table "operacional"."OrdemDeServico_Agendamentos"
  add constraint "OrdemDeServico_Agendamentos_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "operacional"."OrdemDeServico_Agendamentos_Situacoes"
  ("Valor") on update restrict on delete restrict;
