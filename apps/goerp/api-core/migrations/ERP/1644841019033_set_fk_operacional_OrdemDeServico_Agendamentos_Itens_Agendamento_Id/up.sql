alter table "operacional"."OrdemDeServico_Agendamentos_Itens"
  add constraint "OrdemDeServico_Agendamentos_Itens_Agendamento_Id_fkey"
  foreign key ("Agendamento_Id")
  references "operacional"."OrdemDeServico_Agendamentos"
  ("Id") on update restrict on delete restrict;
