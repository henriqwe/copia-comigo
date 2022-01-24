alter table "comercial"."Propostas_Combos"
  add constraint "Propostas_Combos_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "comercial"."Propostas"
  ("Id") on update restrict on delete restrict;
