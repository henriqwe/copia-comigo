alter table "public"."EstadosEMunicipios"
  add constraint "EstadosEMunicipios_Pai_Id_fkey"
  foreign key ("Pai_Id")
  references "public"."EstadosEMunicipios"
  ("Id") on update restrict on delete restrict;
