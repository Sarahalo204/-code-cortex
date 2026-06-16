import React from 'react';

const DUMMY_LAWYERS = [
  {
    id: 1,
    name: 'أحمد عبدالله السالم',
    specialty: 'عقود تجارية وعمالية',
    license: '435123',
    phone: '0501234567',
    price: '500 ريال / ساعة',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'مكتب نورة القحطاني للمحاماة',
    specialty: 'تسوية النزاعات والتحكيم',
    license: '412987',
    phone: '0559876543',
    price: '700 ريال / ساعة',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'فهد محمد الدوسري',
    specialty: 'ملكية فكرية وعقود تقنية',
    license: '428456',
    phone: '0534567890',
    price: '600 ريال / ساعة',
    rating: 4.8,
  }
];

export default function LawyersPage() {
  return (
    <div className="community-page">
      <div className="community-hero" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)' }}>
        <h1>دليل المحامين المعتمدين</h1>
        <p>تواصل مع نخبة من المحامين المتخصصين في صياغة ومراجعة العقود</p>
      </div>

      <div className="lawyers-list">
        {DUMMY_LAWYERS.map(lawyer => (
          <div key={lawyer.id} className="community-post-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div className="community-post-header">
              <strong>{lawyer.name}</strong>
              <span className="community-score" style={{ background: '#FEF3C7', color: '#D97706', borderColor: '#FDE68A' }}>
                ⭐ {lawyer.rating}
              </span>
            </div>
            
            <p className="community-post-message" style={{ margin: 0 }}>
              <strong style={{ color: '#6B7280' }}>التخصص:</strong> {lawyer.specialty}
            </p>
            <p className="community-post-message" style={{ margin: 0 }}>
              <strong style={{ color: '#6B7280' }}>رقم الترخيص:</strong> {lawyer.license}
            </p>
            <p className="community-post-message" style={{ margin: 0 }}>
              <strong style={{ color: '#6B7280' }}>تكلفة الاستشارة:</strong> {lawyer.price}
            </p>
            
            <div style={{ marginTop: '1rem' }}>
              <a 
                href={`https://wa.me/966${lawyer.phone.substring(1)}`}
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#10B981',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
