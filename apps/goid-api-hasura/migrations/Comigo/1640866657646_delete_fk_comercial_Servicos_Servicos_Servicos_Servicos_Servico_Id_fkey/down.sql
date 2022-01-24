alter table "comercial"."Servicos_Servicos"
  add constraint "Servicos_Servicos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
