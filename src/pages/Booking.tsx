import { useState } from 'react';
import { doctors } from '../types';

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    doctor: doctors[0],
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ تم حجز موعدك بنجاح يا ${formData.name}!`);
    setFormData({ name: '', phone: '', doctor: doctors[0], date: '', time: '', notes: '' });
  };

  return (
    <div className="booking-full-page">
      <div className="booking-header-full">
        <h1>📝 حجز موعد جديد</h1>
        <p>املأ البيانات التالية لحجز موعدك بسهولة وسرعة</p>
      </div>

      <div className="booking-steps">
        <div className="step-item">
          <div className="step-number">1</div>
          <div className="step-text">اختر الدكتور</div>
        </div>
        <div className="step-arrow">→</div>
        <div className="step-item">
          <div className="step-number">2</div>
          <div className="step-text">اختر التاريخ</div>
        </div>
        <div className="step-arrow">→</div>
        <div className="step-item">
          <div className="step-number">3</div>
          <div className="step-text">اختر الوقت</div>
        </div>
        <div className="step-arrow">→</div>
        <div className="step-item">
          <div className="step-number">4</div>
          <div className="step-text">تأكيد الحجز</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form-full">
        <div className="form-row-two">
          <div className="form-group-large">
            <label>👤 الاسم الكامل</label>
            <input type="text" name="name" placeholder="أدخل اسمك الثلاثي" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group-large">
            <label>📞 رقم الهاتف</label>
            <input type="tel" name="phone" placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group-large">
          <label>👨‍⚕️ اختر الدكتور</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange}>
            {doctors.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="form-row-two">
          <div className="form-group-large">
            <label>📅 التاريخ</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group-large">
            <label>⏰ الوقت</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group-large">
          <label>📝 ملاحظات إضافية</label>
          <textarea name="notes" placeholder="أي أعراض أو ملاحظات تريد إضافتها..." rows={4} value={formData.notes} onChange={handleChange}></textarea>
        </div>

        <div className="booking-summary">
          <h3>📋 ملخص الحجز</h3>
          <div className="summary-item">
            <span>اسم المريض:</span>
            <strong>{formData.name || "——"}</strong>
          </div>
          <div className="summary-item">
            <span>الدكتور:</span>
            <strong>{formData.doctor.split(' - ')[0] || "——"}</strong>
          </div>
          <div className="summary-item">
            <span>التاريخ والوقت:</span>
            <strong>{formData.date || "——"} {formData.time && `الساعة ${formData.time}`}</strong>
          </div>
        </div>

        <button type="submit" className="submit-btn-full">
          ✅ تأكيد الحجز
        </button>
      </form>
    </div>
  );
}

export default Booking;