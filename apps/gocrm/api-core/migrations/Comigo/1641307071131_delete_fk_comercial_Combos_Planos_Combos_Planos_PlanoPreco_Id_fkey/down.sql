alter table "comercial"."Combos_Planos"
  add constraint "Combos_Planos_PlanoPreco_Id_fkey"
  foreign key ("PlanoPreco_Id")
  references "comercial"."Planos_Precos"
  ("Id") on update restrict on delete restrict;
