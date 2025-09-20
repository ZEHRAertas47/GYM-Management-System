# Gym Management System - Kurulum Rehberi

## Gereksinimler

### Backend
- Java 17 veya üzeri
- Maven 3.6+
- MySQL 8.0+

### Frontend
- Node.js 16+
- npm veya yarn

## Kurulum Adımları

### 1. Veritabanı Kurulumu

MySQL'de yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE gym_management;
CREATE USER 'gym_user'@'localhost' IDENTIFIED BY 'gym_password';
GRANT ALL PRIVILEGES ON gym_management.* TO 'gym_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Kurulumu

```bash
cd backend
mvn clean install
```

Veritabanı bağlantı ayarlarını `application.yml` dosyasında güncelleyin:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/gym_management?createDatabaseIfNotExist=true
    username: gym_user
    password: gym_password
```

Backend'i çalıştırın:

```bash
mvn spring-boot:run
```

Backend http://localhost:8080 adresinde çalışacaktır.

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## İlk Kullanım

1. Uygulamayı başlattıktan sonra http://localhost:3000 adresine gidin
2. "Kayıt Ol" linkine tıklayarak yeni bir hesap oluşturun
3. Giriş yapın ve sistemi kullanmaya başlayın

## Admin Hesabı Oluşturma

İlk admin hesabını oluşturmak için veritabanında manuel olarak bir kullanıcının rolünü ADMIN yapabilirsiniz:

```sql
UPDATE users SET role = 'ADMIN' WHERE username = 'your_username';
```

## API Endpoints

### Authentication
- POST `/api/auth/signin` - Giriş yap
- POST `/api/auth/signup` - Kayıt ol

### Members
- GET `/api/members` - Tüm üyeleri listele
- GET `/api/members/{id}` - Üye detayı
- POST `/api/members` - Yeni üye ekle
- PUT `/api/members/{id}` - Üye güncelle
- DELETE `/api/members/{id}` - Üye sil

### Trainers
- GET `/api/trainers` - Tüm antrenörleri listele
- GET `/api/trainers/{id}` - Antrenör detayı
- POST `/api/trainers` - Yeni antrenör ekle
- PUT `/api/trainers/{id}` - Antrenör güncelle
- DELETE `/api/trainers/{id}` - Antrenör sil

### Equipment
- GET `/api/equipment` - Tüm ekipmanları listele
- GET `/api/equipment/{id}` - Ekipman detayı
- POST `/api/equipment` - Yeni ekipman ekle
- PUT `/api/equipment/{id}` - Ekipman güncelle
- DELETE `/api/equipment/{id}` - Ekipman sil

### Membership Plans
- GET `/api/membership-plans` - Tüm planları listele
- GET `/api/membership-plans/active` - Aktif planları listele
- GET `/api/membership-plans/{id}` - Plan detayı
- POST `/api/membership-plans` - Yeni plan ekle
- PUT `/api/membership-plans/{id}` - Plan güncelle
- DELETE `/api/membership-plans/{id}` - Plan sil

## Sorun Giderme

### Backend başlamıyor
- Java 17+ kurulu olduğundan emin olun
- MySQL servisinin çalıştığından emin olun
- Veritabanı bağlantı bilgilerini kontrol edin

### Frontend başlamıyor
- Node.js 16+ kurulu olduğundan emin olun
- `npm install` komutunu çalıştırdığınızdan emin olun
- Port 3000'in boş olduğundan emin olun

### CORS Hatası
- Backend'in http://localhost:8080 adresinde çalıştığından emin olun
- Frontend'in http://localhost:3000 adresinde çalıştığından emin olun