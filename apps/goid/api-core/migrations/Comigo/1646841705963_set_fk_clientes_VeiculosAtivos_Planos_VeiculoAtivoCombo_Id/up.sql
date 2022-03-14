alter table "clientes"."VeiculosAtivos_Planos"
  add constraint "VeiculosAtivos_Planos_VeiculoAtivoCombo_Id_fkey"
  foreign key ("VeiculoAtivoCombo_Id")
  references "clientes"."VeiculosAtivos_Combos"
  ("Id") on update restrict on delete restrict;
