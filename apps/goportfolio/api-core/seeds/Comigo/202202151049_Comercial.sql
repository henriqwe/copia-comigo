INSERT INTO comercial."Servicos" ("Id",created_at,updated_at,deleted_at,"Nome","Categorias","Tipo_Id","GeraOS") VALUES
 ('55fdb1d3-4548-41f0-985f-6cbe52f6ea42','2022-02-14 15:08:25.178715-03','2022-02-14 15:08:25.178715-03',NULL,'Instalação de rastreador','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',true),
 ('bc1d7e55-cefb-47c7-90c0-f3665ba91325','2022-02-14 15:08:38.88365-03','2022-02-14 15:08:38.88365-03',NULL,'Desinstalação de rastreador','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',true),
 ('63661515-d999-4d6e-a9e9-451552d3f2d7','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Relatórios de trajeto','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('6b49af23-6e9d-4f74-832e-7b7966573d59','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Relatórios de velocidade','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('a9db34c8-4fe7-4ec1-a75e-eaea0d143034','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Relatórios de Pontos de Referência','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('6cad8947-85d8-4cbe-b262-b5cecf08879e','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Relatórios de Manutenção','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('4843ca4a-e824-4207-83a1-43b91937abc7','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Suporte Técnico','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('4b05b879-3201-43a7-b7ed-7e764c9d5907','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Deslocamento em Tempo Real','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('2d638cd6-2e65-487a-bc90-0bddafd458eb','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Cerca virtual','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false),
 ('76d24e5a-a46a-43b3-9faf-63582ae4a43b','2022-02-14 15:09:14.050023-03','2022-02-14 15:09:14.050023-03',NULL,'Alerta de Desconexão de Bateria','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',false);
INSERT INTO comercial."Produtos" ("Id",created_at,updated_at,deleted_at,"Nome","Categorias","Tipo_Id","ServicoDeInstalacao_Id","ServicoDeDesinstalacao_Id") VALUES
 ('c1a9c7bc-5814-4073-8c89-e9ed5af43e3b','2022-02-14 15:11:09.245154-03','2022-02-14 15:11:09.245154-03',NULL,'Rede de proteção','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
 ('2952251e-046f-41d1-a4d9-f2ffbb7b467a','2022-02-14 15:14:49.490872-03','2022-02-14 15:14:49.490872-03',NULL,'Sensor de porta','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
 ('4f10a9e2-3f9a-48e0-8f78-8475eecd20ad','2022-02-14 15:14:59.643135-03','2022-02-14 15:14:59.643135-03',NULL,'Chip GPRS','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento',NULL,NULL),
 ('5369bdd6-ed1d-4038-9d46-937e04312833','2022-02-14 15:13:44.805167-03','2022-02-15 10:37:50.887916-03',NULL,'Rastreador','[{"key": "3f5d1306-5201-4a7e-ae95-85fe1a22d894", "title": "AU - ENTRADA"}]','monitoramento','55fdb1d3-4548-41f0-985f-6cbe52f6ea42','bc1d7e55-cefb-47c7-90c0-f3665ba91325');

INSERT INTO comercial."PrestadoresDeServicos" ("Id",created_at,updated_at,deleted_at,"Nome") VALUES
 ('6fde7f19-6697-4076-befc-b9b73f03b3f5','2022-02-14 15:04:31.405623-03','2022-02-14 15:04:31.405623-03',NULL,'RN Rastreamento'),
 ('6e2a3143-7338-46d8-846a-6226ee131cf3','2022-02-14 15:04:38.629015-03','2022-02-14 15:04:38.629015-03',NULL,'Maxline'),
 ('ceaddda8-629a-4b82-86cd-f3320c810a82','2022-02-14 15:04:46.516329-03','2022-02-14 15:04:46.516329-03',NULL,'RN Assistência');
INSERT INTO comercial."PrestadoresDeServicos_Produtos" ("Id",created_at,updated_at,deleted_at,"Produto_Id","Fornecedor_Id") VALUES
 ('12908b5d-cfce-4420-87a4-e3b69f3a9e5a','2022-02-15 10:01:36.747454-03','2022-02-15 10:01:36.747454-03',NULL,'4f10a9e2-3f9a-48e0-8f78-8475eecd20ad','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('362ff7e3-eb30-41e1-aa1f-95805f89ace7','2022-02-15 10:01:37.447672-03','2022-02-15 10:01:37.447672-03',NULL,'2952251e-046f-41d1-a4d9-f2ffbb7b467a','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('bb90a93f-93b7-4494-b6dd-c733c3e06a8d','2022-02-15 10:01:38.120704-03','2022-02-15 10:01:38.120704-03',NULL,'5369bdd6-ed1d-4038-9d46-937e04312833','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('0619855b-ed4d-453e-9505-a8b108e1755b','2022-02-15 10:01:38.813504-03','2022-02-15 10:01:38.813504-03',NULL,'c1a9c7bc-5814-4073-8c89-e9ed5af43e3b','6fde7f19-6697-4076-befc-b9b73f03b3f5');
INSERT INTO comercial."PrestadoresDeServicos_Produtos_Itens" ("Id",created_at,updated_at,deleted_at,"Item_Id","PrestadoresDeServicos_Produtos_Id","TipoDeItem_Id") VALUES
 ('9e779607-5a08-46c0-9a70-cc8d4f6c63cf','2022-02-15 10:09:15.900752-03','2022-02-15 10:09:15.900752-03',NULL,'d8faa6ff-5899-4b3d-a919-3d2cfa779700','12908b5d-cfce-4420-87a4-e3b69f3a9e5a','chips'),
 ('469a5863-a917-4146-9471-309967564c93','2022-02-15 10:09:37.161232-03','2022-02-15 10:09:37.161232-03',NULL,'c11d61f6-e8ed-4343-9251-680dee21728f','bb90a93f-93b7-4494-b6dd-c733c3e06a8d','kitsDeInstalacao'),
 ('40e73b3a-4f6d-45d9-953a-f3225fbb06b8','2022-02-15 10:25:10.536117-03','2022-02-15 10:25:10.536117-03',NULL,'ff6dbd4c-8284-46a0-a4db-efa490d7a8e2','362ff7e3-eb30-41e1-aa1f-95805f89ace7',NULL),
 ('330dda83-1e8c-4c3b-862d-b33db799c8ff','2022-02-15 10:25:24.889447-03','2022-02-15 10:25:24.889447-03',NULL,'7931bd08-54f0-4f1e-a4b7-df90ea66dd4c','0619855b-ed4d-453e-9505-a8b108e1755b',NULL);
INSERT INTO comercial."PrestadoresDeServicos_Produtos_Precos" ("Id",created_at,updated_at,deleted_at,"Valor","Fornecedor_Produto_Id","TipoDeRecorrencia_Id","TipoDePreco_Id") VALUES
 ('127bc294-97bd-4f46-a22a-b738a0902b83','2022-02-15 10:06:49.968896-03','2022-02-15 10:06:49.968896-03',NULL,10.0,'12908b5d-cfce-4420-87a4-e3b69f3a9e5a',NULL,'adesao'),
 ('12ad48a4-0012-43e6-a157-99fb8c6b8b1a','2022-02-15 10:06:56.905367-03','2022-02-15 10:06:56.905367-03',NULL,10.0,'362ff7e3-eb30-41e1-aa1f-95805f89ace7',NULL,'adesao'),
 ('bf56c787-2c3c-41f2-9f43-59e0bbe154cc','2022-02-15 10:07:05.982663-03','2022-02-15 10:07:05.982663-03',NULL,10.0,'bb90a93f-93b7-4494-b6dd-c733c3e06a8d',NULL,'adesao'),
 ('3af5803c-23e5-42cf-a92a-614fd92010e3','2022-02-15 10:07:13.036157-03','2022-02-15 10:07:13.036157-03',NULL,10.0,'0619855b-ed4d-453e-9505-a8b108e1755b',NULL,'adesao'),
 ('1e9c680b-03e9-4cba-a6ed-6fdc5b21e940','2022-02-15 10:07:49.694626-03','2022-02-15 10:07:49.694626-03',NULL,50.0,'12908b5d-cfce-4420-87a4-e3b69f3a9e5a','mensal','recorrencia'),
 ('fde418ad-4921-4637-b026-be52906a283a','2022-02-15 10:08:07.158765-03','2022-02-15 10:08:07.158765-03',NULL,5.0,'362ff7e3-eb30-41e1-aa1f-95805f89ace7','mensal','recorrencia'),
 ('7fa2d9ab-dbed-4ad2-9b0e-be6dafc2dd65','2022-02-15 10:08:18.107493-03','2022-02-15 10:08:18.107493-03',NULL,5.0,'12908b5d-cfce-4420-87a4-e3b69f3a9e5a','mensal','recorrencia'),
 ('4a7e435b-0822-4ad2-91ce-064fac205dfd','2022-02-15 10:08:32.276237-03','2022-02-15 10:08:32.276237-03',NULL,5.0,'bb90a93f-93b7-4494-b6dd-c733c3e06a8d','mensal','recorrencia'),
 ('9668ca67-e58a-445d-bca9-6b9c395e1ba3','2022-02-15 10:08:37.843633-03','2022-02-15 10:08:37.843633-03',NULL,5.0,'0619855b-ed4d-453e-9505-a8b108e1755b','mensal','recorrencia');
INSERT INTO comercial."PrestadoresDeServicos_Servicos" ("Id",created_at,updated_at,deleted_at,"Servico_Id","Prestador_Id") VALUES
 ('ff87beaf-060d-4caa-a5a8-7cb3a6a27900','2022-02-15 10:01:42.543877-03','2022-02-15 10:01:42.543877-03',NULL,'76d24e5a-a46a-43b3-9faf-63582ae4a43b','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('5d9db9c9-278f-47ab-8b9f-b9fb22c092ad','2022-02-15 10:01:43.347268-03','2022-02-15 10:01:43.347268-03',NULL,'4b05b879-3201-43a7-b7ed-7e764c9d5907','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('5a0bdc50-6920-4929-a6b7-352c51d56865','2022-02-15 10:01:44.097077-03','2022-02-15 10:01:44.097077-03',NULL,'2d638cd6-2e65-487a-bc90-0bddafd458eb','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('c1c1590d-3540-457d-b9f5-0fbcc2a5bda0','2022-02-15 10:01:44.593631-03','2022-02-15 10:01:44.593631-03',NULL,'63661515-d999-4d6e-a9e9-451552d3f2d7','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('b4bb47a9-5a4f-42aa-86d5-54785f7c3344','2022-02-15 10:01:45.031206-03','2022-02-15 10:01:45.031206-03',NULL,'6b49af23-6e9d-4f74-832e-7b7966573d59','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('229b1f7d-4d82-41dd-8b3f-bb11f30ba321','2022-02-15 10:01:45.487292-03','2022-02-15 10:01:45.487292-03',NULL,'a9db34c8-4fe7-4ec1-a75e-eaea0d143034','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('20febd4f-a53f-4a86-9e64-74e703e57b85','2022-02-15 10:01:45.978875-03','2022-02-15 10:01:45.978875-03',NULL,'6cad8947-85d8-4cbe-b262-b5cecf08879e','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('c10a3c36-1461-4eb1-a87c-b7ba7ef5969d','2022-02-15 10:01:46.9591-03','2022-02-15 10:01:46.9591-03',NULL,'4843ca4a-e824-4207-83a1-43b91937abc7','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('9bd9ee74-2a56-40da-a797-8d809d8fa5df','2022-02-15 10:01:47.438245-03','2022-02-15 10:01:47.438245-03',NULL,'bc1d7e55-cefb-47c7-90c0-f3665ba91325','6fde7f19-6697-4076-befc-b9b73f03b3f5'),
 ('02d586da-5ef4-4593-a776-6f32054e4499','2022-02-15 10:01:48.29243-03','2022-02-15 10:01:48.29243-03',NULL,'55fdb1d3-4548-41f0-985f-6cbe52f6ea42','6fde7f19-6697-4076-befc-b9b73f03b3f5');
INSERT INTO comercial."PrestadoresDeServicos_Servicos_Precos" ("Id",created_at,updated_at,deleted_at,"Valor","Fornecedor_Servico_Id","TipoDeRecorrencia_Id","TipoDePreco_Id") VALUES
 ('022e29d5-bcef-44c3-950f-ead623a7c7b9','2022-02-15 10:02:44.686215-03','2022-02-15 10:02:44.686215-03',NULL,5.0,'ff87beaf-060d-4caa-a5a8-7cb3a6a27900','mensal','recorrencia'),
 ('73e4a412-90f8-42d5-8e24-b84b6d915e68','2022-02-15 10:02:52.834812-03','2022-02-15 10:02:52.834812-03',NULL,5.0,'5d9db9c9-278f-47ab-8b9f-b9fb22c092ad','mensal','recorrencia'),
 ('a6312b34-735a-4b1a-a9e8-0fbd84b58364','2022-02-15 10:03:00.860991-03','2022-02-15 10:03:00.860991-03',NULL,5.0,'5a0bdc50-6920-4929-a6b7-352c51d56865','mensal','recorrencia'),
 ('06dd50e8-2835-45e5-b2b2-2c4e01097631','2022-02-15 10:03:08.573976-03','2022-02-15 10:03:08.573976-03',NULL,5.0,'c1c1590d-3540-457d-b9f5-0fbcc2a5bda0','mensal','recorrencia'),
 ('3f3366f6-bac3-4e12-b270-3aba198d8706','2022-02-15 10:03:17.006034-03','2022-02-15 10:03:17.006034-03',NULL,5.0,'b4bb47a9-5a4f-42aa-86d5-54785f7c3344','mensal','recorrencia'),
 ('4a8c7f88-2a5d-4e04-a2c8-fb180d1c712d','2022-02-15 10:03:30.789822-03','2022-02-15 10:03:30.789822-03',NULL,5.0,'229b1f7d-4d82-41dd-8b3f-bb11f30ba321','mensal','recorrencia'),
 ('148c2fef-5820-4a02-975f-e6262b875a9c','2022-02-15 10:03:40.562844-03','2022-02-15 10:03:40.562844-03',NULL,5.0,'20febd4f-a53f-4a86-9e64-74e703e57b85','mensal','recorrencia'),
 ('35e55585-325a-4e8e-a7a3-921246e0dbc6','2022-02-15 10:03:51.546062-03','2022-02-15 10:03:51.546062-03',NULL,5.0,'c10a3c36-1461-4eb1-a87c-b7ba7ef5969d','mensal','recorrencia'),
 ('4a01da5d-1a87-4d27-a890-d7eca64d285c','2022-02-15 10:04:00.808415-03','2022-02-15 10:04:00.808415-03',NULL,100.0,'9bd9ee74-2a56-40da-a797-8d809d8fa5df',NULL,'adesao'),
 ('bac6bd84-5cae-4476-8317-2f6ddd242cf7','2022-02-15 10:04:07.715963-03','2022-02-15 10:04:07.715963-03',NULL,100.0,'02d586da-5ef4-4593-a776-6f32054e4499',NULL,'adesao');
INSERT INTO comercial."PrestadoresDeServicos_Servicos_Precos" ("Id",created_at,updated_at,deleted_at,"Valor","Fornecedor_Servico_Id","TipoDeRecorrencia_Id","TipoDePreco_Id") VALUES
 ('97e7df13-2949-454b-82c2-6eacc8f04af2','2022-02-15 10:04:36.521337-03','2022-02-15 10:04:36.521337-03',NULL,1.0,'ff87beaf-060d-4caa-a5a8-7cb3a6a27900',NULL,'adesao'),
 ('c8654f8a-dd7b-49b8-ab79-38e9303db103','2022-02-15 10:04:41.185945-03','2022-02-15 10:04:41.185945-03',NULL,1.0,'5d9db9c9-278f-47ab-8b9f-b9fb22c092ad',NULL,'adesao'),
 ('fb3c1373-b6a7-40a1-8f1c-6ba3f77fa3a1','2022-02-15 10:04:46.892307-03','2022-02-15 10:04:46.892307-03',NULL,1.0,'5a0bdc50-6920-4929-a6b7-352c51d56865',NULL,'adesao'),
 ('da0d67ad-b75d-4af2-9eb4-7a5495bcb8ba','2022-02-15 10:04:51.41077-03','2022-02-15 10:04:51.41077-03',NULL,1.0,'c1c1590d-3540-457d-b9f5-0fbcc2a5bda0',NULL,'adesao'),
 ('731ef3a9-2333-4029-9d61-15bd187ddd25','2022-02-15 10:04:57.604875-03','2022-02-15 10:04:57.604875-03',NULL,1.0,'b4bb47a9-5a4f-42aa-86d5-54785f7c3344',NULL,'adesao'),
 ('ee36a0f3-d8c4-49c2-b12c-e09c19b0e604','2022-02-15 10:05:28.44717-03','2022-02-15 10:05:28.44717-03',NULL,1.0,'229b1f7d-4d82-41dd-8b3f-bb11f30ba321',NULL,'adesao'),
 ('d9f5120a-1a23-427d-a038-fdd917bb4084','2022-02-15 10:05:37.972251-03','2022-02-15 10:05:37.972251-03',NULL,1.0,'20febd4f-a53f-4a86-9e64-74e703e57b85',NULL,'adesao'),
 ('976787ea-54e0-4365-bf7b-6742a5ccb5be','2022-02-15 10:05:43.776493-03','2022-02-15 10:05:43.776493-03',NULL,1.0,'c10a3c36-1461-4eb1-a87c-b7ba7ef5969d',NULL,'adesao');
 INSERT INTO comercial."Planos" ("Id",created_at,updated_at,deleted_at,"Nome") VALUES
 ('6d57c587-d45c-4625-be64-e4cbf57113db','2022-02-15 10:35:38.854701-03','2022-02-15 10:36:54.911879-03',NULL,'Go Classic'),
 ('1b2b5935-f4de-4321-a2ed-710a36a7ce30','2022-02-15 10:38:44.43236-03','2022-02-15 10:40:23.39875-03',NULL,'Go Premium');
INSERT INTO comercial."Planos_Precos" ("Id",created_at,updated_at,deleted_at,"Plano_Id","ValorDeRecorrencia","ValorDeAdesao") VALUES
 ('b89db09e-0ebf-4477-abec-8a6cf83c92e8','2022-02-15 10:36:00.706587-03','2022-02-15 10:36:00.706587-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db',69.97,150.0),
 ('7e098b14-098a-4138-a14a-77bb54905a0c','2022-02-15 10:36:54.93831-03','2022-02-15 10:36:54.93831-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db',69.97,150.0),
 ('d2a2c3f3-3d86-49bc-b1ba-cb9b5195a8f2','2022-02-15 10:40:23.427715-03','2022-02-15 10:40:23.427715-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30',79.97,150.0);
INSERT INTO comercial."Planos_Produtos" ("Id",created_at,updated_at,deleted_at,"Plano_Id","Produto_Id") VALUES
 ('af9e8abb-db45-472c-98dd-21aac5d8cebd','2022-02-15 10:38:09.560146-03','2022-02-15 10:38:09.560146-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','5369bdd6-ed1d-4038-9d46-937e04312833'),
 ('f03bfd03-eff6-49cd-b873-6649b1ded0b3','2022-02-15 10:39:35.733194-03','2022-02-15 10:39:35.733194-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','5369bdd6-ed1d-4038-9d46-937e04312833');
INSERT INTO comercial."Planos_Servicos" ("Id",created_at,updated_at,deleted_at,"Plano_Id","Servico_Id") VALUES
 ('03b295b5-656a-4f5c-9754-f2003051eb7e','2022-02-15 10:36:33.388914-03','2022-02-15 10:36:33.388914-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','4843ca4a-e824-4207-83a1-43b91937abc7'),
 ('e84080c8-24ab-4de7-9752-804bcd7db553','2022-02-15 10:36:41.155228-03','2022-02-15 10:36:41.155228-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','4b05b879-3201-43a7-b7ed-7e764c9d5907'),
 ('5fd1bbf7-e8d8-4669-a520-859884984211','2022-02-15 10:36:53.145662-03','2022-02-15 10:36:53.145662-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','2d638cd6-2e65-487a-bc90-0bddafd458eb'),
 ('01943d48-9342-4f89-9cde-c36dd55e54be','2022-02-15 10:37:14.293929-03','2022-02-15 10:37:14.293929-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','76d24e5a-a46a-43b3-9faf-63582ae4a43b'),
 ('018b7496-fb1a-4c0d-8288-2b820db21547','2022-02-15 10:38:09.604865-03','2022-02-15 10:38:09.604865-03',NULL,'6d57c587-d45c-4625-be64-e4cbf57113db','55fdb1d3-4548-41f0-985f-6cbe52f6ea42'),
 ('15016679-4b31-4947-845f-ab4b1e2f01a8','2022-02-15 10:39:11.430175-03','2022-02-15 10:39:11.430175-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','4843ca4a-e824-4207-83a1-43b91937abc7'),
 ('64eb9d03-27b1-49ef-b68c-3ba873083dfd','2022-02-15 10:39:19.246566-03','2022-02-15 10:39:19.246566-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','4b05b879-3201-43a7-b7ed-7e764c9d5907'),
 ('939f33a5-a076-431e-bdf2-1625623fda42','2022-02-15 10:39:24.192834-03','2022-02-15 10:39:24.192834-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','2d638cd6-2e65-487a-bc90-0bddafd458eb'),
 ('17d9305a-4943-485d-8213-361fc0fffa28','2022-02-15 10:39:29.623707-03','2022-02-15 10:39:29.623707-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','76d24e5a-a46a-43b3-9faf-63582ae4a43b'),
 ('2105cfc0-02aa-4c00-97cb-843c5a12fa18','2022-02-15 10:39:35.753008-03','2022-02-15 10:39:35.753008-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','55fdb1d3-4548-41f0-985f-6cbe52f6ea42');
INSERT INTO comercial."Planos_Servicos" ("Id",created_at,updated_at,deleted_at,"Plano_Id","Servico_Id") VALUES
 ('41f10b70-e7e3-411b-a1f1-e1c70b90fcc4','2022-02-15 10:39:41.004325-03','2022-02-15 10:39:41.004325-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','63661515-d999-4d6e-a9e9-451552d3f2d7'),
 ('45e20ce1-9912-4942-adb3-9d5a5845a07a','2022-02-15 10:39:45.592894-03','2022-02-15 10:39:45.592894-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','6b49af23-6e9d-4f74-832e-7b7966573d59'),
 ('479a4aac-d517-4ec9-ba0c-9bdc1bf190d6','2022-02-15 10:39:59.830996-03','2022-02-15 10:39:59.830996-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','a9db34c8-4fe7-4ec1-a75e-eaea0d143034'),
 ('87d33882-560a-4897-a137-79f456d4892b','2022-02-15 10:40:10.558956-03','2022-02-15 10:40:10.558956-03',NULL,'1b2b5935-f4de-4321-a2ed-710a36a7ce30','6cad8947-85d8-4cbe-b262-b5cecf08879e');
