USE workffice;

-- Sample data for privacies
INSERT INTO privacies (privacyType, id, capacity, capacityPerTable, tablesQuantity) VALUES
  ('PRIVATE', 1, 4, 1, 1),
  ('SHARED', 2, 6, 2, 3),
  ('PRIVATE', 3, 8, 1, 2),
  ('SHARED', 4, 10, 2, 4),
  ('PRIVATE', 5, 5, 1, 1),
  ('SHARED', 6, 12, 2, 5),
  ('PRIVATE', 7, 3, 1, 1),
  ('SHARED', 8, 7, 2, 2),
  ('PRIVATE', 9, 9, 1, 2),
  ('PRIVATE', 10, 6, 1, 1);

-- Sample data for payment_informations
INSERT INTO payment_informations (id, currency, externalId, paymentMethodId, paymentTypeId, providerFee, transactionAmount) VALUES
  (1, 'ARS', 'ext-001', 'pm_001', 'pt_001', 120.5, 1500.5),
  (2, 'ARS', 'ext-002', 'pm_002', 'pt_002', 95.0, 1800.0),
  (3, 'ARS', 'ext-003', 'pm_003', 'pt_003', 140.25, 2100.25),
  (4, 'ARS', 'ext-004', 'pm_004', 'pt_004', 70.75, 1250.75),
  (5, 'ARS', 'ext-005', 'pm_005', 'pt_005', 55.0, 980.0),
  (6, 'ARS', 'ext-006', 'pm_006', 'pt_006', 88.5, 1650.5),
  (7, 'ARS', 'ext-007', 'pm_007', 'pt_007', 60.0, 1100.0),
  (8, 'ARS', 'ext-008', 'pm_008', 'pt_008', 75.0, 1400.0),
  (9, 'ARS', 'ext-009', 'pm_009', 'pt_009', 110.0, 2200.0),
  (10, 'ARS', 'ext-010', 'pm_010', 'pt_010', 90.75, 1950.75);

-- Sample data for membership_acquisitions
INSERT INTO membership_acquisitions (id, buyerEmail, membershipId, month, price, status, paymentInformation_id) VALUES
  (UNHEX(REPLACE('74141414-1414-1414-1414-141414141414','-','')), 'buyer1@example.com', 'membership-001', 1, 1200, 'PAID', 1),
  (UNHEX(REPLACE('75151515-1515-1515-1515-151515151515','-','')), 'buyer2@example.com', 'membership-002', 1, 1800, 'PAID', 2),
  (UNHEX(REPLACE('76161616-1616-1616-1616-161616161616','-','')), 'buyer3@example.com', 'membership-003', 1, 1400, 'PAID', 3),
  (UNHEX(REPLACE('77171717-1717-1717-1717-171717171717','-','')), 'buyer4@example.com', 'membership-004', 1, 2200, 'PAID', 4),
  (UNHEX(REPLACE('78181818-1818-1818-1818-181818181818','-','')), 'buyer5@example.com', 'membership-005', 1, 900, 'PAID', 5),
  (UNHEX(REPLACE('79191919-1919-1919-1919-191919191919','-','')), 'buyer6@example.com', 'membership-006', 1, 3200, 'PAID', 6),
  (UNHEX(REPLACE('80808080-8080-8080-8080-808080808080','-','')), 'buyer7@example.com', 'membership-007', 1, 2600, 'PAID', 7),
  (UNHEX(REPLACE('81818181-8181-8181-8181-818181818181','-','')), 'buyer8@example.com', 'membership-008', 1, 700, 'PAID', 8),
  (UNHEX(REPLACE('82828282-8282-8282-8282-828282828282','-','')), 'buyer9@example.com', 'membership-009', 1, 4000, 'PAID', 9),
  (UNHEX(REPLACE('83838383-8383-8383-8383-838383838383','-','')), 'buyer10@example.com', 'membership-010', 1, 1500, 'PAID', 10);

-- Sample data for offices
INSERT INTO offices (id, deleted, name, officeBranchId, price, privacy_id) VALUES
  (UNHEX(REPLACE('84141414-1414-1414-1414-141414141414','-','')), b'0', 'Private Room', 'branch-001', 1200, 1),
  (UNHEX(REPLACE('85151515-1515-1515-1515-151515151515','-','')), b'0', 'Open Desk', 'branch-001', 900, 2),
  (UNHEX(REPLACE('86161616-1616-1616-1616-161616161616','-','')), b'0', 'Meeting Room', 'branch-002', 1500, 3),
  (UNHEX(REPLACE('87171717-1717-1717-1717-171717171717','-','')), b'0', 'Team Room', 'branch-002', 2000, 4),
  (UNHEX(REPLACE('88181818-1818-1818-1818-181818181818','-','')), b'0', 'Studio', 'branch-003', 1100, 5),
  (UNHEX(REPLACE('89191919-1919-1919-1919-191919191919','-','')), b'0', 'Flex Team', 'branch-003', 1800, 6),
  (UNHEX(REPLACE('90909090-9090-9090-9090-909090909090','-','')), b'0', 'Single Desk', 'branch-004', 800, 7),
  (UNHEX(REPLACE('91919191-9191-9191-9191-919191919191','-','')), b'0', 'Collab Corner', 'branch-004', 1300, 8),
  (UNHEX(REPLACE('92929292-9292-9292-9292-929292929292','-','')), b'0', 'Creative Room', 'branch-005', 1700, 9),
  (UNHEX(REPLACE('93939393-9393-9393-9393-939393939393','-','')), b'0', 'Executive Suite', 'branch-005', 2400, 10);

-- Sample data for bookings
INSERT INTO bookings (id, attendeesQuantity, confirmationDate, created, renterEmail, endTime, scheduleDate, startTime, zoneId, status, totalAmount, office_id, paymentInformation_id, membership_id) VALUES
  (UNHEX(REPLACE('94141414-1414-1414-1414-141414141414','-','')), 2, '2026-07-01', '2026-07-01 09:00:00', 'alice@example.com', '2026-07-01 17:00:00', '2026-07-01', '2026-07-01 09:00:00', 'UTC', 'CONFIRMED', 1500, UNHEX(REPLACE('84141414-1414-1414-1414-141414141414','-','')), 1, UNHEX(REPLACE('74141414-1414-1414-1414-141414141414','-',''))),
  (UNHEX(REPLACE('95151515-1515-1515-1515-151515151515','-','')), 4, '2026-07-02', '2026-07-02 10:00:00', 'bob@example.com', '2026-07-02 18:00:00', '2026-07-02', '2026-07-02 10:00:00', 'UTC', 'CONFIRMED', 1800, UNHEX(REPLACE('85151515-1515-1515-1515-151515151515','-','')), 2, UNHEX(REPLACE('75151515-1515-1515-1515-151515151515','-',''))),
  (UNHEX(REPLACE('96161616-1616-1616-1616-161616161616','-','')), 3, '2026-07-03', '2026-07-03 11:00:00', 'carla@example.com', '2026-07-03 19:00:00', '2026-07-03', '2026-07-03 11:00:00', 'UTC', 'CONFIRMED', 2100, UNHEX(REPLACE('86161616-1616-1616-1616-161616161616','-','')), 3, UNHEX(REPLACE('76161616-1616-1616-1616-161616161616','-',''))),
  (UNHEX(REPLACE('97171717-1717-1717-1717-171717171717','-','')), 5, '2026-07-04', '2026-07-04 12:00:00', 'dario@example.com', '2026-07-04 20:00:00', '2026-07-04', '2026-07-04 12:00:00', 'UTC', 'CONFIRMED', 1250, UNHEX(REPLACE('87171717-1717-1717-1717-171717171717','-','')), 4, UNHEX(REPLACE('77171717-1717-1717-1717-171717171717','-',''))),
  (UNHEX(REPLACE('98181818-1818-1818-1818-181818181818','-','')), 2, '2026-07-05', '2026-07-05 13:00:00', 'eva@example.com', '2026-07-05 21:00:00', '2026-07-05', '2026-07-05 13:00:00', 'UTC', 'CONFIRMED', 980, UNHEX(REPLACE('88181818-1818-1818-1818-181818181818','-','')), 5, UNHEX(REPLACE('78181818-1818-1818-1818-181818181818','-',''))),
  (UNHEX(REPLACE('99191919-1919-1919-1919-191919191919','-','')), 6, '2026-07-06', '2026-07-06 14:00:00', 'fabio@example.com', '2026-07-06 22:00:00', '2026-07-06', '2026-07-06 14:00:00', 'UTC', 'CONFIRMED', 1650, UNHEX(REPLACE('89191919-1919-1919-1919-191919191919','-','')), 6, UNHEX(REPLACE('79191919-1919-1919-1919-191919191919','-',''))),
  (UNHEX(REPLACE('10001000-1000-1000-1000-100010001000','-','')), 3, '2026-07-07', '2026-07-07 15:00:00', 'gina@example.com', '2026-07-07 23:00:00', '2026-07-07', '2026-07-07 15:00:00', 'UTC', 'CONFIRMED', 1100, UNHEX(REPLACE('90909090-9090-9090-9090-909090909090','-','')), 7, UNHEX(REPLACE('80808080-8080-8080-8080-808080808080','-',''))),
  (UNHEX(REPLACE('10011001-1001-1001-1001-100110011001','-','')), 4, '2026-07-08', '2026-07-08 16:00:00', 'hugo@example.com', '2026-07-08 00:00:00', '2026-07-08', '2026-07-08 16:00:00', 'UTC', 'CONFIRMED', 1400, UNHEX(REPLACE('91919191-9191-9191-9191-919191919191','-','')), 8, UNHEX(REPLACE('81818181-8181-8181-8181-818181818181','-',''))),
  (UNHEX(REPLACE('10021002-1002-1002-1002-100210021002','-','')), 2, '2026-07-09', '2026-07-09 17:00:00', 'ines@example.com', '2026-07-09 01:00:00', '2026-07-09', '2026-07-09 17:00:00', 'UTC', 'CONFIRMED', 2200, UNHEX(REPLACE('92929292-9292-9292-9292-929292929292','-','')), 9, UNHEX(REPLACE('82828282-8282-8282-8282-828282828282','-',''))),
  (UNHEX(REPLACE('10031003-1003-1003-1003-100310031003','-','')), 5, '2026-07-10', '2026-07-10 18:00:00', 'julian@example.com', '2026-07-10 02:00:00', '2026-07-10', '2026-07-10 18:00:00', 'UTC', 'CONFIRMED', 1950, UNHEX(REPLACE('93939393-9393-9393-9393-939393939393','-','')), 10, UNHEX(REPLACE('83838383-8383-8383-8383-838383838383','-','')));
