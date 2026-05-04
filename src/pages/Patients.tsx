import { useState } from 'react';

function Patients() {
  const [patients] = useState([
    { id: 1, name: "أحمد محمد", phone: "01001234567", lastVisit: "2025-04-20", doctor: "د. أحمد علي", status: "نشط" },
    { id: 2, name: "سارة محمود", phone: "01007654321", lastVisit: "2025-04-25", doctor: "د. سارة محمود", status: "نشط" },
    { id: 3, name: "محمد إبراهيم", phone: "01009876543", lastVisit: "2025-04-28", doctor: "د. محمد إبراهيم", status: "قادم" },
    { id: 4, name: "فاطمة علي", phone: "01005556677", lastVisit: "2025-04-15", doctor: "د. نورا حسن", status: "نشط" },
    { id: 5, name: "يوسف عبدالله", phone: "01004443322", lastVisit: "2025-04-29", doctor: "د. أحمد علي", status: "قادم" },
  ]);

  return (
    <div className="page patients-page">
      <div className="patients-header">
        <h2>👥 قائمة المرضى</h2>
        <p>إدارة وعرض جميع المرضى المسجلين في العيادة</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{patients.length}</div>
          <div className="stat-label">إجمالي المرضى</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{patients.filter(p => p.status === 'نشط').length}</div>
          <div className="stat-label">مرضى نشطون</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{patients.filter(p => p.status === 'قادم').length}</div>
          <div className="stat-label">مرضى قادمون</div>
        </div>
      </div>

      <div className="patients-table-container">
        <div className="table-header">
          <input type="text" placeholder="🔍 بحث عن مريض..." className="search-input" />
        </div>
        <table className="patients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم المريض</th>
              <th>رقم الهاتف</th>
              <th>آخر زيارة</th>
              <th>الدكتور المعالج</th>
              <th>الحالة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><strong>{p.name}</strong></td>
                <td>{p.phone}</td>
                <td>{p.lastVisit}</td>
                <td>{p.doctor}</td>
                <td>
                  <span className={`status-badge ${p.status === 'نشط' ? 'active' : 'upcoming'}`}>
                    {p.status === 'نشط' ? '🟢 نشط' : '🟡 قادم'}
                  </span>
                </td>
                <td><button className="small-btn">حجز موعد</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;