'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineInformationCircle } from "react-icons/hi";

export default function Encyclopedia() {
  // แก้ไข: เปิดคอมเมนต์และกำหนดประเภทข้อมูลเพื่อแก้ Type Error
  const [fishes, setFishes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // แก้ไข: ใช้ค่าจากไฟล์ .env สำหรับ URL
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish`)
      .then((res) => res.json())
      .then((data) => setFishes(data))
      .catch((err) => console.error('Error fetching fish:', err));
  }, []);

  const filteredFishes = fishes.filter(fish =>
    fish.localName.includes(searchTerm) || 
    fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fish.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen relative pb-24 bg-slate-900">
      {/* 🖼️ High Definition Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/encyclopedia-bg.jpg" 
          className="w-full h-full object-cover transition-opacity duration-1000" 
          alt="Encyclopedia Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-12">
          <div className="text-white drop-shadow-2xl">
            <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">
              Fish <span className="text-blue-400">Encyclopedia</span>
            </h1>
            <p className="text-slate-300 font-light text-xl max-w-2xl leading-relaxed">
              Explore the diverse freshwater species of Northern Thailand. 
              Comprehensive data documentation according to international standards.
            </p>
          </div>

          {/* Search Bar - Modern Style with Icon */}
          <div className="relative w-full lg:w-[450px]">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 text-2xl z-10">
              <HiOutlineSearch />
            </div>
            <input
              type="text"
              placeholder="Search species name, family..."
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 outline-none transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Fish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredFishes.map((fish: any) => (
            <div key={fish._id} className="group bg-[#0a192f]/80 backdrop-blur-md rounded-[3rem] border border-white/10 shadow-[0_20px_50_rgba(0,0,0,0.3)] overflow-hidden hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-3">
              
              {/* Fish Image Container */}
              <div className="aspect-[4/3] bg-white/5 relative p-6 overflow-hidden flex items-center justify-center">
                <img 
                  src={`/images/${fish.imageRef}`} 
                  className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                  alt={fish.localName} 
                />
              </div>

              {/* Fish Content Area */}
              <div className="p-10">
                <div className="mb-4">
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-[0.2em] border border-blue-500/30">
                    {fish.family}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">
                  {fish.localName}
                </h3>
                <p className="text-blue-400/80 text-base italic font-light mb-8 border-b border-white/5 pb-4">
                  {fish.scientificName}
                </p>
                
                {/* 🏷️ Specs Info */}
                <div className="space-y-6 mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-blue-400/60 uppercase tracking-[0.2em]">Adult Size:</span>
                    <p className="text-lg text-slate-100 font-semibold leading-snug">{fish.size}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-blue-400/60 uppercase tracking-[0.2em]">Regional Distribution:</span>
                    <p className="text-base text-slate-300 font-light leading-relaxed line-clamp-3">
                      {fish.distribution}
                    </p>
                  </div>
                </div>

                <Link 
                  href={`/fish/${fish.classId}`} 
                  className="flex items-center justify-between w-full bg-white text-[#0a192f] px-8 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl group/btn"
                >
                  <span className="flex items-center gap-2">
                    <HiOutlineInformationCircle className="text-2xl" /> View Full Details
                  </span>
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredFishes.length === 0 && (
          <div className="text-center py-56 bg-white/5 rounded-[4rem] border border-dashed border-white/10">
            <HiOutlineSearch className="mx-auto text-7xl text-slate-700 mb-6" />
            <p className="text-slate-400 text-2xl font-light">No species found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}