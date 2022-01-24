alter table "comercial"."Propostas_Instalacoes"
  add constraint "Propostas_Instalacoes_Veiculo_Id_fkey"
  foreign key ("Veiculo_Id")
  references "clientes"."Veiculos"
  ("Id") on update restrict on delete restrict;
