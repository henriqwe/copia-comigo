alter table "comercial"."Combos_Servicos"
  add constraint "Combos_Servicos_ServicoPreco_Id_fkey"
  foreign key ("ServicoPreco_Id")
  references "comercial"."PrestadoresDeServicos_Servicos_Precos"
  ("Id") on update restrict on delete restrict;
