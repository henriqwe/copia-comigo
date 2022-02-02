alter table "contatos"."Enderecos"
  add constraint "Enderecos_Cidade_Id_fkey"
  foreign key ("Cidade_Id")
  references "public"."EstadosEMunicipios"
  ("Id") on update restrict on delete restrict;
