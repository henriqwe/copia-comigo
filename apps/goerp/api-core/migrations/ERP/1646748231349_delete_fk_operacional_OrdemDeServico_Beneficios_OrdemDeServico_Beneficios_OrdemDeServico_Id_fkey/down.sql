alter table "operacional"."OrdemDeServico_Beneficios"
  add constraint "OrdemDeServico_Beneficios_OrdemDeServico_Id_fkey"
  foreign key ("OrdemDeServico_Id")
  references "operacional"."OrdemDeServico"
  ("Id") on update restrict on delete restrict;
