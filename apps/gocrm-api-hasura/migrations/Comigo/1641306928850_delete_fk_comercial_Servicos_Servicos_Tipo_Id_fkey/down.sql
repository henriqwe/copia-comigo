alter table "comercial"."Servicos"
  add constraint "Servicos_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "comercial"."Servicos_Tipos"
  ("Valor") on update restrict on delete restrict;
