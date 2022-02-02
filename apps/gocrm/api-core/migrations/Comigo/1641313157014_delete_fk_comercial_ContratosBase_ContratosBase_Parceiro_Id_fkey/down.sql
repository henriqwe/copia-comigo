alter table "comercial"."ContratosBase"
  add constraint "ContratosBase_Parceiro_Id_fkey"
  foreign key ("Parceiro_Id")
  references "comercial"."Fornecedores"
  ("Id") on update restrict on delete restrict;
