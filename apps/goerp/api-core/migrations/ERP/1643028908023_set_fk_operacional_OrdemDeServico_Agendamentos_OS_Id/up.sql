alter table "operacional"."OrdemDeServico_Agendamentos"
  add constraint "OrdemDeServico_Agendamentos_OS_Id_fkey"
  foreign key ("OS_Id")
  references "operacional"."OrdemDeServico"
  ("Id") on update restrict on delete restrict;
