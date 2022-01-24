alter table "atendimentos"."Tickets"
  add constraint "Tickets_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "atendimentos"."TiposDeTickets"
  ("Valor") on update restrict on delete restrict;
