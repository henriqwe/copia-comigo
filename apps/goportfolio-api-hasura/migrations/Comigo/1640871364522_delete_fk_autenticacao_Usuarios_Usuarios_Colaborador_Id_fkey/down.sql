alter table "autenticacao"."Usuarios"
  add constraint "Usuarios_Colaborador_Id_fkey"
  foreign key ("Colaborador_Id")
  references "identidades"."Colaboradores"
  ("Id") on update restrict on delete restrict;
