import { useState, useEffect } from 'react';

function Queue() {
  const [currentNumber, setCurrentNumber] = useState(24);
  const [yourNumber, setYourNumber] = useState(28);
  const [waitTime, setWaitTime] = useState(15);

  // تحديث كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber(prev => Math.min(prev + 1, yourNumber));
      setWaitTime(prev => Math.max(prev - 1, 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [yourNumber]);

  return (
    <div className="page">
      <h2>🚶 حالة الدور和治疗</h2>
      
      <div className="queue-numbers">
        <div className="number-box">
          <span className="number-label">الرقم الحالي</span>
          <span className="number-value">{currentNumber}</span>
        </div>
        <div className="number-arrow">→</div>
        <div className="number-box highlight">
          <span className="number-label">رقمك</span>
          <span className="number-value">{yourNumber}</span>
        </div>
      </div>

      <div className="wait-time">
        <span>⏱️ وقت الانتظار المتوقع:</span>
        <strong>{waitTime} دقيقة</strong>
      </div>

      {currentNumber >= yourNumber && (
        <div className="ready-alert">
          🎉 حان دورك الآن! توجه إلى العيادة 🎉
        </div>
      )}

      <button className="btn-refresh" onClick={() => window.location.reload()}>
        🔄 تحديث
      </button>
    </div>
  );
}
export default Queue;