'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import './globals.css';
import Link from 'next/link';
// Import Icons จาก React Icons ให้ครบถ้วน
import { 
  HiOutlineHome, 
  HiOutlineSearch, 
  HiOutlineShieldCheck,
  HiOutlineTranslate 
} from "react-icons/hi"; 
import { FaFacebook, FaYoutube, FaLine } from "react-icons/fa";
import { SiGmail } from "react-icons/si"; // เพิ่มการ import ตรงนี้เพื่อให้ใช้งานไอคอน Gmail ได้
import { translations } from '../constants/translations';

// --- 1. LANGUAGE CONTEXT SETUP ---
type Language = 'en' | 'th';
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

// --- 2. ROOT LAYOUT COMPONENT ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  return (
    <html lang={lang}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <body className="flex flex-col min-h-screen font-sans antialiased">
          
          {/* --- MODERN NAVBAR --- */}
          <nav className="bg-[#0a192f]/90 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="font-black text-3xl text-white tracking-tighter flex items-center gap-2 group">
                <span className="text-blue-500 italic transition-transform group-hover:rotate-12">Fish</span>DB
              </Link>

              {/* Navigation Menu & Language Switcher */}
              <div className="flex items-center space-x-4 md:space-x-10">
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                  <Link href="/" className="text-slate-300 hover:text-blue-400 font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                    <HiOutlineHome className="text-xl" /> {t.nav.home}
                  </Link>
                  <Link href="/encyclopedia" className="text-slate-300 hover:text-blue-400 font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                    <HiOutlineSearch className="text-xl" /> {t.nav.encyclopedia}
                  </Link>
                  <Link href="/scanner" className="border-2 border-blue-500 text-blue-400 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-lg shadow-blue-500/20">
                    <HiOutlineShieldCheck className="text-xl" /> {t.nav.scanner.split(' ')[0]} →
                  </Link>
                </div>

                {/* --- LANGUAGE SWITCHER BUTTON --- */}
                <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                  <button 
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLang('th')}
                    className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'th' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    TH
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-grow bg-white">
            {children}
          </div>

          {/* --- MODERN FOOTER --- */}
          <footer className="bg-[#030712] text-slate-400 pt-24 pb-12 border-t border-white/5 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                
                {/* Branding & Mission */}
                <div className="md:col-span-5 space-y-8">
                  <h3 className="text-white font-black text-3xl italic tracking-tighter">Fish<span className="text-blue-500">DB</span></h3>
                  <p className="text-lg leading-relaxed font-light max-w-md text-left">
                    {lang === 'en' 
                      ? "A digital initiative dedicated to the research, documentation, and preservation of Northern Thailand's freshwater biodiversity through AI technology."
                      : "โครงการริเริ่มทางดิจิทัลที่อุทิศตนเพื่อการวิจัย การรวบรวมข้อมูล และการอนุรักษ์ความหลากหลายทางชีวภาพของปลาน้ำจืดในภาคเหนือของไทยด้วยเทคโนโลยี AI"}
                  </p>
                  <div className="flex gap-4">
                    {/* --- แก้ไขข้อ 2: ใส่ลิงก์ติดต่อจริง --- */}
                    <a href="https://www.facebook.com/panjapon.puakinsang.2025" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaFacebook size={20} /></a>
                    <a href="https://line.me/ti/p/j6FbYy7gWA" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaLine size={20} /></a>
                    <a href="mailto:panjaponpuakinsang2004@gmail.com" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><SiGmail size={20} /></a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="md:col-span-3 text-left">
                  <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">{lang === 'en' ? 'Navigation' : 'เมนูหลัก'}</h4>
                  <ul className="space-y-4 font-medium text-sm">
                    <li><Link href="/" className="hover:text-blue-400 transition-colors">{t.nav.home}</Link></li>
                    <li><Link href="/encyclopedia" className="hover:text-blue-400 transition-colors">{t.nav.encyclopedia}</Link></li>
                    <li><Link href="/scanner" className="hover:text-blue-400 transition-colors">{t.nav.scanner}</Link></li>
                  </ul>
                </div>

                {/* Official Credits & Resources */}
                <div className="md:col-span-4 text-left">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-4">{lang === 'en' ? 'Data References' : 'แหล่งอ้างอิงข้อมูล'}</h4>
                      <p className="text-sm italic text-blue-400 mb-2">"A Field Guide to the Northern Thai Fishes (2023)"</p>
                      <p className="text-sm text-slate-300">{lang === 'en' ? 'By Apinun Suvarnaraksha and Kenzo Utsugi' : 'โดย อภินันท์ สุวรรณรักษ์ และ Kenzo Utsugi'}</p>
                      <p className="text-sm text-slate-500 mt-1">{lang === 'en' ? 'Supported by NEF and Maejo University' : 'สนับสนุนโดย NEF และมหาวิทยาลัยแม่โจ้'}</p>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-4">{lang === 'en' ? 'Developed By' : 'จัดทำโดย'}</h4>
                      {/* --- แก้ไข: ปรับให้รองรับ 2 ภาษา --- */}
                      <p className="text-sm text-slate-300 font-bold mb-1">
                        {lang === 'en' ? 'Panjapon Puakinsang' : 'ปัญจพล พวกอินแสง'}
                      </p>
                      <p className="text-sm text-slate-300 font-bold mb-3">
                        {lang === 'en' ? 'Sakarin Boonma' : 'ศักรินทร์ บุญมา'}
                      </p>
                      <p className="text-sm text-slate-400">
                        {lang === 'en' ? 'Department of Computer Science' : 'สาขาวิทยาการคอมพิวเตอร์'}
                      </p>
                      <p className="text-sm text-slate-400 mb-4">
                        {lang === 'en' ? 'Faculty of Science, Maejo University' : 'คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้'}
                      </p>
                      <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                        Maejo University
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                <p>© 2026 FISHDB PROJECT. COMPUTER SCIENCE PROJECT - MJU.</p>
                <div className="flex gap-10">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </LanguageContext.Provider>
    </html>
  );
}