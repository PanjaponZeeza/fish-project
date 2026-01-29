import './globals.css';
import Link from 'next/link';
// Import Icons จาก React Icons ให้ครบถ้วน
import { 
  HiOutlineHome, 
  HiOutlineBookOpen, 
  HiOutlineSearch, 
  HiOutlineShieldCheck 
} from "react-icons/hi"; 
import { FaFacebook, FaYoutube, FaLine } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans antialiased">
        
        {/* --- MODERN NAVBAR (ปรับเป็นโทนเข้มให้เข้ากับธีมหลัก) --- */}
        <nav className="bg-[#0a192f]/90 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-[100]">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="font-black text-3xl text-white tracking-tighter flex items-center gap-2 group">
              <span className="text-blue-500 italic transition-transform group-hover:rotate-12">Fish</span>DB
            </Link>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-slate-300 hover:text-blue-400 font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                <HiOutlineHome className="text-xl" /> Home
              </Link>
              <Link href="/encyclopedia" className="text-slate-300 hover:text-blue-400 font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                <HiOutlineSearch className="text-xl" /> Encyclopedia
              </Link>
              <Link href="/scanner" className="border-2 border-blue-500 text-blue-400 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-lg shadow-blue-500/20">
                <HiOutlineShieldCheck className="text-xl" /> Scanner →
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-grow bg-white">
          {children}
        </div>

        {/* --- MODERN FOOTER WITH FULL CREDITS --- */}
        <footer className="bg-[#030712] text-slate-400 pt-24 pb-12 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
              
              {/* Branding & Mission */}
              <div className="md:col-span-5 space-y-8">
                <h3 className="text-white font-black text-3xl italic tracking-tighter">Fish<span className="text-blue-500">DB</span></h3>
                <p className="text-lg leading-relaxed font-light max-w-md">
                  A digital initiative dedicated to the research, documentation, and preservation 
                  of Northern Thailand's freshwater biodiversity through AI technology.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaFacebook size={20} /></a>
                  <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaLine size={20} /></a>
                  <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaYoutube size={20} /></a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="md:col-span-3">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
                <ul className="space-y-4 font-medium text-sm">
                  <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                  <li><Link href="/encyclopedia" className="hover:text-blue-400 transition-colors">Encyclopedia</Link></li>
                  <li><Link href="/scanner" className="hover:text-blue-400 transition-colors">AI Scanner</Link></li>
                </ul>
              </div>

              {/* Official Credits & Resources */}
              <div className="md:col-span-4">
                <div className="space-y-8">
                  {/* แหล่งอ้างอิงข้อมูล */}
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-4">แหล่งอ้างอิงข้อมูล</h4>
                    <p className="text-sm italic text-blue-400 mb-2">"A Field Guide to the Northern Thai Fishes (2023)"</p>
                    <p className="text-sm text-slate-300">โดย อภินันท์ สุวรรณรักษ์ และ Kenzo Utsugi</p>
                    <p className="text-sm text-slate-500 mt-1">สนับสนุนโดย NEF และมหาวิทยาลัยแม่โจ้</p>
                  </div>

                  {/* จัดทำโดย */}
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-4">จัดทำโดย</h4>
                    <p className="text-sm text-slate-300">สาขาวิทยาการคอมพิวเตอร์</p>
                    <p className="text-sm text-slate-300 mb-2">คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้</p>
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
    </html>
  );
}