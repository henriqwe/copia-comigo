INSERT INTO estoque."TiposDeEnderecamentos" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao","Slug") VALUES
	 ('a2752b8a-c3be-4e5f-930f-cfe2ab0ee99e','2022-02-11 16:05:09.767879-03','2022-02-11 16:05:09.767879-03',NULL,'Caixa','Caixa','caixa'),
	 ('29ae6814-5302-448e-a046-80be157a9b9f','2022-02-11 16:05:17.709301-03','2022-02-11 16:05:17.709301-03',NULL,'Gaveta','Gaveta','gaveta');
INSERT INTO estoque."Enderecamentos" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao","Pai_Id","Tipo_Id") VALUES
	 ('5367c097-31e4-48d2-807c-b3a8bfa3a89a','2022-02-11 16:05:37.642844-03','2022-02-11 16:05:37.642844-03',NULL,'gaveta2','GV001',NULL,'29ae6814-5302-448e-a046-80be157a9b9f'),
	 ('c7ca5d51-0882-42e4-957b-2c9f42aaa611','2022-02-11 16:06:09.39357-03','2022-02-11 16:06:09.39357-03',NULL,'caixa1','CX001',NULL,'a2752b8a-c3be-4e5f-930f-cfe2ab0ee99e');
INSERT INTO estoque."Grupos" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao") VALUES
	 ('36863bea-1375-4280-952b-37aaa1a8dbae','2022-02-11 16:03:11.725129-03','2022-02-11 16:03:11.725129-03',NULL,'Almoxarifado','Almoxarifado'),
	 ('3e0f8bd0-5963-4410-9736-d0a19dac215c','2022-02-11 16:03:11.725129-03','2022-02-11 16:03:11.725129-03',NULL,'Produção','Produção');
INSERT INTO estoque."Familias" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao","Pai_Id") VALUES
	 ('138a9e2b-346d-4b69-9217-66a1362dcde9','2022-02-11 16:03:48.983121-03','2022-02-14 08:37:36.793744-03',NULL,'Equipamentos','Equipamentos',NULL),
	 ('783eb2b1-bab2-463d-86f4-51925af2aa0e','2022-02-11 16:04:07.440434-03','2022-02-11 16:04:07.440434-03',NULL,'GRPS','GPRS','138a9e2b-346d-4b69-9217-66a1362dcde9'),
	 ('bad625f2-b160-4d4c-8f8b-305ad2446627','2022-02-11 16:04:30.230884-03','2022-02-11 16:04:30.230884-03',NULL,'Satelital','Satelital','138a9e2b-346d-4b69-9217-66a1362dcde9'),
	 ('7b7a27d3-3c41-4c23-a9ea-afe5dae43171','2022-02-11 16:09:38.791562-03','2022-02-11 16:09:38.791562-03',NULL,'Chips de celular','GPRS',NULL),
	 ('f902c4b5-90a3-44c4-9c69-9463b54a686c','2022-02-11 16:09:48.446226-03','2022-02-11 16:09:48.446226-03',NULL,'GPRS','GPRS','7b7a27d3-3c41-4c23-a9ea-afe5dae43171'),
	 ('b1479457-9c40-4cb0-b5d3-80a7fd2daf47','2022-02-11 16:10:00.986556-03','2022-02-11 16:10:00.986556-03',NULL,'4G','4G','7b7a27d3-3c41-4c23-a9ea-afe5dae43171'),
	 ('048f4217-7417-4b9f-a527-5b56d150ff66','2022-02-14 08:29:57.497275-03','2022-02-14 08:29:57.497275-03',NULL,'Kits de Produção','Kits de Produção',NULL),
	 ('31da587e-2a8e-435b-99a6-e32084fdba6e','2022-02-14 08:30:08.512927-03','2022-02-14 08:30:08.512927-03',NULL,'Kits de instalação','Kits de instalação','048f4217-7417-4b9f-a527-5b56d150ff66'),
	 ('c6260af4-6c2f-4322-9f08-5c0ddc363831','2022-02-14 08:30:20.089542-03','2022-02-14 08:30:20.089542-03',NULL,'Kits de insumos','Kits de insumos','048f4217-7417-4b9f-a527-5b56d150ff66'),
	 ('5c64bab0-6f6c-418d-baec-f0c3191bc46a','2022-02-14 08:42:18.897841-03','2022-02-14 08:42:18.897841-03',NULL,'Rastreadores','Rastreadores',NULL),
	 ('012a3c75-6af8-45a7-b014-66de544b7116','2022-02-14 08:42:31.175418-03','2022-02-14 08:42:31.175418-03',NULL,'GPRS','GPRS','5c64bab0-6f6c-418d-baec-f0c3191bc46a'),
	 ('e24a6b48-bc16-4759-aaac-4589d36b441b','2022-02-14 08:42:52.476561-03','2022-02-14 08:42:52.476561-03',NULL,'Satelital','Satelital','5c64bab0-6f6c-418d-baec-f0c3191bc46a'),
	 ('62add7ba-4c46-43c3-bc63-b01b712a7cd1','2022-02-15 10:13:23.535045-03','2022-02-15 10:13:23.535045-03',NULL,'Diversos','Diversos',NULL);
INSERT INTO "public"."Produtos" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao","UnidadeDeMedida_Id","Utilizacao","NCM") VALUES
	 ('0a84dc30-b012-4573-9746-a25f554e35e2','2022-02-11 16:07:33.498109-03','2022-02-11 16:07:33.498109-03',NULL,'Equipamento Satelital',NULL,'unidade','rastreamento',564723234),
	 ('690789a5-2308-4de2-beea-88d2532ede54','2022-02-11 16:07:09.94874-03','2022-02-11 16:07:50.12039-03',NULL,'Equipamento GPRS',NULL,'unidade','rastreamento',2345345),
	 ('d37b349c-f8bd-4306-bf8f-bb863d8bb26d','2022-02-11 16:11:17.606259-03','2022-02-11 16:11:17.606259-03',NULL,'Chip de celular',NULL,'unidade','transferência de dados',1464355),
	 ('77901d2b-e60c-4bf8-8ffc-ed239fb9fab5','2022-02-14 08:27:43.135616-03','2022-02-14 08:27:43.135616-03',NULL,'Kit de instalação',NULL,'unidade','instalação de rastreadores',321321),
	 ('520a6cf8-687b-492b-8b77-0f07407f376e','2022-02-14 08:28:08.689412-03','2022-02-14 08:28:08.689412-03',NULL,'Kit de insumos',NULL,'unidade','insumos para kits de produção',541225),
	 ('91e8d05c-1c45-477d-8545-c2ff14324de1','2022-02-14 08:39:05.149064-03','2022-02-14 08:39:05.149064-03',NULL,'Rastreador satelital',NULL,'unidade','Rastreador satelital',12475978),
	 ('35745434-de26-44e4-9aec-0135a6798921','2022-02-14 08:39:45.875593-03','2022-02-14 08:39:45.875593-03',NULL,'Rastreador GPRS',NULL,'unidade','Rastreador GPRS',14767235),
	 ('1d1b9d29-90da-47f3-8fb5-80b6cc63a956','2022-02-14 08:39:45.875593-03','2022-02-14 08:39:45.875593-03',NULL,'Chicote OBD',NULL,'unidade','Chicote OBD',25543245),
	 ('8dc1e271-84c4-4067-a66b-f0ebb344f02e','2022-02-14 08:39:45.875593-03','2022-02-14 08:39:45.875593-03',NULL,'Relé auxiliar',NULL,'unidade','Rastreador GPRS',2345254),
	 ('792b92a0-9c71-4a17-8205-3843dbc5cb36','2022-02-14 08:39:45.875593-03','2022-02-14 08:39:45.875593-03',NULL,'Adesivos personalizados',NULL,'unidade','Rastreador GPRS',7765456),
	 ('da814c20-b29f-48c1-a16c-4d88e32bdcdc','2022-02-15 10:11:44.617615-03','2022-02-15 10:11:44.617615-03',NULL,'Sensor de porta',NULL,'unidade','Monitorar abertura e fechamento de portas',354745),
	 ('8dbc1134-7f81-4cd2-aae0-a5984da7358e','2022-02-15 10:12:06.422896-03','2022-02-15 10:12:06.422896-03',NULL,'Rede de proteção',NULL,'unidade','Segurança de mercadoria',135784890);
INSERT INTO estoque."Fabricantes" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao") VALUES
	 ('a470f238-7a4a-4518-bb89-1e9bfd1f3099','2022-02-11 16:04:43.102434-03','2022-02-11 16:04:43.102434-03',NULL,'Suntech','Suntech'),
	 ('e0d28213-418c-49bf-b966-2a6beef6f43f','2022-02-11 16:04:55.261818-03','2022-02-11 16:04:55.261818-03',NULL,'Teltonica','Teltonica'),
	 ('b4aacc8c-4da4-41b7-a345-fe50beeb8410','2022-02-11 16:11:38.98606-03','2022-02-11 16:11:38.98606-03',NULL,'Claro','Claro'),
	 ('57679e28-cfc4-4dbb-9689-38d15efc37a6','2022-02-14 08:29:00.908109-03','2022-02-14 08:29:00.908109-03',NULL,'Grupo Comigo','Grupo Comigo');
INSERT INTO estoque."Modelos" ("Id",created_at,updated_at,deleted_at,"Nome","Descricao","Produto_Id","Fabricante_Id") VALUES
	 ('feb4b05e-5340-4007-b7cc-29868ec45fa0','2022-02-11 16:08:26.1248-03','2022-02-11 16:08:26.1248-03',NULL,'ST350','ST350','690789a5-2308-4de2-beea-88d2532ede54','a470f238-7a4a-4518-bb89-1e9bfd1f3099'),
	 ('3d6641ff-eb46-4ab9-aea1-e4661d2e4135','2022-02-11 16:08:43.419165-03','2022-02-11 16:08:43.419165-03',NULL,'T920','T920','0a84dc30-b012-4573-9746-a25f554e35e2','e0d28213-418c-49bf-b966-2a6beef6f43f'),
	 ('dc475928-17be-4fbf-aeb8-f3ea63369a27','2022-02-11 16:11:56.013272-03','2022-02-11 16:11:56.013272-03',NULL,'GPRS','GPRS','d37b349c-f8bd-4306-bf8f-bb863d8bb26d','b4aacc8c-4da4-41b7-a345-fe50beeb8410'),
	 ('61bc5344-7dc9-4fae-b167-fd447ae70994','2022-02-14 08:29:43.02928-03','2022-02-14 08:29:43.02928-03',NULL,'Básico','Bássico','520a6cf8-687b-492b-8b77-0f07407f376e','57679e28-cfc4-4dbb-9689-38d15efc37a6'),
	 ('fbf8c416-0c3e-46d9-b801-b8b5806d32b7','2022-02-14 08:31:42.343278-03','2022-02-14 08:31:42.343278-03',NULL,'Básico','Básico','77901d2b-e60c-4bf8-8ffc-ed239fb9fab5','57679e28-cfc4-4dbb-9689-38d15efc37a6'),
	 ('d51b68ae-e064-49ed-b090-5c767019650b','2022-02-14 08:42:01.371905-03','2022-02-14 08:42:01.371905-03',NULL,'GG1000','GG1000','35745434-de26-44e4-9aec-0135a6798921','57679e28-cfc4-4dbb-9689-38d15efc37a6'),
	 ('4a6d01d9-cbef-4cc5-b0a8-687728509942','2022-02-14 08:43:21.391062-03','2022-02-14 08:43:21.391062-03',NULL,'GG2000','GG2000','91e8d05c-1c45-477d-8545-c2ff14324de1','57679e28-cfc4-4dbb-9689-38d15efc37a6'),
	 ('302af023-e778-407e-8877-17a40a5eb308','2022-02-15 10:13:07.779289-03','2022-02-15 10:13:07.779289-03',NULL,'Padrão','Genérica','8dbc1134-7f81-4cd2-aae0-a5984da7358e','57679e28-cfc4-4dbb-9689-38d15efc37a6'),
	 ('c3246d1e-3a45-4846-a2b2-bbc6307b998e','2022-02-15 10:14:50.980087-03','2022-02-15 10:14:50.980087-03',NULL,'Básico','Genérico','da814c20-b29f-48c1-a16c-4d88e32bdcdc','57679e28-cfc4-4dbb-9689-38d15efc37a6');
INSERT INTO estoque."Itens" ("Id",created_at,updated_at,deleted_at,"Classificacao","Criticidade","Grupo_Id","Familia_Id","Fabricante_Id","Enderecamento_Id","EstoqueMinimo","Produto_Id","Modelo_Id") VALUES
	 ('d8faa6ff-5899-4b3d-a919-3d2cfa779700','2022-02-11 16:12:10.337561-03','2022-02-11 16:12:10.337561-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','f902c4b5-90a3-44c4-9c69-9463b54a686c','b4aacc8c-4da4-41b7-a345-fe50beeb8410','c7ca5d51-0882-42e4-957b-2c9f42aaa611',15,'d37b349c-f8bd-4306-bf8f-bb863d8bb26d','dc475928-17be-4fbf-aeb8-f3ea63369a27'),
	 ('1b2b23d2-071a-4ce0-8b08-adb317a9aab7','2022-02-11 16:12:26.424808-03','2022-02-11 16:12:26.424808-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','bad625f2-b160-4d4c-8f8b-305ad2446627','e0d28213-418c-49bf-b966-2a6beef6f43f','c7ca5d51-0882-42e4-957b-2c9f42aaa611',12,'0a84dc30-b012-4573-9746-a25f554e35e2','3d6641ff-eb46-4ab9-aea1-e4661d2e4135'),
	 ('79314596-006a-4729-a6ac-64c6fc984c4c','2022-02-11 16:13:16.491582-03','2022-02-11 16:13:16.491582-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','783eb2b1-bab2-463d-86f4-51925af2aa0e','a470f238-7a4a-4518-bb89-1e9bfd1f3099','5367c097-31e4-48d2-807c-b3a8bfa3a89a',12,'690789a5-2308-4de2-beea-88d2532ede54','feb4b05e-5340-4007-b7cc-29868ec45fa0'),
	 ('6c07ddec-7bc4-4a04-baa2-3831034c6444','2022-02-14 08:30:34.007985-03','2022-02-14 08:30:34.007985-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','c6260af4-6c2f-4322-9f08-5c0ddc363831','57679e28-cfc4-4dbb-9689-38d15efc37a6','c7ca5d51-0882-42e4-957b-2c9f42aaa611',12,'520a6cf8-687b-492b-8b77-0f07407f376e','61bc5344-7dc9-4fae-b167-fd447ae70994'),
	 ('c11d61f6-e8ed-4343-9251-680dee21728f','2022-02-14 08:32:01.958267-03','2022-02-14 08:32:01.958267-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','31da587e-2a8e-435b-99a6-e32084fdba6e','57679e28-cfc4-4dbb-9689-38d15efc37a6','5367c097-31e4-48d2-807c-b3a8bfa3a89a',12,'77901d2b-e60c-4bf8-8ffc-ed239fb9fab5','fbf8c416-0c3e-46d9-b801-b8b5806d32b7'),
	 ('89eae6ff-b182-4618-92ec-05fefeda3fbf','2022-02-14 08:43:01.602529-03','2022-02-14 08:43:01.602529-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','012a3c75-6af8-45a7-b014-66de544b7116','57679e28-cfc4-4dbb-9689-38d15efc37a6','5367c097-31e4-48d2-807c-b3a8bfa3a89a',12,'35745434-de26-44e4-9aec-0135a6798921','d51b68ae-e064-49ed-b090-5c767019650b'),
	 ('9b0d32e7-f792-4a94-bb52-bd60d45ca5be','2022-02-14 08:44:22.478218-03','2022-02-14 08:44:22.478218-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','e24a6b48-bc16-4759-aaac-4589d36b441b','57679e28-cfc4-4dbb-9689-38d15efc37a6','5367c097-31e4-48d2-807c-b3a8bfa3a89a',12,'91e8d05c-1c45-477d-8545-c2ff14324de1','4a6d01d9-cbef-4cc5-b0a8-687728509942'),
	 ('7931bd08-54f0-4f1e-a4b7-df90ea66dd4c','2022-02-15 10:14:32.384153-03','2022-02-15 10:14:32.384153-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','62add7ba-4c46-43c3-bc63-b01b712a7cd1','57679e28-cfc4-4dbb-9689-38d15efc37a6','c7ca5d51-0882-42e4-957b-2c9f42aaa611',12,'8dbc1134-7f81-4cd2-aae0-a5984da7358e','302af023-e778-407e-8877-17a40a5eb308'),
	 ('ff6dbd4c-8284-46a0-a4db-efa490d7a8e2','2022-02-15 10:15:00.608702-03','2022-02-15 10:15:00.608702-03',NULL,'c','z','36863bea-1375-4280-952b-37aaa1a8dbae','62add7ba-4c46-43c3-bc63-b01b712a7cd1','57679e28-cfc4-4dbb-9689-38d15efc37a6','c7ca5d51-0882-42e4-957b-2c9f42aaa611',12,'da814c20-b29f-48c1-a16c-4d88e32bdcdc','c3246d1e-3a45-4846-a2b2-bbc6307b998e');
--INSERT INTO "public"."Configuracoes" ("Id",created_at,updated_at,deleted_at,"Nome","Slug","Valor") VALUES
--	 ('3905c8a1-e8b5-4555-964b-c04371f5914b','2021-10-25 15:36:27.29513-03','2022-02-15 09:57:48.551776-03',NULL,'Família para chips','familiaChips','["7b7a27d3-3c41-4c23-a9ea-afe5dae43171", "Chips de celular"]'),
--	 ('69e85641-4016-4fa7-8579-254eee380f64','2021-10-25 15:37:11.624339-03','2022-02-15 09:57:48.575212-03',NULL,'Família para equipamentos','familiaEquipamentos','["138a9e2b-346d-4b69-9217-66a1362dcde9", "Equipamentos"]'),
--	 ('60bb5be4-9eae-447a-ad9d-a50ccc9727bf','2021-10-25 15:38:28.688537-03','2022-02-15 09:57:48.589106-03',NULL,'Familia para rastreadores','familiaRastreadores','["5c64bab0-6f6c-418d-baec-f0c3191bc46a", "Rastreadores"]'),
--	 ('8ec2c94e-d27d-4087-8012-65081064a9a9','2021-10-25 15:39:05.230668-03','2022-02-15 09:57:48.603269-03',NULL,'Familia para kits de insumo','familiaKitsDeInsumo','["c6260af4-6c2f-4322-9f08-5c0ddc363831", "Kits de insumos"]'),
--	 ('2a5e1360-1e46-49c2-b96e-ae523120bbfa','2021-10-25 15:39:36.184734-03','2022-02-15 09:57:48.619905-03',NULL,'Familia para kits de instalação','familiaKitsDeInstalacao','["048f4217-7417-4b9f-a527-5b56d150ff66", "Kits de Produção"]'),
--	 ('3a0afe3f-8f23-4d03-9388-32e6b28967d6','2022-01-07 08:28:39.551142-03','2022-02-15 09:57:48.635169-03',NULL,'Prestador de serviço para os preços','prestadorPrecos','["6fde7f19-6697-4076-befc-b9b73f03b3f5", "RN Rastreamento"]');
