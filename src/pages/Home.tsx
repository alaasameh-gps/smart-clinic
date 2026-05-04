import { useState, useEffect } from 'react';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const greeting = hours < 12 ? "🌅 صباح الخير" : hours < 18 ? "☀️ مساء الخير" : "🌙 مساء الخير";

  return (
    <div className="home-page">
      {/* قسم الترحيب الكبير */}
      <div className="hero-section">
        <div className="greeting-badge">{greeting}</div>
        <h1 className="main-title">مرحباً بك في <span className="gradient-text">العيادة الذكية</span></h1>
        <p className="subtitle">نقدم لك رعاية صحية متكاملة بلمسة تكنولوجية عصرية</p>
        <div className="cta-buttons">
          <button className="cta-primary" onClick={() => window.location.href = '#/booking'}>📅 احجز موعدك الآن</button>
          <button className="cta-secondary" onClick={() => window.location.href = '#/queue'}>🚶 تابع دورك</button>
        </div>
      </div>

      {/* بطاقات الخدمات السريعة */}
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">⚡</div>
          <h3>حجز سريع</h3>
          <p>احجز موعدك في أقل من دقيقة</p>
        </div>
        <div className="service-card">
          <div className="service-icon">📊</div>
          <h3>متابعة فورية</h3>
          <p>تابع دورك لحظة بلحظة</p>
        </div>
        <div className="service-card">
          <div className="service-icon">👨‍⚕️</div>
          <h3>أطباء استشاريون</h3>
          <p>أفضل الكوادر الطبية</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🏥</div>
          <h3>تجهيزات حديثة</h3>
          <p>أحدث التقنيات الطبية</p>
        </div>
      </div>

      {/* قسم المعلومات */}
      <div className="info-sections">
        <div className="info-card working-hours">
          <div className="info-icon">🕐</div>
          <h3>مواعيد العمل</h3>
          <p>السبت - الخميس: <strong>9ص - 9م</strong></p>
          <p>الجمعة: <strong>مغلق</strong></p>
        </div>

        <div className="info-card contact-info">
          <div className="info-icon">📞</div>
          <h3>اتصل بنا</h3>
          <p>📱 <a href="tel:01234567890">01234567890</a></p>
          <p>📱 <a href="tel:01123456789">01123456789</a></p>
        </div>

        <div className="info-card location-info">
          <div className="info-icon">📍</div>
          <h3>العنوان</h3>
          <p>شارع النيل، برج العيادات</p>
          <p>الدور الثالث، القاهرة</p>
        </div>
      </div>

      {/* مميزات العيادة */}
      <div className="features-section">
        <h2>✨ مميزات العيادة الذكية</h2>
        <div className="features-list">
          <div className="feature-item">✅ حجز إلكتروني سريع</div>
          <div className="feature-item">✅ متابعة الدور لحظة بلحظة</div>
          <div className="feature-item">✅ أطباء استشاريون</div>
          <div className="feature-item">✅ تجهيزات طبية حديثة</div>
          <div className="feature-item">✅ تذكير آلي بالمواعيد</div>
          <div className="feature-item">✅ ملفات طبية إلكترونية</div>
        </div>
      </div>
    </div>
  );
}

export default Home;