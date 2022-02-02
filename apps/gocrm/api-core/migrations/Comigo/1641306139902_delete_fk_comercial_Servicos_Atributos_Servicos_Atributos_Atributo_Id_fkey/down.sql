alter table "comercial"."Servicos_Atributos"
  add constraint "Servicos_Atributos_Atributo_Id_fkey"
  foreign key ("Atributo_Id")
  references "comercial"."Atributos"
  ("Id") on update restrict on delete restrict;
