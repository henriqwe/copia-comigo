alter table "comercial"."Propostas"
  add constraint "Propostas_Lead_Id_fkey"
  foreign key ("Lead_Id")
  references "clientes"."Leads"
  ("Id") on update restrict on delete restrict;
