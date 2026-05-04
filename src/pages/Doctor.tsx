import { useState } from 'react';

function Doctor() {
  const [appointments] = useState([
    { id: 1, patient: "أحمد محمد", time: "10:00", status: "قادم", phone: "01001234567" },
    { id: 2, patient: "سارة محمود", time: "11:00", status: "بالانتظار", phone: "01007654321" },
    { id: 3, patient: "محمد إبراهيم", time: "12:00", status: "تم الكشف", phone: "01009876543" },
    { id: 4, patient: "فاطمة علي", time: "13:00", status: "قادم", phone: "01005556677" },
  ]);

  const [todayStats] = useState({
    patients: 12,
    completed: 8,
    waiting: 4
  });

  return (
    <div className="doctor-full-page">
      <div className="doctor-header-full">
        <h1>👨‍⚕️ لوحة تحكم الدكتور</h1>
        <p>مرحباً د. أحمد علي | اليوم {new Date().toLocaleDateString('ar-EG')}</p>
      </div>

      <div className="doctor-stats">
        <div className="stat-doctor">
          <div className="stat-number">{todayStats.patients}</div>
          <div className="stat-label">إجمالي المرضى</div>
        </div>
        <div className="stat-doctor green">
          <div className="stat-number">{todayStats.completed}</div>
          <div className="stat-label">تم الكشف</div>
        </div>
        <div className="stat-doctor orange">
          <div className="stat-number">{todayStats.waiting}</div>
          <div className="stat-label">بالانتظار</div>
        </div>
      </div>

      <div className="appointments-list-doctor">
        <h2>📋 قائمة المواعيد اليوم</h2>
        <div className="appointments-table-doctor">
          <div className="appointment-row header">
            <span>المريض</span>
            <span>الوقت</span>
            <span>رقم الهاتف</span>
            <span>الحالة</span>
            <span></span>
          </div>
          {appointments.map(a => (
            <div key={a.id} className="appointment-row">
              <span className="patient-name">{a.patient}</span>
              <span className="patient-time">🕐 {a.time}</span>
              <span className="patient-phone">📞 {a.phone}</span>
              <span className={`status ${a.status === 'تم الكشف' ? 'completed' : a.status === 'بالانتظار' ? 'waiting' : 'upcoming'}`}>
                {a.status}
              </span>
              <button className="action-btn">بدء الكشف</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctor;