USE workffice;

-- Sample data for auth_users
SET @generic_avatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNkZGQiLz48Y2lyY2xlIGN4PSI4IiBjeT0iNiIgcj0iMyIvPjxwYXRoIGQ9Ik0yIDE2YTYgNiAwIDAgMSAxMiAwIi8+PC9zdmc+';

INSERT INTO auth_users (id, address, bio, email, lastname, name, password, profileImage, status) VALUES
  (UNHEX(REPLACE('11111111-1111-1111-1111-111111111111','-','')), '123 Main St', 'Product designer', 'alice@example.com', 'Smith', 'Alice', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('22222222-2222-2222-2222-222222222222','-','')), '456 Oak St', 'Startup founder', 'bob@example.com', 'Jones', 'Bob', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('33333333-3333-3333-3333-333333333333','-','')), '789 Pine St', 'Marketing lead', 'carla@example.com', 'Garcia', 'Carla', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('44444444-4444-4444-4444-444444444444','-','')), '101 Maple St', 'Software engineer', 'dario@example.com', 'Lopez', 'Dario', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('55555555-5555-5555-5555-555555555555','-','')), '202 Birch St', 'Operations manager', 'eva@example.com', 'Martinez', 'Eva', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('66666666-6666-6666-6666-666666666666','-','')), '303 Cedar St', 'Sales rep', 'fabio@example.com', 'Perez', 'Fabio', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('77777777-7777-7777-7777-777777777777','-','')), '404 Elm St', 'Customer success', 'gina@example.com', 'Rodriguez', 'Gina', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('88888888-8888-8888-8888-888888888888','-','')), '505 Willow St', 'Data analyst', 'hugo@example.com', 'Sanchez', 'Hugo', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('99999999-9999-9999-9999-999999999999','-','')), '606 Ash St', 'Designer', 'ines@example.com', 'Diaz', 'Ines', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE'),
  (UNHEX(REPLACE('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','-','')), '707 Spruce St', 'Product manager', 'julian@example.com', 'Ruiz', 'Julian', '$2a$10$FMiDGN0zO3OrqnXf.NxVNeKYEQr72ZGeQ5OHZBjjgaZD4A.FabjPe', @generic_avatar, 'ACTIVE');

-- Sample office-holder account (password: Owner123!)
INSERT INTO auth_users (id, address, bio, email, lastname, name, password, profileImage, status) VALUES
  (UNHEX(REPLACE('b0b0b0b0-0000-0000-0000-b0b0b0b00011','-','')), '11 Office Way', 'Sample office owner', 'owner11@example.com', 'Owner', 'Olivia', '$2a$05$a.LjVK3M718XUQ.tRuTB0.9YhvaeHinLs0t4a1HwbeIReFFz8saEi', @generic_avatar, 'ACTIVE');
