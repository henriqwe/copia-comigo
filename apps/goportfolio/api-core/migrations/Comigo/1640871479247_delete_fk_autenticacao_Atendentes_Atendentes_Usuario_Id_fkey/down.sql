alter table "autenticacao"."Atendentes"
  add constraint "Atendentes_Usuario_Id_fkey"
  foreign key ("Usuario_Id")
  references "autenticacao"."Usuarios"
  ("Id") on update restrict on delete restrict;
