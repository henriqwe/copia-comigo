alter table "clientes"."VeiculosAtivos_Servicos"
  add constraint "VeiculosAtivos_Servicos_VeiculoAtivoCombo_Id_fkey"
  foreign key ("VeiculoAtivoCombo_Id")
  references "clientes"."VeiculosAtivos_Combos"
  ("Id") on update restrict on delete restrict;
