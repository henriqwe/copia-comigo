alter table "clientes"."PerfisComerciais"
  add constraint "PerfisComerciais_Grupo_Id_fkey"
  foreign key ("Grupo_Id")
  references "vendas"."GruposDePerguntas"
  ("Id") on update restrict on delete restrict;
