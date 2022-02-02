alter table "comercial"."Propostas_Planos"
  add constraint "Propostas_Planos_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
