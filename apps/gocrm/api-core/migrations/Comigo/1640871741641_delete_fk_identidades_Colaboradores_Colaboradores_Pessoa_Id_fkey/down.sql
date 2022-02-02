alter table "identidades"."Colaboradores"
  add constraint "Colaboradores_Pessoa_Id_fkey"
  foreign key ("Pessoa_Id")
  references "identidades"."Pessoas"
  ("Id") on update restrict on delete restrict;
