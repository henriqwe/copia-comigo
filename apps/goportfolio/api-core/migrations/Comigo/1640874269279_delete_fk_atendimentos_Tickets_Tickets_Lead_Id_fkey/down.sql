alter table "atendimentos"."Tickets"
  add constraint "Tickets_Lead_Id_fkey"
  foreign key ("Lead_Id")
  references "clientes"."Leads"
  ("Id") on update restrict on delete restrict;
