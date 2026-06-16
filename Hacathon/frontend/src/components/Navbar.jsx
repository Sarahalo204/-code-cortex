import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
<nav className="navbar">
  <span className="brand">Code Cortex</span>
  <div className="nav-links">
    <Link to="contract">الرئيسية</Link>
    <Link to="/analyze">تحليل عقد</Link>
    <Link to="/community">المجتمع</Link>
    <Link to="/lawyers">المحامين</Link>
    {user ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto' }}>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'transparent', color: '#1C1917', border: '1px solid #E5E7EB' }}>تسجيل الخروج</button>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#F9FAFB', padding: '4px 12px 4px 4px', 
            borderRadius: '24px', border: '1px solid #E5E7EB', cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            <div style={{ 
              width: '36px', height: '36px', background: '#0F172A', color: 'white', 
              borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' 
            }}>
              {user.full_name ? user.full_name[0] : user.email[0]}
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </Link>
      </div>
    ) : (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto' }}>
        <button onClick={() => navigate('/login')}>تسجيل الدخول</button>
        <button onClick={() => navigate('/register')} style={{ background: '#F3F4F6', color: '#374151' }}>إنشاء حساب</button>
      </div>
    )}
  </div>
</nav>
  )
}