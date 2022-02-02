alter table "comercial"."Servicos_Tarifas"
  add constraint "Servicos_Tarifas_Tarifa_Id_fkey"
  foreign key ("Tarifa_Id")
  references "comercial"."Tarifas"
  ("Id") on update restrict on delete restrict;
