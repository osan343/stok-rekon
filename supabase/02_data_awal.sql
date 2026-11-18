-- Data awal dari Stok_Rekon.xlsx. Jalankan SEKALI setelah 01_schema.sql.
begin;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (1,'3955S','Walnut','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (2,'3955S','Walnut','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (3,'3955S','Walnut','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (4,'3955S','Walnut','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (5,'292C','Walnut','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (6,'292C','Walnut','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (7,'292C','Walnut','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (8,'292C','Walnut','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (9,'026S','White Oak','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (10,'026S','White Oak','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (11,'026S','White Oak','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (12,'026S','White Oak','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (13,'026C','White Oak','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (14,'026C','White Oak','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (15,'026C','White Oak','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (16,'026C','White Oak','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (17,'A28S','White Oak','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (18,'A28S','White Oak','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (19,'A28S','White Oak','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (20,'A28S','White Oak','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (21,'305Q','Jati','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (22,'305Q','Jati','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (23,'305Q','Jati','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (24,'305Q','Jati','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (25,'5591S','White Ash','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (26,'5593C','White Ash','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (27,'293N','Walnut','Semi',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (28,'06N','White Oak','Semi',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (29,null,'Oak','Burl',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (30,'806C','Rosewood','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (31,'806S','Rosewood','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (32,'2088S','Ebony','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (33,'5C','Walnut','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (34,'5C','Walnut','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (35,'5C','Walnut','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (36,'5C','Walnut','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (37,'700S','White Oak','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (38,'700S','White Oak','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (39,'700S','White Oak','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (40,'700S','White Oak','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (41,'700C','White Oak','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (42,'700C','White Oak','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (43,'700C','White Oak','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (44,'700C','White Oak','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (45,'018S','Jati','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (46,'018S','Jati','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (47,'018S','Jati','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (48,'018S','Jati','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (49,'018C','Jati','Kembang',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (50,'018C','Jati','Kembang',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (51,'018C','Jati','Kembang',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (52,'018C','Jati','Kembang',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (53,'8S','Oak','Washed',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (54,'Dragon','Dragon','Kotak',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (55,'Bamboo Net','Bamboo Net','Kotak',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (56,'2872S','Ebony','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (57,'324S','Walnut','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (58,'5S','Walnut','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (59,'5S','Walnut','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (60,'5S','Walnut','Lurus',310,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (61,'5S','Walnut','Lurus',310,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (62,'A28S','Oak','Sawtooth',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (63,'Silver Tipis','Oak','Lurus',250,'Y') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (64,'Silver','Oak','Lurus',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (65,'Silver','Oak','Sawtooth',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (66,'Light','Mappa','Burl',250,'N') on conflict (sku) do nothing;
insert into public.products (sku,kode,jenis,urat,panjang,kain) values (67,'4230','Marble','Grey brown',250,'N') on conflict (sku) do nothing;
insert into public.transactions (tipe,tanggal,keterangan,sku,qty,catatan,created_by) values
('masuk','2026-09-14','Pembelian',3,336,'Impor Excel (Pembelian baris 4)',null),
('masuk','2026-09-14','Pembelian',61,491,'Impor Excel (Pembelian baris 5)',null),
('masuk','2026-09-14','Pembelian',11,618,'Impor Excel (Pembelian baris 6)',null),
('masuk','2026-09-14','Pembelian',7,840,'Impor Excel (Pembelian baris 7)',null),
('masuk','2026-09-14','Pembelian',36,410,'Impor Excel (Pembelian baris 8)',null),
('masuk','2026-09-14','Pembelian',24,1258,'Impor Excel (Pembelian baris 9)',null),
('masuk','2026-09-16','Pembelian',44,257,'Impor Excel (Pembelian baris 10)',null),
('masuk','2026-09-16','Pembelian',16,488,'Impor Excel (Pembelian baris 11)',null),
('masuk','2026-09-16','Pembelian',44,360,'Impor Excel (Pembelian baris 12)',null),
('masuk','2026-09-16','Pembelian',51,1021,'Impor Excel (Pembelian baris 13)',null),
('masuk','2026-09-17','Pembelian',62,101,'Impor Excel (Pembelian baris 14)',null),
('masuk','2026-09-17','Pembelian',38,83,'Impor Excel (Pembelian baris 15)',null),
('masuk','2026-09-17','Pembelian',13,781,'Impor Excel (Pembelian baris 16)',null),
('masuk','2026-09-17','Pembelian',42,619,'Impor Excel (Pembelian baris 17)',null),
('masuk','2026-09-17','Pembelian',62,195,'Impor Excel (Pembelian baris 18)',null),
('masuk','2026-09-17','Pembelian',63,466,'Impor Excel (Pembelian baris 19)',null),
('masuk','2026-09-17','Pembelian',21,286,'Impor Excel (Pembelian baris 20)',null),
('masuk','2026-09-17','Pembelian',3,1200,'Impor Excel (Pembelian baris 21)',null),
('masuk','2026-10-15','Pembelian',55,249,'Impor Excel (Pembelian baris 22)',null),
('masuk','2026-10-15','Pembelian',54,250,'Impor Excel (Pembelian baris 23)',null),
('masuk','2026-10-15','Pembelian',56,83,'Impor Excel (Pembelian baris 24)',null),
('masuk','2026-10-12','Pembelian',15,1200,'Impor Excel (Pembelian baris 25)',null),
('masuk','2026-10-12','Pembelian',39,1200,'Impor Excel (Pembelian baris 26)',null),
('masuk','2026-10-29','Bengkel',51,2,'Impor Excel (Pembelian baris 27)',null),
('masuk','2026-10-29','Bengkel',11,4,'Impor Excel (Pembelian baris 28)',null),
('masuk','2026-10-29','Bengkel',38,2,'Impor Excel (Pembelian baris 29)',null),
('keluar','2026-09-14','Susilo',21,1,'Impor Excel (Penjualan baris 4)',null),
('keluar','2026-09-14','Vincent',14,6,'Impor Excel (Penjualan baris 5)',null),
('keluar','2026-09-14','Anton',36,24,'Impor Excel (Penjualan baris 6)',null),
('keluar','2026-09-15','Edit',32,2,'Impor Excel (Penjualan baris 7)',null),
('keluar','2026-09-15','Barnabi',7,4,'Impor Excel (Penjualan baris 8)',null),
('keluar','2026-09-16','Eva',4,40,'Impor Excel (Penjualan baris 9)',null),
('keluar','2026-09-16','Edit',32,1,'Impor Excel (Penjualan baris 10)',null),
('keluar','2026-09-16','Faisal',26,5,'Impor Excel (Penjualan baris 11)',null),
('keluar','2026-09-16','Edit',32,2,'Impor Excel (Penjualan baris 12)',null),
('keluar','2026-09-16','Anton',16,30,'Impor Excel (Penjualan baris 13)',null),
('keluar','2026-09-16','Pristan Bandung',24,2,'Impor Excel (Penjualan baris 14)',null),
('keluar','2026-09-16','Jumari',7,15,'Impor Excel (Penjualan baris 15)',null),
('keluar','2026-09-16','Mbay Bos',16,1,'Impor Excel (Penjualan baris 16)',null),
('keluar','2026-09-16','Azis Press',26,4,'Impor Excel (Penjualan baris 17)',null),
('keluar','2026-09-19','Azis Edging',26,4,'Impor Excel (Penjualan baris 18)',null),
('keluar','2026-09-19','Barnabi Press',7,4,'Impor Excel (Penjualan baris 19)',null),
('keluar','2026-09-19','Rendi',7,1,'Impor Excel (Penjualan baris 20)',null),
('keluar','2026-09-19','Barnabi',7,2,'Impor Excel (Penjualan baris 21)',null),
('keluar','2026-09-21','Udin',36,40,'Impor Excel (Penjualan baris 22)',null),
('keluar','2026-09-21','Darmaji',36,7,'Impor Excel (Penjualan baris 23)',null),
('keluar','2026-09-21','Kayularas',13,20,'Impor Excel (Penjualan baris 24)',null),
('keluar','2026-09-21','Anton',16,20,'Impor Excel (Penjualan baris 25)',null),
('keluar','2026-09-22','Edit',60,20,'Impor Excel (Penjualan baris 26)',null),
('keluar','2026-09-22','Azis',32,4,'Impor Excel (Penjualan baris 27)',null),
('keluar','2026-09-22','Anton',26,2,'Impor Excel (Penjualan baris 28)',null),
('keluar','2026-09-22','Vincent',16,15,'Impor Excel (Penjualan baris 29)',null),
('keluar','2026-09-22','John Kiki',53,10,'Impor Excel (Penjualan baris 30)',null),
('keluar','2026-09-22','Sekawan',11,2,'Impor Excel (Penjualan baris 31)',null),
('keluar','2026-09-22','Januar',65,45,'Impor Excel (Penjualan baris 32)',null),
('keluar','2026-09-23','Vincent',53,25,'Impor Excel (Penjualan baris 33)',null),
('keluar','2026-09-24','Catur',7,60,'Impor Excel (Penjualan baris 34)',null),
('keluar','2026-09-25','Global',49,12,'Impor Excel (Penjualan baris 35)',null),
('keluar','2026-09-25','Vincent',13,1,'Impor Excel (Penjualan baris 36)',null),
('keluar','2026-09-27','Faisal',26,5,'Impor Excel (Penjualan baris 37)',null),
('keluar','2026-09-28','Hadi',7,56,'Impor Excel (Penjualan baris 38)',null),
('keluar','2026-09-28','Cozy',60,1,'Impor Excel (Penjualan baris 39)',null),
('keluar','2026-09-28','Cozy',4,1,'Impor Excel (Penjualan baris 40)',null),
('keluar','2026-09-28','Cozy',61,1,'Impor Excel (Penjualan baris 41)',null),
('keluar','2026-09-28','Vincent',14,27,'Impor Excel (Penjualan baris 42)',null),
('keluar','2026-09-29','Edit',40,27,'Impor Excel (Penjualan baris 43)',null),
('keluar','2026-09-29','Kayularas',13,10,'Impor Excel (Penjualan baris 44)',null),
('keluar','2026-09-29','Eva',60,10,'Impor Excel (Penjualan baris 45)',null),
('keluar','2026-09-29','Andri',61,8,'Impor Excel (Penjualan baris 46)',null),
('keluar','2026-09-29','Rangka',11,30,'Impor Excel (Penjualan baris 47)',null),
('keluar','2026-09-30','Architectim',7,2,'Impor Excel (Penjualan baris 48)',null),
('keluar','2026-09-30','Edit',49,140,'Impor Excel (Penjualan baris 49)',null),
('keluar','2026-09-30','Edit',51,10,'Impor Excel (Penjualan baris 50)',null),
('keluar','2026-09-30','Rafli',49,1,'Impor Excel (Penjualan baris 51)',null),
('keluar','2026-09-30','Kayularas',13,30,'Impor Excel (Penjualan baris 52)',null),
('keluar','2026-09-30','Kayularas',11,30,'Impor Excel (Penjualan baris 53)',null),
('keluar','2026-09-30','Kayularas',16,20,'Impor Excel (Penjualan baris 54)',null),
('keluar','2026-10-02','Edit',40,5,'Impor Excel (Penjualan baris 55)',null),
('keluar','2026-10-01','Udin',16,2,'Impor Excel (Penjualan baris 56)',null),
('keluar','2026-10-01','Udin',8,4,'Impor Excel (Penjualan baris 57)',null),
('keluar','2026-10-01','Agni',16,4,'Impor Excel (Penjualan baris 58)',null),
('keluar','2026-10-01','Vincent',13,10,'Impor Excel (Penjualan baris 59)',null),
('keluar','2026-10-01','Kreasi',24,4,'Impor Excel (Penjualan baris 60)',null),
('keluar','2026-10-02','Kayularas',16,3,'Impor Excel (Penjualan baris 61)',null),
('keluar','2026-10-05','Mandika',24,198,'Impor Excel (Penjualan baris 62)',null),
('keluar','2026-10-05','Eva',60,50,'Impor Excel (Penjualan baris 63)',null),
('keluar','2026-10-05','Edit',40,3,'Impor Excel (Penjualan baris 64)',null),
('keluar','2026-10-05','Goenawan n Son',11,1,'Impor Excel (Penjualan baris 65)',null),
('keluar','2026-10-05','Hejo',11,5,'Impor Excel (Penjualan baris 66)',null),
('keluar','2026-10-05','Sample',14,1,'Impor Excel (Penjualan baris 67)',null),
('keluar','2026-10-05','Edit',32,5,'Impor Excel (Penjualan baris 68)',null),
('keluar','2026-10-05','Akim',41,2,'Impor Excel (Penjualan baris 69)',null),
('keluar','2026-10-05','Akim',42,6,'Impor Excel (Penjualan baris 70)',null),
('keluar','2026-10-06','Amir',4,80,'Impor Excel (Penjualan baris 71)',null),
('keluar','2026-10-06','Udin',4,27,'Impor Excel (Penjualan baris 72)',null),
('keluar','2026-10-06','Andri',4,2,'Impor Excel (Penjualan baris 73)',null),
('keluar','2026-10-06','Andri',18,1,'Impor Excel (Penjualan baris 74)',null),
('keluar','2026-10-06','Escalier',11,8,'Impor Excel (Penjualan baris 75)',null),
('keluar','2026-10-07','Max',15,76,'Impor Excel (Penjualan baris 76)',null),
('keluar','2026-10-07','Kayularas',51,5,'Impor Excel (Penjualan baris 77)',null),
('keluar','2026-10-07','Rafli',49,2,'Impor Excel (Penjualan baris 78)',null),
('keluar','2026-10-07','Edit',40,2,'Impor Excel (Penjualan baris 79)',null),
('keluar','2026-10-07','Andri',11,6,'Impor Excel (Penjualan baris 80)',null),
('keluar','2026-10-07','Hurama',14,4,'Impor Excel (Penjualan baris 81)',null),
('keluar','2026-10-09','Casseda',61,28,'Impor Excel (Penjualan baris 82)',null),
('keluar','2026-10-09','Anton',61,400,'Impor Excel (Penjualan baris 83)',null),
('keluar','2026-10-12','Kayularas',5,30,'Impor Excel (Penjualan baris 84)',null),
('keluar','2026-10-12','John Kiki',7,70,'Impor Excel (Penjualan baris 85)',null),
('keluar','2026-10-12','Udin',7,1,'Impor Excel (Penjualan baris 86)',null),
('keluar','2026-10-12','-',53,130,'Impor Excel (Penjualan baris 87)',null),
('keluar','2026-10-12','Cozy',3,1,'Impor Excel (Penjualan baris 88)',null),
('keluar','2026-10-12','Kayularas',13,20,'Impor Excel (Penjualan baris 89)',null),
('keluar','2026-10-12','Andri',13,1,'Impor Excel (Penjualan baris 90)',null),
('keluar','2026-10-13','Rizky',36,8,'Impor Excel (Penjualan baris 91)',null),
('keluar','2026-10-13','Udin',36,1,'Impor Excel (Penjualan baris 92)',null),
('keluar','2026-10-13','Edit',51,2,'Impor Excel (Penjualan baris 93)',null),
('keluar','2026-10-13','Kayularas',15,10,'Impor Excel (Penjualan baris 94)',null),
('keluar','2026-10-13','Max',7,12,'Impor Excel (Penjualan baris 95)',null),
('keluar','2026-10-14','Edit',16,2,'Impor Excel (Penjualan baris 96)',null),
('keluar','2026-10-14','Monolite',14,36,'Impor Excel (Penjualan baris 97)',null),
('keluar','2026-10-14','Ayub',14,60,'Impor Excel (Penjualan baris 98)',null),
('keluar','2026-10-14','Tony',42,200,'Impor Excel (Penjualan baris 99)',null),
('keluar','2026-10-14','Rangka',14,50,'Impor Excel (Penjualan baris 100)',null),
('keluar','2026-10-14','Rangka',11,4,'Impor Excel (Penjualan baris 101)',null),
('keluar','2026-10-15','Andre',11,20,'Impor Excel (Penjualan baris 102)',null),
('keluar','2026-10-15','Rangka',11,10,'Impor Excel (Penjualan baris 103)',null),
('keluar','2026-10-15','Rafi',49,74,'Impor Excel (Penjualan baris 104)',null),
('keluar','2026-10-15','Kayularas',15,25,'Impor Excel (Penjualan baris 105)',null),
('keluar','2026-10-15','Kayularas',13,30,'Impor Excel (Penjualan baris 106)',null),
('keluar','2026-10-15','Kuswono',38,3,'Impor Excel (Penjualan baris 107)',null),
('keluar','2026-10-16','Monolite',13,6,'Impor Excel (Penjualan baris 108)',null),
('keluar','2026-10-16','Monolite',14,14,'Impor Excel (Penjualan baris 109)',null),
('keluar','2026-10-16','Eva',49,8,'Impor Excel (Penjualan baris 110)',null),
('keluar','2026-10-16','Anton',16,16,'Impor Excel (Penjualan baris 111)',null),
('keluar','2026-10-16','Artdeco',44,1,'Impor Excel (Penjualan baris 112)',null),
('keluar','2026-10-19','Cozy',3,80,'Impor Excel (Penjualan baris 114)',null),
('keluar','2026-10-19','Alvin',15,40,'Impor Excel (Penjualan baris 115)',null),
('keluar','2026-10-19','Kayularas',13,100,'Impor Excel (Penjualan baris 116)',null),
('keluar','2026-10-19','Andre',11,1,'Impor Excel (Penjualan baris 117)',null),
('keluar','2026-10-19','Eva',60,5,'Impor Excel (Penjualan baris 118)',null),
('keluar','2026-10-19','Feri',11,1,'Impor Excel (Penjualan baris 119)',null),
('keluar','2026-10-19','Feri',13,1,'Impor Excel (Penjualan baris 120)',null),
('keluar','2026-10-19','Feri',7,1,'Impor Excel (Penjualan baris 121)',null),
('keluar','2026-10-20','Rendi',42,20,'Impor Excel (Penjualan baris 122)',null),
('keluar','2026-10-20','Udin',36,20,'Impor Excel (Penjualan baris 123)',null),
('keluar','2026-10-20','Udin',16,10,'Impor Excel (Penjualan baris 124)',null),
('keluar','2026-10-20','Clinton',36,66,'Impor Excel (Penjualan baris 125)',null),
('keluar','2026-10-20','Kuswono',38,6,'Impor Excel (Penjualan baris 126)',null),
('keluar','2026-10-20','Edit',32,6,'Impor Excel (Penjualan baris 127)',null),
('keluar','2026-10-21','Fendy',61,5,'Impor Excel (Penjualan baris 128)',null),
('keluar','2026-10-20','Glitch',14,20,'Impor Excel (Penjualan baris 129)',null),
('keluar','2026-10-21','Andre',16,16,'Impor Excel (Penjualan baris 130)',null),
('keluar','2026-10-21','Andre',11,4,'Impor Excel (Penjualan baris 131)',null),
('keluar','2026-10-21','Anton',11,34,'Impor Excel (Penjualan baris 132)',null),
('keluar','2026-10-21','Anton',38,6,'Impor Excel (Penjualan baris 133)',null),
('keluar','2026-10-21','Anton',14,6,'Impor Excel (Penjualan baris 134)',null),
('keluar','2026-10-21','Anton',42,1,'Impor Excel (Penjualan baris 135)',null),
('keluar','2026-10-21','Anton',41,1,'Impor Excel (Penjualan baris 136)',null),
('keluar','2026-10-21','Alvin Palace',14,15,'Impor Excel (Penjualan baris 137)',null),
('keluar','2026-10-22','Andre',11,14,'Impor Excel (Penjualan baris 138)',null),
('keluar','2026-10-22','Cozy',3,140,'Impor Excel (Penjualan baris 139)',null),
('keluar','2026-10-22','Rendi',7,54,'Impor Excel (Penjualan baris 140)',null),
('keluar','2026-10-22','Rangka',14,100,'Impor Excel (Penjualan baris 141)',null),
('keluar','2026-10-22','Sekawan',36,2,'Impor Excel (Penjualan baris 142)',null),
('keluar','2026-10-22','Palace',44,44,'Impor Excel (Penjualan baris 143)',null),
('keluar','2026-10-23','Ayub',14,55,'Impor Excel (Penjualan baris 145)',null),
('keluar','2026-10-23','Ruswono',38,5,'Impor Excel (Penjualan baris 146)',null),
('keluar','2026-10-23','Danawa',38,2,'Impor Excel (Penjualan baris 147)',null),
('keluar','2026-10-23','Danawa',11,2,'Impor Excel (Penjualan baris 148)',null),
('keluar','2026-10-23','Danawa',14,2,'Impor Excel (Penjualan baris 149)',null),
('keluar','2026-10-23','Alvin Palace',16,20,'Impor Excel (Penjualan baris 150)',null),
('keluar','2026-10-26','Andre',15,20,'Impor Excel (Penjualan baris 151)',null),
('keluar','2026-10-26','Edit',22,27,'Impor Excel (Penjualan baris 152)',null),
('keluar','2026-10-26','Edit',24,20,'Impor Excel (Penjualan baris 153)',null),
('keluar','2026-10-26','Blitz',16,5,'Impor Excel (Penjualan baris 154)',null),
('keluar','2026-10-26','Karya Nawacita',42,2,'Impor Excel (Penjualan baris 155)',null),
('keluar','2026-10-27','Bos',14,1,'Impor Excel (Penjualan baris 156)',null),
('keluar','2026-10-27','Bos',42,1,'Impor Excel (Penjualan baris 157)',null),
('keluar','2026-10-27','Bos',62,1,'Impor Excel (Penjualan baris 158)',null),
('keluar','2026-10-27','Darmaji',36,1,'Impor Excel (Penjualan baris 159)',null),
('keluar','2026-10-28','Andre',11,24,'Impor Excel (Penjualan baris 160)',null),
('keluar','2026-10-28','Anton',16,6,'Impor Excel (Penjualan baris 161)',null),
('keluar','2026-10-29','Rendi',7,2,'Impor Excel (Penjualan baris 162)',null),
('keluar','2026-10-29','Rendi',7,24,'Impor Excel (Penjualan baris 163)',null),
('keluar','2026-10-29','Jans',51,80,'Impor Excel (Penjualan baris 164)',null),
('keluar','2026-10-30','Kurnia Abadi',11,5,'Impor Excel (Penjualan baris 165)',null),
('keluar','2026-10-30','Ferie',7,2,'Impor Excel (Penjualan baris 166)',null),
('keluar','2026-10-30','Ferie',7,22,'Impor Excel (Penjualan baris 167)',null),
('keluar','2026-10-30','Ifan',7,60,'Impor Excel (Penjualan baris 168)',null),
('keluar','2026-10-30','Anton',44,50,'Impor Excel (Penjualan baris 169)',null),
('keluar','2026-10-30','Anton',36,75,'Impor Excel (Penjualan baris 170)',null),
('keluar','2026-10-30','Anton',16,4,'Impor Excel (Penjualan baris 171)',null),
('keluar','2026-10-30','Edit',51,6,'Impor Excel (Penjualan baris 172)',null),
('keluar','2026-10-30','Barnabi',51,1,'Impor Excel (Penjualan baris 173)',null),
('keluar','2026-10-30','Barnabi',38,1,'Impor Excel (Penjualan baris 174)',null),
('keluar','2026-10-30','Edit',21,60,'Impor Excel (Penjualan baris 175)',null),
('keluar','2026-10-30','Sutirto',49,8,'Impor Excel (Penjualan baris 176)',null),
('keluar','2026-10-30','Blitz',14,6,'Impor Excel (Penjualan baris 177)',null),
('keluar','2026-10-30','Blitz',15,6,'Impor Excel (Penjualan baris 178)',null),
('keluar','2026-10-30','Isa',31,2,'Impor Excel (Penjualan baris 179)',null),
('keluar','2026-10-30','Cozy Sofie',3,40,'Impor Excel (Penjualan baris 180)',null),
('keluar','2026-10-30','Januar',65,1,'Impor Excel (Penjualan baris 181)',null),
('keluar','2026-10-30','ifan',7,70,'Impor Excel (Penjualan baris 182)',null),
('keluar','2026-10-30','Raffi',49,218,'Impor Excel (Penjualan baris 183)',null),
('keluar','2026-11-02','Anton',3,10,'Impor Excel (Penjualan baris 184)',null),
('keluar','2026-11-02','Didin',26,80,'Impor Excel (Penjualan baris 185)',null),
('keluar','2026-11-02','Tony',42,200,'Impor Excel (Penjualan baris 186)',null),
('keluar','2026-11-03','Anton',3,46,'Impor Excel (Penjualan baris 187)',null),
('keluar','2026-11-03','Anton',3,52,'Impor Excel (Penjualan baris 188)',null),
('keluar','2026-11-03','Rendi',7,21,'Impor Excel (Penjualan baris 189)',null),
('keluar','2026-11-03','Didin',26,5,'Impor Excel (Penjualan baris 190)',null),
('keluar','2026-11-03','Andri',11,32,'Impor Excel (Penjualan baris 191)',null),
('keluar','2026-11-03','Ayub',14,11,'Impor Excel (Penjualan baris 192)',null),
('keluar','2026-11-03','Surya',24,22,'Impor Excel (Penjualan baris 193)',null),
('keluar','2026-11-04','Rendra',13,1,'Impor Excel (Penjualan baris 194)',null),
('keluar','2026-11-04','Rendra',13,40,'Impor Excel (Penjualan baris 195)',null),
('keluar','2026-11-04','Rendra',32,1,'Impor Excel (Penjualan baris 196)',null),
('keluar','2026-11-04','Daya',54,1,'Impor Excel (Penjualan baris 197)',null),
('keluar','2026-11-04','Mozaik',32,8,'Impor Excel (Penjualan baris 198)',null),
('keluar','2026-11-04','Sekawan',49,3,'Impor Excel (Penjualan baris 199)',null),
('keluar','2026-11-04','Anton',3,3,'Impor Excel (Penjualan baris 200)',null),
('keluar','2026-11-04','Rendra',16,14,'Impor Excel (Penjualan baris 201)',null),
('keluar','2026-11-04','Anton',3,8,'Impor Excel (Penjualan baris 202)',null),
('keluar','2026-11-04','Inovasi',26,4,'Impor Excel (Penjualan baris 203)',null),
('keluar','2026-11-05','John Kiki',7,66,'Impor Excel (Penjualan baris 204)',null),
('keluar','2026-11-05','Hendra',13,1,'Impor Excel (Penjualan baris 205)',null),
('keluar','2026-11-05','Combi',49,1,'Impor Excel (Penjualan baris 206)',null),
('keluar','2026-11-05','Clinton',36,18,'Impor Excel (Penjualan baris 207)',null),
('keluar','2026-11-05','Jumari',7,17,'Impor Excel (Penjualan baris 208)',null),
('keluar','2026-11-05','Anton',36,1,'Impor Excel (Penjualan baris 209)',null),
('keluar','2026-11-06','Nasir',15,10,'Impor Excel (Penjualan baris 210)',null),
('keluar','2026-11-06','Nasir',49,5,'Impor Excel (Penjualan baris 211)',null),
('keluar','2026-11-06','Amir',3,2,'Impor Excel (Penjualan baris 212)',null),
('keluar','2026-11-06','Udin',36,7,'Impor Excel (Penjualan baris 213)',null),
('keluar','2026-11-06','Budi',49,1,'Impor Excel (Penjualan baris 214)',null),
('keluar','2026-11-06','Budi',32,1,'Impor Excel (Penjualan baris 215)',null),
('keluar','2026-11-06','Budi',61,1,'Impor Excel (Penjualan baris 216)',null),
('keluar','2026-11-06','Andri',15,40,'Impor Excel (Penjualan baris 217)',null),
('keluar','2026-11-09','Eva',60,24,'Impor Excel (Penjualan baris 218)',null),
('keluar','2026-11-09','Udin',36,14,'Impor Excel (Penjualan baris 219)',null),
('keluar','2026-11-09','Udin',16,34,'Impor Excel (Penjualan baris 220)',null),
('keluar','2026-11-09','Edit',24,148,'Impor Excel (Penjualan baris 221)',null),
('keluar','2026-11-09','Edit',40,94,'Impor Excel (Penjualan baris 222)',null),
('keluar','2026-11-09','Ferie',7,2,'Impor Excel (Penjualan baris 223)',null),
('keluar','2026-11-09','Anton',11,8,'Impor Excel (Penjualan baris 224)',null),
('keluar','2026-11-09','Andre',15,24,'Impor Excel (Penjualan baris 225)',null),
('keluar','2026-11-09','Anton',3,15,'Impor Excel (Penjualan baris 226)',null),
('keluar','2026-11-09','Catur',7,1,'Impor Excel (Penjualan baris 227)',null),
('keluar','2026-11-09','Amir',61,3,'Impor Excel (Penjualan baris 228)',null),
('keluar','2026-11-09','Raffi',49,7,'Impor Excel (Penjualan baris 229)',null),
('keluar','2026-11-09','Edit',53,14,'Impor Excel (Penjualan baris 230)',null),
('keluar','2026-11-09','Mardi',66,6,'Impor Excel (Penjualan baris 231)',null),
('keluar','2026-11-09','Mardi',67,6,'Impor Excel (Penjualan baris 232)',null),
('keluar','2026-11-10','Candra',26,5,'Impor Excel (Penjualan baris 233)',null),
('keluar','2026-11-10','Ifan',7,46,'Impor Excel (Penjualan baris 234)',null),
('keluar','2026-11-10','Anton',3,7,'Impor Excel (Penjualan baris 235)',null),
('keluar','2026-11-10','Vista',25,23,'Impor Excel (Penjualan baris 236)',null),
('keluar','2026-11-10','Januar',35,10,'Impor Excel (Penjualan baris 237)',null),
('keluar','2026-11-10','Januar',3,4,'Impor Excel (Penjualan baris 238)',null),
('keluar','2026-11-10','Anton',44,6,'Impor Excel (Penjualan baris 239)',null),
('keluar','2026-11-10','Ayub',14,15,'Impor Excel (Penjualan baris 240)',null),
('keluar','2026-11-10','Catur',39,150,'Impor Excel (Penjualan baris 241)',null),
('keluar','2026-11-10','Inovasi',11,22,'Impor Excel (Penjualan baris 242)',null),
('keluar','2026-11-10','Didin',26,5,'Impor Excel (Penjualan baris 243)',null),
('keluar','2026-11-12','Januar',36,15,'Impor Excel (Penjualan baris 244)',null),
('keluar','2026-11-12','Kayularas',21,4,'Impor Excel (Penjualan baris 245)',null),
('keluar','2026-11-12','Rendi',7,3,'Impor Excel (Penjualan baris 246)',null),
('keluar','2026-11-12','Devina Press',15,56,'Impor Excel (Penjualan baris 247)',null),
('keluar','2026-11-12','Devina Press',15,7,'Impor Excel (Penjualan baris 248)',null),
('keluar','2026-11-12','Kayularas',13,20,'Impor Excel (Penjualan baris 249)',null),
('keluar','2026-11-12','Kayularas',21,5,'Impor Excel (Penjualan baris 250)',null),
('keluar','2026-11-12','Kaseda',61,12,'Impor Excel (Penjualan baris 251)',null),
('keluar','2026-11-12','GTL Press',60,4,'Impor Excel (Penjualan baris 252)',null),
('keluar','2026-11-12','GTL Press',11,4,'Impor Excel (Penjualan baris 253)',null),
('keluar','2026-11-12','Anton',6,2,'Impor Excel (Penjualan baris 254)',null),
('keluar','2026-11-12','Anton',6,4,'Impor Excel (Penjualan baris 255)',null),
('keluar','2026-11-16','Kayularas',21,1,'Impor Excel (Penjualan baris 256)',null),
('keluar','2026-11-16','Edit',40,5,'Impor Excel (Penjualan baris 257)',null),
('keluar','2026-11-16','PT. Ideal',15,56,'Impor Excel (Penjualan baris 258)',null),
('keluar','2026-11-16','Ayub',15,3,'Impor Excel (Penjualan baris 259)',null),
('keluar','2026-11-16','Ferie',7,3,'Impor Excel (Penjualan baris 260)',null),
('keluar','2026-11-16','Ferie',13,2,'Impor Excel (Penjualan baris 261)',null),
('keluar','2026-11-16','Ferie',16,32,'Impor Excel (Penjualan baris 262)',null),
('keluar','2026-11-17','Bos Icho',21,1,'Impor Excel (Penjualan baris 263)',null),
('keluar','2026-11-17','Amir',61,315,'Impor Excel (Penjualan baris 264)',null),
('keluar','2026-11-17','Jumari',7,12,'Impor Excel (Penjualan baris 265)',null),
('keluar','2026-11-17','Vincent',53,100,'Impor Excel (Penjualan baris 266)',null),
('keluar','2026-11-18','Hendra',12,4,'Impor Excel (Penjualan baris 267)',null),
('keluar','2026-11-18','Edit',24,2,'Impor Excel (Penjualan baris 268)',null),
('keluar','2026-11-18','Edit',46,46,'Impor Excel (Penjualan baris 269)',null),
('keluar','2026-11-18','Udin',15,6,'Impor Excel (Penjualan baris 270)',null),
('keluar','2026-11-18','Murnawi',36,1,'Impor Excel (Penjualan baris 271)',null);
-- DILEWATI Penjualan baris 113: 2026-10-18 Ruskar sku=None qty=2
-- DILEWATI Penjualan baris 144: 2026-10-22 Tomi sku=0 qty=30
commit;

notify pgrst, 'reload schema';
