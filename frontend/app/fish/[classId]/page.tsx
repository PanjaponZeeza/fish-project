'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineArrowsExpand, HiOutlineLocationMarker, HiOutlineHashtag } from "react-icons/hi";
import { useLanguage } from '../../layout'; // นำระบบภาษาเข้าใช้ (ต้องถอยกลับ 2 ระดับเพราะอยู่ในโฟลเดอร์ [classId])

export default function FishDetail() {
  const { t, lang } = useLanguage(); // ดึงตัวแปรคำแปลและภาษาปัจจุบันมาใช้
  const { classId } = useParams();
  const router = useRouter();
  const [fish, setFish] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish/search?classId=${classId}`)
      .then((res) => res.json())
      .then((data) => {
        setFish(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [classId]);

  // หน้าจอ Loading แบบ 2 ภาษา
  if (loading) return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col items-center justify-center text-white p-6">
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        <div className="absolute inset-0 border-2 border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-8 tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] font-black text-slate-500 uppercase animate-pulse text-center">
        {t.detail.loading}
      </p>
    </div>
  );

  // หน้าจอไม่พบข้อมูลแบบ 2 ภาษา
  if (!fish) return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center text-white p-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-light mb-6 tracking-widest uppercase">{t.detail.notFound}</h2>
        <button onClick={() => router.back()} className="border border-slate-700 px-8 py-3 rounded-full text-[10px] font-bold hover:bg-white hover:text-black transition-all uppercase">
          {t.detail.goBack}
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative pb-20 bg-[#050c1a] overflow-x-hidden text-left">
      {/* 🖼️ Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/detail-bg.jpg" 
          className="w-full h-full object-cover opacity-20 md:opacity-30" 
          alt="Fish Habitat" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c1a]/90 via-[#050c1a]/60 to-[#050c1a]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Navigation Button - ระบบ 2 ภาษา */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-white font-bold mb-8 md:mb-16 transition-all group uppercase tracking-[0.2em] text-[9px] md:text-[10px]"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-slate-400 transition-colors">
            <HiOutlineArrowLeft />
          </div>
          {t.detail.return}
        </button>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">
          
          {/* Image Section */}
          <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
            <div 
              className="relative aspect-square bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img 
                src={`/images/${fish.imageRef}`} 
                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-1000 group-hover:scale-105" 
                alt={fish.localName} 
              />
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-slate-900/80 text-white p-3 md:p-4 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all">
                <HiOutlineArrowsExpand className="text-lg md:text-xl" />
              </div>
            </div>
            <div className="flex justify-center text-left">
               <span className="px-4 py-1.5 rounded-full bg-black/40 border border-white/5 text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">
                 {t.detail.enlarge}
               </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-white text-left">
            <div className="mb-10 md:mb-14 border-b border-white/5 pb-8 md:pb-12 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="h-px w-6 md:w-8 bg-blue-900 hidden sm:block"></div>
                <span className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
                  {t.detail.catalogNo} {fish.classId}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 md:mb-4 uppercase tracking-tighter text-slate-100 leading-none">
                {/* แก้ไข: แสดงชื่อภาษาไทยถ้าเลือกภาษาไทย */}
                {lang === 'th' && fish.localName_th ? fish.localName_th : fish.localName}
              </h1>
              <p className="text-blue-400/70 text-lg md:text-2xl italic font-light tracking-widest break-words px-4 lg:px-0">
                {fish.scientificName}
              </p>
            </div>

            {/* Stats Cards - ระบบ 2 ภาษา */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
              <div className="bg-black/40 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl">
                <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 md:mb-4">
                  {t.detail.family}
                </span>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-slate-200">{fish.family}</p>
              </div>
              <div className="bg-black/40 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl">
                <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 md:mb-4">
                  {t.detail.measurement}
                </span>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-slate-200">{fish.size || 'N/A'}</p>
              </div>
            </div>

            {/* Detailed Description - ระบบ 2 ภาษา */}
            <div className="space-y-12 md:space-y-16 px-2 lg:px-0">
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-blue-900 transition-colors"></div>
                <h3 className="text-blue-400/60 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 flex items-center gap-3">
                  <HiOutlineHashtag className="text-sm md:text-base" /> {t.detail.remarks}
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">
                  {/* แก้ไข: แสดงเนื้อหาภาษาไทยถ้าเลือกภาษาไทย */}
                  {lang === 'th' && fish.remarks_th ? fish.remarks_th : fish.remarks}
                </p>
              </div>

              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-cyan-900 transition-colors"></div>
                <h3 className="text-cyan-400/60 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 flex items-center gap-3">
                  <HiOutlineLocationMarker className="text-sm md:text-base" /> {t.detail.distribution}
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light italic">
                  {/* แก้ไข: แสดงเนื้อหาภาษาไทยถ้าเลือกภาษาไทย */}
                  {lang === 'th' && fish.distribution_th ? fish.distribution_th : fish.distribution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] bg-[#030712]/98 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8 transition-all duration-500"
          onClick={() => setIsZoomed(false)}
        >
          <button className="absolute top-6 right-6 md:top-12 md:right-12 text-slate-500 text-4xl md:text-5xl font-thin hover:text-white transition-all">&times;</button>
          <img 
            src={`/images/${fish.imageRef}`} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in-95 duration-300" 
            alt="Specimen Detail" 
          />
        </div>
      )}
    </main>
  );
}