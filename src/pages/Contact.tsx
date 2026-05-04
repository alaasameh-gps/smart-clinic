import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contacts = [
    { dept: "📞 الاستقبال والحجوزات", phone: "01234567890", name: "أحمد سعيد", hours: "السبت - الخميس 9ص - 9م", icon: "🏥" },
    { dept: "👨‍⚕️ قسم الأطباء", phone: "01123456789", name: "د. محمد علي", hours: "السبت - الأربعاء 10ص - 2م", icon: "🩺" },
    { dept: "💰 قسم الحسابات", phone: "01098765432", name: "سارة محمود", hours: "الأحد - الخميس 9ص - 4م", icon: "💳" },
    { dept: "🚑 الطوارئ (24/7)", phone: "123", name: "خدمة الطوارئ", hours: "على مدار الساعة", icon: "🚨" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ تم إرسال رسالتك بنجاح يا ${formData.name}، سنرد عليك قريباً`);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-full-page">
      <div className="contact-header-full">
        <h1>📞 اتصل بنا</h1>
        <p>نحن هنا لمساعدتك على مدار الساعة</p>
      </div>

      <div className="contact-grid-full">
        {/* جهة اليمين - معلومات الاتصال */}
        <div className="contact-info-full">
          <h2>📋 معلومات الاتصال</h2>
          <div className="contacts-list-full">
            {contacts.map(c => (
              <div key={c.dept} className="contact-card-full">
                <div className="contact-icon-full">{c.icon}</div>
                <div className="contact-details-full">
                  <div className="contact-dept-full">{c.dept}</div>
                  <div className="contact-person-full">👤 {c.name}</div>
                  <a href={`tel:${c.phone}`} className="contact-phone-full">
                    📱 {c.phone}
                  </a>
                  <div className="contact-hours-full">🕐 {c.hours}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="location-card-full">
            <h3>📍 موقع العيادة</h3>
            <p>شارع النيل، برج العيادات الطبية</p>
            <p>الدور الثالث، القاهرة</p>
            <a href="https://maps.google.com" target="_blank" className="map-link-full">
              🗺️ عرض على الخريطة
            </a>
          </div>
        </div>

        {/* جهة اليسار - نموذج المراسلة */}
        <div className="contact-form-full">
          <h2>✉️ أرسل لنا رسالة</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group-full">
              <label>👤 الاسم الكامل</label>
              <input 
                type="text" 
                placeholder="أدخل اسمك" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            <div className="form-row-full">
              <div className="form-group-full">
                <label>📧 البريد الإلكتروني</label>
                <input 
                  type="email" 
                  placeholder="example@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group-full">
                <label>📞 رقم الهاتف</label>
                <input 
                  type="tel" 
                  placeholder="01xxxxxxxxx" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group-full">
              <label>📝 الموضوع</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              >
                <option value="">اختر نوع الاستفسار</option>
                <option>استفسار عن حجز موعد</option>
                <option>استفسار عن الخدمات</option>
                <option>شكوى أو اقتراح</option>
                <option>استفسار طبي</option>
                <option>أخرى</option>
              </select>
            </div>

            <div className="form-group-full">
              <label>💬 الرسالة</label>
              <textarea 
                placeholder="اكتب رسالتك هنا..." 
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn-full">
              📤 إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;