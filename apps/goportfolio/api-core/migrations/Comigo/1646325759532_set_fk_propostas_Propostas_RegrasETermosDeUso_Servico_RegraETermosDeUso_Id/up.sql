alter table "propostas"."Propostas_RegrasETermosDeUso" drop constraint "Propostas_RegrasETermosDeUso_Servico_Id_fkey",
  add constraint "Propostas_RegrasETermosDeUso_Servico_RegraETermosDeUso_Id_fk"
  foreign key ("Servico_RegraETermosDeUso_Id")
  references "comercial"."Servicos_RegrasETermosDeUso"
  ("Id") on update restrict on delete restrict;
