alter table "operacional"."OrdemDeServico_Planos"
  add constraint "OrdemDeServico_Planos_OrdemDeServicoCombo_Id_fkey"
  foreign key ("OrdemDeServicoCombo_Id")
  references "operacional"."OrdemDeServico_Combos"
  ("Id") on update restrict on delete restrict;
