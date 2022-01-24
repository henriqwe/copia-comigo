alter table "comercial"."Servicos_Servicos"
  add constraint "Servicos_Servicos_ServicoDependente_Id_fkey"
  foreign key ("ServicoDependente_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
