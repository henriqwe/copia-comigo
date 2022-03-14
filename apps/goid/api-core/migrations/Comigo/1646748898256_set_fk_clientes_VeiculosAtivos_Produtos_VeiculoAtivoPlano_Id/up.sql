alter table "clientes"."VeiculosAtivos_Produtos"
  add constraint "VeiculosAtivos_Produtos_VeiculoAtivoPlano_Id_fkey"
  foreign key ("VeiculoAtivoPlano_Id")
  references "clientes"."VeiculosAtivos_Planos"
  ("Id") on update restrict on delete restrict;
