alter table "operacional"."OrdemDeServico_Produtos"
  add constraint "OrdemDeServico_Produtos_OrdemDeServicoPlano_Id_fkey"
  foreign key ("OrdemDeServicoPlano_Id")
  references "operacional"."OrdemDeServico_Planos"
  ("Id") on update restrict on delete restrict;
