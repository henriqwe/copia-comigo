alter table "operacional"."OrdemDeServico_Servicos"
  add constraint "OrdemDeServico_Servicos_OrdemDeServicoCombo_Id_fkey"
  foreign key ("OrdemDeServicoCombo_Id")
  references "operacional"."OrdemDeServico_Combos"
  ("Id") on update restrict on delete restrict;
