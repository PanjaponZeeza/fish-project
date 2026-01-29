'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  HiOutlinePhotograph, 
  HiOutlineBookOpen, 
  HiOutlineSearch, 
  HiOutlineArrowRight,
  HiOutlineCube,
  HiOutlineLocationMarker
} from "react-icons/hi"; // ต้องติดตั้ง npm install react-icons

export default function Home() {
  const [fishes, setFishes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // fetch('http://localhost:3000/fish')
    // fetch(${process.env.NEXT_PUBLIC_API_URL}/fish)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish`)
      .then((res) => res.json())
      .then((data) => setFishes(data.slice(0, 3)))
      .catch((err) => console.error('Error:', err));
  }, []);

  const terminologies = [
    { id: 'body', title: '1. Body Regions', img: '/images/term-body.jpg', content: 'Head: Region from the tip of snout to the posterior edge of gill cover | Trunk: Region from the posterior edge of gill cover to the anus | Tail: Region from the anus to the hypural end.' },
    { id: 'fins', title: '2. Fins and Support', img: '/images/term-fins.jpg', content: 'Median fins (Dorsal, Anal, Caudal) and Paired fins (Pectoral, Pelvic). Features Adipose fins, Spines, Simple rays, and Branched rays.' },
    { id: 'gill', title: '3. Gill', img: '/images/term-gill.jpg', content: 'Gill rakers (tooth-like structure inside), Gill filaments (for gas exchange outside), and Gill arch (the framework).' },
    { id: 'scales', title: '4. Scales', img: '/images/term-scales.jpg', content: 'Lateral line, Pored scales, Predorsal scales (occiput to dorsal origin), Transverse scales, and Circumpeduncular scales.' },
    { id: 'barbels', title: '5. Barbels', img: '/images/term-barbels.jpg', content: 'Sensory organs: Nasal (nostril), Maxillary (upper jaw posterior), Mandibular (lower jaw), and Rostral (upper jaw anterior).' },
    { id: 'mouth', title: '6. Position of Mouth', img: '/images/term-mouth.jpg', content: 'Classification by location: Terminal, Subterminal, Superior, and Inferior mouth positions.' },
    { id: 'caudal', title: '7. Types of Caudal Fin', img: '/images/term-caudal.jpg', content: 'Variations in tail shapes including Forked, Truncate, Pointed, and Rounded types.' },
    { id: 'section', title: '8. Body Cross Section', img: '/images/term-section.jpg', content: 'Body expressions: Compressed (Depth > Width) and Depressed (Depth < Width).' },
    { id: 'measure', title: '9. Measurements', img: '/images/term-measure.jpg', content: 'Standard Length (SL), Total Length (TL), Snout Length (SnL), Head Length (HL), and Body Depth (BD).' },
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0a192f] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="/images/hero-bg.jpg" className="w-full h-full object-cover scale-105" alt="Background" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">
            Northern <span className="text-blue-500 italic">Fishes</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the Wonders of Freshwater Ecosystems in Northern Thailand. 
            Identify species through advanced AI-Powered recognition.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/scanner" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-3 group">
              <HiOutlinePhotograph className="text-2xl group-hover:rotate-12 transition-transform" /> START AI SCANNER
            </Link>
            <Link href="/encyclopedia" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <HiOutlineBookOpen className="text-2xl" /> VIEW ENCYCLOPEDIA
            </Link>
          </div>
        </div>
      </section>

    {/* 2. GEOGRAPHICAL CHARACTERS (HD Background & Glassmorphism Theme) */}
      <section className="relative py-32 px-6 overflow-hidden min-h-[90vh] flex items-center bg-slate-900">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/geo-bg.jpg" 
            className="w-full h-full object-cover transition-opacity duration-1000" 
            alt="Northern Thailand Geography" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-slate-900/70 backdrop-brightness-75"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* ฝั่งรูปแผนที่ลุ่มน้ำ */}
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
              <img src="/images/basin-map.jpg" alt="Basin Map" className="w-full h-auto rounded-[3rem]" />
            </div>

            {/* ฝั่งเนื้อหาข้อมูล */}
            <div className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
                <h2 className="text-blue-400 font-black tracking-[0.3em] text-sm uppercase drop-shadow-md">
                  Regional Biodiversity
                </h2>
              </div>
              
              <h3 className="text-6xl font-black mb-10 leading-tight tracking-tight uppercase drop-shadow-xl">
                Geographical <br />
                <span className="text-blue-400">Characters</span>
              </h3>

              <div className="space-y-8 font-light text-xl leading-relaxed">
                {/* ย่อหน้าบนสุดที่เป็นต้นแบบ */}
                <p className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 italic shadow-2xl">
                  Northern Thailand encompasses 3 main river basins: <span className="font-bold text-blue-300 underline decoration-blue-500/50">Mekong, Chao Phraya, and Salween</span>. 
                  Characterized by high elevation and latitude, ensuring a unique cool-climate aquatic ecosystem.
                </p>
                
                <div className="grid gap-6 mt-10">
                  {/* ข้อมูลลุ่มน้ำ 1 - ปรับพื้นหลังให้เหมือนข้างบน */}
                  <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transition-all hover:bg-slate-900/70">
                    <h4 className="font-black text-blue-400 text-2xl uppercase mb-2 drop-shadow-sm">Chao Phraya Basin</h4>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      Mostly occupied by the Chao Phraya River Basin, including major tributaries: <span className="font-black text-white">Ping, Wang, Yom, and Nan Rivers.</span>
                    </p>
                  </div>

                  {/* ข้อมูลลุ่มน้ำ 2 - ปรับพื้นหลังให้เหมือนข้างบน */}
                  <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transition-all hover:bg-slate-900/70">
                    <h4 className="font-black text-blue-400 text-2xl uppercase mb-2 drop-shadow-sm">Salween Basin</h4>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      Covers the western part of Northern Thailand via tributaries such as <span className="font-black text-white">the Moei, Yuam, and Pai Rivers.</span>
                    </p>
                  </div>

                  {/* ข้อมูลลุ่มน้ำ 3 - ปรับพื้นหลังให้เหมือนข้างบน */}
                  <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transition-all hover:bg-slate-900/70">
                    <h4 className="font-black text-blue-400 text-2xl uppercase mb-2 drop-shadow-sm">Mekong Basin</h4>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      The northeastern part is covered by tributaries of the Mekong River such as <span className="font-black text-white">the Kok River and the Ing River.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* 3. SCIENTIFIC TERMINOLOGIES (WITH DARK BACKGROUND) */}
      <section className="relative py-32 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/term-bg.jpg" className="w-full h-full object-cover" alt="Term BG" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-blue-400 font-black tracking-[0.3em] text-xs mb-4 uppercase">Learning Center</h3>
            <h2 className="text-5xl font-black text-white mb-6">Scientific Terminologies</h2>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full shadow-lg shadow-blue-500/50"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {terminologies.map((term, index) => (
                <button
                  key={term.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-left px-8 py-5 rounded-2xl font-bold transition-all flex justify-between items-center group ${
                    activeTab === index 
                    ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] -translate-y-1' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm tracking-wide uppercase">{term.title.split('. ')[1]}</span>
                  <HiOutlineArrowRight className={`transition-transform ${activeTab === index ? 'translate-x-1' : 'opacity-0'}`} />
                </button>
              ))}
            </div>

            {/* Content Display Card */}
            <div className="lg:col-span-8 bg-white rounded-[3.5rem] p-2 shadow-2xl flex flex-col min-h-[600px]">
              <div className="bg-slate-50 h-full rounded-[3rem] overflow-hidden flex flex-col">
                <div className="relative flex-grow p-10 flex items-center justify-center bg-white">
                  <img 
                    src={terminologies[activeTab].img} 
                    className="max-w-full max-h-[380px] object-contain transition-all duration-700 animate-in fade-in slide-in-from-bottom-4" 
                    alt={terminologies[activeTab].title} 
                  />
                  <div className="absolute top-6 right-8">
                    <HiOutlineCube className="text-3xl text-slate-200" />
                  </div>
                </div>
                <div className="p-12 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center gap-4 mb-4 font-black text-slate-900 text-2xl uppercase italic">
                    <span className="text-blue-600 text-4xl">/</span> {terminologies[activeTab].title.split('. ')[1]}
                  </div>
                  <p className="text-slate-500 font-light leading-relaxed text-lg">
                    {terminologies[activeTab].content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED FISHES (DARK ACCENT) */}
      <section className="py-32 px-6 bg-[#030712]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-white/5 pb-10">
            <div>
              <h3 className="text-blue-500 font-black tracking-widest text-xs mb-2 uppercase">Database Highlights</h3>
              <h2 className="text-5xl font-black text-white leading-tight">Featured Northern Fishes</h2>
            </div>
            <Link href="/encyclopedia" className="group text-blue-400 font-bold flex items-center gap-2 hover:text-white transition-all">
              EXPLORE ALL <HiOutlineArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {fishes.map((fish: any) => (
              <div key={fish._id} className="group bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 transition-all duration-700 hover:-translate-y-2">
                <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
                  <img src={`/images/${fish.imageRef}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={fish.localName} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-8 flex items-center gap-2">
                    <HiOutlineSearch className="text-blue-400" />
                    <span className="text-[10px] text-blue-400 font-black tracking-tighter uppercase">{fish.family}</span>
                  </div>
                </div>
                <div className="p-10 relative">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{fish.localName}</h3>
                  <p className="text-blue-400 text-sm italic mb-8 font-light tracking-wide">{fish.scientificName}</p>
                  <Link href={`/fish/${fish.classId}`} className="flex items-center justify-between w-full bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-blue-600 hover:text-white transition-all">
                    View Specs <HiOutlineArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}