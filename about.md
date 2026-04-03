---
layout: page
title: About
permalink: /about/
---

<article class="post-layout">
  <header class="post-header">
    <p class="eyebrow">About This Journal</p>
    <h1>เรื่องเล่าจากการเดินทาง ชุมชน และการลองใช้ของจริง</h1>
    <p class="post-summary">บล็อกนี้สรุปจากประสบการณ์ที่เกิดขึ้นจริงในเส้นทางของ {{ site.author.name }} ตั้งแต่การเดินทางข้ามเมือง การจ่ายด้วย Lightning จนถึงการเติบโตผ่านชุมชน Nostr</p>
  </header>

  <div class="post-content">
บล็อกนี้ไม่ได้ตั้งใจเป็นคู่มือทางเทคนิคแบบเป็นทางการ แต่เป็นบันทึกชีวิตที่เอาเทคโนโลยีมาอยู่ในโลกจริง เนื้อหาส่วนใหญ่เกิดจากการเดินทางไปเจอคน เจอสถานที่ และลองใช้งานด้วยตัวเองก่อนกลับมาเล่า

## สิ่งที่เราเขียนเป็นหลัก

- **Bitcoin และ Lightning ในชีวิตจริง**: ทดลองจ่ายหน้างาน จ่ายตามร้าน และบันทึกสิ่งที่เกิดขึ้นจริงทั้งส่วนที่เวิร์กและส่วนที่ยังติดขัด
- **Nostr และพลังของชุมชน**: เรื่องเล่าจากการรู้จักผู้คนใหม่ การไปมีตติ้ง และการเห็น community ค่อย ๆ เติบโต
- **การเดินทางแบบมีภารกิจ**: จากพระประแดง โคราช เชียงใหม่ ไปจนถึงทริปที่ไม่ได้วางแผนตายตัว แต่ได้บทเรียนทุกครั้ง

## แกนของบล็อกนี้

1. เริ่มจากประสบการณ์จริงก่อนทฤษฎี
2. เล่าแบบตรงไปตรงมา ทั้งด้านสนุก เหนื่อย และพลาด
3. เก็บรายละเอียดเล็ก ๆ ที่ทำให้เห็นภาพช่วงเวลานั้นจริง ๆ

## ไทม์ไลน์โดยย่อ

- **2024**: ปีที่การเดินทางและการพบปะผู้คนเปลี่ยนมุมมองหลายอย่าง ตั้งแต่งาน community ไปจนถึงทริปเดี่ยว
- **ปลาย 2024**: ทบทวนตัวเองแบบเข้มข้นและสรุปบทเรียนจากทั้งปี
- **2025**: ขยายการทดลองใช้งาน Bitcoin Lightning ตามเส้นทางเดินทางให้เป็นระบบมากขึ้น

## บทความแนะนำให้อ่านต่อ

<section class="post-list-section">
  <div class="post-list">
    {% for post in site.posts limit:3 %}
      <article class="post-card">
        {% if post.image %}
          <a class="post-card-media" href="{{ post.url | relative_url }}">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
          </a>
        {% endif %}
        <div class="post-card-content">
          <p class="eyebrow">{{ post.date | date: "%d %b %Y" }}</p>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.summary %}
            <p>{{ post.summary }}</p>
          {% else %}
            <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

## ติดต่อ

หากอยากพูดคุยหรือแลกเปลี่ยนมุมมอง ติดต่อได้ที่ [{{ site.author.email }}](mailto:{{ site.author.email }}) และสามารถติดตามต่อใน Nostr ผ่านลิงก์บนหน้าเว็บ

  </div>

  <p class="post-back"><a href="{{ '/' | relative_url }}">← กลับหน้าแรก</a></p>
</article>
