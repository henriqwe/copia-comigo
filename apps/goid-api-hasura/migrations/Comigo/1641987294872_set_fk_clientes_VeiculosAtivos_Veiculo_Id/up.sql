alter table "clientes"."VeiculosAtivos"
  add constraint "VeiculosAtivos_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
