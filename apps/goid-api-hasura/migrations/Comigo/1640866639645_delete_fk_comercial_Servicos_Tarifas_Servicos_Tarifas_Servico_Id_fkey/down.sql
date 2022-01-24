alter table "comercial"."Servicos_Tarifas"
  add constraint "Servicos_Tarifas_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
