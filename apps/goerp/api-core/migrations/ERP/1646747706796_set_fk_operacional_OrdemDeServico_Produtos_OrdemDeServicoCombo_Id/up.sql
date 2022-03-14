alter table "operacional"."OrdemDeServico_Produtos"
  add constraint "OrdemDeServico_Produtos_OrdemDeServicoCombo_Id_fkey"
  foreign key ("OrdemDeServicoCombo_Id")
  references "operacional"."OrdemDeServico_Combos"
  ("Id") on update restrict on delete restrict;
