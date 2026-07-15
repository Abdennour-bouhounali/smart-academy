import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { LogOut, BookOpen, GraduationCap, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-readex" dir="rtl">
      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">مرحباً {user?.full_name} 👋</h1>
            <p className="text-gray-400">Welcome to SMART Academy.</p>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2.5 rounded-xl transition-colors font-medium relative z-10"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

        {/* Coming Soon Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-emerald-500/30 transition-colors group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <BookOpen className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">الموارد التعليمية</h3>
            <p className="text-gray-400 text-sm">قريباً.. ستتمكن من الوصول إلى مكتبة شاملة من الدروس والتمارين</p>
          </div>

          <div className="bg-[#111111] border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/30 transition-colors group">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <LayoutDashboard className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">لوحة المتابعة</h3>
            <p className="text-gray-400 text-sm">قريباً.. يمكنك تتبع مستواك ومتابعة تقدمك في حل المسائل</p>
          </div>

          <div className="bg-[#111111] border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-purple-500/30 transition-colors group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <GraduationCap className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">أكاديمية SMART</h3>
            <p className="text-gray-400 text-sm">بيئة تعليمية متكاملة لضمان التفوق وتطبيق بروتوكول سمارت بكفاءة</p>
          </div>
        </div>
      </main>
    </div>
  );
}
