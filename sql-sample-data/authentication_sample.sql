USE workffice;

-- Sample data for auth_users
INSERT INTO auth_users (id, address, bio, email, lastname, name, password, profileImage, status) VALUES
  (UNHEX(REPLACE('11111111-1111-1111-1111-111111111111','-','')), '123 Main St', 'Product designer', 'alice@example.com', 'Smith', 'Alice', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'alice.png', 'ACTIVE'),
  (UNHEX(REPLACE('22222222-2222-2222-2222-222222222222','-','')), '456 Oak St', 'Startup founder', 'bob@example.com', 'Jones', 'Bob', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'bob.png', 'ACTIVE'),
  (UNHEX(REPLACE('33333333-3333-3333-3333-333333333333','-','')), '789 Pine St', 'Marketing lead', 'carla@example.com', 'Garcia', 'Carla', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'carla.png', 'ACTIVE'),
  (UNHEX(REPLACE('44444444-4444-4444-4444-444444444444','-','')), '101 Maple St', 'Software engineer', 'dario@example.com', 'Lopez', 'Dario', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'dario.png', 'ACTIVE'),
  (UNHEX(REPLACE('55555555-5555-5555-5555-555555555555','-','')), '202 Birch St', 'Operations manager', 'eva@example.com', 'Martinez', 'Eva', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'eva.png', 'ACTIVE'),
  (UNHEX(REPLACE('66666666-6666-6666-6666-666666666666','-','')), '303 Cedar St', 'Sales rep', 'fabio@example.com', 'Perez', 'Fabio', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'fabio.png', 'ACTIVE'),
  (UNHEX(REPLACE('77777777-7777-7777-7777-777777777777','-','')), '404 Elm St', 'Customer success', 'gina@example.com', 'Rodriguez', 'Gina', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'gina.png', 'ACTIVE'),
  (UNHEX(REPLACE('88888888-8888-8888-8888-888888888888','-','')), '505 Willow St', 'Data analyst', 'hugo@example.com', 'Sanchez', 'Hugo', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'hugo.png', 'ACTIVE'),
  (UNHEX(REPLACE('99999999-9999-9999-9999-999999999999','-','')), '606 Ash St', 'Designer', 'ines@example.com', 'Diaz', 'Ines', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'ines.png', 'ACTIVE'),
  (UNHEX(REPLACE('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','-','')), '707 Spruce St', 'Product manager', 'julian@example.com', 'Ruiz', 'Julian', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJ9vA6bM8u', 'julian.png', 'ACTIVE');
