alter table "propostas"."Propostas_RegrasETermosDeUso"
  add constraint "Propostas_RegrasETermosDeUso_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "propostas"."Propostas"
  ("Id") on update restrict on delete restrict;
