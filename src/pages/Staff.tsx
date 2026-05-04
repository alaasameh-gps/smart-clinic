import { useState } from 'react';

function Staff() {
  const [staff] = useState([
    { id: 1, name: "أحمد سعيد", role: "مدير الاستقبال", shift: "صباحي", phone: "01234567890" },
    { id: 2, name: "سارة محمود", role: "محاسب", shift: "صباحي", phone: "01123456789" },
    { id: 3, name: "محمد علي", role: "فني مختبر", shift: "مسائي", phone: "01098765432" },
    { id: 4, name: "نورا حسن", role: "صيدلانية", shift: "صباحي", phone: "01005556677" },
    { id: 5, name: "يوسف عبدالله", role: "موظف استقبال", shift: "مسائي", phone: "01004443322" },
  ]);

  const [pendingRequests] = useState([
    { id: 1, patient: "أحمد محمد", type: "تحليل دم", time: "10:30" },
    { id: 2, patient: "سارة محمود", type: "أشعة", time: "11:00" },
  ]);

  return (
    <div className="staff-full-page">
      <div className="staff-header-full">
        <h1>👥 لوحة تحكم الموظفين</h1>
        <p>إدارة الموظفين والمهام اليومية</p>
      </div>

      <div className="staff-stats">
        <div className="stat-staff">
          <div className="stat-number">{staff.length}</div>
          <div className="stat-label">إجمالي الموظفين</div>
        </div>
        <div className="stat-staff">
          <div className="stat-number">{staff.filter(s => s.shift === 'صباحي').length}</div>
          <div className="stat-label">الفترة الصباحية</div>
        </div>
        <div className="stat-staff">
          <div className="stat-number">{staff.filter(s => s.shift === 'مسائي').length}</div>
          <div className="stat-label">الفترة المسائية</div>
        </div>
      </div>

      <div className="staff-sections">
        <div className="staff-list-section">
          <h2>📋 قائمة الموظفين</h2>
          <div className="staff-table">
            <div className="staff-row header">
              <span>الاسم</span>
              <span>الوظيفة</span>
              <span>الفترة</span>
              <span>رقم الهاتف</span>
            </div>
            {staff.map(s => (
              <div key={s.id} className="staff-row">
                <span className="staff-name">{s.name}</span>
                <span className="staff-role">{s.role}</span>
                <span className={`shift-badge ${s.shift === 'صباحي' ? 'morning' : 'evening'}`}>
                  {s.shift}
                </span>
                <span className="staff-phone">{s.phone}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="requests-section">
          <h2>📌 الطلبات المعلقة</h2>
          {pendingRequests.map(r => (
            <div key={r.id} className="request-card">
              <div className="request-info">
                <span className="request-patient">👤 {r.patient}</span>
                <span className="request-type">🔬 {r.type}</span>
                <span className="request-time">🕐 {r.time}</span>
              </div>
              <button className="request-btn">معالجة</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staff;