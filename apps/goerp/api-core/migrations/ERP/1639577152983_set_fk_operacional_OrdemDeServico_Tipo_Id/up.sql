alter table "operacional"."OrdemDeServico"
  add constraint "OrdemDeServico_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "operacional"."OrdemDeServico_Tipo"
  ("Valor") on update restrict on delete restrict;
