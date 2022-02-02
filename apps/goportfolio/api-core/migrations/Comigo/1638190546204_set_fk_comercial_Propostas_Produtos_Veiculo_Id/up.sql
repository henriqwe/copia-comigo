alter table "comercial"."Propostas_Produtos"
  add constraint "Propostas_Produtos_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
