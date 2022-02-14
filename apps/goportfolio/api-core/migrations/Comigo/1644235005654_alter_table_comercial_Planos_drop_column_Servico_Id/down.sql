alter table "comercial"."Planos"
  add constraint "Planos_Servico_Id_fkey"
  foreign key (Servico_Id)
  references "comercial"."Servicos"
  (Id) on update restrict on delete restrict;
alter table "comercial"."Planos" alter column "Servico_Id" drop not null;
alter table "comercial"."Planos" add column "Servico_Id" uuid;
