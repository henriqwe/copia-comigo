INSERT INTO comercial."PrestadoresDeServicos" ("Id",created_at,updated_at,deleted_at,"Nome") VALUES
	 ('6fde7f19-6697-4076-befc-b9b73f03b3f5','2022-02-14 15:04:31.405623-03','2022-02-14 15:04:31.405623-03',NULL,'RN Rastreamento'),
	 ('6e2a3143-7338-46d8-846a-6226ee131cf3','2022-02-14 15:04:38.629015-03','2022-02-14 15:04:38.629015-03',NULL,'Maxline'),
	 ('ceaddda8-629a-4b82-86cd-f3320c810a82','2022-02-14 15:04:46.516329-03','2022-02-14 15:04:46.516329-03',NULL,'RN Assistência');
INSERT INTO comercial."Produtos" ("Id",created_at,updated_at,deleted_at,"Nome","Categorias","Tipo_Id","ServicoDeInstalacao_Id","ServicoDeDesinstalacao_Id") VALUES
	 ('c1a9c7bc-5814-4073-8c89-e9ed5af43e3b','2022-02-14 15:11:09.245154-03','2022-02-14 15:11:09.245154-03',NULL,'Rede de proteção','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
	 ('20d67a9f-0284-4364-9bc7-c22e1e5a62b0','2022-02-14 15:13:29.85532-03','2022-02-14 15:13:29.85532-03',NULL,'Rastreador Satelital','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
	 ('5369bdd6-ed1d-4038-9d46-937e04312833','2022-02-14 15:13:44.805167-03','2022-02-14 15:13:44.805167-03',NULL,'Rastreador GPRS','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
	 ('2952251e-046f-41d1-a4d9-f2ffbb7b467a','2022-02-14 15:14:49.490872-03','2022-02-14 15:14:49.490872-03',NULL,'Sensor de porta','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
	 ('4f10a9e2-3f9a-48e0-8f78-8475eecd20ad','2022-02-14 15:14:59.643135-03','2022-02-14 15:14:59.643135-03',NULL,'Chip GPRS','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL);
INSERT INTO comercial."Servicos" ("Id",created_at,updated_at,deleted_at,"Nome","Categorias","Tipo_Id","GeraOS") VALUES
	 ('55fdb1d3-4548-41f0-985f-6cbe52f6ea42','2022-02-14 15:08:25.178715-03','2022-02-14 15:08:25.178715-03',NULL,'Instalação de rastreador','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',true),
	 ('bc1d7e55-cefb-47c7-90c0-f3665ba91325','2022-02-14 15:08:38.88365-03','2022-02-14 15:08:38.88365-03',NULL,'Desinstalação de rastreador','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',true),
	 ('63661515-d999-4d6e-a9e9-451552d3f2d7','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Monitoramento satelital','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
	 ('bf169280-c97e-4dbb-a403-7b7e6bbee034','2022-02-14 15:09:33.804582-03','2022-02-14 15:09:33.804582-03',NULL,'Monitoramento GPRS','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false);
