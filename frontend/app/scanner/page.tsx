'use client';
import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useRouter } from 'next/navigation';
import { HiOutlineCamera, HiOutlineCloudUpload, HiOutlineChevronRight, HiOutlinePhotograph, HiOutlineExclamationCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { useLanguage } from '../layout'; // นำระบบภาษาเข้าใช้

export default function AIScanner() {
  const { t, lang } = useLanguage(); // ดึงตัวแปรคำแปลและภาษาปัจจุบันมาใช้
  const router = useRouter();
  const [model, setModel] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fishData, setFishData] = useState<Record<string, any>>({}); 
  const [loading, setLoading] = useState(false); 
  const [relatedFishes, setRelatedFishes] = useState<any[]>([]); // เพิ่ม State สำหรับปลาในวงศ์เดียวกัน
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access is blocked. Please use 'localhost' or 'HTTPS'.");
      return;
    }

    setIsCameraActive(true);
    setImagePreview(null);
    setPredictions([]);
    setRelatedFishes([]); // รีเซ็ตข้อมูลปลาที่เกี่ยวข้อง
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setIsCameraActive(false);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !model || !isCameraActive) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setLoading(true); 
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        stopCamera();

        const img = new Image();
        img.src = dataUrl;
        img.onload = async () => {
          const prediction = await model.predict(img);
          await processPredictions(prediction);
          setLoading(false); 
        };
      }
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true); 
    setRelatedFishes([]); // รีเซ็ตข้อมูลปลาที่เกี่ยวข้อง
    stopCamera();
    const url = URL.createObjectURL(file);
    setImagePreview(url);

    const img = new Image();
    img.src = url;
    img.onload = async () => {
      if (model) {
        const prediction = await model.predict(img);
        await processPredictions(prediction);
      }
      setLoading(false); 
    };
  };

  // --- แก้ไข Logic: กรองรูปเสีย + ดึงปลาในวงศ์เดียวกัน (Related Species) ---
  const processPredictions = async (data: any[]) => {
    const sorted = data
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 10); 

    const validPredictions: any[] = [];
    let topFamily = "";

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish/search?classId=${p.className}`);
        const info = await res.json();
        
        if (info && info.imageRef) {
          setFishData(prev => ({ ...prev, [p.className]: info }));
          validPredictions.push(p);

          // ถ้าเป็นอันดับ 1 และความมั่นใจใช้ได้ ให้เก็บชื่อ Family ไว้ไปดึงข้อมูลเพิ่ม
          if (i === 0 && p.probability >= 0.15) {
            topFamily = info.family;
          }
        }
      } catch (err) {
        console.error("Fetch error for class:", p.className, err);
      }
    }

    setPredictions(validPredictions);

    // ดึงปลาตัวอื่นในวงศ์เดียวกันมาโชว์ (Contextual Suggestion)
    if (topFamily) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish?family=${topFamily}`);
        const allInFamily = await res.json();
        // กรองเอาเฉพาะตัวที่ไม่ได้อยู่ในรายการ Top 10 มาโชว์ เพื่อไม่ให้ซ้ำ
        const topClassNames = validPredictions.map(v => v.className);
        const suggestions = allInFamily
          .filter((f: any) => !topClassNames.includes(f.classId))
          .slice(0, 8);
        setRelatedFishes(suggestions);
      } catch (err) {
        console.error("Related species fetch error:", err);
      }
    }
  };

  return (
    <main className="min-h-screen relative pb-16 bg-[#050c1a] font-sans text-white overflow-x-hidden text-left">
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/scanner-bg.jpg" 
          className="w-full h-full object-cover opacity-30" 
          alt="Scanner Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c1a]/80 via-[#050c1a]/40 to-[#050c1a]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3 uppercase italic drop-shadow-lg">
            {t.scanner.title} <span className="text-blue-500">{t.scanner.title2}</span>
          </h1>
          <p className="text-slate-300 font-light text-sm md:text-lg tracking-wide px-4">
            {t.scanner.description}
          </p>
        </div>

        {/* Viewfinder Section */}
        <div className="max-w-xl mx-auto bg-[#0a192f]/80 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden mb-10">
          <div className="aspect-[4/3] sm:aspect-video relative bg-black flex items-center justify-center">
            {isCameraActive ? (
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            ) : imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
            ) : (
              <div className="text-center space-y-4 p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
                  <HiOutlineCamera className="text-2xl md:text-3xl text-blue-400" />
                </div>
                <p className="text-slate-300 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black">
                  {t.scanner.ready}
                </p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {(imagePreview || isCameraActive) && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[3px] bg-cyan-400/80 shadow-[0_0_20px_cyan] animate-scan-line relative z-20"></div>
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="p-5 md:p-6 bg-[#0a192f]/60 border-t border-white/5">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
               {!isCameraActive ? (
                 <button 
                  onClick={startCamera}
                  className="flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-blue-600 text-white font-black text-[10px] md:text-xs tracking-widest hover:bg-blue-500 transition-all active:scale-95 uppercase"
                >
                  <HiOutlineCamera className="text-lg" /> {t.scanner.openCam}
                </button>
               ) : (
                <button 
                  onClick={captureAndAnalyze}
                  className="flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-cyan-500 text-white font-black text-[10px] md:text-xs tracking-widest animate-pulse uppercase"
                >
                  <HiOutlinePhotograph className="text-lg" /> {lang === 'en' ? 'CAPTURE' : 'ถ่ายภาพ'}
                </button>
               )}

              <label className="flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 font-black text-[10px] md:text-xs tracking-widest cursor-pointer hover:bg-white/10 active:scale-95 transition-all uppercase">
                <HiOutlineCloudUpload className="text-lg" /> {t.scanner.upload}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            
            {isCameraActive && (
              <button onClick={stopCamera} className="mt-4 w-full text-[9px] font-bold text-red-400/70 uppercase tracking-widest hover:text-red-400 transition-colors">
                {t.scanner.cancel}
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-xl mx-auto space-y-5 px-1">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] md:text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">
              {t.scanner.results} (TOP 10)
            </h3>
          </div>
          
          {(loading || !model) && (
            <div className="flex flex-col items-center justify-center p-10 bg-black/30 rounded-[2.5rem] border border-white/5">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">
                {!model ? t.scanner.initializing : t.scanner.analyzing}
              </p>
            </div>
          )}

          {predictions.length > 0 && predictions[0].probability < 0.15 && !loading && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] flex flex-col items-center text-center gap-4">
              <HiOutlineExclamationCircle className="text-4xl text-red-400" />
              <div>
                <p className="text-sm text-red-200 font-bold mb-1">
                  {lang === 'en' ? "Match Confidence Too Low" : "ความมั่นใจในการระบุชนิดต่ำเกินไป"}
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {lang === 'en' 
                    ? "The AI couldn't find a clear match. Please ensure the fish is clearly visible and try again." 
                    : "ระบบไม่พบข้อมูลปลาที่ใกล้เคียงเพียงพอ กรุณาถ่ายภาพปลาให้ชัดเจนหรือเปลี่ยนมุมถ่าย"}
                </p>
              </div>
            </div>
          )}

          {predictions.length > 0 && predictions[0].probability >= 0.15 && !loading && (
            <div className="grid gap-3">
              {predictions.map((p, idx) => (
                <div 
                  key={idx}
                  onClick={() => router.push(`/fish/${p.className}`)} 
                  className={`group flex items-center justify-between p-3 md:p-4 border transition-all cursor-pointer active:scale-[0.98] 
                    ${idx === 0 ? 'bg-blue-600/20 border-blue-500/30 rounded-[1.8rem] md:rounded-[2rem]' : 'bg-black/40 border-white/10 rounded-2xl opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-4 md:gap-5 text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl overflow-hidden p-1 border border-white/5">
                      <img 
                        src={fishData[p.className] ? `/images/${fishData[p.className].imageRef}` : '/images/loading-fish.jpg'} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        alt="Result"
                      />
                    </div>
                    
                    <div className="max-w-[160px] sm:max-w-none">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${idx === 0 ? 'bg-blue-500 text-white border-blue-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                          RANK {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-black text-base md:text-xl text-white truncate tracking-tight uppercase">
                        {lang === 'th' && fishData[p.className]?.localName_th 
                           ? fishData[p.className].localName_th 
                           : (fishData[p.className]?.localName || `Class ID: ${p.className}`)}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                         <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-tighter ${idx === 0 ? 'text-blue-400' : 'text-slate-500'}`}>
                           {Math.round(p.probability * 100)}% {t.scanner.match}
                         </span>
                         <div className="w-16 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div 
                             className={`h-full transition-all duration-1000 ${idx === 0 ? 'bg-blue-500' : 'bg-slate-600'}`} 
                             style={{ width: `${Math.round(p.probability * 100)}%` }}
                           ></div>
                         </div>
                      </div>
                    </div>
                  </div>
                  <HiOutlineChevronRight className={`text-xl transition-all ${idx === 0 ? 'text-blue-400' : 'text-white/20'} group-hover:translate-x-1`} />
                </div>
              ))}
            </div>
          )}

          {/* --- เพิ่มใหม่: Related Species Section --- */}
          {relatedFishes.length > 0 && !loading && (
            <div className="mt-12 pt-8 border-t border-white/5 pb-10">
              <h3 className="text-[10px] md:text-[11px] font-black text-cyan-400 uppercase tracking-[0.4em] px-2 mb-6 flex items-center gap-2">
                <HiOutlineInformationCircle className="text-lg" />
                {lang === 'en' ? "Related species in this Family" : "ปลาชนิดอื่นในวงศ์เดียวกัน"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-1">
                {relatedFishes.map((f: any) => (
                  <div 
                    key={f._id}
                    onClick={() => router.push(`/fish/${f.classId}`)}
                    className="group bg-white/5 rounded-2xl p-3 border border-white/5 hover:bg-white/10 transition-all cursor-pointer text-center"
                  >
                    <div className="aspect-square bg-black/40 rounded-xl overflow-hidden mb-3 p-2">
                      <img src={`/images/${f.imageRef}`} className="w-full h-full object-contain group-hover:scale-110 transition-transform" alt={f.localName} />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase truncate px-1">
                      {lang === 'th' && f.localName_th ? f.localName_th : f.localName}
                    </p>
                    <p className="text-[8px] text-slate-500 italic truncate mt-0.5">{f.scientificName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && predictions.length === 0 && (
            <div className="py-12 text-center border border-dashed border-white/10 rounded-[2.5rem] bg-black/10 px-6">
              <p className="text-slate-400 text-xs font-light italic">
                {t.scanner.waiting}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(280px); opacity: 0; }
        }
        .animate-scan-line {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}