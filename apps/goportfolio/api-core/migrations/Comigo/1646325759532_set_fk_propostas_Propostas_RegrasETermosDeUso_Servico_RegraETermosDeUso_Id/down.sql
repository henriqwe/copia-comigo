alter table "propostas"."Propostas_RegrasETermosDeUso" drop constraint "Propostas_RegrasETermosDeUso_Servico_RegraETermosDeUso_Id_fk",
  add constraint "Propostas_RegrasETermosDeUso_Servico_Id_fkey"
  foreign key ("Proposta_Id")
  references "propostas"."Propostas"
  ("Id") on update restrict on delete restrict;
