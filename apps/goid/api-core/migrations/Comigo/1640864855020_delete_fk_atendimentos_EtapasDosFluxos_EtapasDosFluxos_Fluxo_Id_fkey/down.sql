alter table "atendimentos"."EtapasDosFluxos"
  add constraint "EtapasDosFluxos_Fluxo_Id_fkey"
  foreign key ("Fluxo_Id")
  references "atendimentos"."Fluxos"
  ("Id") on update restrict on delete restrict;
