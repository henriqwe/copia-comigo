alter table "comercial"."ContratosBase_Versoes"
  add constraint "ContratosBase_Versoes_ContratoBase_Id_fkey"
  foreign key ("ContratoBase_Id")
  references "comercial"."ContratosBase"
  ("Id") on update restrict on delete restrict;
