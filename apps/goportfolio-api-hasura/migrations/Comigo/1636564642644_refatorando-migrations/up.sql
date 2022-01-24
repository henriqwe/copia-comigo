
SET check_function_bodies = false;
CREATE SCHEMA contatos;
CREATE SCHEMA identidades;
CREATE FUNCTION contatos.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION identidades.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE contatos."Emails" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Email" text NOT NULL,
    "Identidades" jsonb NOT NULL,
    "Categorias" jsonb DEFAULT jsonb_build_array() NOT NULL,
    "NomeDoResponsavel" text
);
CREATE TABLE contatos."Enderecos" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Logradouro" text NOT NULL,
    "Numero" text,
    "Bairro" text NOT NULL,
    "Complemento" text,
    "Cep" text,
    "Cidade_Id" uuid NOT NULL,
    "Estado_Id" uuid NOT NULL,
    "Categorias" jsonb DEFAULT jsonb_build_array() NOT NULL,
    "Identidades" jsonb NOT NULL
);
CREATE TABLE contatos."Logs" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Tipo" text NOT NULL,
    "Tipo_Id" uuid NOT NULL,
    "DadosAntigos" jsonb NOT NULL,
    "DadosNovos" jsonb NOT NULL,
    "Operacao" text NOT NULL
);
CREATE TABLE contatos."Telefones" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Telefone" bigint NOT NULL,
    "Tipos" jsonb NOT NULL,
    "Identidades" jsonb NOT NULL,
    "Categorias" jsonb DEFAULT jsonb_build_array() NOT NULL,
    "NomeDoResponsavel" text
);
CREATE TABLE identidades."Clientes" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Pessoa_Id" uuid NOT NULL
);
CREATE TABLE identidades."Fornecedores" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Pessoa_Id" uuid NOT NULL
);
CREATE TABLE identidades."Logs" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Tipo" text NOT NULL,
    "Tipo_Id" uuid NOT NULL,
    "DadosAntigos" jsonb NOT NULL,
    "DadosNovos" jsonb NOT NULL,
    "Operacao" text NOT NULL
);
CREATE TABLE identidades."Pessoas" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "DadosDaApi" jsonb NOT NULL,
    "PessoaJuridica" boolean NOT NULL,
    "Identificador" text NOT NULL,
    "Nome" text NOT NULL
);
CREATE TABLE identidades."Representantes" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Pessoa_Id" uuid NOT NULL,
    "PessoaRepresentada_Id" uuid NOT NULL
);
CREATE TABLE identidades."Vendedores" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Nome" text NOT NULL,
    "Telefones" jsonb,
    "Emails" jsonb,
    "Fornecedor_Id" uuid NOT NULL
);
CREATE TABLE public."EstadosEMunicipios" (
    "Id" uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    "Nome" text NOT NULL,
    "Pai_Id" uuid,
    "CodigoIbge" bigint,
    "Sigla" text
);
ALTER TABLE ONLY contatos."Emails"
    ADD CONSTRAINT "Emails_Email_key" UNIQUE ("Email");
ALTER TABLE ONLY contatos."Emails"
    ADD CONSTRAINT "Emails_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY contatos."Enderecos"
    ADD CONSTRAINT "Enderecos_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY contatos."Logs"
    ADD CONSTRAINT "Logs_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY contatos."Telefones"
    ADD CONSTRAINT "Telefones_Telefone_key" UNIQUE ("Telefone");
ALTER TABLE ONLY contatos."Telefones"
    ADD CONSTRAINT "Telefones_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Clientes"
    ADD CONSTRAINT "Clientes_Pessoa_Id_key" UNIQUE ("Pessoa_Id");
ALTER TABLE ONLY identidades."Clientes"
    ADD CONSTRAINT "Clientes_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Fornecedores"
    ADD CONSTRAINT "Fornecedores_Pessoa_Id_key" UNIQUE ("Pessoa_Id");
ALTER TABLE ONLY identidades."Fornecedores"
    ADD CONSTRAINT "Fornecedores_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Logs"
    ADD CONSTRAINT "Logs_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Pessoas"
    ADD CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Pessoas"
    ADD CONSTRAINT "Pessoas_Identificador_key" UNIQUE ("Identificador");
ALTER TABLE ONLY identidades."Representantes"
    ADD CONSTRAINT "Representantes_Pessoa_Id_PessoaRepresentada_Id_key" UNIQUE ("Pessoa_Id", "PessoaRepresentada_Id");
ALTER TABLE ONLY identidades."Representantes"
    ADD CONSTRAINT "Representantes_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY identidades."Vendedores"
    ADD CONSTRAINT "Vendedores_pkey" PRIMARY KEY ("Id");
ALTER TABLE ONLY public."EstadosEMunicipios"
    ADD CONSTRAINT "EstadosEMunicipios_Id_key" UNIQUE ("Id");
ALTER TABLE ONLY public."EstadosEMunicipios"
    ADD CONSTRAINT "EstadosEMunicipios_pkey" PRIMARY KEY ("Id");
CREATE TRIGGER "set_contatos_Emails_updated_at" BEFORE UPDATE ON contatos."Emails" FOR EACH ROW EXECUTE FUNCTION contatos.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_contatos_Emails_updated_at" ON contatos."Emails" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_contatos_Enderecos_updated_at" BEFORE UPDATE ON contatos."Enderecos" FOR EACH ROW EXECUTE FUNCTION contatos.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_contatos_Enderecos_updated_at" ON contatos."Enderecos" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_contatos_Logs_updated_at" BEFORE UPDATE ON contatos."Logs" FOR EACH ROW EXECUTE FUNCTION contatos.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_contatos_Logs_updated_at" ON contatos."Logs" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_contatos_Telefones_updated_at" BEFORE UPDATE ON contatos."Telefones" FOR EACH ROW EXECUTE FUNCTION contatos.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_contatos_Telefones_updated_at" ON contatos."Telefones" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Clientes_updated_at" BEFORE UPDATE ON identidades."Clientes" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Clientes_updated_at" ON identidades."Clientes" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Fornecedores_updated_at" BEFORE UPDATE ON identidades."Fornecedores" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Fornecedores_updated_at" ON identidades."Fornecedores" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Logs_updated_at" BEFORE UPDATE ON identidades."Logs" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Logs_updated_at" ON identidades."Logs" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Pessoa_updated_at" BEFORE UPDATE ON identidades."Pessoas" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Pessoa_updated_at" ON identidades."Pessoas" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Representantes_updated_at" BEFORE UPDATE ON identidades."Representantes" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Representantes_updated_at" ON identidades."Representantes" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_identidades_Vendedores_updated_at" BEFORE UPDATE ON identidades."Vendedores" FOR EACH ROW EXECUTE FUNCTION identidades.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_identidades_Vendedores_updated_at" ON identidades."Vendedores" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_EstadosEMunicipios_updated_at" BEFORE UPDATE ON public."EstadosEMunicipios" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_EstadosEMunicipios_updated_at" ON public."EstadosEMunicipios" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY contatos."Enderecos"
    ADD CONSTRAINT "Enderecos_Cidade_Id_fkey" FOREIGN KEY ("Cidade_Id") REFERENCES public."EstadosEMunicipios"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY contatos."Enderecos"
    ADD CONSTRAINT "Enderecos_Estado_Id_fkey" FOREIGN KEY ("Estado_Id") REFERENCES public."EstadosEMunicipios"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY identidades."Clientes"
    ADD CONSTRAINT "Clientes_Pessoa_Id_fkey" FOREIGN KEY ("Pessoa_Id") REFERENCES identidades."Pessoas"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY identidades."Fornecedores"
    ADD CONSTRAINT "Fornecedores_Pessoa_Id_fkey" FOREIGN KEY ("Pessoa_Id") REFERENCES identidades."Pessoas"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY identidades."Representantes"
    ADD CONSTRAINT "Representantes_Pessoa_Id_fkey" FOREIGN KEY ("Pessoa_Id") REFERENCES identidades."Pessoas"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY identidades."Vendedores"
    ADD CONSTRAINT "Vendedores_Fornecedor_Id_fkey" FOREIGN KEY ("Fornecedor_Id") REFERENCES identidades."Fornecedores"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."EstadosEMunicipios"
    ADD CONSTRAINT "EstadosEMunicipios_Pai_Id_fkey" FOREIGN KEY ("Pai_Id") REFERENCES public."EstadosEMunicipios"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT;


create schema "vendas";

create schema "atendimentos";

CREATE TABLE "atendimentos"."Tickets" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "atendimentos"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_atendimentos_Tickets_updated_at"
BEFORE UPDATE ON "atendimentos"."Tickets"
FOR EACH ROW
EXECUTE PROCEDURE "atendimentos"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_atendimentos_Tickets_updated_at" ON "atendimentos"."Tickets"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

create schema "clientes";

CREATE TABLE "clientes"."Veiculos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "clientes"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_clientes_Veiculos_updated_at"
BEFORE UPDATE ON "clientes"."Veiculos"
FOR EACH ROW
EXECUTE PROCEDURE "clientes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_clientes_Veiculos_updated_at" ON "clientes"."Veiculos"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "clientes"."PerfisComerciais" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "clientes"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_clientes_PerfisComerciais_updated_at"
BEFORE UPDATE ON "clientes"."PerfisComerciais"
FOR EACH ROW
EXECUTE PROCEDURE "clientes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_clientes_PerfisComerciais_updated_at" ON "clientes"."PerfisComerciais"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "vendas"."GruposDePerguntas" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "vendas"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_vendas_GruposDePerguntas_updated_at"
BEFORE UPDATE ON "vendas"."GruposDePerguntas"
FOR EACH ROW
EXECUTE PROCEDURE "vendas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_vendas_GruposDePerguntas_updated_at" ON "vendas"."GruposDePerguntas"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "vendas"."Perguntas" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "vendas"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_vendas_Perguntas_updated_at"
BEFORE UPDATE ON "vendas"."Perguntas"
FOR EACH ROW
EXECUTE PROCEDURE "vendas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_vendas_Perguntas_updated_at" ON "vendas"."Perguntas"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "atendimentos"."TiposDeTickets" ("Valor" Text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "atendimentos"."TiposDeTickets"("Valor", "Comentario") VALUES (E'comercial', E'Comercial');

alter table "vendas"."Perguntas" add column "Titulo" text
 not null;

alter table "vendas"."Perguntas" add column "Descricao" text
 not null;

alter table "vendas"."GruposDePerguntas" add column "Nome" text
 not null;

CREATE TABLE "vendas"."GruposDePerguntas_Perguntas" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Grupo_Id" uuid NOT NULL, "Pergunta_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Grupo_Id") REFERENCES "vendas"."GruposDePerguntas"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Pergunta_Id") REFERENCES "vendas"."Perguntas"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "vendas"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_vendas_GruposDePerguntas_Perguntas_updated_at"
BEFORE UPDATE ON "vendas"."GruposDePerguntas_Perguntas"
FOR EACH ROW
EXECUTE PROCEDURE "vendas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_vendas_GruposDePerguntas_Perguntas_updated_at" ON "vendas"."GruposDePerguntas_Perguntas"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "atendimentos"."Tickets" add column "Tipo_Id" text
 not null;

alter table "atendimentos"."Tickets"
  add constraint "Tickets_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "atendimentos"."TiposDeTickets"
  ("Valor") on update restrict on delete restrict;

alter table "clientes"."Veiculos" add column "Placa" text
 not null;

alter table "clientes"."Veiculos" add column "Cliente_Id" uuid
 not null;

alter table "clientes"."Veiculos"
  add constraint "Veiculos_Cliente_Id_fkey"
  foreign key ("Cliente_Id")
  references "identidades"."Clientes"
  ("Id") on update restrict on delete restrict;

CREATE TABLE "clientes"."Leads" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Telefone" text NOT NULL, "Email" text NOT NULL, "Cliente_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "clientes"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_clientes_Leads_updated_at"
BEFORE UPDATE ON "clientes"."Leads"
FOR EACH ROW
EXECUTE PROCEDURE "clientes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_clientes_Leads_updated_at" ON "clientes"."Leads"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "clientes"."Leads"
  add constraint "Leads_Cliente_Id_fkey"
  foreign key ("Cliente_Id")
  references "identidades"."Clientes"
  ("Id") on update restrict on delete restrict;

CREATE TABLE "atendimentos"."Fluxos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "atendimentos"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_atendimentos_Fluxos_updated_at"
BEFORE UPDATE ON "atendimentos"."Fluxos"
FOR EACH ROW
EXECUTE PROCEDURE "atendimentos"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_atendimentos_Fluxos_updated_at" ON "atendimentos"."Fluxos"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "atendimentos"."EtapasDosFluxos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Posicao" integer NOT NULL, "Fluxo_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fluxo_Id") REFERENCES "atendimentos"."Fluxos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "atendimentos"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_atendimentos_EtapasDosFluxos_updated_at"
BEFORE UPDATE ON "atendimentos"."EtapasDosFluxos"
FOR EACH ROW
EXECUTE PROCEDURE "atendimentos"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_atendimentos_EtapasDosFluxos_updated_at" ON "atendimentos"."EtapasDosFluxos"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "atendimentos"."Tickets" add column "Fluxo_Id" uuid
 not null;

alter table "atendimentos"."Tickets" rename column "Fluxo_Id" to "Etapa_Id";

alter table "atendimentos"."Tickets"
  add constraint "Tickets_Etapa_Id_fkey"
  foreign key ("Etapa_Id")
  references "atendimentos"."EtapasDosFluxos"
  ("Id") on update restrict on delete restrict;

create schema "autenticacao";

CREATE TABLE "autenticacao"."usuarios" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Cliente_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Cliente_Id") REFERENCES "identidades"."Clientes"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "autenticacao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_autenticacao_usuarios_updated_at"
BEFORE UPDATE ON "autenticacao"."usuarios"
FOR EACH ROW
EXECUTE PROCEDURE "autenticacao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_autenticacao_usuarios_updated_at" ON "autenticacao"."usuarios"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "autenticacao"."Atendentes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Usuario_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Usuario_Id") REFERENCES "autenticacao"."usuarios"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "autenticacao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_autenticacao_Atendentes_updated_at"
BEFORE UPDATE ON "autenticacao"."Atendentes"
FOR EACH ROW
EXECUTE PROCEDURE "autenticacao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_autenticacao_Atendentes_updated_at" ON "autenticacao"."Atendentes"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "autenticacao"."usuarios" rename to "Usuarios";

alter table "autenticacao"."Atendentes" add constraint "Atendentes_Usuario_Id_key" unique ("Usuario_Id");

CREATE TABLE "vendas"."TiposDePagamento" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "vendas"."TiposDePagamento"("Valor", "Comentario") VALUES (E'boleto', E'Boleto');

CREATE TABLE "vendas"."TiposDeRecorrencia" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'quinzenal', E'Quinzenal');

alter table "clientes"."Leads" alter column "Cliente_Id" drop not null;

INSERT INTO "vendas"."TiposDePagamento"("Valor", "Comentario") VALUES (E'cartaoDeDebito', E'Cartão de débito');

INSERT INTO "vendas"."TiposDePagamento"("Valor", "Comentario") VALUES (E'cartaoDeCredito', E'Cartão de crédito');

INSERT INTO "vendas"."TiposDePagamento"("Valor", "Comentario") VALUES (E'pix', E'Pix');

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'mensal', E'Mensal');

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'bimestral', E'Bimestral');

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'trimestral', E'Trimestral');

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'semestral', E'Semestral');

INSERT INTO "vendas"."TiposDeRecorrencia"("Valor", "Comentario") VALUES (E'anual', E'Anual');

alter table "clientes"."PerfisComerciais" add column "Lead_Id" uuid
 not null;

alter table "clientes"."PerfisComerciais" add column "Grupo_Id" uuid
 not null;

alter table "clientes"."PerfisComerciais" add column "Pergunta_Id" uuid
 not null;

alter table "clientes"."PerfisComerciais" add column "Resposta" text
 not null;

alter table "clientes"."PerfisComerciais"
  add constraint "PerfisComerciais_Lead_Id_fkey"
  foreign key ("Lead_Id")
  references "clientes"."Leads"
  ("Id") on update restrict on delete restrict;

alter table "clientes"."PerfisComerciais"
  add constraint "PerfisComerciais_Grupo_Id_fkey"
  foreign key ("Grupo_Id")
  references "vendas"."GruposDePerguntas"
  ("Id") on update restrict on delete restrict;

alter table "clientes"."PerfisComerciais"
  add constraint "PerfisComerciais_Pergunta_Id_fkey"
  foreign key ("Pergunta_Id")
  references "vendas"."Perguntas"
  ("Id") on update restrict on delete restrict;

alter table "clientes"."PerfisComerciais" add constraint "PerfisComerciais_Id_key" unique ("Id");

CREATE TABLE "public"."CategoriasDeVeiculos" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

alter table "clientes"."Veiculos" add column "Categoria" text
 not null;

alter table "clientes"."Veiculos" rename column "Categoria" to "Categoria_Id";

alter table "clientes"."Veiculos"
  add constraint "Veiculos_Categoria_Id_fkey"
  foreign key ("Categoria_Id")
  references "public"."CategoriasDeVeiculos"
  ("Valor") on update restrict on delete restrict;

alter table "clientes"."Veiculos" add constraint "Veiculos_Id_key" unique ("Id");

CREATE TABLE "identidades"."Colaboradores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Pessoa_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Pessoa_Id") REFERENCES "identidades"."Pessoas"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "identidades"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_identidades_Colaboradores_updated_at"
BEFORE UPDATE ON "identidades"."Colaboradores"
FOR EACH ROW
EXECUTE PROCEDURE "identidades"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_identidades_Colaboradores_updated_at" ON "identidades"."Colaboradores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "autenticacao"."Usuarios" add column "Colaborador_Id" uuid
 null;

alter table "autenticacao"."Usuarios"
  add constraint "Usuarios_Colaborador_Id_fkey"
  foreign key ("Colaborador_Id")
  references "identidades"."Colaboradores"
  ("Id") on update restrict on delete restrict;

alter table "autenticacao"."Usuarios" add constraint "Usuarios_Id_key" unique ("Id");
