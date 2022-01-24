alter table "comercial"."Servicos_Atributos"
  add constraint "Servicos_Atributos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
