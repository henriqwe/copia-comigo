alter table "comercial"."Produtos"
  add constraint "Produtos_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "comercial"."Produtos_Tipos"
  ("Valor") on update restrict on delete restrict;
