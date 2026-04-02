# FishDB: ระบบจำแนกชนิดปลาน้ำจืดภาคเหนือด้วยปัญญาประดิษฐ์

## บทที่ 1 — บทนำ (Introduction)

### 1.1 ที่มา ความสำคัญ และความเป็นมา

#### ภูมิหลังด้านนิเวศวิทยาและชีววิทยา

ลุ่มน้ำภาคเหนือของประเทศไทยเป็นหนึ่งในพื้นที่ที่มีความหลากหลายทางชีววิทยา (biodiversity) สูงสุดในภูมิภาค โดยเฉพาะในส่วนของปลาน้ำจืด ซึ่งโครงการศึกษาวิจัยได้บันทึกและจำแนกชนิดปลาน้ำจืดของลุ่มน้ำภาคเหนือจำนวนประมาณ **348 ชนิด** (สรุปจาก "A Field Guide to the Northern Thai Fishes" ที่จัดทำโดยอภินันท์ สุวรรณรักษ์ และ Kenzo Utsugi, 2023) ปลาเหล่านี้มีความสำคัญต่อ:

- **ความมั่นคงอาหาร** — เป็นแหล่งโปรตีนสำคัญสำหรับชุมชนท้องถิ่น
- **นิเวศน์วิทยา** — ทำหน้าที่เป็นตัวบ่งชี้สุขภาพของระบบน้ำ
- **เศรษฐศาสตร์** — สร้างให้เกิดการค้าและท่องเที่ยวเชิงนิเวศ

อย่างไรก็ตาม การจำแนกชนิดปลาอย่างแม่นยำและรวดเร็วนั้นมีความท้าทาย ทั้งจากเหตุผลทางวิชาการและทางปฏิบัติ:

- **ความท้าทายทางมอร์โฟโลยี**: ปลาทั้งหลายมีลักษณะร่างกายที่คล้ายกัน (morphological similarity) โดยเฉพาะในขนาดเล็กและวัยอ่อน ทำให้การจำแนกด้วยตาเปล่าเพียงอย่างเดียวอาจบกพร่องได้

- **ความท้าทายทางงนวิทยา**: การใช้ประเมิณหลักเกณฑ์จำแนกชนิด (morphological keys) ต้องอาศัยความรู้ลึกและประสบการณ์ของผู้เชี่ยวชาญ ซึ่งอาจไม่มีความพร้อมอยู่ทั่วไป

- **การเข้าถึงข้อมูล**: ข้อมูลและรูปภาพของบุคลทั่วไปในท้องถิ่นนั้นจำกัด เนื่องจากหนังสืออ้างอิง (field guides) อยู่ในรูปแบบพิมพ์ หรืออยู่ในห้องสมุดที่เข้าถึงได้ยาก

#### ความจำเป็นในการปัญญาประดิษฐ์และการมองเห็นด้วยคอมพิวเตอร์

ในช่วงทศวรรษที่ผ่านมา เทคโนโลยีการมองเห็นด้วยคอมพิวเตอร์ (computer vision) และการเรียนรู้ของเครื่อง (machine learning) โดยเฉพาะ **การจำแนกภาพ (image classification)** ที่อาศัยโครงข่ายประสาทลึก (deep neural networks) ได้แสดงให้เห็นถึงศักยภาพในการจำแนกปลาอย่างแม่นยำ ทำให้เกิดแนวคิดของ "อัตโนมัติ" การจำแนก ซึ่งอาจช่วยให้:

1. **ผู้ใช้ทั่วไป** สามารถระบุชนิดได้โดยเพียงถ่ายรูปผ่านกล้องมือถือ
2. **นักวิจัย** ได้รับการช่วยเหลือในการตรวจสอบ (verification) อย่างรวดเร็ว
3. **ข้อมูล** สามารถเข้าถึงได้ง่ายผ่านแอปพลิเคชันออนไลน์

---

### 1.2 วัตถุประสงค์ของโครงการ

โครงการ FishDB (Fish Database with AI Recognition) มีวัตถุประสงค์ดังต่อไปนี้:

#### 1.2.1 วัตถุประสงค์หลัก

1. **พัฒนาระบบจำแนกชนิดปลาโดยใช้ปัญญาประดิษฐ์** ที่มีประสิทธิภาพสูง โดยการ integrate โมเดลการจำแนกภาพ (image classification model) เข้ากับแอปพลิเคชันเว็บ เพื่อให้ผู้ใช้สามารถ:
   - ถ่ายภาพปลาผ่านกล้องมือถือ หรือ อัปโหลดรูปภาพ
   - ส่งภาพเข้าไปยังโมเดล AI แล้วได้ผลการอันดับ (ranked predictions) ของชนิดปลา
   - เรียกดูข้อมูลรายละเอียด (taxonomy, distribution, habitat) ของแต่ละชนิด

2. **สร้างสารานุกรมปลาน้ำจืดภาคเหนือ** ที่ครอบคลุมข้อมูล 60 ชนิดภายในแอปพลิเคชัน ซึ่งรวมถึง:
   - ชื่อวิทยาศาสตร์ (scientific name)
   - ชื่อท้องถิ่น (local name)
   - วงศ์ (family)
   - ขนาดตัว ที่อยู่อาศัย พื้นที่การกระจาย (distribution range)
   - รูปภาพประกอบ

3. **ทดสอบเทคโนโลยีการรัน AI inference ฝั่งเบราว์เซอร์** (client-side inference) โดยการ integrate TensorFlow.js เข้ากับแอปพลิเคชัน Frontend ทำให้สามารถ:
   - รัน inference ได้แบบ offline (ไม่ต้องขึ้นอยู่กับ server-side computation)
   - ลดเวลาการตอบสนอง (latency) และปริมาณข้อมูลที่ส่งขึ้นเซิร์ฟเวอร์

4. **สร้างอินเทอร์เฟซผู้ใช้แบบรองรับหลายภาษา** เพื่อให้สามารถใช้งานได้ง่ายสำหรับ:
   - ผู้ใช้ที่พูดภาษาไทยและภาษาอังกฤษ (ในเนื้อหา UI/UX หลัก)
   - ผู้ใช้จากพื้นฐานความรู้ที่หลากหลาย (นักศึกษา นักวิจัย ประชาชนทั่วไป)

#### 1.2.2 วัตถุประสงค์เฉพาะ (Specific Objectives)

- ปรับปรุงความเข้าถึง (accessibility) ของข้อมูลปลา สำหรับ stakeholders ท้องถิ่นและชนาญ
- ลดต้นทุน (cost) และเวลาในการขอความช่วยเหลือผู้เชี่ยวชาญด้านชีววิทยา ในการตรวจสอบและจำแนกชนิด
- สร้างพื้นฐาน (proof-of-concept) สำหรับการนำ AI ไปใช้ในด้านการบันทึกและการอนุรักษ์ความหลากหลายทางชีววิทยา

---

### 1.3 สรุปฮาร์ดแวร์ และซอฟต์แวร์ที่ใช้

#### 1.3.1 ส่วนประกอบซอฟต์แวร์หลัก

| ส่วนประกอบ | เทคโนโลยี | เวอร์ชัน | วัตถุประสงค์ |
|----------|-----------|--------|----------|
| **Frontend Web App** | Next.js (React) | 16.1.4 | Interface สำหรับผู้ใช้ ร่วมกับ UI components |
| **Backend API Server** | NestJS | 11.0.1 | Services สำหรับจัดการข้อมูล และ API endpoints |
| **Database** | MongoDB Atlas | Cloud | เก็บข้อมูลปลา (collection: `fishes`) |
| **AI/ML Model** | Teachable Machine + TensorFlow.js | TF.js 4.22.0 | Run inference สำหรับการจำแนกชนิดภาพ |
| **Language** | TypeScript | 5.7.3 | Type-safe development |
| **CSS Framework** | Tailwind CSS | 4 | Styling และ responsive design |

#### 1.3.2 ส่วนประกอบฮาร์ดแวร์

- **ฝั่งClient (ผู้ใช้)**: 
  - Smartphone/Tablet (iOS/Android) ที่มี browser ที่รองรับ WebGL (สำหรับ TensorFlow.js)
  - Webcam หรือ built-in camera สำหรับถ่ายภาพ
  
- **ฝั่ง Server**:
  - Node.js runtime สำหรับรัน NestJS backend
  - MongoDB Atlas (cloud) สำหรับเก็บข้อมูล
  - Web server (Vercel, Heroku, AWS ฯลฯ) สำหรับ deployment

#### 1.3.3 เทคโนโลยี AI/ML ที่เกี่ยวข้อง

- **Teachable Machine** (Google): โปรแกรมอบรมโมเดล ML แบบต่อเนื่อง (visual training tool) ที่ไม่ต้องการการเขียนโค้ด
- **TensorFlow.js**: ไลบรารี่ที่ทำให้สามารถรัน inference แบบ in-browser บน JavaScript
- **Convolutional Neural Networks (CNN)**: สถาปัตยกรรม neural network ที่ใช้ในการจำแนกภาพ

---

### 1.4 ขอบเขตของโครงการ

#### 1.4.1 สิ่งที่รวมอยู่ (In Scope)

1. **ข้อมูลปลา**: 
   - ประกอบด้วยข้อมูลปลา **60 ชนิด** จากลุ่มน้ำภาคเหนือที่ได้รับการคัดเลือก
   - แต่ละ item มีข้อมูล: ชื่อวิทยาศาสตร์, ชื่อท้องถิ่น, วงศ์, ขนาด, ที่อยู่อาศัย, พื้นที่การกระจาย, รูปภาพ

2. **ฟีเจอร์หลัก**:
   - **AI Scanner**: ถ่ายรูป/อัปโหลด → run inference → แสดงผลการตรวจสอบ 3 อันดับ
   - **Encyclopedia**: เรียกดูรายชื่อปลาทั้งหมด ระบบค้นหา (filter/search)
   - **Fish Detail Page**: รายละเอียดเชิงลึก พร้อมรูปภาพและข้อมูล taxonomy
   - **Responsive Design**: รองรับทั้งมือถือ (mobile) และเดสก์ทอป

3. **Technologies**:
   - Full-stack web development: Frontend (Next.js), Backend (NestJS), Database (MongoDB)
   - AI integration: TensorFlow.js + Teachable Machine โมเดล
   - API: REST API design และ CORS configuration

4. **ภาษา**: 
   - Interface รองรับภาษาไทยและภาษาอังกฤษในเนื้อหาหลัก
   - Documentation ในภาษาไทย

#### 1.4.2 สิ่งที่ไม่รวมอยู่ (Out of Scope)

1. **แสดงข้อมูลนอกเหนือ 60 ชนิด**: เช่น ปลาน้ำเค็มหรือปลาต่างประเทศ
2. **ระบบ Authentication/Authorization**: ไม่มีระบบล็อกอิน หรือสิทธิ์ของผู้ใช้
3. **CRUD สำหรับผู้ใช้ทั่วไป**: ไม่อนุญาตให้ผู้ใช้ทั่วไปเพิ่ม/แก้ไข ข้อมูลปลา
4. **Real-time synchronization**: ไม่มี real-time update บนอินเทอร์เฟซสำหรับผู้ใช้หลายคน
5. **Data visualization ขั้นสูง**: เช่น interactive maps, geographic distribution heatmaps ฯลฯ

---

### 1.5 ประโยชน์ที่คาดว่าจะได้รับ

#### 1.5.1 ประโยชน์วิชาการและการศึกษา

- **สนับสนุนการศึกษา**: นักศึกษาสาขาชีววิทยา วิศวกรรมศาสตร์ สามารถใช้งานเพื่อเรียนรู้เกี่ยวกับการจำแนกปลา
- **รองรับการวิจัย**: นักวิจัยด้านนิเวศวิทยา การประมง สามารถใช้เป็นเครื่องมือช่วยในการ field survey
- **นำเสนอแนวคิด AI-driven taxonomy**: เป็นตัวอย่างการประยุกต์ใช้ machine learning ในสาขาชีววิทยา

#### 1.5.2 ประโยชน์ด้านการอนุรักษ์และสิ่งแวดล้อม

- **เพิ่มความตระหนักรู้**: สร้างความเข้าใจ เพื่อชุมชนท้องถิ่นเกี่ยวกับความหลากหลายของปลาและความสำคัญของสิ่งแวดล้อม
- **ช่วยเหลือการสำรวจ**: ลดเวลา-ต้นทุน สำหรับการ species identification ในงานสนามศึกษา (biodiversity surveys)

#### 1.5.3 ประโยชน์เชิงเทคโนโลยี

- **Proof-of-Concept** สำหรับการประยุกต์ AI ในสาขาอื่นๆ (e.g., นก แมลง พืช) ที่มีจำนวนชนิดมากมาย
- **สาธิต** การออกแบบระบบ Full-stack modern: frontend framework, backend API, database, ML inference

#### 1.5.4 ประโยชน์เชิงสังคม

- **เข้าถึงได้**: เปิดโอกาสให้ประชาชนทั่วไป นักรักษ์โครงการ NGO สามารถระบุปลา โดยไม่ต้องมีความเชี่ยวชาญเฉพาะด้าน
- **ยั่งยืน**: ช่วยสนับสนุนการอนุรักษ์ทรัพยากรน้ำหวานภาคเหนือเพื่อความยั่งยืน

---

## บทที่ 2 — ทฤษฎี และงานวิจัยที่เกี่ยวข้อง (Literature Review)

### 2.1 ทฤษฎี Image Classification และ Computer Vision

#### 2.1.1 พื้นฐานของ Image Classification

Image classification (การจำแนกภาพ) เป็นการใช้ computer vision เพื่อจำแนก หรือ categorize ภาพดิจิทัลลงในหมวดหมู่ที่กำหนดไว้ล่วงหน้า (predefined classes)

**ขั้นตอนพื้นฐาน:**

1. **Image Acquisition** — รับภาพดิจิทัลจากกล้อง หรือไฟล์อัปโหลด
2. **Preprocessing** — ปรับปรุงคุณภาพ: ปรับขนาด (resizing), normalize pixel values, augmentation
3. **Feature Extraction** — สกัด (extract) ลักษณะเด่น (features) จากภาพ
4. **Classification** — ใช้ classifier (model) ตัดสินใจว่าภาพนั้นเป็นคลาสไหน
5. **Post-processing** — ตัดสินใจ threshold, แสดงผล, confidence score ฯลฯ

#### 2.1.2 การวิวัฒนาของ Computer Vision: Classical มาถึง Deep Learning

**Phase 1: Classical Computer Vision (1960s-2000s)**

- **คุณลักษณะ**: Hand-crafted features เช่น Edge detection (Canny, Sobel), SIFT, HOG (Histogram of Oriented Gradients)
- **คลาสสิเฟียร์**: Support Vector Machines (SVM), Decision trees, ฯลฯ
- **ข้อจำกัด**: ต้องออกแบบ feature manually, ประสิทธิภาพจำกัด

**Phase 2: Deep Learning Era (2010s — Present)**

นับตั้งแต่ Alex Krizhevsky et al. (2012) ใช้ CNN ในการชนะ ImageNet competition ด้วย error rate 15.3% (ลดลงจาก ~25% ของวิธี classical) งานด้าน computer vision เปลี่ยนไปใช้ deep neural networks เป็นส่วนใหญ่

**โครงสร้างหลักของ CNN:**

```
Input Image (224×224×3)
    ↓
Convolutional Layers (Feature extraction)
    ├─ Convolutional filters: 32, 64, 128, ... channels
    ├─ Activation: ReLU
    └─ Pooling: Max pooling, Average pooling
    ↓
Fully Connected Layers (Classification)
    ├─ Dense layers
    └─ Softmax output (probability distribution)
    ↓
Output logits / class scores
```

#### 2.1.3 Transfer Learning และ Pre-trained Models

ไม่จำเป็นต้องฝึก CNN model ตั้งแต่ต้น เนื่องจาก pre-trained models (ที่ฝึกบน large-scale datasets เช่น ImageNet) สามารถ reuse ได้:

- **Fine-tuning**: เปลี่ยน last layers และทำการฝึกเพิ่มเติม (อย่างมีประสิทธิภาพ)
- **Feature extraction**: ใช้ layer ตรงกลาง (intermediate layers) ของ pre-trained model เป็น feature extractor

ตัวอย่างสำเร็จรูป pre-trained models:

- **ResNet** (He et al., 2015): 50, 101, 152 layers — รองรับ residual connections
- **VGG** (Simonyan & Zisserman, 2014): 16, 19 layers ที่เรียบง่าย
- **MobileNet** (Howard et al., 2017): ออกแบบจาก mobile devices ด้วย depthwise separable convolutions
- **EfficientNet** (Tan & Le, 2019): balance ระหว่าง accuracy กับ efficiency

#### 2.1.4 Loss Functions และ Optimization

สำหรับ multi-class classification:

- **Cross-Entropy Loss**: $$L = -\sum_{c=1}^{C} y_c \log(p_c)$$ 
  (เมื่อ $y$ = true label, $p$ = predicted probability)
  
- **Optimization Algorithms**: Adam, SGD with momentum, RMSprop

#### 2.1.5 Metrics สำหรับการประเมินผล

- **Accuracy**: $$\frac{\text{# correct predictions}}{\text{# total predictions}}$$
- **Precision**: $$\frac{\text{TP}}{\text{TP + FP}}$$ — ความแม่นยำของ positive predictions
- **Recall (Sensitivity)**: $$\frac{\text{TP}}{\text{TP + FN}}$$ — proportion of actual positives ที่ detect ได้
- **F1-Score**: $$2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision + Recall}}$$
- **Confusion Matrix**: แสดง TP, TN, FP, FN สำหรับแต่ละ class

---

### 2.2 Computer Vision ในงานประมง และการจำแนกสิ่งมีชีวิตน้ำ

#### 2.2.1 ความหลากหลายด้านสัณฐาน (Morphological Diversity) ของปลา

ปลา (Pisces/Actinopterygii) เป็นกลุ่มสัตว์น้ำที่มีความหลากหลายสูง โดย:

- **จำนวนชนิด**: ค้นพบมากกว่า 30,000 ชนิดทั่วโลก
- **ความเชี่ยวชาญ (Specialization)**: ปลาแต่ละชนิดมีการปรับตัว (adaptation) เพื่อชีวิตในนิเวศต่างๆ (แม่น้ำ ห้วย lagoon ฯลฯ) ทำให้เกิดลักษณะ morphological ที่หลากหลาย

**ความท้าทายของ morphological keys:**

- **Intraspecific variation**: บุคคลในชนิดเดียวกันมีความแตกต่างกัน เนื่องจากเพศ อายุ สภาพแวดล้อม
- **Convergent evolution**: ชนิดต่างกัน อาจมีลักษณะคล้ายกัน เนื่องจากการปรับตัวต่อสิ่งแวดล้อมที่คล้ายคลึง

#### 2.2.2 งานวิจัยที่เกี่ยวข้อง: AI สำหรับ Aquatic Species Recognition

**งานวิจัยด้านการจำแนกปลา:**

1. **Cutter et al. (2018)** — "Automatic Fish Species Recognition using Deep Learning"
   - ใช้ CNN (Inception-v3, ResNet-50) สำหรับการจำแนก 24 ชนิดปลาน้ำจืด (freshwater fish)
   - Accuracy: 89-94% ขึ้นอยู่กับ architecture
   - ข้อค้นพบ: Transfer learning ได้ผลดีกว่า training from scratch

2. **Salman et al. (2012)** — "Fish Species Classification System based on Morphological Texture Analysis and a Feedforward Neural Network"
   - ใช้ hand-crafted texture features (Local Binary Patterns) + ANN
   - Testing บน 4 ชนิดปลา
   - Accuracy: 82%
   - ข้อวิจารณ์: ไม่ scalable เมื่อชนิดเพิ่มขึ้น

3. **Tangkaratt et al. (2018)** — "Fish Species Recognition System from Images"
   - ตรวจสอบการใช้ SVM + hand-crafted features สำหรับปลาน้ำจืดไทย
   - ชนิด: 10-20 ชนิด
   - Accuracy: 75-85% (น้อยกว่า CNN-based)

4. **Chen et al. (2015)** — "FishNet: Deep residual networks for fish species classification"
   - ใช้ ResNet-50 บน dataset 30+ ชนิดปลาทะเล
   - Accuracy: 90%+
   - ข้อสนใจ: Visualizing CNN activations เพื่อเข้าใจว่า model ให้ความสำคัญกับ feature ไหน (e.g., fin shape, color pattern)

#### 2.2.3 ความสำคัญของ Ecological Context และ Biodiversity Monitoring

**งานวิจัยด้านการติดตามความหลากหลายทางชีววิทยา (Biodiversity Monitoring):**

- **CBD (Convention on Biological Diversity)** — ให้ Targets สำหรับการบันทึกและการติดตาม biodiversity
- **eFish initiatives** — Using technology (ภาพ, DNA) สำหรับการตรวจสอบ species composition ของ ichthyofauna ในแต่ละลุ่มน้ำ

**ข้อดีของระบบ AI-assisted:**

- ลดเวลา และต้นทุนของสนามศึกษา (field surveys)
- เพิ่มความสามารถในการทำ rapid assessment
- ช่วยเหลือผู้วิจัยที่ไม่มี taxonomic expertise ที่เพียงพอ

---

### 2.3 รีวิวเทคโนโลยี: Teachable Machine และ TensorFlow.js

#### 2.3.1 Teachable Machine (Google)

**คำจำกัดความ**: Teachable Machine เป็นแพลตฟอร์มที่ให้ผู้ใช้ (no-code/low-code) ฝึกโมเดล ML สำหรับ:

- **Image classification**
- **Audio classification**
- **Pose estimation**

**ลักษณะเด่น:**

- **User-friendly**: อินเทอร์เฟซ visual-based ไม่ต้องเขียนโค้ด
- **Transfer learning built-in**: ใช้ MobileNet-v2 (ฝึกไว้บน ImageNet) เป็น backbone
- **Export formats**: สามารถ export เป็น TensorFlow.js, TensorFlow Lite, TensorFlow Saved Model
- **Real-time preview**: ให้ feedback ที่รวดเร็ว

**กระบวนการฝึก:**

1. สร้าง project และนิยาม classes
2. อัปโหลด/บันทึก training images (อย่างน้อย 20-50 รูปต่อ class)
3. ปรับ parameters: epochs, learning rate
4. ทำการ training (บน Google's cloud)
5. Test ด้วย real-time preview
6. Export โมเดล

**ข้อจำกัด:**

- ขนาด training set อาจจำกัด (cloud service มี quota)
- Interpretability จำกัด (ไม่สามารถ access intermediate layers ได้ง่าย)
- ขึ้นอยู่กับ internet connection สำหรับ training

#### 2.3.2 TensorFlow.js — Run TensorFlow in Browser

**คำจำกัดความ**: TensorFlow.js เป็นไลบรารี่ JavaScript ที่อนุญาตให้รัน TensorFlow models บน:

- Web browsers (ใช้ WebGL หรือ CPU)
- Node.js

**ลักษณะเด่น:**

- **Client-side inference**: Model ทำงานใน browser ของผู้ใช้ ไม่ต้องส่งภาพไปยังเซิร์ฟเวอร์ → ถูก + ปลอดภัย (privacy)
- **Pre-trained models**: TensorFlow Hub มี models พร้อมใช้ (MobileNet, PoseNet, ฯลฯ)
- **Multiple input formats**: รองรับ images, tensors, typed arrays
- **Optimization**: ใช้ quantization, pruning เพื่อลดขนาด model

**ตัวอย่างการตั้งค่า:**

```javascript
// 1. Load pre-trained model
const model = await tmImage.load('/path/to/model.json', 
                                   '/path/to/metadata.json');

// 2. Prepare input image
const image = /* HTMLImageElement or canvas */;

// 3. Run inference
const predictions = await model.predict(image);
// Returns: Array of { className, probability }

// 4. Display results
predictions.sort((a, b) => b.probability - a.probability);
console.log(predictions[0]); // Top prediction
```

**Performance ด้วย WebGL vs CPU:**

- **WebGL** (GPU accelerated): เร็วกว่า CPU เช่นเดียวกัน 5-30x ขึ้นอยู่กับ model size และ browser
- **CPU** (Fallback): ช้า แต่ compatible กับ devices ที่ไม่รองรับ WebGL

#### 2.3.3 โมเดล Export จาก Teachable Machine → TensorFlow.js Format

**ไฟล์ที่สร้าง:**

- `model.json`: Metadata และ references ไปยัง weights
- `model.weights.bin` (หรือ `.bin` files): Binary weights
- `metadata.json`: Labels, image size, ฯลฯ

**ตัวอย่าง metadata.json:**

```json
{
  "tfjsVersion": "1.7.4",
  "tmVersion": "2.4.10",
  "modelName": "fishDB",
  "labels": ["001", "002", ..., "060"],
  "imageSize": 224
}
```

---

### 2.4 งานวิจัยที่เกี่ยวข้องกับ "Low-resource" ตามพื้นที่

#### 2.4.1 Local Biodiversity Documentation ใช้ Limited Resources

**ปัญหา**: ในประเทศที่กำลังพัฒนา และพื้นที่ห่างไกล มักขาดข้อมูล baseline taxonomy และ species inventory

**เทคโนโลยีอื่นๆ ที่ใช้:**

- **Camera traps** + AI: Automatic animal detection จากภาพ night vision
- **Drone photogrammetry**: การบันทึกพื้นที่มหาศาล
- **Mobile apps ที่ใช้ ML**: iNaturalist (community science), Merlin Bird ID ฯลฯ

**iNaturalist case study:**

- Platform ที่อนุญาตให้ผู้ใช้บันทึก observations พร้อม supported image
- ใช้ AI (Google Inception) ในการ filter/suggest taxonomy
- กลายเป็น largest source ของ biodiversity data ในโลก

#### 2.4.2 ข้อเรียนรู้จากโครงการอื่น

1. **Community engagement**: ข้อมูล crowdsourced มีค่าหากมีระบบ verification อย่างดี
2. **Iteration**: โมเดลแรก ๆ อาจไม่ perfect แต่ใช้เป็น prototype เพื่อ iterate
3. **Documentation**: เอกสารเชิงวิชาการ (taxonomy keys) และ digital assets (photos) ควรไป hand-in-hand

---

### 2.5 ปลาน้ำจืดภาคเหนือไทย — State of Knowledge

#### 2.5.1 ข้อมูลจาก Field Guide ที่อ้างอิง

**"A Field Guide to the Northern Thai Fishes" (Suvarnaraksra & Utsugi, 2023):**

- ครอบ ~348 ชนิด ปลาน้ำจืด
- Arranged by family (Cyprinidae, Bagridae, Channidae ฯลฯ)
- ให้ keys สำหรับ identification ขั้นต่างๆ
- ข้อมูล distribution, habitat preferences, size groups

**ความหลากหลายตามวงศ์:**

- **Cyprinidae** (carp family): ~100 ชนิด — largest family
- **Bagridae** (catfish family): ~20-30 ชนิด
- **Channidae** (snakehead family): ~5-10 ชนิด
- Others: Gobiidae, Siluridae, Pomacentridae, Mastacembelidae ฯลฯ

#### 2.5.2 ความสำคัญในเชิงนิเวศวิทยา

- **Primary consumers**: ปลา herbivorous จำทำหน้าที่สำคัญในการควบคุม algae growth
- **Secondary consumers**: ปลา carnivorous ช่วยให้ความสมดุล trophic
- **Indicator species**: บางชนิด (e.g., benthic macroinvertebrate-eaters) อาจบ่งชี้คุณภาพน้ำ
- **Ecosystem services**: ให้โปรตีนและ nutrients สำหรับมนุษย์และสัตว์น้ำอื่น

---

### 2.6 สรุปงานวิจัยที่เกี่ยวข้อง และ Gap ที่โปรเจกต์นี้จะเติมเต็ม

#### สรุป:

| แง่มุม | งานวิจัยที่มีอยู่ | Gap ใน FishDB |
|--------|-----------------|--------------|
| **Image classification CNN** | Lingo research บนปลาน้ำจืดทั่วโลก (10-30 ชนิด) | Targeted ที่ 60 ชนิดภาคเหนือไทย |
| **Teachable Machine** | ใช้มาก แต่ส่วนใหญ่ proof-of-concept | Full-stack integration Frontend-Backend-DB |
| **Client-side inference** | ทฤษฎี OK (TensorFlow.js docs) | App demo ที่ใช้งานจริง |
| **Thai-language Interface** | iNaturalist ทั้งโลกแต่ไม่ localized | Tailored สำหรับ Thai users & context |
| **Integration ด้าน Taxonomy** | Field guides อยู่ใน print หรือ PDF | Structured database + Web interface |

#### โครงการนี้จึงเติมเต็ม:

- นำ ML techniques มาใช้ กับ ชุดข้อมูล local-specific (Northern Thai fish ที่มี documentation ที่ดี)
- สาธิต best practices สำหรับ modern web stack + AI integration
- Provide accessible tool สำหรับ stakeholders ท้องถิ่น

---

## บทที่ 3 — เทคโนโลยีและทฤษฎีที่ใช้ในการศึกษา (Technologies & Deep Learning Theory)

### 3.1 Convolutional Neural Networks (CNN) — ทฤษฐานเชิงลึก

#### 3.1.1 โครงสร้างพื้นฐานของ Neural Network

Neural Network ประกอบด้วยหลาย ชั้น (layers) ของ "neurons" ที่เชื่อมต่อกัน:

- **Input Layer**: รับข้อมูล input (e.g., pixel values ของภาพ)
- **Hidden Layers**: ประมวลผลข้อมูล ผ่านสิ่งที่เรียกว่า "weighted sum" บวกกับ activation function
- **Output Layer**: ออกมาเป็น predictions

**สูตรพื้นฐานของ neuron:**

$$z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$$
$$a = \sigma(z)$$

เมื่อ:
- $z$ = weighted sum (sum of inputs × weights + bias)
- $w_i$ = weight (ค่าที่ต้องการให้ network เรียนรู้)
- $x_i$ = input
- $b$ = bias (ช่วยให้ model ยืดหยุ่นมากขึ้น)
- $\sigma$ = activation function (เช่น ReLU, Sigmoid, Tanh)

#### 3.1.2 Convolutional Layer — หัวใจของ CNN

แทนที่จะเชื่อมต่อ fully-connected (ทุก neuron ต่อทุก neuron เหมือน standard neural network) CNN ใช้ **convolutional filters** (ตัวกรอง) ที่เลื่อนไปมาบนภาพ:

**ขั้นตอน Convolution:**

1. **Filter (Kernel)**: เมทริกซ์เล็ก ๆ (e.g., 3×3, 5×5) ที่มี weights 
2. **Sliding window**: เลื่อน filter บนภาพ (stride = จำนวนขั้นต่อ slide)
3. **Element-wise multiplication**: คูณ filter กับ pixel ที่ screen
4. **Sum**: บวกผลคูณทั้งหมด + bias → 1 ค่า
5. **Repeat**: ทำซ้ำบน spatial locations ต่างๆ → เอาท์พุต feature map

**สูตร:**

$$\text{Output}(i,j) = \sum_{m=0}^{k-1} \sum_{n=0}^{k-1} K(m,n) \cdot I(i+m, j+n) + b$$

เมื่อ:
- $K$ = kernel/filter
- $I$ = input image
- $(i,j)$ = location
- $k$ = kernel size

**เหตุผลของ Convolution:**

- **Local connectivity**: ปลา feature ต่างๆ (ตา ครีบ ลำตัว) มักปรากฏในพื้นที่ local ไม่ใช่ global
- **Parameter sharing**: ใช้ filter เดียวกันบนภาพทั้งหมด → ลด parameters
- **Spatial hierarchies**: layers แรก เรียนรู้ low-level features (edges), layers ลึก เรียนรู้ high-level features (shapes, patterns)

#### 3.1.3 Pooling Layer — ลดมิติและรักษา Feature ที่สำคัญ

หลัง convolution มักใช้ **pooling** เพื่อ:
- ลดขนาด feature map (downsample)
- เพิ่ม computational efficiency
- ช่วยให้ model กลายเป็น "shift-invariant" (ไม่ไวต่อการเลื่อนเล็กน้อย)

**ประเภท:**
- **Max Pooling**: เลือก max value ในหน้าต่าง (e.g., 2×2)
- **Average Pooling**: หาค่าเฉลี่ย

ตัวอย่าง Max Pooling (2×2):
```
Input (4×4):          Max Pooling (2×2):
[1  3  5  2]          [3  5]
[2  4  1  9]          [8  9]
[6  8  2  3]
[7  4  1  5]
```

#### 3.1.4 Activation Functions — เพิ่มความ Non-linearity

หากไม่มี activation function ชั้นต่างๆ จะเป็นแค่ linear transformations ซ้อนกัน (และ linear × linear = linear เสมอ) ทำให้Model ไม่สามารถเรียนรู้ features ที่ซับซ้อน

**ประเภท:**

1. **ReLU (Rectified Linear Unit)** — ที่นิยมใช้ในโครงการนี้
   $$\text{ReLU}(z) = \max(0, z)$$
   - ข้อดี: เรียบง่าย, রcomputation efficient, ทำให้ gradient ไม่หายตัว
   
2. **Sigmoid**
   $$\sigma(z) = \frac{1}{1 + e^{-z}}$$
   - ข้อดี: Output range [0,1], interpretable
   - ข้อจำกัด: Vanishing gradient problem

3. **Tanh**
   $$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$$
   - Output range [-1, 1], คล้าย Sigmoid แต่better

#### 3.1.5 Fully Connected Layers และ Softmax

หลังจาก convolutional/pooling layers ข้อมูลจะแบน (flatten) เข้า fully connected layers (dense layers):

$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$
$$a^{(l)} = \text{ReLU}(z^{(l)})$$

**Output Layer สำหรับ Multi-class Classification:**

ใช้ **Softmax** ฟังก์ชันเพื่อแปลง raw scores เป็น probability distribution:

$$P(\text{class}_k) = \text{softmax}(z_k) = \frac{e^{z_k}}{\sum_{j=1}^{C} e^{z_j}}$$

เมื่อ:
- $z_k$ = score สำหรับ class $k$
- $C$ = จำนวน classes (60 ชนิดปลา)
- Output: vector ที่มี element ทั้งหมด ∈ [0,1] และ $\sum = 1$

#### 3.1.6 CNN Architecture Visualization

```
Input Image (H×W×3)
    ↓
Conv2D (32 filters, 3×3)  → Output: (H'×W'×32)
ReLU Activation
MaxPool2D (2×2)           → Output: (H'/2×W'/2×32)
    ↓
Conv2D (64 filters, 3×3)  → Output: (H''×W''×64)
ReLU Activation
MaxPool2D (2×2)           → Output: (H''/2×W''/2×64)
    ↓
Flatten                   → 1D vector
    ↓
Dense (128 units)
ReLU Activation
Dropout (0.5)
    ↓
Dense (60 units)          → 60 classes (fish species)
Softmax                   → Probability distribution
    ↓
Output: [p₁, p₂, ..., p₆₀] (probability for each species)
```

---

### 3.2 กระบวนการฝึก (Training) และ Backpropagation

#### 3.2.1 Loss Function — วัดความผิดพลาด

**Cross-Entropy Loss** (สำหรับ multi-class classification):

$$L = -\frac{1}{N} \sum_{i=1}^{N} \sum_{c=1}^{C} y_i^{(c)} \log(\hat{p}_i^{(c)})$$

เมื่อ:
- $N$ = จำนวน training samples
- $C$ = จำนวน classes (60)
- $y_i^{(c)}$ = true label (1 ถ้า sample $i$ คือ class $c$, 0 ไม่ใช่)
- $\hat{p}_i^{(c)}$ = predicted probability ของ sample $i$ ต่อ class $c$

**ความหมาย**: Loss เป็น 0 เมื่อ model predict ถูก (ความน่าจะเป็น = 1), และสูง เมื่อ predict ผิด

#### 3.2.2 Backpropagation — วิธีพื้นฐานของการเรียนรู้

1. **Forward pass**: ส่ง input ผ่าน network → ได้ predictions
2. **Compute loss**: เปรียบเทียบ predictions กับ true labels
3. **Backward pass**: คำนวณ gradient ของ loss เทียบกับ weights ทั้งหมด (chain rule)
4. **Update weights**: ปรับ weights ในทิศทางที่ลด loss

$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w}$$

(Chain rule: L → a → z → w)

#### 3.2.3 Optimization Algorithms

ใช้** optimizer** เพื่อปรับ weights อย่างมีประสิทธิภาพ:

**Adam (Adaptive Moment Estimation):**

$$\theta_t = \theta_{t-1} - \alpha \frac{m_t}{\sqrt{v_t} + \epsilon}$$

เมื่อ:
- $m_t$ = exponential moving average ของ gradient (first moment)
- $v_t$ = exponential moving average ของ squared gradient (second moment)
- $\alpha$ = learning rate

**ข้อดี**: ไม่ต้อง manual tune learning rate มากมาย, convergence เร็ว

#### 3.2.4 Overfitting และ Regularization

**ปัญหา Overfitting**: Model เรียนรู้พัฒนาการ training data (รวมถึง noise) แต่ไม่ generalize บน unseen data

**วิธี regularization:**

1. **Dropout**: คำนวณ ลบ random neurons ออก 50% ในระหว่าง training เพื่อป้องกัน co-adaptation
   
2. **L2 Regularization (Weight Decay)**:
   $$L_{\text{total}} = L + \lambda \sum w^2$$
   (ลงโทษ weights ที่ใหญ่เกินไป)

3. **Data Augmentation**: เพิ่มหลากหลายของ training data ด้วยการ rotate, flip, crop, color jitter เป็นต้น

4. **Early Stopping**: หยุดการ train เมื่อ validation loss หยุดลดลง

---

### 3.3 Teachable Machine — Transfer Learning และ Model Training

#### 3.3.1 MobileNet Architecture

Teachable Machine ใช้ **MobileNet-v2** (Howard et al., 2017) เป็น backbone:

- **ออกแบบสำหรับมือถือ**: ลดจำนวน parameters ด้วย depthwise separable convolutions
- **เร็ว**: Inference time ~100ms บน mobile
- **พื้นฐาน**: ฝึกไว้บน ImageNet ก่อนแล้ว

**Depthwise Separable Convolution:**

แทนที่ทำ standard convolution (ใหญ่) ให้ทำ:
1. **Depthwise**: แยก convolution ต่อแต่ละ channel
2. **Pointwise**: 1×1 convolution เพื่อ mix channels

ผลลัพธ์: **8-9x ลดจำนวน parameters** เทียบ standard convolution

#### 3.3.2 Transfer Learning Process ใน Teachable Machine

**ขั้นตอน:**

1. **Start with pre-trained MobileNet-v2** (weights ฝึกจาก ImageNet)
   - Layers ต่อไป: เรียนรู้ features ธรรมดา (edges, textures, basic shapes)
   
2. **Prepare training data** (บันทึก images ของปลา แต่ละชนิด)
   - ต้องการ: 20-50 รูปต่อ class (60 classes = minimum 1,200 images)
   - Teachable Machine จะทำ augmentation อัตโนมัติ

3. **Replace final layer** (classification layer)
   - ลบ ImageNet classifier (1,000 classes)
   - เพิ่ม new classifier (60 fish species)

4. **Fine-tune weights** ด้วย backpropagation
   - Learning rate ต่ำ (0.001-0.0001): เพราะ weights แรก ๆ ดี แล้ว ไม่ต้องเปลี่ยนมาก
   - Epochs: ~ 50-200 (ขึ้นอยู่กับ data quality)

5. **Evaluate บน validation set**
   - Compute accuracy, recall, precision, F1-score ฯลฯ

#### 3.3.3 Label หรือ Class Definition

ในโครงการนี้:
- **60 classes** ดังนี้: "001", "002", ..., "060"
- แต่ละ class เป็นตัวแทน 1 ชนิดปลา
- Mapping: `classId` (เช่น "015") ↔ Fish document ใน MongoDB ที่มี field `classId: "015"`

**ตัวอย่าง mapping:**

```
Class "001" → Rasbora species A
Class "002" → Rasbora species B
...
Class "060" → Catfish species Z
```

#### 3.3.4 Confidence Score (Probability)

โมเดล CNN ส่วนท้าย (softmax layer) ออก **vector ของ 60 probabilities**:

$$P = [p_1, p_2, ..., p_{60}]$$

เมื่อ:
- $p_c \in [0,1]$
- $\sum_{c=1}^{60} p_c = 1$
- $p_c$ = ความแน่นอนว่า input image คือ class $c$

**ตัวอย่างผลลัพธ์:**

```
Class "001": 0.45 (45%)
Class "008": 0.35 (35%)
Class "015": 0.15 (15%)
...
```

ก่อน display ผลให้ผู้ใช้:
- Filter: เลือก predictions ที่ $p_c > 0.10$ (confidence > 10%)
- Sort: จากน้อยไปมากตามความน่าจะเป็น
- Display: Top 3 predictions พร้อมชื่อชนิดจาก database

---

### 3.4 Frontend Architecture — Next.js

#### 3.4.1 Next.js App Router

Next.js 16 ใช้ **App Router** (ไม่ใช่ Pages Router เก่า):

**โครงสร้าง:**

```
frontend/app/
├── layout.tsx             # Root layout (ทั้ง app)
├── page.tsx               # Home page (/)
├── globals.css            # Global CSS
├── scanner/
│   └── page.tsx           # GET /scanner
├── encyclopedia/
│   └── page.tsx           # GET /encyclopedia
└── fish/
    └── [classId]/
        └── page.tsx       # GET /fish/[classId] (dynamic)
```

**Routing mechanism:**
- File-based routing: ไฟล์ location = URL path
- Dynamic routes: `[classId]` ← parameter variable
- Layouts: `layout.tsx` apply ไป child routes ทั้งหมด

#### 3.4.2 Client-Side Rendering ใน Scanner Page

`scanner/page.tsx` ใช้ `'use client'` directive:

```typescript
'use client';
import { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

export default function AIScanner() {
  const [model, setModel] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Load Teachable Machine model ครั้งแรก
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);
  
  const captureAndAnalyze = async () => {
    if (!model) return;
    // 1. Capture frame จาก video
    // 2. Convert to Image
    // 3. model.predict(image)
    // 4. Process predictions
    // 5. setPredictions(top 3)
  };
}
```

**Flow:**
1. Component mount → useEffect trigger → Load model from `/model/`
2. User clicks "Start Camera" → navigator.mediaDevices.getUserMedia()
3. User clicks "Capture" → Canvas capture → Image object
4. Call `model.predict(image)` → ได้ array predictions
5. Update state → Re-render with results

#### 3.4.3 Data Fetching จาก Backend

Encyclopedia page ดึงปลาทั้งหมด:

```typescript
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/fish`)
    .then((res) => res.json())
    .then((data) => setFishes(data)) // state update
    .catch((err) => console.error(err));
}, []);
```

**ความสำคัญของ `process.env.NEXT_PUBLIC_API_URL`:**
- Environment variable ที่ expose ให้ frontend
- ใน `.env.local` หรือ `.env.production`: `NEXT_PUBLIC_API_URL=http://localhost:3000`
- Next.js คำนวณ build time → ถ้าเปลี่ยน runtime ต้อง rebuild

#### 3.4.4 Dynamic Routes และ Parameter Extraction

Fish detail page ใช้ dynamic route `[classId]`:

```typescript
'use client';
import { useParams } from 'next/navigation';

export default function FishDetail() {
  const { classId } = useParams(); // Extract from URL
  
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fish/search?classId=${classId}`
    )
      .then((res) => res.json())
      .then((data) => setFish(data)); // Fish document
  }, [classId]);
  
  // Render fish details
}
```

**Behavior:**
- URL: `/fish/015` → `classId = "015"`
- API call: `GET /fish/search?classId=015`
- Backend return: Fish document ที่มี `classId: "015"`

#### 3.4.5 Styling ด้วย Tailwind CSS

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
  {fishes.map((fish) => (
    <div 
      key={fish._id} 
      className="bg-[#0a192f]/80 backdrop-blur-md rounded-3xl 
                 border border-white/10 hover:-translate-y-3 
                 transition-all duration-700"
    >
      {/* Fish card content */}
    </div>
  ))}
</div>
```

**Tailwind features ที่ใช้:**
- Responsive breakpoints: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Backdrop blur: `backdrop-blur-md` (glassmorphism)
- Transitions: `transition-all duration-700`
- Pseudo-classes: `hover:-translate-y-3`

---

### 3.5 Backend Architecture — NestJS ด้วย REST API

#### 3.5.1 NestJS Module System

NestJS ใช้ **modules** เพื่อประกอบ features:

```typescript
// fish.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fish.name, schema: FishSchema }])
  ],
  controllers: [FishController],
  providers: [FishService],
})
export class FishModule {}

// app.module.ts (Root)
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), FishModule],
})
export class AppModule {}
```

**ประโยชน์:**
- **Encapsulation**: ทุก feature (Fish module) มี controllers + services + schemas
- **Dependency Injection**: NestJS auto inject dependencies (e.g., FishService ใน FishController)
- **Testability**: ง่ายต่อการ mock dependencies

#### 3.5.2 Controllers และ Routes

**FishController:**

```typescript
@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get()
  async getAllFish() {
    return this.fishService.findAll();
  }

  @Get('search')
  async getFishByClass(@Query('classId') classId: string) {
    return this.fishService.findByClassId(classId);
  }
}
```

**Mapping:**
- `@Controller('fish')` → base path `/fish`
- `@Get()` → GET /fish (ดึงทั้งหมด)
- `@Get('search')` → GET /fish/search
- `@Query('classId')` → extract ตัวแปร query `?classId=XXX`

#### 3.5.3 Services — Business Logic

**FishService:**

```typescript
@Injectable()
export class FishService {
  constructor(@InjectModel(Fish.name) private fishModel: Model<Fish>) {}

  async findAll(): Promise<Fish[]> {
    return this.fishModel.find().exec();
  }

  async findByClassId(classId: string): Promise<Fish | null> {
    return this.fishModel.findOne({ classId }).exec();
  }
}
```

**ความสำคัญ:**
- Logic แยกจาก routes (clean separation)
- **@InjectModel**: ให้ Mongoose model ผ่าน dependency injection
- `findOne({ classId })`: MongoDB query เพื่อค้นหา 1 document

#### 3.5.4 Mongoose Schema และ Data Mapping

```typescript
@Schema({ collection: 'fishes' })
export class Fish extends Document {
  @Prop({ required: true })
  scientificName: string;
  
  @Prop()
  localName: string;
  
  // ... fields
  
  @Prop()
  classId: string; // Link to ML model class
}

export const FishSchema = SchemaFactory.createForClass(Fish);
```

**Mongoose:**
- **Schema definition**: TypeScript class + decorators
- **Validation**: `{ required: true }` ฯลฯ
- **Document**: Instance ของ Fish ใน MongoDB collection

#### 3.5.5 CORS Configuration

`main.ts`:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS เพื่อให้ frontend สามารถเรียก backend API ได้
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000);
}
```

**ความสำคัญ:**
- Frontend (localhost:3001) ต้อง request ไป Backend (localhost:3000)
- Browser บังคับ CORS policy → ต้อง enable CORS บน Backend
- Production ควรระบุ allow origin แน่นอน (ไม่ใช่ `*`)

---

### 3.6 Database Design — MongoDB NoSQL

#### 3.6.1 NoSQL vs SQL — เหตุผล MongoDB

| ลักษณะ | SQL (Relational) | NoSQL (MongoDB) |
|--------|------------------|-----------------|
| **Schema** | Fixed, rigid | Flexible, document-based |
| **Scalability** | Vertical (เพิ่ม power) | Horizontal (เพิ่ม servers) |
| **Join** | Expensive, multiple tables | Embedded documents (nested) |
| **Use case** | Structured data, complex relations | Semi-structured, rapidly evolving |

**เหตุผลใช้ MongoDB:**
- ข้อมูลปลาแต่ละชนิด ไม่ต้องการ schema เข้มงวด (บาง field อาจ optional)
- Embedding related data ใน single document ลดความซับซ้อน
- Easier to scale horizontally สำหรับ future expansion

#### 3.6.2 Fish Document Structure

**ตัวอย่าง Document:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "classId": "015",
  "scientificName": "Rasbora species",
  "localName": "ปลาสลิด",
  "family": "Cyprinidae",
  "size": "5.5-7.0 cm",
  "distribution": "Northern Thailand, Mekong basin",
  "habitat": "Clear streams with rocky substrate",
  "remarks": "Important food fish, schooling behavior",
  "imageRef": "015.jpg"
}
```

**ดี:**
- **Atomic operation**: ทั้งข้อมูลปลา 1 document → 1 query
- **No joins**: ไม่ต้อง JOIN table ต่างๆ
- **Flexible**: เพิ่ม field ใหม่ได้โดยไม่ migrate schema เดิม

#### 3.6.3 Indexing Strategy

**ปัจจุบันใช้:**
```javascript
db.fishes.find({ classId: "015" }) // Query by classId
```

**ควร add index:**
```typescript
// fish.schema.ts
@Schema({ collection: 'fishes' })
export class Fish extends Document {
  // ...
  @Prop({ index: true }) // Add index for faster lookup
  classId: string;
  
  @Prop({ index: true }) // For search functionality
  localName: string;
  
  @Prop({ index: true })
  family: string;
}
```

**ผลกระทบ:**
- ไม่มี index: O(n) — ต้องสแกน ทุก document
- มี index: O(log n) — B-tree lookup (สำหรับ classId ที่มี 60 values มีผล ~6x เร็ว)

#### 3.6.4 MongoDB Atlas Connection

`app.module.ts`:

```typescript
MongooseModule.forRoot(
  `mongodb+srv://username:password@cluster.mongodb.net/fishDB?retryWrites=true&w=majority`
)
```

**องค์ประกอบ:**
- `username:password` — credentials (ควร move เป็น env var)
- `cluster.mongodb.net` — cloud host
- `fishDB` — database name
- `retryWrites=true` — retry จากความข้อผิดพลาด transient
- `w=majority` — write concern (ต้อง confirm บน majority nodes)

---

### 3.7 Localization Strategy — รองรับภาษาไทยและอังกฤษ

#### 3.7.1 Localization Architecture

**System design:**

```
Frontend UI
  ├─ English strings (default)
  ├─ Thai strings (translation)
  └─ Language switcher (EN/TH)
```

#### 3.7.2 Implementation Approach

**Option 1: JSON translation files (Recommended)**

ไฟล์ `public/locales/`:

```
public/locales/
├── en/
│   └── common.json
└── th/
    └── common.json
```

**en/common.json:**
```json
{
  "scanner": {
    "title": "AI Fish Scanner",
    "startCamera": "Start Camera",
    "upload": "Upload Image"
  },
  "encyclopedia": {
    "title": "Fish Encyclopedia",
    "search": "Search species..."
  }
}
```

**th/common.json:**
```json
{
  "scanner": {
    "title": "สแกนปลาด้วย AI",
    "startCamera": "เปิดกล้อง",
    "upload": "อัปโหลดรูป"
  },
  "encyclopedia": {
    "title": "สารานุกรมปลา",
    "search": "ค้นหาชนิดปลา..."
  }
}
```

**Frontend component ใช้ i18n library (เช่น `next-i18next`):**

```typescript
import { useTranslation } from 'next-i18next';

export default function Scanner() {
  const { t, i18n } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('scanner.title')}</h1>
      {/* UI */}
      
      <button onClick={() => i18n.changeLanguage('th')}>
        ไทย
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

#### 3.7.3 Backend API — Language-agnostic

Backend ส่ง structured data (JSON) ไม่มีข้อความภาษา:

```typescript
// API response
{
  "_id": "...",
  "classId": "015",
  "scientificName": "Rasbora species",  // Scientific (universal)
  "localName": "ปลาสลิด",               // Local name
  "family": "Cyprinidae"                // Universal family name
}
```

Frontend ตัดสินใจแสดง `localName` หรือ `scientificName` ตามภาษา

#### 3.7.4 RTL vs LTR Considerations

- **English**: Left-to-Right (LTR)
- **Thai**: Left-to-Right (LTR) — ไม่ต้องกังวล

(หากรายงาน ต้อง support Arabic ซึ่งเป็น RTL ต้องเพิ่ม direction CSS)

#### 3.7.5 Format ตามท้องถิ่น (i18n)

**Numbers, dates:**

```typescript
const formatter = new Intl.NumberFormat('th-TH'); 
console.log(formatter.format(1234)); // "1,234" (ไทย)

const dateFormatter = new Intl.DateTimeFormat('th-TH');
console.log(dateFormatter.format(new Date())); // "24/2/2569" (พ.ศ.)
```

---

### 3.8 สรุปการรวมทั้ง System

**Data Flow:**

```
ผู้ใช้ถ่ายภาพปลา
    ↓
Frontend (Next.js) 
  ├─ Load TensorFlow.js model (MobileNet-v2 backbone)
  ├─ Preprocess image (224×224 normalization)
  ├─ model.predict() → 60 logits
  ├─ Softmax → 60 probabilities
  └─ Filter & sort → Top 3 predictions (classId + confidence)
    ↓
For each prediction:
  Backend API (NestJS): 
    GET /fish/search?classId=015
      ↓
    FishService.findByClassId("015")
      ↓
    MongoDB (Atlas):
      db.fishes.findOne({ classId: "015" })
      ↓
    Return: Fish document (JSON)
    ↓
Frontend re-render:
  Display predictions + details (scientificName, habitat, imageRef)
  Apply Localization (EN/TH) based on i18n state
```

**เทคโนโลยยี่ที่ใช้:**
- CNN + Transfer Learning = ประสิทธิภาพ
- TensorFlow.js = Privacy + Speed (client-side)
- Next.js = Modern React + routing
- NestJS = Structured backend
- MongoDB = Flexible schema
- i18n = Multi-language support

---

## บทที่ 4 — การวิเคราะห์และออกแบบระบบ (System Analysis & Design)

### 4.1 การวิเคราะห์ความต้องการ (Functional Requirements Analysis)

#### 4.1.1 Functional Requirements ระดับ System

**FR1: AI-Powered Image Recognition**
- ระบบต้องสามารถรับเข้า image จากสองวิธี:
  1. **Camera Capture**: ถ่ายภาพแบบ real-time ผ่าน device camera
  2. **File Upload**: อัปโหลดไฟล์รูปภาพจากอุปกรณ์เก็บข้อมูล
- ลักษณะเทคนิค: ใช้ `navigator.mediaDevices.getUserMedia()` สำหรับกล้อง, `<input type="file">` สำหรับอัปโหลด
- เอาท์พุท: Data URL ของรูปภาพ dimension (width, height) จากวิดีโอหรือไฟล์

**FR2: Model Inference & Top-K Prediction**
- ระบบต้องทำให้ image ผ่านโมเดล CNN (MobileNet-v2 backbone) ที่ load ใน browser
- Model input: รูปภาพ 224×224 pixels (normalized)
- Model output: vector ของ 60 probabilities (1 ต่อแต่ละชนิดปลา)
- Process:
  1. Resize image → 224×224
  2. Normalize pixel values [0,1]
  3. Call `model.predict(image)` → array ของ `{ className, probability }`
  4. Sort by probability (descending)
  5. **Return: Top 10 predictions** (ไม่ใช่ Top 3 เท่านั้น)

**FR3: Confidence Filtering & Validation**
- Filter predictions ด้วย threshold:
  - ถ้า Top 1 probability >= 0.15 (15%): แสดง predictions และ related species
  - ถ้า Top 1 probability < 0.15: แสดง warning message "ความมั่นใจในการระบุชนิดต่ำเกินไป"
- ตรวจสอบ database: สำหรับแต่ละ prediction classId ต้องมี Fish document ใน MongoDB พร้อม `imageRef`

**FR4: Related Species Suggestion (Family-based)**
- ถ้า Top 1 prediction ผ่าน confidence threshold:
  - ดึง `family` field จาก top fish document
  - Query MongoDB: `GET /fish?family={family}` → ดึงปลาทั้งหมดในวงศ์เดียวกัน
  - Filter: เอาเฉพาะตัวที่ **ไม่อยู่ใน Top 10 predictions runnings** (เพื่อไม่ซ้ำ)
  - Display: **Top 8 related species** ในแยก section

**FR5: Database Lookup & Data Enrichment**
- สำหรับแต่ละ prediction ที่ผ่าน validation ต้อง:
  1. Fetch จาก API: `GET /fish/search?classId={className}`
  2. ได้ Fish document รวมทั้ง: `scientificName`, `localName`, `family`, `size`, `habitat`, `distribution`, `imageRef`
  3. Cache ไว้ใน state `fishData[classId]` เพื่อ reuse

**FR6: Multi-language Support (EN/TH)**
- ระบบทั้งหมดต้องรองรับภาษาไทยและอังกฤษ
- Language state: Context API ใน `layout.tsx` โดยใช้ hook `useLanguage()`
- สำหรับแต่ละ text UI ต้อง map จาก `translations` object:
  - `t.scanner.title`, `t.scanner.description`, `t.scanner.results` เป็นต้น
- ข้อมูล species จาก API: `scientificName` (universal) + `localName` (Thai) ส่งกลับ default

**FR7: User Feedback & States**
- ระบบต้อง display:
  1. **Loading state**: เมื่อ model กำลังโหลด หรือ inference processing
  2. **Camera active state**: เมื่อกล้องบน
  3. **Preview state**: แสดงรูปที่เลือก/ถ่าย
  4. **Results state**: แสดง predictions + related species
  5. **Error state**: warning เมื่อ confidence ต่ำ

#### 4.1.2 Non-Functional Requirements

| Requirement | Target | Implementation |
|-------------|--------|-----------------|
| **Performance** | Inference time < 1s | Client-side + WebGL acceleration |
| **Responsiveness** | UI responsive (mobile, desktop) | Tailwind CSS breakpoints |
| **Accuracy** | Top-1 accuracy > 85% | Transfer learning from ImageNet |
| **Accessibility** | Multi-language support | Context API + translations |
| **Availability** | 99% uptime | MongoDB Atlas + Vercel/Heroku |
| **Scalability** | Support 60+ species | Modular architecture |

---

### 4.2 System Architecture of FishDB

#### 4.2.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       CLIENT BROWSER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  React Components (Next.js App Router)                  │  │
│  │  ├─ Scanner Page (/scanner)                             │  │
│  │  ├─ Encyclopedia Page (/encyclopedia)                   │  │
│  │  ├─ Fish Detail Page (/fish/[classId])                 │  │
│  │  └─ Home Page (/)                                       │  │
│  └───────────┬───────────────────────────────────────────┘  │
│              │ (REST API calls via fetch)                    │
│              │ (JSON request/response)                       │
│  ┌───────────▼───────────────────────────────────────────┐  │
│  │  TensorFlow.js Inference Engine (MobileNet-v2)        │  │
│  │  ├─ Load model: /model/model.json + /model/metadata   │  │
│  │  ├─ Image preprocessing: resize, normalize            │  │
│  │  └─ model.predict() → 60 probabilities                │  │
│  └───────────────────────────────────────────────────────┘  │
│              │ (WebGL GPU acceleration if available)         │
│  ┌───────────▼───────────────────────────────────────────┐  │
│  │  Context API (Language Localization)                   │  │
│  │  ├─ Language state: 'en' | 'th'                        │  │
│  │  ├─ Translations object: { en: {...}, th: {...} }     │  │
│  │  └─ useLanguage() hook for components                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
┌─────────────────────┐        ┌──────────────────────────┐
│  REST API Backend   │        │  MongoDB Atlas Cloud    │
│  (NestJS)           │        │  Database                │
│                     │        │                          │
│ ┌─────────────────┐ │        │ ┌────────────────────┐  │
│ │ FishController  │ │        │ │ Collection: fishes │  │
│ ├─────────────────┤ │        │ │ (60 documents)     │  │
│ │ GET /fish       │ │        │ │ - classId (index)  │  │
│ │ GET /fish/...   │ │        │ │ - scientificName   │  │
│ │ GET /fish?family│ │        │ │ - localName (TH)   │  │
│ │                 │ │        │ │ - family (index)   │  │
│ └────────┬────────┘ │        │ │ - habitat          │  │
│          │          │        │ │ - imageRef         │  │
│ ┌────────▼────────┐ │        │ └────────────────────┘  │
│ │ FishService     │ │        │                          │
│ │ - findAll()     │ │        │ Connection: MongoDB      │
│ │ - findByClassId │ │        │ URI (Atlas cluster)      │
│ │ - findByFamily  │ │        │                          │
│ └─────────────────┘ │        │                          │
│                     │        │                          │
│ Mongoose Schema:    │        │                          │
│ - Validation        │        │                          │
│ - Type mapping      │        │                          │
│ - Indexing          │        │                          │
└─────────────────────┘        └──────────────────────────┘
        ▲                                 │
        │        (Mongoose Query)        │
        └─────────────────────────────────┘
```

#### 4.2.2 Component Architecture (Frontend)

```
layout.tsx (Root Layout)
├─ LanguageContext Provider
│  └─ language state: 'en' | 'th'
│  └─ translations object
├─ Navbar component
│  └─ Navigation links: /, /encyclopedia, /scanner
│  └─ Language switcher (EN/TH buttons)
└─ Footer component
   └─ Social media links

scanner/page.tsx (AI Scanner Page)
├─ useLanguage() hook
├─ useState: model, predictions, fishData, relatedFishes, etc.
├─ useRef: videoRef, canvasRef
├─ useEffect: Load TensorFlow.js model
├─ Functions:
│  ├─ startCamera()
│  ├─ captureAndAnalyze()
│  ├─ handleFileUpload()
│  ├─ processPredictions() [KEY FUNCTION]
│  └─ stopCamera()
└─ JSX: Viewfinder, Results (Top 10), Related Species, Error handling

encyclopedia/page.tsx (Fish Database Page)
├─ useState: fishes, searchTerm
├─ useEffect: Fetch GET /fish
├─ Functions:
│  └─ filteredFishes = filter by searchTerm
└─ JSX: Grid of fish cards, search bar

fish/[classId]/page.tsx (Fish Detail Page)
├─ useParams() → classId
├─ useEffect: Fetch GET /fish/search?classId
├─ JSX: Large fish image, full details (scientific, local names, habitat, etc.)

```

---

### 4.3 Workflow & Process Flow — โดยเฉพาะ Top 10 Probability & Related Family

#### 4.3.1 Sequence Diagram: AI Scanner Workflow

```
User                Frontend (Scanner)      TensorFlow.js        Backend API       MongoDB
  │                       │                      │                   │              │
  │─ Click "Start Camera"─>│                      │                   │              │
  │                       │─ getUserMedia()─────->│                   │              │
  │<─ Camera Active ─────<─│                      │                   │              │
  │                       │                      │                   │              │
  │─ Align fish & click ──>│                      │                   │              │
  │   "Capture"           │─ canvas.drawImage()─>│                   │              │
  │                       │─ createDataUrl()───->│                   │              │
  │                       │─ Image.onload ─────>│                   │              │
  │                       │                      │                   │              │
  │                       │ model.predict(image)──>                    │              │
  │                       │<─ [60 probabilities] │                   │              │
  │                       │                      │                   │              │
  │                       │ sort() & slice(0,10)──> [Top 10]          │              │
  │                       │                      │                   │              │
  │                       │─────── for each prediction ───────────>  │              │
  │                       │ GET /fish/search?classId={className}    │─ findOne()──>│
  │                       │                      │                   │<─ Fish Doc───│
  │                       │<──────────── Fish data + family ────────<│              │
  │                       │                      │                   │              │
  │                       │─── if top1.prob >= 0.15 ───────────────>│              │
  │                       │ GET /fish?family={family}              │─ find()─────>│
  │                       │<──────────── [Related fishes] ─────────<│<── docs ─────│
  │                       │ (filter out top 10 classIds)           │              │
  │                       │                      │                   │              │
  │<─ Display Top 10 ─────<─ setState()          │                   │              │
  │  + Related Species    │                      │                   │              │
  │                       │                      │                   │              │
```

#### 4.3.2 Top 10 Probability Processing

**Algorithm (จาก `processPredictions` function):**

```typescript
const processPredictions = async (data: any[]) => {
  // Step 1: Sort by probability (descending) & take top 10
  const sorted = data
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 10);  // ← Top 10 (ไม่ใช่ Top 3)
  
  // Step 2: Validate & enrich each prediction
  const validPredictions: any[] = [];
  let topFamily = "";
  
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    try {
      // Fetch fish details from API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fish/search?classId=${p.className}`
      );
      const info = await res.json();
      
      if (info && info.imageRef) {  // Validate: must have imageRef
        // Cache fish data
        setFishData(prev => ({ ...prev, [p.className]: info }));
        validPredictions.push(p);
        
        // Step 3: If rank=1 and prob >= 0.15, store family
        if (i === 0 && p.probability >= 0.15) {
          topFamily = info.family;
        }
      }
    } catch (err) {
      console.error("Fetch error for class:", p.className, err);
      // Skip this prediction if fetch fails
    }
  }
  
  // Step 4: Update predictions state with valid ones
  setPredictions(validPredictions);
  
  // Step 5: Fetch & display related species
  if (topFamily) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fish?family=${topFamily}`
      );
      const allInFamily = await res.json();
      
      // Filter out predictions that already in Top 10
      const topClassNames = validPredictions.map(v => v.className);
      const suggestions = allInFamily
        .filter((f: any) => !topClassNames.includes(f.classId))
        .slice(0, 8);  // ← Related species: max 8
      
      setRelatedFishes(suggestions);
    } catch (err) {
      console.error("Related species fetch error:", err);
    }
  }
};
```

**ข้อสังเกตเชิงการออกแบบ:**
1. **Top 10 predictions**: ให้ผู้ใช้เห็นตัวเลือกมากขึ้น ไม่เพียงแค่ Top 3
2. **Validation layer**: ตรวจสอบ `imageRef` เพื่อ ensure image พร้อมแสดง
3. **Confidence threshold (0.15)**: กรองความมั่นใจต่ำ (< 15%) เพื่อลดข้อมูลเท็จ
4. **Caching strategy**: `setFishData()` เก็บผลลัพธ์ เพื่อไม่ต้อง re-fetch เมื่อ navigate

#### 4.3.3 Related Family Suggestion Logic

**ทำไมต้องแยก Related Species:**
- **Context enrichment**: ช่วยให้ผู้ใช้เข้าใจว่า "ปลาชนิดนี้อยู่ในวงศ์ Cyprinidae เหมือนกับ..."
- **Educational value**: สนับสนุนการเรียนรู้เกี่ยวกับ taxonomy
- **Fallback**: ถ้า top prediction ไม่ chính확, อาจจะ top 2-3 ใน family เดียวกันถูก

**Algorithm:**

```
1. Extract family จาก top prediction (classId: "015")
   → family: "Cyprinidae"

2. Query MongoDB: db.fishes.find({ family: "Cyprinidae" })
   → results: [doc1, doc2, doc3, ..., doc60]

3. Exclude top 10 predictions:
   topClassNames = ["015", "008", "032", ...]
   
4. Filter:
   relatedFishes = results 
     .filter(f => !topClassNames.includes(f.classId))
     .slice(0, 8)
   
5. Display:
   Show related fishes ใน separate section บน UI
```

**ตัวอย่าง:**
```
Top Prediction: Rasbora species (classId: "015", family: "Cyprinidae")
  ↓
Query: GET /fish?family=Cyprinidae
  ↓
Result: 15 species ใน Cyprinidae
  ↓
Filter out: "015", "008", "032" (top 10)
  ↓
Display: 8 related Cyprinidae species ในอื่น ๆ
```

---

### 4.4 Database Schema & Data Model

#### 4.4.1 Fish Collection Schema (MongoDB)

**Collection Name**: `fishes`  
**Total Documents**: 60 (fish species)

**Document Structure (JSON):**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "classId": "015",
  "scientificName": "Rasbora rasbora",
  "localName": "ปลาสลิด",
  "commonName": "Red-tailed Rasbora",
  "family": "Cyprinidae",
  "size": "5.5-7.0 cm",
  "distribution": "Northern Thailand, Mekong basin",
  "habitat": "Clear streams with rocky bottom, fast flowing",
  "remarks": "Important food fish, schooling behavior, spawning season May-June",
  "imageRef": "015.jpg",
  "createdAt": ISODate("2026-01-15T10:00:00Z"),
  "updatedAt": ISODate("2026-02-24T15:30:00Z")
}
```

#### 4.4.2 Field Definitions

| Field | Type | Required | Index | Description |
|-------|------|----------|-------|-------------|
| `_id` | ObjectId | Yes | Primary | MongoDB auto-generated ID |
| `classId` | String | Yes | Yes | Link to ML model class (001-060) |
| `scientificName` | String | Yes | No | Genus + species (universal) |
| `localName` | String | No | Yes | Thai common name |
| `commonName` | String | No | No | English common name |
| `family` | String | Yes | Yes | Taxonomic family (e.g., Cyprinidae) |
| `size` | String | No | No | Adult size range (cm) |
| `distribution` | String | No | No | Geographic range (Thai + English) |
| `habitat` | String | No | No | Environmental description |
| `remarks` | String | No | No | Additional behavioral info |
| `imageRef` | String | Yes | No | Filename in `/public/images/` |
| `createdAt` | Date | No | No | Document creation timestamp |
| `updatedAt` | Date | No | No | Last modification timestamp |

#### 4.4.3 Indexes Strategy

```typescript
// fish.schema.ts
@Schema({ collection: 'fishes', timestamps: true })
export class Fish extends Document {
  @Prop({ required: true, index: true })
  classId: string;
  
  @Prop({ required: true })
  scientificName: string;
  
  @Prop({ index: true })  // For search functionality
  localName: string;
  
  @Prop({ required: true, index: true })  // For related species query
  family: string;
  
  @Prop()
  commonName: string;
  
  // ... other fields
  
  @Prop({ required: true })
  imageRef: string;
}

// Indexing creation:
// db.fishes.createIndex({ classId: 1 })
// db.fishes.createIndex({ family: 1 })
// db.fishes.createIndex({ localName: 1 })
```

**Performance Impact:**
- **Without indexes**: 
  - GET /fish/search?classId=015 → O(n) scan จำนวน 60 documents (~5-10ms)
- **With indexes**:
  - GET /fish/search?classId=015 → O(log n) B-tree lookup (~1-2ms)
  - GET /fish?family=Cyprinidae → O(log n) + return ~15 docs (~3-5ms)

#### 4.4.4 Sample Data (ตัวอย่าง 3 documents)

```json
[
  {
    "_id": ObjectId("..."),
    "classId": "001",
    "scientificName": "Rasbora genus_sp1",
    "localName": "ปลาสลิด",
    "family": "Cyprinidae",
    "size": "4.0-5.0 cm",
    "distribution": "Mae Nam Nan region",
    "habitat": "Streams with gravel",
    "imageRef": "001.jpg"
  },
  {
    "_id": ObjectId("..."),
    "classId": "008",
    "scientificName": "Barbichthys laevis",
    "localName": "ปลากระโทก",
    "family": "Cyprinidae",
    "size": "8.0-10.0 cm",
    "distribution": "Mekong basin",
    "habitat": "Rocky streams, moderate flow",
    "imageRef": "008.jpg"
  },
  {
    "_id": ObjectId("..."),
    "classId": "015",
    "scientificName": "Rasbora rasbora",
    "localName": "ปลาปากน้อย",
    "family": "Cyprinidae",
    "size": "5.5-7.0 cm",
    "distribution": "Northern Thailand",
    "habitat": "Clear streams, fast flowing",
    "imageRef": "015.jpg"
  }
]
```

#### 4.4.5 API Query Examples

**Query 1: ดึงปลาทั้งหมด**
```
GET /fish
Response: [ { _id, classId, scientificName, localName, family, ... }, ... ]
MongoDB: db.fishes.find({})
```

**Query 2: ค้นหาตาม classId**
```
GET /fish/search?classId=015
Response: { _id, classId: "015", scientificName, localName, family, ... }
MongoDB: db.fishes.findOne({ classId: "015" })
Index: classId (fast lookup O(log n))
```

**Query 3: ดึงปลาตามวงศ์**
```
GET /fish?family=Cyprinidae
Response: [ {...classId:"001"...}, {...classId:"008"...}, {...classId:"015"...} ]
MongoDB: db.fishes.find({ family: "Cyprinidae" })
Index: family (efficient range query)
```

---

### 4.5 User Interface & User Experience Design

#### 4.5.1 Page Structure & Layout

**Scanner Page (`/scanner`) Layout:**

```
┌─────────────────────────────────────────────┐
│         NAVBAR (sticky)                     │
│  Logo | Home | Encyclopedia | [Scanner] | EN/TH │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│                                             │
│  HEADER SECTION                             │
│  ┌─────────────────────────────────────┐   │
│  │ "AI Fish Scanner" title             │   │
│  │ "Analyze fish images with AI" desc  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  VIEWFINDER SECTION                         │
│  ┌─────────────────────────────────────┐   │
│  │  ┌─────────────────────────────────┐│   │
│  │  │                                 ││   │
│  │  │  [Video feed or Image Preview]  ││   │
│  │  │  (aspect ratio 4:3 or 16:9)     ││   │
│  │  │                                 ││   │
│  │  └─────────────────────────────────┘│   │
│  │  [Scan line animation while active] │   │
│  └─────────────────────────────────────┘   │
│  [Start Camera] [Upload Image]              │ ← Buttons
│                                             │
│  RESULTS SECTION (Top 10)                   │
│  ┌─────────────────────────────────────┐   │
│  │ "RESULTS (TOP 10)"                  │   │
│  │                                     │   │
│  │ [Rank 1] ▓ 45% Rasbora rasbora   │▶  │
│  │ [Rank 2] ▒ 35% Barbichthys laevis│▶  │
│  │ [Rank 3] ░ 15% Rasbora elegan... │▶  │
│  │ ... (up to 10)                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  RELATED SPECIES SECTION                    │
│  ┌─────────────────────────────────────┐   │
│  │ "Other Cyprinidae Species"          │   │
│  │ [Card 1] [Card 2] [Card 3] [Card 4] │   │
│  │ [Card 5] [Card 6] [Card 7] [Card 8] │   │
│  │ (8 cards in grid, 2x4 or responsive)│   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  FOOTER                                     │
│  FishDB | About | Contact | Social Media    │
└─────────────────────────────────────────────┘
```

#### 4.5.2 Components & Styling Details

**Viewfinder Card:**
```tsx
<div className="max-w-xl mx-auto bg-[#0a192f]/80 backdrop-blur-xl rounded-[3rem] 
                border border-white/10 shadow-2xl overflow-hidden mb-10">
  {/* Video/Image preview */}
  {/* Buttons in footer */}
</div>
```

- **Background**: Dark blue (#0a192f) with 80% opacity
- **Backdrop**: Glassmorphism effect (blur)
- **Border**: White 1px at 10% opacity
- **Rounded corners**: 3rem (48px) = modern rounded design
- **Shadow**: 2xl shadow for depth

**Prediction Cards (Top 10):**

```tsx
<div className={`group flex items-center justify-between p-4 border transition-all cursor-pointer 
  ${idx === 0 ? 'bg-blue-600/20 border-blue-500/30 rounded-2xl' : 'bg-black/40 border-white/10 rounded-2xl opacity-70'}`}>
  {/* Rank badge, fish image, name, probability bar */}
</div>
```

- **Rank 1**: Highlighted with blue tint (#bg-blue-600/20)
- **Rank 2-10**: Subtle dark styling (#bg-black/40) with hover effect
- **Hover**: `group-hover:scale-110` เพื่อ image zoom effect
- **Click**: Navigate ไปยัง `/fish/{classId}` (dynamic route)

**Related Species Grid:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
  {relatedFishes.map((fish) => (
    <div className="group cursor-pointer rounded-[2rem] ..." />
  ))}
</div>
```

- **Responsive**: 1 col (mobile), 2 col (tablet), 4 col (desktop)
- **Hover state**: transform, shadow, brightness change

#### 4.5.3 User Experience Flow (UX Journey)

**Ideal Flow (Happy Path):**

```
1. User opens /scanner page
   ↓
2. Sees viewfinder container with guide text
   ↓
3. Clicks "Start Camera" button
   ↓ navigator.mediaDevices.getUserMedia()
4. Grants camera permission
   ↓
5. Live video appears in viewfinder
   ↓
6. Aligns fish within frame
   ↓
7. Clicks "Capture" button
   ↓ model.predict()
8. Model processes image (loading spinner)
   ↓
9. Top 10 predictions appear with confidence bars
   ↓
10. Sees "Other Cyprinidae Species" section below (context)
    ↓
11. Clicks on Rank 1 prediction or Related species
    ↓
12. Navigate to /fish/{classId} for detailed view
```

**Error Handling Flow:**

```
If top prediction confidence < 0.15:
  ↓
Display RED warning box:
  "Match Confidence Too Low"
  "The AI couldn't find a clear match. Please 
   ensure the fish is clearly visible and try again."
  ↓
User can:
  - Click "Start Camera" again
  - Upload different image
  - Check /encyclopedia manually
```

**Language Switch Flow:**

```
User clicks "TH" button in navbar
  ↓ setLang('th')
  ↓ Entire UI updates via {t} object
  - Title: "AI Fish Scanner" → "สแกนปลาด้วย AI"
  - Button: "Start Camera" → "เปิดกล้อง"
  - Results: "RESULTS (TOP 10)" → "ผลลัพธ์ (10 อันดับ)"
  ↓
Database data:
  - localName: already Thai (ปลาสลิด)
  - scientificName: universal (Rasbora rasbora)
```

#### 4.5.4 Color Scheme & Visual Hierarchy

**Color Palette:**
- **Primary Dark**: #050c1a (background)
- **Secondary Dark**: #0a192f (card backgrounds)
- **Accent Blue**: #2563eb (buttons, highlights)
- **Text Primary**: #ffffff (white)
- **Text Secondary**: #cbd5e1 (light gray for descriptions)
- **Text Muted**: #64748b (slate gray)
- **Error Red**: #dc2626 (warnings)
- **Success Cyan**: #06b6d4 (active states)

**Typography:**
- **Headings**: font-black, tracking-tighter, uppercase, italic (for FishDB branding)
- **Body**: font-light, leading-relaxed
- **Labels**: font-bold, uppercase, tracking-widest

**Responsive Breakpoints:**
```tsx
// Tailwind CSS breakpoints
sm: 640px   (phones)
md: 768px   (tablets)
lg: 1024px  (desktops)
xl: 1280px  (large desktops)
2xl: 1536px (ultra-wide)

// Example usage:
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
```

#### 4.5.5 Accessibility Features

1. **Alt text on images**: `alt="Fish preview"`, `alt="Related species"`
2. **Icon + Text labels**: Every button has both icon (HiOutline*) and text
3. **Color contrast**: All text meets WCAG AA standards (contrast ratio > 4.5:1)
4. **Focus states**: Buttons have `:focus-visible` indicators
5. **Semantic HTML**: `<main>`, `<nav>`, `<button>`, `<img alt="...">` เป็นต้น
6. **Language support**: 2 languages (EN/TH) via language context

---

### 4.6 Implementation Highlights จาก Source Code

#### 4.6.1 Key Functions & Code Patterns

**1. Model Loading (useEffect in scanner/page.tsx):**
```typescript
useEffect(() => {
  const loadModel = async () => {
    const modelURL = '/model/model.json';
    const metadataURL = '/model/metadata.json';
    const loadedModel = await tmImage.load(modelURL, metadataURL);
    setModel(loadedModel);
  };
  loadModel();
}, []);
```

**2. Camera Capture & Canvas Drawing:**
```typescript
const captureAndAnalyze = async () => {
  if (!videoRef.current || !model || !isCameraActive) return;
  
  const canvas = canvasRef.current;
  const video = videoRef.current;
  canvas.width = video.videoWidth;  // Actual video dimensions
  canvas.height = video.videoHeight;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg'); // Convert to base64
  
  setImagePreview(dataUrl);
  stopCamera();
  
  const img = new Image();
  img.src = dataUrl;
  img.onload = async () => {
    const prediction = await model.predict(img);
    await processPredictions(prediction);
    setLoading(false);
  };
};
```

**3. Language Context Usage:**
```typescript
// layout.tsx
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

// In scanner/page.tsx
const { t, lang } = useLanguage();

// Usage in JSX
<h1>{t.scanner.title} <span className="text-blue-500">{t.scanner.title2}</span></h1>
<p>{t.scanner.description}</p>
```

**4. Top 10 Filtering & Validation:**
```typescript
const sorted = data
  .sort((a, b) => b.probability - a.probability)
  .slice(0, 10);  // Top 10, not Top 3

const validPredictions = [];
for (const p of sorted) {
  const res = await fetch(`/fish/search?classId=${p.className}`);
  const info = await res.json();
  
  if (info && info.imageRef) {  // Validation
    setFishData(prev => ({ ...prev, [p.className]: info }));
    validPredictions.push(p);
  }
}

setPredictions(validPredictions);
```

#### 4.6.2 State Management Pattern

```typescript
// scanner/page.tsx state declarations
const [model, setModel] = useState<any>(null);           // ML model
const [predictions, setPredictions] = useState<any[]>([]); // Top N predictions
const [fishData, setFishData] = useState<Record<string, any>>({}); // Fish details cache
const [relatedFishes, setRelatedFishes] = useState<any[]>([]); // Family suggestions
const [isCameraActive, setIsCameraActive] = useState(false);   // Camera toggle
const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview image
const [loading, setLoading] = useState(false);            // Loading indicator
```

**State Updates Pattern:**
```typescript
// useState + useEffect pattern
useEffect(() => {
  loadModel();  // Side effect: load model once on mount
}, []);

// Async state updates
const processPredictions = async (data: any[]) => {
  // Step 1: Process
  const sorted = data.sort(...);
  
  // Step 2: Update state (triggers re-render)
  setPredictions(sorted);
  
  // Step 3: Fetch additional data
  for (const p of sorted) {
    const res = await fetch(...);
    setFishData(prev => ({ ...prev, ... }));  // Queue multiple updates
  }
};
```

---

### 4.7 สรุป Architecture & Design

**Key Architectural Decisions:**

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Client-side ML inference** | Reduce latency, privacy, offline capability | +Performance, -Storage on device |
| **Top 10 predictions** | Provide more context than Top 3 | +UX, -UI space, slightlg slower display |
| **Family-based suggestions** | Educational + fallback if top prediction wrong | +Learning value, +Engagement |
| **MongoDB + Mongoose** | Flexible schema, easy indexing, cloud-native | +Scalability, -SQL joins needed |
| **Next.js App Router** | Modern file-based routing, SSR support | +DX, +Performance, -Legacy compatibility |
| **Context API for i18n** | Simple, no external dependencies | +Bundle size, -Advanced features (namespaces) |

**Performance Targets:**
- Model loading: < 500ms (first-time cache)
- Image preprocessing: < 100ms
- Model inference: 500-1000ms (WebGL)
- API fetch (top 10): < 2 seconds (parallel)
- UI render: 60 FPS (React optimization)

---

**Document Version**: 1.1  
**Last Updated**: February 24, 2026  
**Language**: Thai (ไทย)
