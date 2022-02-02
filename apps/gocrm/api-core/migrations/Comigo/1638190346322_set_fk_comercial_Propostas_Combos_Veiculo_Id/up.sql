alter table "comercial"."Propostas_Combos"
  add constraint "Propostas_Combos_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
