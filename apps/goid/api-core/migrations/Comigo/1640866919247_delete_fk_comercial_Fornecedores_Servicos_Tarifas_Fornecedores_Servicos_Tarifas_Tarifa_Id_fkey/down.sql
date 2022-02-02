alter table "comercial"."Fornecedores_Servicos_Tarifas"
  add constraint "Fornecedores_Servicos_Tarifas_Tarifa_Id_fkey"
  foreign key ("Tarifa_Id")
  references "comercial"."Tarifas"
  ("Id") on update restrict on delete restrict;
