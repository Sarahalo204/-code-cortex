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
    <Link to="/dashboard">الملف الشخصي</Link>
    <Link to="/register">السجل</Link>
    {user ? (
      <button onClick={handleLogout}>تسجيل الخروج</button>
    ) : (
      <button onClick={() => navigate('/login')}>تسجيل الدخول</button>
    )}
  </div>
</nav>
  )
}