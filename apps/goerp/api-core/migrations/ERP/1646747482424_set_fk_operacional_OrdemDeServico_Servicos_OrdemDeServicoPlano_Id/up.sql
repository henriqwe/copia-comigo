alter table "operacional"."OrdemDeServico_Servicos"
  add constraint "OrdemDeServico_Servicos_OrdemDeServicoPlano_Id_fkey"
  foreign key ("OrdemDeServicoPlano_Id")
  references "operacional"."OrdemDeServico_Planos"
  ("Id") on update restrict on delete restrict;
