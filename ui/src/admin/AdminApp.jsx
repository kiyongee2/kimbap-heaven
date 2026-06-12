import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './admin.css'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import MenuManage from './pages/MenuManage'
import MenuEdit from './pages/MenuEdit'
import Statistics from './pages/Statistics'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Login from './pages/Login'

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1')

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="admin-app">
        <Login onLogin={() => setAuthed(true)} />
      </div>
    )
  }

  return (
    <div className="admin-app">
      <Routes>
        <Route index element={<Dashboard onLogout={handleLogout} />} />
        <Route path="menus" element={<MenuManage />} />
        <Route path="menus/:id/edit" element={<MenuEdit />} />
        <Route path="menus/new" element={<MenuEdit />} />
        <Route path="orders" element={<Orders />} />
        <Route path="stats" element={<Statistics />} />
        <Route path="settings" element={<Settings onLogout={handleLogout} />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
