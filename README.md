# 💖 บอกรักเธอ — One Page Website

Flow: Splash → Password → Love Loading Animation → One Page (เลื่อนดูทีละ Section เต็มจอ)

## 📁 ไฟล์

- `index.html` — โครงสร้างหน้าเว็บทั้งหมด
- `style.css` — ดีไซน์ทั้งหมด (มีสารบัญคอมเมนต์อยู่บนสุดของไฟล์)
- `script.js` — โค้ดทั้งหมด แบ่งเป็นโมดูล (มีสารบัญคอมเมนต์อยู่บนสุดของไฟล์)
- `assets/images/` — ใส่รูปคู่ของคุณที่นี่
- `assets/music/` — ใส่ไฟล์เพลง (song.mp3) ที่นี่

## ✏️ ปรับแต่งเนื้อหา (แก้ที่เดียว)

เปิด `script.js` เลื่อนไปบนสุด จะเจอ **`const CONFIG = { ... }`** — แก้ตรงนี้ที่เดียวพอ:

- `password` — รหัสผ่านหน้า Password (ค่าเริ่มต้น `011025`)
- `herName`, `relationshipStart`, `relationshipStartLabel` — ข้อมูลหน้า Hero + ตัวจับเวลา
- `timeline[]` — เรื่องราว Our Story (ใส่ `image:` ถ้ามีรูปประกอบ)
- `gallery[]` — รูปในแกลเลอรี (ต้องมีไฟล์จริงใน `assets/images/`)
- `letterTitle`, `letter` — เนื้อหาจดหมายรัก (พิมพ์แบบ Typewriter อัตโนมัติ)
- `musicSrc`, `musicTitle` — เพลงพื้นหลัง
- `finalMessage`, `finalThanksMessage` — ข้อความหน้าสุดท้าย

> ถ้ายังไม่มีรูป/เพลงจริง เว็บยังทำงานได้ปกติ — จะโชว์ placeholder แทนให้อัตโนมัติ

## 🚀 Deploy บน Vercel

ลากทั้งโฟลเดอร์ไปที่ https://vercel.com/new หรือใช้ CLI:
```bash
npm i -g vercel
vercel
```
ไม่ต้องตั้งค่า Build Command เพราะเป็น static site ล้วน (HTML/CSS/JS)

## 📱 ทดสอบก่อน Deploy

```bash
npx serve .
```
แล้วเปิดดูบนมือถือ/เดสก์ท็อป — รหัสผ่านเดโม: **011025**
