# blog

ตัวอย่างเว็บบล็อกด้วย Jekyll แบบกำหนด layout เอง เหมาะสำหรับเริ่มต้นทำ blog ส่วนตัวและ deploy ต่อบน GitHub Pages หรือ static hosting อื่น ๆ

## โครงสร้างหลัก

- `_config.yml` ตั้งค่าชื่อเว็บ คำอธิบาย เมนู และ permalink
- `_layouts/` layout สำหรับหน้าเว็บและบทความ
- `_posts/` บทความตัวอย่าง
- `assets/css/style.css` style หลักของเว็บไซต์

## เริ่มต้นใช้งาน

ต้องมี Ruby และ Bundler ก่อน จากนั้นรัน:

```bash
bundle install
bundle exec jekyll serve
```

เมื่อรันแล้วเปิด `http://127.0.0.1:4000/blog/`

## การแก้ไขเบื้องต้น

- เปลี่ยนข้อมูลเว็บไซต์ใน `_config.yml`
- เพิ่มบทความใหม่ใน `_posts/` โดยตั้งชื่อไฟล์รูปแบบ `YYYY-MM-DD-title.md`
- ปรับหน้าตาใน `assets/css/style.css`

## Deploy บน GitHub Pages

รีโปนี้ถูกตั้งค่าให้ deploy เป็น project page ของ `khunjibna/blog` แล้ว โดยใช้ GitHub Actions และ `baseurl: "/blog"`

หลัง push ขึ้น `main` ให้เปิดใช้งาน GitHub Pages ใน repository settings โดยเลือก source เป็น GitHub Actions หากยังไม่ถูกเปิดให้อัตโนมัติ
# 📝 My Personal Blog

ยินดีต้อนรับสู่บล็อกส่วนตัวของผมครับ! พื้นที่นี้ใช้สำหรับบันทึกเรื่องราว ประสบการณ์การทำงาน และบทความด้านเทคโนโลยีต่างๆ โดยรันบน **GitHub Pages**

## 🚀 Tech Stack
- **Framework:** [ระบุเครื่องมือที่ใช้ เช่น Jekyll, Hugo, Astro, หรือ Plain HTML]
- **Styling:** [เช่น Tailwind CSS, Sass]
- **Deployment:** GitHub Actions / GitHub Pages

## 📂 โครงสร้างภายใน Repository
- `/posts` : ไฟล์เนื้อหาบทความทั้งหมด (Markdown)
- `/assets` : รูปภาพและไฟล์ประกอบต่างๆ
- `/theme` : ส่วนการตั้งค่าดีไซน์ของบล็อก

## 🛠️ การรันบนเครื่อง Local (Optional)
หากต้องการลองรันบล็อกนี้บนเครื่องตัวเอง:
1. Clone repository นี้ลงไป
2. รันคำสั่ง `[ระบุคำสั่ง เช่น npm install หรือ bundle install]`
3. เปิดด้วย `[ระบุคำสั่ง เช่น npm run dev หรือ jekyll serve]`

---
© 2026 [ชื่อของคุณ] - ขอบคุณที่แวะมาอ่านครับ!