alter table "clientes"."VeiculosAtivos_Servicos"
  add constraint "VeiculosAtivos_Servicos_VeiculoAtivoPlano_Id_fkey"
  foreign key ("VeiculoAtivoPlano_Id")
  references "clientes"."VeiculosAtivos_Planos"
  ("Id") on update restrict on delete restrict;
