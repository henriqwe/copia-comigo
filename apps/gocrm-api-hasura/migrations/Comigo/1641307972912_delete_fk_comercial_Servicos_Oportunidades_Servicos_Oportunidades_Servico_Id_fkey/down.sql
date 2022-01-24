alter table "comercial"."Servicos_Oportunidades"
  add constraint "Servicos_Oportunidades_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
