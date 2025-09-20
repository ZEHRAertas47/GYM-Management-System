-- ADMIN USER: admin / admin123
INSERT INTO users (username, email, password, first_name, last_name, role, created_at, updated_at, enabled) 
VALUES ('admin', 'admin@gym.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyPW9wGjkUBFOxf90Qfq1e', 'Admin', 'Kullanıcı', 'ADMIN', NOW(), NOW(), true)
ON DUPLICATE KEY UPDATE password = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyPW9wGjkUBFOxf90Qfq1e';

-- Sample membership plans
INSERT INTO membership_plans (name, description, price, duration_months, access_hours, includes_personal_trainer, includes_group_classes, active, created_at, updated_at)
VALUES 
('Temel Plan', 'Temel spor salonu erişimi', 150.00, 1, '06:00-22:00', false, true, true, NOW(), NOW()),
('Premium Plan', 'Tam erişim ve grup dersleri', 250.00, 1, '24/7', false, true, true, NOW(), NOW()),
('VIP Plan', 'Kişisel antrenör dahil premium plan', 450.00, 1, '24/7', true, true, true, NOW(), NOW());

-- Sample equipment
INSERT INTO equipment (name, type, brand, model, serial_number, status, location, created_at, updated_at)
VALUES 
('Koşu Bandı', 'CARDIO', 'TechnoGym', 'Run Race 1400', 'EQ12345678', 'AVAILABLE', 'Kardiyovasküler Alan', NOW(), NOW()),
('Leg Press', 'STRENGTH', 'Life Fitness', 'Signature Series', 'EQ87654321', 'AVAILABLE', 'Güç Antrenmanı Alanı', NOW(), NOW()),
('Dumbell Set', 'FREE_WEIGHTS', 'Hammer Strength', 'Urethane', 'EQ11223344', 'AVAILABLE', 'Serbest Ağırlık Alanı', NOW(), NOW());