alter table "comercial"."Fornecedores_Servicos"
  add constraint "Fornecedores_Servicos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
