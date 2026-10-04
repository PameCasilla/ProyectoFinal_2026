USE workffice;

-- Sample data for locations
INSERT INTO locations (id, city, province, street, zipCode) VALUES
  (1, 'CABA', 'Buenos Aires', 'Av. Corrientes 1001', 'C1043AAB'),
  (2, 'CABA', 'Buenos Aires', 'Guatemala 2002', 'C1414AAB'),
  (3, 'CABA', 'Buenos Aires', 'Av. Cabildo 3003', 'C1426AAB'),
  (4, 'La Plata', 'Buenos Aires', 'Calle 50 1004', 'B1900'),
  (5, 'Rosario', 'Santa Fe', 'San Martín 5005', 'S2000'),
  (6, 'Mendoza', 'Mendoza', 'San Juan 6006', 'M5500'),
  (7, 'Córdoba', 'Córdoba', 'Av. Colón 7007', 'X5000'),
  (8, 'Mar del Plata', 'Buenos Aires', 'Alvarado 8008', 'B7600'),
  (9, 'Salta', 'Salta', 'Caseros 9009', 'A4400'),
  (10, 'San Miguel de Tucumán', 'Tucumán', 'Avenida Mitre 1010', 'T4000');

-- Sample data for office_holders
INSERT INTO office_holders (id, email) VALUES
  (UNHEX(REPLACE('11111111-1111-1111-1111-111111111111','-','')), 'holder1@example.com'),
  (UNHEX(REPLACE('22222222-2222-2222-2222-222222222222','-','')), 'holder2@example.com'),
  (UNHEX(REPLACE('33333333-3333-3333-3333-333333333333','-','')), 'holder3@example.com'),
  (UNHEX(REPLACE('44444444-4444-4444-4444-444444444444','-','')), 'holder4@example.com'),
  (UNHEX(REPLACE('55555555-5555-5555-5555-555555555555','-','')), 'holder5@example.com'),
  (UNHEX(REPLACE('66666666-6666-6666-6666-666666666666','-','')), 'holder6@example.com'),
  (UNHEX(REPLACE('77777777-7777-7777-7777-777777777777','-','')), 'holder7@example.com'),
  (UNHEX(REPLACE('88888888-8888-8888-8888-888888888888','-','')), 'holder8@example.com'),
  (UNHEX(REPLACE('99999999-9999-9999-9999-999999999999','-','')), 'holder9@example.com'),
  (UNHEX(REPLACE('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','-','')), 'holder10@example.com');

-- Sample data for office_branches
INSERT INTO office_branches (id, created, deleted, description, name, phone, location_id, owner_id) VALUES
  (UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-','')), '2026-07-01', b'0', 'Downtown branch', 'Downtown Office', '+54 11 5555-1001', 1, UNHEX(REPLACE('11111111-1111-1111-1111-111111111111','-',''))),
  (UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-','')), '2026-07-02', b'0', 'Palermo branch', 'Palermo Workspace', '+54 11 5555-1002', 2, UNHEX(REPLACE('22222222-2222-2222-2222-222222222222','-',''))),
  (UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-','')), '2026-07-03', b'0', 'Belgrano branch', 'Belgrano Hub', '+54 11 5555-1003', 3, UNHEX(REPLACE('33333333-3333-3333-3333-333333333333','-',''))),
  (UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-','')), '2026-07-04', b'0', 'La Plata branch', 'La Plata Business Center', '+54 221 5555-1004', 4, UNHEX(REPLACE('44444444-4444-4444-4444-444444444444','-',''))),
  (UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-','')), '2026-07-05', b'0', 'Rosario branch', 'Rosario Innovation Hub', '+54 341 5555-1005', 5, UNHEX(REPLACE('55555555-5555-5555-5555-555555555555','-',''))),
  (UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-','')), '2026-07-06', b'0', 'Mendoza branch', 'Mendoza Coworking', '+54 261 5555-1006', 6, UNHEX(REPLACE('66666666-6666-6666-6666-666666666666','-',''))),
  (UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-','')), '2026-07-07', b'0', 'Córdoba branch', 'Córdoba Creative Office', '+54 351 5555-1007', 7, UNHEX(REPLACE('77777777-7777-7777-7777-777777777777','-',''))),
  (UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-','')), '2026-07-08', b'0', 'Mar del Plata branch', 'Mar del Plata Studio', '+54 223 5555-1008', 8, UNHEX(REPLACE('88888888-8888-8888-8888-888888888888','-',''))),
  (UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-','')), '2026-07-09', b'0', 'Salta branch', 'Salta Connect', '+54 387 5555-1009', 9, UNHEX(REPLACE('99999999-9999-9999-9999-999999999999','-',''))),
  (UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')), '2026-07-10', b'0', 'Tucumán branch', 'Tucumán Work Loft', '+54 381 5555-1010', 10, UNHEX(REPLACE('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','-','')));

-- Sample data for roles
INSERT INTO roles (id, deleted, name, officeBranch_id) VALUES
  (UNHEX(REPLACE('14141414-1414-1414-1414-141414141414','-','')), b'0', 'OWNER', UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('15151515-1515-1515-1515-151515151515','-','')), b'0', 'MANAGER', UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('16161616-1616-1616-1616-161616161616','-','')), b'0', 'RECEPTION', UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('17171717-1717-1717-1717-171717171717','-','')), b'0', 'ADMIN', UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('18181818-1818-1818-1818-181818181818','-','')), b'0', 'COLLABORATOR', UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('19191919-1919-1919-1919-191919191919','-','')), b'0', 'OWNER', UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('20202020-2020-2020-2020-202020202020','-','')), b'0', 'MANAGER', UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('21212121-2121-2121-2121-212121212121','-','')), b'0', 'RECEPTION', UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('22222222-2222-2222-2222-222222222222','-','')), b'0', 'ADMIN', UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('23232323-2323-2323-2323-232323232323','-','')), b'0', 'COLLABORATOR', UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));

-- Sample data for collaborators
INSERT INTO collaborators (id, created, email, name, status, officeBranch_id) VALUES
  (UNHEX(REPLACE('24141414-1414-1414-1414-141414141414','-','')), '2026-07-01', 'collab1@example.com', 'Mia', 'ACTIVE', UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('25151515-1515-1515-1515-151515151515','-','')), '2026-07-02', 'collab2@example.com', 'Noah', 'ACTIVE', UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('26161616-1616-1616-1616-161616161616','-','')), '2026-07-03', 'collab3@example.com', 'Olivia', 'ACTIVE', UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('27171717-1717-1717-1717-171717171717','-','')), '2026-07-04', 'collab4@example.com', 'Liam', 'ACTIVE', UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('28181818-1818-1818-1818-181818181818','-','')), '2026-07-05', 'collab5@example.com', 'Emma', 'ACTIVE', UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('29191919-1919-1919-1919-191919191919','-','')), '2026-07-06', 'collab6@example.com', 'Lucas', 'ACTIVE', UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('30303030-3030-3030-3030-303030303030','-','')), '2026-07-07', 'collab7@example.com', 'Sophia', 'ACTIVE', UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('31313131-3131-3131-3131-313131313131','-','')), '2026-07-08', 'collab8@example.com', 'Mason', 'ACTIVE', UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('32323232-3232-3232-3232-323232323232','-','')), '2026-07-09', 'collab9@example.com', 'Ava', 'ACTIVE', UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('33333333-3333-3333-3333-333333333333','-','')), '2026-07-10', 'collab10@example.com', 'Ethan', 'ACTIVE', UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));

-- Sample data for equipment
INSERT INTO equipment (id, category, name, officeBranch_id) VALUES
  (UNHEX(REPLACE('34141414-1414-1414-1414-141414141414','-','')), 'WORKSTATION', 'Desk', UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('35151515-1515-1515-1515-151515151515','-','')), 'CONFERENCE', 'Projector', UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('36161616-1616-1616-1616-161616161616','-','')), 'WORKSTATION', 'Ergonomic chair', UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('37171717-1717-1717-1717-171717171717','-','')), 'CONFERENCE', 'Video system', UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('38181818-1818-1818-1818-181818181818','-','')), 'WORKSTATION', 'Monitor', UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('39191919-1919-1919-1919-191919191919','-','')), 'CONFERENCE', 'Conference phone', UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('40404040-4040-4040-4040-404040404040','-','')), 'WORKSTATION', 'Standing desk', UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('41414141-4141-4141-4141-414141414141','-','')), 'CONFERENCE', 'Whiteboard', UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('42424242-4242-4242-4242-424242424242','-','')), 'WORKSTATION', 'Docking station', UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('43434343-4343-4343-4343-434343434343','-','')), 'CONFERENCE', 'Speaker', UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));

-- Sample data for memberships
INSERT INTO memberships (id, changed, created, deleted, description, name, pricePerMonth, officeBranch_id) VALUES
  (UNHEX(REPLACE('44141414-1414-1414-1414-141414141414','-','')), '2026-07-01', '2026-07-01', b'0', 'Flexible monthly membership', 'Flex', 1200, UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('45151515-1515-1515-1515-151515151515','-','')), '2026-07-02', '2026-07-02', b'0', 'Premium access', 'Premium', 1800, UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('46161616-1616-1616-1616-161616161616','-','')), '2026-07-03', '2026-07-03', b'0', 'Access for startups', 'Startup', 1400, UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('47171717-1717-1717-1717-171717171717','-','')), '2026-07-04', '2026-07-04', b'0', 'Dedicated desk plan', 'Dedicated', 2200, UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('48181818-1818-1818-1818-181818181818','-','')), '2026-07-05', '2026-07-05', b'0', 'Hot desk membership', 'Hot Desk', 900, UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('49191919-1919-1919-1919-191919191919','-','')), '2026-07-06', '2026-07-06', b'0', 'High-capacity plan', 'Enterprise', 3200, UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('50505050-5050-5050-5050-505050505050','-','')), '2026-07-07', '2026-07-07', b'0', 'Team plan', 'Team', 2600, UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('51515151-5151-5151-5151-515151515151','-','')), '2026-07-08', '2026-07-08', b'0', 'Student plan', 'Student', 700, UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('52525252-5252-5252-5252-525252525252','-','')), '2026-07-09', '2026-07-09', b'0', 'Executive plan', 'Executive', 4000, UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('53535353-5353-5353-5353-535353535353','-','')), '2026-07-10', '2026-07-10', b'0', 'Creative plan', 'Creative', 1500, UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));

-- Sample data for offices
INSERT INTO offices (id, capacity, deletedAt, description, url, name, price, privacy, capacityPerTable, quantity, officeBranch_id) VALUES
  (UNHEX(REPLACE('54141414-1414-1414-1414-141414141414','-','')), 4, NULL, 'Private office for 4', 'https://example.com/office1', 'Private Room', 1200, 'PRIVATE', 1, 1, UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('55151515-1515-1515-1515-151515151515','-','')), 6, NULL, 'Shared open space', 'https://example.com/office2', 'Open Desk', 900, 'SHARED', 2, 3, UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('56161616-1616-1616-1616-161616161616','-','')), 8, NULL, 'Conference room', 'https://example.com/office3', 'Meeting Room', 1500, 'PRIVATE', 1, 2, UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('57171717-1717-1717-1717-171717171717','-','')), 10, NULL, 'Large workspace', 'https://example.com/office4', 'Team Room', 2000, 'SHARED', 2, 4, UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('58181818-1818-1818-1818-181818181818','-','')), 5, NULL, 'Quiet studio', 'https://example.com/office5', 'Studio', 1100, 'PRIVATE', 1, 1, UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('59191919-1919-1919-1919-191919191919','-','')), 12, NULL, 'Flexible team area', 'https://example.com/office6', 'Flex Team', 1800, 'SHARED', 2, 5, UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('60606060-6060-6060-6060-606060606060','-','')), 3, NULL, 'Single desk office', 'https://example.com/office7', 'Single Desk', 800, 'PRIVATE', 1, 1, UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('61616161-6161-6161-6161-616161616161','-','')), 7, NULL, 'Collaborative corner', 'https://example.com/office8', 'Collab Corner', 1300, 'SHARED', 2, 2, UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('62626262-6262-6262-6262-626262626262','-','')), 9, NULL, 'Bright creative space', 'https://example.com/office9', 'Creative Room', 1700, 'PRIVATE', 1, 2, UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('63636363-6363-6363-6363-636363636363','-','')), 6, NULL, 'Executive office', 'https://example.com/office10', 'Executive Suite', 2400, 'PRIVATE', 1, 1, UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));

-- Sample data for service
INSERT INTO service (id, category, name, officeBranch_id) VALUES
  (UNHEX(REPLACE('64141414-1414-1414-1414-141414141414','-','')), 'AMENITY', 'Coffee Bar', UNHEX(REPLACE('aaaaaaaa-0000-0000-0000-aaaaaaaa0001','-',''))),
  (UNHEX(REPLACE('65151515-1515-1515-1515-151515151515','-','')), 'AMENITY', 'Parking', UNHEX(REPLACE('bbbbbbbb-0000-0000-0000-bbbbbbbb0002','-',''))),
  (UNHEX(REPLACE('66161616-1616-1616-1616-161616161616','-','')), 'AMENITY', 'Reception', UNHEX(REPLACE('cccccccc-0000-0000-0000-cccccccc0003','-',''))),
  (UNHEX(REPLACE('67171717-1717-1717-1717-171717171717','-','')), 'AMENITY', 'Printer', UNHEX(REPLACE('dddddddd-0000-0000-0000-dddddddd0004','-',''))),
  (UNHEX(REPLACE('68181818-1818-1818-1818-181818181818','-','')), 'AMENITY', 'Mailroom', UNHEX(REPLACE('eeeeeeee-0000-0000-0000-eeeeeeee0005','-',''))),
  (UNHEX(REPLACE('69191919-1919-1919-1919-191919191919','-','')), 'AMENITY', 'Lounge', UNHEX(REPLACE('ffffffff-0000-0000-0000-ffffffff0006','-',''))),
  (UNHEX(REPLACE('70707070-7070-7070-7070-707070707070','-','')), 'AMENITY', 'Phone Booth', UNHEX(REPLACE('10101010-0000-0000-0000-101010100007','-',''))),
  (UNHEX(REPLACE('71717171-7171-7171-7171-717171717171','-','')), 'AMENITY', 'Meeting Room', UNHEX(REPLACE('11111111-0000-0000-0000-111111110008','-',''))),
  (UNHEX(REPLACE('72727272-7272-7272-7272-727272727272','-','')), 'AMENITY', 'Gym', UNHEX(REPLACE('12121212-0000-0000-0000-121212120009','-',''))),
  (UNHEX(REPLACE('73737373-7373-7373-7373-737373737373','-','')), 'AMENITY', 'Concierge', UNHEX(REPLACE('13131313-0000-0000-0000-131313130010','-','')));
