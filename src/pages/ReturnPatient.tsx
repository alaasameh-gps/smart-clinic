import { useState } from 'react';

function ReturnPatient() {
  const [patientId, setPatientId] = useState('');
  const [foundPatient, setFoundPatient] = useState<any>(null);

  const patients = [
    { id: 1, name: "أحمد محمد", phone: "01001234567", lastVisit: "2025-04-20", doctor: "د. أحمد علي", age: 35, bloodType: "O+" },
    { id: 2, name: "سارة محمود", phone: "01007654321", lastVisit: "2025-04-25", doctor: "د. سارة محمود", age: 28, bloodType: "A+" },
    { id: 3, name: "محمد إبراهيم", phone: "01009876543", lastVisit: "2025-04-28", doctor: "د. محمد إبراهيم", age: 42, bloodType: "B+" },
  ];

  const handleSearch = () => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    if (patient) {
      setFoundPatient(patient);
    } else {
      alert('❌ لم يتم العثور على مريض بهذا الرقم');
      setFoundPatient(null);
    }
  };

  const handleBook = () => {
    alert(`✅ تم حجز موعد جديد للمريض ${foundPatient.name}`);
  };

  return (
    <div className="return-patient-full">
      <div className="return-header-full">
        <h1>🔄 مريض عائد</h1>
        <p>أدخل رقم الملف لعرض بيانات المريض وحجز موعد جديد بسرعة</p>
      </div>

      <div className="search-section-full">
        <div className="search-box-full">
          <input 
            type="number" 
            placeholder="🔍 أدخل رقم ملف المريض" 
            value={patientId} 
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button onClick={handleSearch}>بحث</button>
        </div>
      </div>

      {foundPatient && (
        <div className="patient-info-full">
          <div className="patient-header-full">
            <span className="patient-icon-full">👤</span>
            <h2>بيانات المريض</h2>
          </div>
          <div className="patient-details-full">
            <div className="detail-row-full">
              <span className="detail-label-full">الاسم الكامل:</span>
              <span className="detail-value-full">{foundPatient.name}</span>
            </div>
            <div className="detail-row-full">
              <span className="detail-label-full">رقم الهاتف:</span>
              <span className="detail-value-full">{foundPatient.phone}</span>
            </div>
            <div className="detail-row-full">
              <span className="detail-label-full">آخر زيارة:</span>
              <span className="detail-value-full">{foundPatient.lastVisit}</span>
            </div>
            <div className="detail-row-full">
              <span className="detail-label-full">الدكتور المعالج:</span>
              <span className="detail-value-full">{foundPatient.doctor}</span>
            </div>
            <div className="detail-row-full">
              <span className="detail-label-full">العمر:</span>
              <span className="detail-value-full">{foundPatient.age} سنة</span>
            </div>
            <div className="detail-row-full">
              <span className="detail-label-full">فصيلة الدم:</span>
              <span className="detail-value-full">{foundPatient.bloodType}</span>
            </div>
          </div>
          <button className="book-btn-full" onClick={handleBook}>
            📅 حجز موعد جديد
          </button>
        </div>
      )}
    </div>
  );
}

export default ReturnPatient;
