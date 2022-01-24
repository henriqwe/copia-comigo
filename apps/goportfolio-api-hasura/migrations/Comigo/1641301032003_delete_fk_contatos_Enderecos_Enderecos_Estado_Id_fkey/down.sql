alter table "contatos"."Enderecos"
  add constraint "Enderecos_Estado_Id_fkey"
  foreign key ("Estado_Id")
  references "public"."EstadosEMunicipios"
  ("Id") on update restrict on delete restrict;
