alter table "identidades"."Clientes_Documentos"
  add constraint "Clientes_Documentos_Pessoa_Id_fkey"
  foreign key ("Pessoa_Id")
  references "identidades"."Pessoas"
  ("Id") on update restrict on delete restrict;
