

import { useState } from 'react';
import './index.css';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Queue from './pages/Queue';
import Patients from './pages/Patients';
import ReturnPatient from './pages/ReturnPatient';
import Contact from './pages/Contact';
import Doctor from './pages/Doctor';
import Staff from './pages/Staff';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showDevs, setShowDevs] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage('home');
  };

  const renderPage = () => {
    // الدكتور محتاج تسجيل دخول
    if (currentPage === 'doctor') {
      if (!isLoggedIn || userRole !== 'doctor') {
        return <Login onLogin={handleLogin} />;
      }
      return <Doctor />;
    }
    
    // الموظفين محتاج تسجيل دخول
    if (currentPage === 'staff') {
      if (!isLoggedIn || userRole !== 'staff') {
        return <Login onLogin={handleLogin} />;
      }
      return <Staff />;
    }
    
    // باقي الصفحات مفتوحة للكل
    switch(currentPage) {
      case 'home': return <Home />;
      case 'booking': return <Booking />;
      case 'queue': return <Queue />;
      case 'patients': return <Patients />;
      case 'return': return <ReturnPatient />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🏥</span>
          <span className="logo-text">Smart<span className="highlight">Clinic</span></span>
        </div>
        <div className="header-buttons">
          <button onClick={() => setCurrentPage('home')}>🏠 الرئيسية</button>
          <button onClick={() => setCurrentPage('patients')}>👥 المرضى</button>
          <button onClick={() => setCurrentPage('doctor')}>👨‍⚕️ الدكتور</button>
          <button onClick={() => setCurrentPage('staff')}>👥 الموظفين</button>
          <button onClick={() => setCurrentPage('return')}>🔄 مريض عائد</button>
          <button onClick={() => setCurrentPage('booking')}>📅 حجز موعد</button>
          <button onClick={() => setCurrentPage('queue')}>🚶 حالة الدور</button>
          <button onClick={() => setCurrentPage('contact')}>📞 اتصل بنا</button>
          <button className="dev-btn" onClick={() => setShowDevs(true)}>👨‍💻 المطورين</button>
        </div>
      </header>

      <main className="main-content">
        {renderPage()}
      </main>

      {showDevs && (
        <div className="modal-overlay" onClick={() => setShowDevs(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{textAlign: 'center'}}>👨‍💻 فريق التطوير</h2>
            <div className="dev-list">
              <div className="dev-card">🚀 علاء سامح سليمان محمد</div>
              <div className="dev-card">💻 عبدالرحمن محمد إبراهيم أمين</div>
              <div className="dev-card">⚡ علي رضا عبد الباقي محمد</div>
              <div className="dev-card">🎯 عبدالله مصطفي محمود محمد</div>
              <div className="dev-card">📱 عبدالله سعيد عبدالله عطاالله</div>
              <div className="dev-card">🔧 عبدالرحمن حافظ جمعه موجود</div>
              <div className="dev-card">✨ صلاح تامر صلاح عبدالمنعم</div>
            </div>
            <button className="close-modal" onClick={() => setShowDevs(false)}>إغلاق</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 Smart Clinic | خدمة سريعة وآمنة | نظام إدارة العيادات الذكية</p>
      </footer>
    </div>
  );
}

export default App;