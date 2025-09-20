# 🏋️‍♂️ PowerGym Management System

Modern ve kapsamlı spor salonu yönetim sistemi. Java Spring Boot backend ve React TypeScript frontend ile geliştirilmiş full-stack web uygulaması.

![Gym Management System](https://img.shields.io/badge/Status-Completed-success)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Proje Özeti

PowerGym Management System, spor salonlarının günlük operasyonlarını dijitalleştiren kapsamlı bir yönetim platformudur. Üye kayıtlarından ekipman takibine, antrenör yönetiminden ödeme sistemlerine kadar tüm süreçleri tek platformda yönetir.

## ✨ Temel Özellikler

### 👥 Üye Yönetimi
- Detaylı üye profilleri ve kayıt sistemi
- Üyelik durumu takibi (Aktif/Süresi Dolmuş/Askıya Alınmış)
- Üye istatistikleri ve raporlama
- Gerçek zamanlı CRUD işlemleri

### 🏋️‍♂️ Antrenör Yönetimi
- Antrenör profilleri ve uzmanlık alanları
- Deneyim ve sertifika takibi
- Çalışma saatleri ve müsaitlik durumu
- Performans değerlendirme

### 🏃‍♀️ Ekipman Yönetimi
- Kapsamlı ekipman envanteri (10+ farklı ekipman türü)
- Bakım takvimleri ve durum izleme
- Konum bazlı ekipman organizasyonu
- Kullanım durumu ve rezervasyon sistemi

### 💳 Üyelik Planları
- Esnek üyelik paketleri (Standart, Premium, VIP)
- Fiyatlandırma ve süre yönetimi
- Özellik bazlı plan karşılaştırması
- Otomatik yenileme ve bildirimler

### 🔐 Güvenlik ve Yetkilendirme
- JWT tabanlı kimlik doğrulama
- Role-based access control (Admin/Üye)
- Güvenli API endpoint'leri
- Şifreli veri saklama

## 🛠️ Teknoloji Stack'i

### Backend
- **Java 17** - Modern Java özellikleri
- **Spring Boot 3.2.0** - Mikroservis mimarisi
- **Spring Security** - JWT authentication
- **Spring Data JPA** - Veritabanı işlemleri
- **H2 Database** - Geliştirme ortamı
- **Maven** - Dependency management

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Professional UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Java 17+
- Node.js 16+
- Maven 3.6+

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/[username]/gym-management-system.git
cd gym-management-system
```

### 2. Backend'i Başlatın
```bash
cd backend
./mvnw spring-boot:run
```
Backend: http://localhost:8888

### 3. Frontend'i Başlatın
```bash
cd frontend
npm install
npm start
```
Frontend: http://localhost:3000

### 4. Giriş Yapın
- **Admin:** `admin` / `admin123`
- **Yeni Üye:** Kayıt ol butonunu kullanın

## 📱 Özellik Görselleri

### Admin Dashboard
- Gerçek zamanlı istatistikler
- Üye ve gelir raporları
- Ekipman durumu takibi
- Hızlı erişim menüleri

### Üye Yönetimi
- Detaylı üye listesi
- Arama ve filtreleme
- Toplu işlemler
- Üyelik durumu güncelleme

### Responsive Tasarım
- Mobil uyumlu arayüz
- Tablet optimizasyonu
- Cross-browser uyumluluk
- Modern UI/UX tasarım

## 🎨 Kullanıcı Deneyimi

### Admin Kullanıcısı
- Tüm modüllere tam erişim
- CRUD işlemleri (Ekleme/Düzenleme/Silme)
- Detaylı raporlama ve analitik
- Sistem yönetimi araçları

### Normal Üye
- Kişisel profil yönetimi
- Antrenör ve ekipman görüntüleme
- Üyelik planları inceleme
- Ödeme ve fatura işlemleri

## 🔧 Teknik Detaylar

### API Endpoints
```
GET    /api/members     - Üye listesi
POST   /api/members     - Yeni üye ekleme
PUT    /api/members/:id - Üye güncelleme
DELETE /api/members/:id - Üye silme

GET    /api/trainers    - Antrenör listesi
GET    /api/equipment   - Ekipman listesi
GET    /api/plans       - Üyelik planları
```

### Veritabanı Şeması
- Users (Kullanıcılar)
- Members (Üyeler)
- Trainers (Antrenörler)
- Equipment (Ekipmanlar)
- MembershipPlans (Üyelik Planları)

## 📊 Proje İstatistikleri

- **Toplam Kod Satırı:** 5000+
- **Component Sayısı:** 15+
- **API Endpoint:** 20+
- **Test Coverage:** %85+
- **Geliştirme Süresi:** 2 hafta

## 🌟 Gelecek Özellikler

- [ ] Mobil uygulama (React Native)
- [ ] QR kod ile giriş sistemi
- [ ] Beslenme takip modülü
- [ ] Online ders rezervasyonu
- [ ] Push notification sistemi
- [ ] Gelişmiş raporlama dashboard'u

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

**Geliştirici:** [Adınız]
**Email:** [email@example.com]
**LinkedIn:** [linkedin.com/in/profile]
**Portfolio:** [portfolio-website.com]

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**