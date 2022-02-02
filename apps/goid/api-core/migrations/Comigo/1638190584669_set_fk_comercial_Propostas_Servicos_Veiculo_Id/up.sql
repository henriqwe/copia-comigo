alter table "comercial"."Propostas_Servicos"
  add constraint "Propostas_Servicos_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
