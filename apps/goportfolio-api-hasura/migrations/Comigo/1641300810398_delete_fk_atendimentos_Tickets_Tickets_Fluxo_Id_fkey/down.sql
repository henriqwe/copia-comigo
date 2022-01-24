alter table "atendimentos"."Tickets"
  add constraint "Tickets_Fluxo_Id_fkey"
  foreign key ("Fluxo_Id")
  references "atendimentos"."Fluxos"
  ("Id") on update restrict on delete restrict;
