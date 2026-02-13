'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineInformationCircle, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useLanguage } from '../layout'; // นำระบบภาษาเข้าใช้

export default function Encyclopedia() {
  const { t, lang } = useLanguage(); // ดึงตัวแปรคำแปลและภาษาปัจจุบันมาใช้
  const [fishes, setFishes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // แบ่งหน้าละ 21 ตัว (เหมาะกับ Grid 1, 3 คอลัมน์)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish`)
      .then((res) => res.json())
      .then((data) => setFishes(data))
      .catch((err) => console.error('Error fetching fish:', err));
  }, []);

  // ระบบ Filter ข้อมูล - เพิ่มการรองรับการค้นหาภาษาไทย
  const filteredFishes = useMemo(() => {
    return fishes.filter(fish =>
      fish.localName.includes(searchTerm) || 
      (fish.localName_th && fish.localName_th.includes(searchTerm)) || // เพิ่ม: ค้นหาจากชื่อไทย
      fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fish.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fishes, searchTerm]);

  // คำนวณการแบ่งหน้า
  const totalPages = Math.ceil(filteredFishes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFishes.slice(indexOfFirstItem, indexOfLastItem);

  // เลื่อนกลับไปด้านบนเมื่อเปลี่ยนหน้า
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen relative pb-24 bg-slate-900 overflow-x-hidden">
      {/* 🖼️ Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/encyclopedia-bg.jpg" 
          className="w-full h-full object-cover" 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        
        {/* 1. Header & Search - ระบบ 2 ภาษา */}
        <div className="flex flex-col gap-8 mb-12 border-b border-white/10 pb-10">
          <div className="text-white drop-shadow-2xl text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-tight">
              {t.encyclopedia.title} <span className="text-blue-400">{t.encyclopedia.title2}</span>
            </h1>
            <p className="text-slate-300 font-light text-base md:text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {lang === 'en' 
                ? `Explore ${fishes.length} species of Northern Thailand.` 
                : `สำรวจปลา ${fishes.length} ชนิดในภาคเหนือของประเทศไทย`}
              <br className="hidden md:block" />
              {t.encyclopedia.description}
            </p>
          </div>

          <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 text-xl md:text-2xl z-10">
              <HiOutlineSearch />
            </div>
            <input
              type="text"
              placeholder={t.encyclopedia.searchPlaceholder}
              className="w-full pl-14 md:pl-16 pr-6 py-4 md:py-5 rounded-2xl md:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 outline-none transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // รีเซ็ตไปหน้า 1 เมื่อค้นหา
              }}
            />
          </div>
        </div>

        {/* 2. Fish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
          {currentItems.map((fish: any) => (
            <div key={fish._id} className="group bg-[#0a192f]/80 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-white/10 overflow-hidden hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-[4/3] bg-white/5 relative p-4 md:p-6 overflow-hidden flex items-center justify-center">
                <img 
                  src={`/images/${fish.imageRef}`} 
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" 
                  alt={fish.localName} 
                />
              </div>

              <div className="p-8 md:p-10 text-left">
                <div className="mb-4">
                  <span className="bg-blue-600/20 text-blue-400 text-[9px] md:text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-blue-500/30">
                    {fish.family}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-1 uppercase tracking-tight leading-tight truncate">
                  {/* แก้ไข: แสดงชื่อภาษาไทยถ้าเลือกภาษาไทย */}
                  {lang === 'th' && fish.localName_th ? fish.localName_th : fish.localName}
                </h3>
                <p className="text-blue-400/80 text-sm md:text-base italic font-light mb-6 border-b border-white/5 pb-4 truncate">
                  {fish.scientificName}
                </p>
                
                <div className="space-y-4 md:space-y-6 mb-8">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest">
                      {lang === 'en' ? 'Adult Size:' : 'ขนาดตัวเต็มวัย:'}
                    </span>
                    <p className="text-base md:text-lg text-slate-100 font-semibold">{fish.size}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest">
                      {lang === 'en' ? 'Distribution:' : 'เขตการแพร่กระจาย:'}
                    </span>
                    <p className="text-sm text-slate-300 font-light line-clamp-2 md:line-clamp-3">
                      {/* แก้ไข: แสดงเขตแพร่กระจายภาษาไทยถ้าเลือกภาษาไทย */}
                      {lang === 'th' && fish.distribution_th ? fish.distribution_th : fish.distribution}
                    </p>
                  </div>
                </div>

                <Link 
                  href={`/fish/${fish.classId}`} 
                  className="flex items-center justify-between w-full bg-white text-[#0a192f] px-6 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg group/btn"
                >
                  <span className="flex items-center gap-2">
                    <HiOutlineInformationCircle className="text-xl md:text-2xl" /> 
                    {lang === 'en' ? 'View Specs' : 'ดูรายละเอียด'}
                  </span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-20 flex flex-wrap justify-center items-center gap-2 md:gap-3 px-4">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-blue-600 transition-all"
            >
              <HiOutlineChevronLeft className="text-xl" />
            </button>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-xs md:text-sm transition-all border ${
                    currentPage === i + 1
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-blue-600 transition-all"
            >
              <HiOutlineChevronRight className="text-xl" />
            </button>
          </div>
        )}

        {/* 4. Empty Result */}
        {currentItems.length === 0 && (
          <div className="text-center py-32 md:py-48 bg-white/5 rounded-[2rem] md:rounded-[4rem] border border-dashed border-white/10">
            <HiOutlineSearch className="mx-auto text-5xl md:text-7xl text-slate-700 mb-6" />
            <p className="text-slate-400 text-lg md:text-2xl font-light px-6">
              {t.encyclopedia.noResults}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}