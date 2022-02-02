alter table "comercial"."Planos_Condicionais"
  add constraint "Planos_Condicionais_Condicional_Id_fkey"
  foreign key ("Condicional_Id")
  references "comercial"."Condicionais"
  ("Id") on update restrict on delete restrict;
