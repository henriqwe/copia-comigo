alter table "comercial"."Acoes"
  add constraint "Acoes_Etapa_Id_fkey"
  foreign key ("Etapa_Id")
  references "atendimentos"."EtapasDosFluxos"
  ("Id") on update restrict on delete restrict;
