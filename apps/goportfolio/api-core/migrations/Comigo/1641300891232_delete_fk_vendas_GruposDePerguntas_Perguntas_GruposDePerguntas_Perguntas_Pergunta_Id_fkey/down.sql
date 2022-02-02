alter table "vendas"."GruposDePerguntas_Perguntas"
  add constraint "GruposDePerguntas_Perguntas_Pergunta_Id_fkey"
  foreign key ("Pergunta_Id")
  references "vendas"."Perguntas"
  ("Id") on update restrict on delete restrict;
