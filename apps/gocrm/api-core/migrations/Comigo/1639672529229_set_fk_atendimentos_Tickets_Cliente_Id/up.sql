alter table "atendimentos"."Tickets"
  add constraint "Tickets_Cliente_Id_fkey"
  foreign key ("Cliente_Id")
  references "identidades"."Clientes"
  ("Id") on update restrict on delete restrict;
