'use client';
import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useRouter } from 'next/navigation';
import { HiOutlineCamera, HiOutlineCloudUpload, HiOutlineRefresh, HiOutlineChevronRight, HiOutlinePhotograph } from "react-icons/hi";

export default function AIScanner() {
  const router = useRouter();
  const [model, setModel] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fishData, setFishData] = useState<Record<string, any>>({}); 
  const [loading, setLoading] = useState(false); // เพิ่มสถานะ loading
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Load Model
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // 2. Camera Logic
  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access is blocked. Please use 'localhost' or 'HTTPS'.");
      return;
    }

    setIsCameraActive(true);
    setImagePreview(null);
    setPredictions([]);
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

  // 3. Capture & Analyze
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !model || !isCameraActive) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setLoading(true); // เริ่ม loading เมื่อถ่ายภาพ
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        stopCamera();

        const img = new Image();
        img.src = dataUrl;
        img.onload = async () => {
          const prediction = await model.predict(img);
          await processPredictions(prediction);
          setLoading(false); // จบ loading
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

  // 4. Upload Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true); // เริ่ม loading
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
      setLoading(false); // จบ loading
    };
  };

  // 5. Fetch Fish Info & Process Predictions
  const processPredictions = async (data: any[]) => {
    const sorted = data
      .sort((a, b) => b.probability - a.probability)
      .filter(p => p.probability > 0.10)
      .slice(0, 3);

    setPredictions(sorted);

    for (const p of sorted) {
      if (!fishData[p.className]) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish/search?classId=${p.className}`);
          const info = await res.json();
          if (info) {
            setFishData(prev => ({ ...prev, [p.className]: info }));
          }
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }
    }
  };

  return (
    <main className="min-h-screen relative pb-24 bg-[#050c1a] font-sans text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/scanner-bg.jpg" 
          className="w-full h-full object-cover opacity-30 transition-opacity duration-1000" 
          alt="Scanner Background Environment" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050c1a] via-[#050c1a]/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase italic drop-shadow-lg">
            AI <span className="text-blue-500">Scanner</span>
          </h1>
          <p className="text-slate-200 font-light text-lg tracking-wide drop-shadow-md">
            Capture or upload a photo for professional identification.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#0a192f]/60 rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden mb-12">
          <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
            {isCameraActive ? (
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            ) : imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
            ) : (
              <div className="text-center space-y-4 p-10">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
                  <HiOutlineCamera className="text-3xl text-blue-400" />
                </div>
                <p className="text-slate-300 text-[10px] uppercase tracking-[0.3em] font-black">Camera Ready</p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {(imagePreview || isCameraActive) && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)] animate-scan"></div>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4 bg-[#0a192f]/40">
            <div className="grid grid-cols-2 gap-4">
               {!isCameraActive ? (
                 <button 
                  onClick={startCamera}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs tracking-widest transition-all shadow-lg hover:bg-blue-500"
                >
                  <HiOutlineCamera className="text-lg" /> OPEN CAMERA
                </button>
               ) : (
                <button 
                  onClick={captureAndAnalyze}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-500 text-white font-black text-xs tracking-widest transition-all shadow-lg animate-pulse"
                >
                  <HiOutlinePhotograph className="text-lg" /> CAPTURE & ANALYZE
                </button>
               )}

              <label className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/10 border border-white/10 font-black text-xs tracking-widest cursor-pointer hover:bg-white/20 transition-all">
                <HiOutlineCloudUpload className="text-lg" /> UPLOAD
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            
            {isCameraActive && (
              <button onClick={stopCamera} className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest hover:text-red-400 transition-colors text-center">
                Cancel Camera
              </button>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] px-4 drop-shadow-md">Identification Results</h3>
          
          {/* Loading Spinner Section */}
          {(loading || !model) && (
            <div className="flex flex-col items-center justify-center p-12 bg-black/20 rounded-[3rem] border border-white/5">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">
                {!model ? 'AI Model Initializing...' : 'AI is Analyzing...'}
              </p>
            </div>
          )}

          {predictions.length > 0 && !loading ? (
            <div className="grid gap-4">
              {predictions.map((p, idx) => (
                <div 
                  key={idx}
                  onClick={() => router.push(`/fish/${p.className}`)} 
                  className="group flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-[2rem] hover:bg-blue-600 transition-all cursor-pointer shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-black/80 rounded-2xl overflow-hidden border border-white/10 shadow-lg p-1">
                      <img 
                        src={fishData[p.className] ? `/images/${fishData[p.className].imageRef}` : '/images/loading-fish.jpg'} 
                        className="w-full h-full object-contain transition-transform group-hover:scale-110"
                        alt="Result Specimen"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-black text-2xl text-white group-hover:text-white transition-colors tracking-tight">
                        {fishData[p.className]?.localName || `Loading Data...`}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                         <span className="text-[11px] font-bold text-blue-400 group-hover:text-white uppercase tracking-widest">
                           {Math.round(p.probability * 100)}% Match
                         </span>
                         <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-blue-500 group-hover:bg-white transition-all" 
                             style={{ width: `${Math.round(p.probability * 100)}%` }}
                           ></div>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="pr-4">
                     <HiOutlineChevronRight className="text-2xl text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && (
            <div className="p-16 text-center border border-dashed border-white/10 rounded-[3rem] bg-black/20">
              <p className="text-slate-400 text-sm font-light italic tracking-wide">Waiting for image analysis...</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
      `}</style>
    </main>
  );
}