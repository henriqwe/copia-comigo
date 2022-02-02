alter table "clientes"."PerfisComerciais"
  add constraint "PerfisComerciais_Pergunta_Id_fkey"
  foreign key ("Pergunta_Id")
  references "vendas"."Perguntas"
  ("Id") on update restrict on delete restrict;
