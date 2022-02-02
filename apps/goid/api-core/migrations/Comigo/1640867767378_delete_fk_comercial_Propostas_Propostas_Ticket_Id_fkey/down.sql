alter table "comercial"."Propostas"
  add constraint "Propostas_Ticket_Id_fkey"
  foreign key ("Ticket_Id")
  references "atendimentos"."Tickets"
  ("Id") on update restrict on delete restrict;
