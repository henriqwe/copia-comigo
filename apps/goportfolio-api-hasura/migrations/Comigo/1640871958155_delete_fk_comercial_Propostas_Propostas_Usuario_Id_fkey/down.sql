alter table "comercial"."Propostas"
  add constraint "Propostas_Usuario_Id_fkey"
  foreign key ("Usuario_Id")
  references "autenticacao"."Usuarios"
  ("Id") on update restrict on delete restrict;
