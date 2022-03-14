alter table "clientes"."VeiculosAtivos_Produtos"
  add constraint "VeiculosAtivos_Produtos_VeiculoAtivoCombo_Id_fkey"
  foreign key ("VeiculoAtivoCombo_Id")
  references "clientes"."VeiculosAtivos_Combos"
  ("Id") on update restrict on delete restrict;
