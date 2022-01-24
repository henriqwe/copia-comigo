alter table "comercial"."Propostas_Oportunidades"
  add constraint "Propostas_Oportunidades_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
