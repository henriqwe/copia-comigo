alter table "identidades"."Clientes_Documentos"
  add constraint "Clientes_Documentos_Cliente_Id_fkey"
  foreign key ("Cliente_Id")
  references "identidades"."Clientes"
  ("Id") on update restrict on delete restrict;
