alter table "atendimentos"."Tickets"
  add constraint "Tickets_Usuario_Id_fkey"
  foreign key ("Usuario_Id")
  references "autenticacao"."Usuarios"
  ("Id") on update restrict on delete restrict;
