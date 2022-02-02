alter table "comercial"."Propostas_Planos"
  add constraint "Propostas_Planos_PlanoPreco_Id_fkey"
  foreign key ("PlanoPreco_Id")
  references "comercial"."Planos_Precos"
  ("Id") on update restrict on delete restrict;
