alter table "clientes"."VeiculosAtivos_Beneficios"
  add constraint "VeiculosAtivos_Beneficios_VeiculoAtivo_Id_fkey"
  foreign key ("VeiculoAtivo_Id")
  references "clientes"."VeiculosAtivos"
  ("Id") on update restrict on delete restrict;
