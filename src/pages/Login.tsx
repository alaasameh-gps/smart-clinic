import { useState } from 'react';

function Login({ onLogin }: { onLogin: (role: string) => void }) {
  const [doctorId, setDoctorId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [error, setError] = useState('');
  const [showDoctorLogin, setShowDoctorLogin] = useState(true);

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (doctorId === '12345') {
      onLogin('doctor');
    } else {
      setError('❌ رقم ID الدكتور غير صحيح');
    }
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (staffId === '12345') {
      onLogin('staff');
    } else {
      setError('❌ رقم ID الموظف غير صحيح');
    }
  };

  return (
    <div className="login-page">
      <div className="login-tabs">
        <button 
          className={`login-tab ${showDoctorLogin ? 'active' : ''}`}
          onClick={() => { setShowDoctorLogin(true); setError(''); }}
        >
          👨‍⚕️ دكتور
        </button>
        <button 
          className={`login-tab ${!showDoctorLogin ? 'active' : ''}`}
          onClick={() => { setShowDoctorLogin(false); setError(''); }}
        >
          👥 موظف
        </button>
      </div>

      {showDoctorLogin ? (
        <form onSubmit={handleDoctorSubmit}>
          <h3>👨‍⚕️ دخول الدكتور</h3>
          <input 
            type="number" 
            placeholder="أدخل رقم ID الدكتور (5 أرقام)" 
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
          <button type="submit">دخول</button>
        </form>
      ) : (
        <form onSubmit={handleStaffSubmit}>
          <h3>👥 دخول الموظفين</h3>
          <input 
            type="number" 
            placeholder="أدخل رقم ID الموظف (5 أرقام)" 
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
          <button type="submit">دخول</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;