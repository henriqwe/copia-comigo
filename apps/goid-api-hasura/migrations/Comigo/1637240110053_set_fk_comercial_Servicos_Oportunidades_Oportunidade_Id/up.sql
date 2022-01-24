alter table "comercial"."Servicos_Oportunidades"
  add constraint "Servicos_Oportunidades_Oportunidade_Id_fkey"
  foreign key ("Oportunidade_Id")
  references "comercial"."Oportunidades"
  ("Id") on update restrict on delete restrict;
