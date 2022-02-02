
alter table "autenticacao"."Usuarios" drop constraint "Usuarios_Id_key";

alter table "autenticacao"."Usuarios" drop constraint "Usuarios_Colaborador_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "autenticacao"."Usuarios" add column "Colaborador_Id" uuid
--  null;

DROP TABLE "identidades"."Colaboradores";

alter table "clientes"."Veiculos" drop constraint "Veiculos_Id_key";

alter table "clientes"."Veiculos" drop constraint "Veiculos_Categoria_Id_fkey";

alter table "clientes"."Veiculos" rename column "Categoria_Id" to "Categoria";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."Veiculos" add column "Categoria" text
--  not null;

DELETE FROM "public"."CategoriasDeVeiculos" WHERE "Valor" = 'passeio';

DELETE FROM "public"."CategoriasDeVeiculos" WHERE "Valor" = 'utilitario';

DROP TABLE "public"."CategoriasDeVeiculos";

alter table "clientes"."PerfisComerciais" drop constraint "PerfisComerciais_Id_key";

alter table "clientes"."PerfisComerciais" drop constraint "PerfisComerciais_Pergunta_Id_fkey";

alter table "clientes"."PerfisComerciais" drop constraint "PerfisComerciais_Grupo_Id_fkey";

alter table "clientes"."PerfisComerciais" drop constraint "PerfisComerciais_Lead_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."PerfisComerciais" add column "Resposta" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."PerfisComerciais" add column "Pergunta_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."PerfisComerciais" add column "Grupo_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."PerfisComerciais" add column "Lead_Id" uuid
--  not null;

DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'anual';

DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'semestral';

DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'trimestral';

DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'bimestral';

DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'mensal';

DELETE FROM "vendas"."TiposDePagamento" WHERE "Valor" = 'pix';

DELETE FROM "vendas"."TiposDePagamento" WHERE "Valor" = 'cartaoDeCredito';

DELETE FROM "vendas"."TiposDePagamento" WHERE "Valor" = 'cartaoDeDebito';

alter table "clientes"."Leads" alter column "Cliente_Id" set not null;


DELETE FROM "vendas"."TiposDeRecorrencia" WHERE "Valor" = 'quinzenal';

DROP TABLE "vendas"."TiposDeRecorrencia";

DELETE FROM "vendas"."TiposDePagamento" WHERE "Valor" = 'boleto';

DROP TABLE "vendas"."TiposDePagamento";

alter table "autenticacao"."Atendentes" drop constraint "Atendentes_Usuario_Id_key";

alter table "autenticacao"."Usuarios" rename to "usuarios";

DROP TABLE "autenticacao"."Atendentes";

DROP TABLE "autenticacao"."usuarios";

drop schema "autenticacao" cascade;

alter table "atendimentos"."Tickets" drop constraint "Tickets_Etapa_Id_fkey";

alter table "atendimentos"."Tickets" rename column "Etapa_Id" to "Fluxo_Id";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "atendimentos"."Tickets" add column "Fluxo_Id" uuid
--  not null;

DROP TABLE "atendimentos"."EtapasDosFluxos";

DROP TABLE "atendimentos"."Fluxos";

alter table "clientes"."Leads" drop constraint "Leads_Cliente_Id_fkey";

DROP TABLE "clientes"."Leads";

alter table "clientes"."Veiculos" drop constraint "Veiculos_Cliente_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."Veiculos" add column "Cliente_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "clientes"."Veiculos" add column "Placa" text
--  not null;

alter table "vendas"."Leads" drop constraint "Leads_Cliente_Id_fkey";

alter table "vendas"."Leads" alter column "Cliente_Id" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Leads" add column "Cliente_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Leads" add column "Email" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Leads" add column "Telefone" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Leads" add column "Nome" text
--  not null;

alter table "atendimentos"."Tickets" drop constraint "Tickets_Tipo_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "atendimentos"."Tickets" add column "Tipo_Id" text
--  not null;

DROP TABLE "vendas"."GruposDePerguntas_Perguntas";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."GruposDePerguntas" add column "Nome" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Perguntas" add column "Descricao" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "vendas"."Perguntas" add column "Titulo" text
--  not null;

DELETE FROM "atendimentos"."TiposDeTickets" WHERE "Valor" = 'comercial';

DROP TABLE "atendimentos"."TiposDeTickets";

DROP TABLE "vendas"."Perguntas";

DROP TABLE "vendas"."GruposDePerguntas";

DROP TABLE "clientes"."PerfisComerciais";

DROP TABLE "clientes"."Veiculos";

drop schema "clientes" cascade;

DROP TABLE "atendimentos"."Tickets";

drop schema "atendimentos" cascade;

drop schema "vendas" cascade;
