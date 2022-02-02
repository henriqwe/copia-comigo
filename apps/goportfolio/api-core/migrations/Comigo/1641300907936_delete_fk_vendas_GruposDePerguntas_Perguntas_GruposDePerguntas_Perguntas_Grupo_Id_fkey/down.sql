alter table "vendas"."GruposDePerguntas_Perguntas"
  add constraint "GruposDePerguntas_Perguntas_Grupo_Id_fkey"
  foreign key ("Grupo_Id")
  references "vendas"."GruposDePerguntas"
  ("Id") on update restrict on delete restrict;
