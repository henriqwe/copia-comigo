CREATE TABLE "operacional"."OrdemDeServico_Tipo" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "operacional"."OrdemDeServico_Tipo"("Valor", "Comentario") VALUES (E'instalacao', E'Instalação');

INSERT INTO "operacional"."OrdemDeServico_Tipo"("Valor", "Comentario") VALUES (E'manutencao', E'Manutenção');

INSERT INTO "operacional"."OrdemDeServico_Tipo"("Valor", "Comentario") VALUES (E'desinstalacao', E'Desinstalação');
