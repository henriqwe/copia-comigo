alter table "comercial"."Propostas"
  add constraint "Propostas_Cliente_Id_fkey"
  foreign key ("Cliente_Id")
  references "identidades"."Clientes"
  ("Id") on update restrict on delete restrict;
