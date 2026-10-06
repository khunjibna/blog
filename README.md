# blog

ตัวอย่างเว็บบล็อกด้วย Jekyll แบบกำหนด layout เอง เหมาะสำหรับเริ่มต้นทำ blog ส่วนตัวและ deploy ต่อบน GitHub Pages หรือ static hosting อื่น ๆ

## โครงสร้างหลัก

- `_config.yml` ตั้งค่าชื่อเว็บ คำอธิบาย เมนู และ permalink
- `_layouts/` layout สำหรับหน้าเว็บและบทความ
- `_posts/` บทความตัวอย่าง
- `_races/` บันทึกสนามวิ่ง (เทรล / ถนน) พร้อมสถิติและรีวิว แสดงที่ `/races/`
- `_includes/` ส่วนประกอบของหน้า (header, footer, การ์ดบทความ, การ์ดผู้เขียน, ค้นหา, Zap)
- `assets/css/style.css` design system หลัก (สีดึงจากโลโก้ รองรับ light / dark mode)
- `assets/js/site.js` สลับธีม เมนูมือถือ ค้นหา (`/` หรือ `Ctrl+K`) กรองบทความ แถบความคืบหน้าการอ่าน และ Zap
- `search.json` ดัชนีสำหรับค้นหาบทความ (Jekyll สร้างให้อัตโนมัติ)

## เริ่มต้นใช้งาน

ต้องมี Ruby และ Bundler ก่อน จากนั้นรัน:

```bash
bundle install
bundle exec jekyll serve
```

เมื่อรันแล้วเปิด `http://127.0.0.1:4000/blog/`

## การแก้ไขเบื้องต้น

- เปลี่ยนข้อมูลเว็บไซต์ใน `_config.yml` (ข้อความหัวหน้าแรกอยู่ที่ `home:`)
- เพิ่มบทความใหม่ใน `_posts/` โดยตั้งชื่อไฟล์รูปแบบ `YYYY-MM-DD-title.md`
- ปรับหน้าตาใน `assets/css/style.css`

## บันทึกสนามวิ่ง (เมนู "สนามวิ่ง")

หนึ่งสนาม = หนึ่งไฟล์ใน `_races/` ตั้งชื่อ `YYYY-MM-DD-ชื่อสนาม.md` (วันที่ = วันแข่ง)

1. คัดลอก `_races/2025-11-16-example-trail.md` เป็นไฟล์ใหม่ แล้วลบบรรทัด `published: false`
2. กรอกสถิติใน front matter — ช่องไหนไม่มีข้อมูลก็ลบทิ้งได้ หน้าเว็บจะซ่อนให้เอง
3. เขียนรีวิวเป็นเนื้อหาด้านล่างตามปกติ

ระบบคำนวณให้อัตโนมัติ: เพซเฉลี่ย, km-effort สำหรับเทรล (ระยะ + D+ ÷ 100), เวลาเผื่อก่อนตัดตัว,
อันดับเป็น % , คะแนนรีวิวเฉลี่ย, สถิติรวมทุกสนาม และ **เทียบเวลากับครั้งก่อน** ถ้าใส่ `series` ชื่อเดียวกันทุกปี

ดูตัวอย่างไฟล์ที่ซ่อนอยู่ได้ด้วย `bundle exec jekyll serve --unpublished`

## Deploy บน GitHub Pages

รีโปนี้ถูกตั้งค่าให้ deploy เป็น project page ของ `khunjibna/blog` แล้ว โดยใช้ GitHub Actions และ `baseurl: "/blog"`

หลัง push ขึ้น `main` ระบบจะ build และ deploy อัตโนมัติผ่าน workflow ใน `.github/workflows/pages.yml`

เว็บไซต์ที่เผยแพร่อยู่ตอนนี้:

- `https://khunjibna.github.io/blog/`

## Tech Stack

- Jekyll 4
- Markdown ผ่าน kramdown
- Custom HTML layout และ CSS แบบไม่ใช้ธีมสำเร็จรูป
- GitHub Actions สำหรับ deploy ไป GitHub Pages