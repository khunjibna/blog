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

หลัง push ขึ้น `main` ระบบจะ build และ deploy อัตโนมัติผ่าน workflow ใน `.github/workflows/pages.yml`

เว็บไซต์ที่เผยแพร่อยู่ตอนนี้:

- `https://khunjibna.github.io/blog/`

## Tech Stack

- Jekyll 4
- Markdown ผ่าน kramdown
- Custom HTML layout และ CSS แบบไม่ใช้ธีมสำเร็จรูป
- GitHub Actions สำหรับ deploy ไป GitHub Pages