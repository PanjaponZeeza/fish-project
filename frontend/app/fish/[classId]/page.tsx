'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineArrowsExpand, HiOutlineLocationMarker, HiOutlineHashtag } from "react-icons/hi";

export default function FishDetail() {
  const { classId } = useParams();
  const router = useRouter();
  const [fish, setFish] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // แก้ไข URL ให้ใช้เครื่องหมาย backtick และดึงค่าจาก .env
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

  // ปรับแต่งหน้า Loading ขณะดึงข้อมูล
  if (loading) return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col items-center justify-center text-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-2 border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-8 tracking-[0.4em] text-[10px] font-black text-slate-500 uppercase animate-pulse">
        Accessing Database...
      </p>
    </div>
  );

  if (!fish) return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-2xl font-light mb-6 tracking-widest uppercase">Species Not Found</h2>
        <button onClick={() => router.back()} className="border border-slate-700 px-8 py-3 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all">
          GO BACK
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative pb-24 bg-[#050c1a]">
      {/* 🖼️ Sharp Background Layer (No Blur) */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/detail-bg.jpg" 
          className="w-full h-full object-cover opacity-30" 
          alt="Fish Habitat" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050c1a] via-[#050c1a]/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        {/* Navigation Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-slate-500 hover:text-white font-bold mb-16 transition-all group uppercase tracking-[0.2em] text-[10px]"
        >
          <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-slate-400 transition-colors">
            <HiOutlineArrowLeft />
          </div>
          Return to Encyclopedia
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          <div className="sticky top-32 space-y-8">
            <div 
              className="relative aspect-square bg-white rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] border border-white/10 group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img 
                src={`/images/${fish.imageRef}`} 
                className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-105" 
                alt={fish.localName} 
              />
              <div className="absolute top-8 right-8 bg-slate-900/80 text-white p-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <HiOutlineArrowsExpand className="text-xl" />
              </div>
            </div>
            <div className="flex justify-center">
               <span className="px-5 py-1.5 rounded-full bg-black/40 border border-white/5 text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]">
                 Enlarge Specimen
               </span>
            </div>
          </div>

          <div className="text-white">
            <div className="mb-14 border-b border-white/5 pb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-blue-900"></div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Catalog No. {fish.classId}
                </span>
              </div>
              <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter text-slate-100">{fish.localName}</h1>
              <p className="text-blue-400/70 text-2xl italic font-light tracking-widest">{fish.scientificName}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-16">
              <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] shadow-xl">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-4">Family</span>
                <p className="text-2xl font-bold tracking-tight text-slate-200">{fish.family}</p>
              </div>
              <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] shadow-xl">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-4">Measurement</span>
                <p className="text-2xl font-bold tracking-tight text-slate-200">{fish.size || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-16">
              <div className="relative pl-12 group">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-blue-900 transition-colors"></div>
                <h3 className="text-blue-400/60 font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                  <HiOutlineHashtag className="text-base" /> Remarks & Characteristics
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  {fish.remarks}
                </p>
              </div>

              <div className="relative pl-12 group">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-cyan-900 transition-colors"></div>
                <h3 className="text-cyan-400/60 font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                  <HiOutlineLocationMarker className="text-base" /> Regional Distribution
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light italic">
                  {fish.distribution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] bg-[#030712]/98 backdrop-blur-3xl flex items-center justify-center p-8 transition-all duration-500 animate-in fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <button className="absolute top-12 right-12 text-slate-500 text-5xl font-thin hover:text-white transition-all">&times;</button>
          <img 
            src={`/images/${fish.imageRef}`} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95" 
            alt="Specimen Detail" 
          />
        </div>
      )}
    </main>
  );
}