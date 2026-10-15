---
layout: default
title: เกี่ยวกับบล็อก
permalink: /about/
sidebar: true
description: รู้จัก Khunjibna Blog บันทึกส่วนตัวว่าด้วยการเดินทาง Bitcoin Lightning ชีวิตอย่างตั้งใจ งานสร้างสรรค์ เทคโนโลยี และการวิ่ง
---

{% assign post_count = site.posts | size %}
{% assign race_count = site.races | size %}
{% assign route_count = site.routes | size %}
{% assign entry_count = post_count | plus: race_count | plus: route_count %}
{% assign oldest_post = site.posts | last %}
{% assign first_year = oldest_post.date | date: "%Y" | plus: 543 %}
{% assign latest_post = site.posts | first %}

<article class="about-page">
  <header class="about-hero">
    <div class="container about-hero-grid">
      <div class="about-hero-copy">
        <p class="eyebrow">About the blog</p>
        <h1>พื้นที่เล็ก ๆ สำหรับเรื่องเล่าที่อยากเก็บไว้ให้นานขึ้น</h1>
        <p class="about-lead">Khunjibna Blog คือบล็อกส่วนตัวที่บันทึกสิ่งที่พบระหว่างทาง—ตั้งแต่การเดินทางและทดลองใช้ Bitcoin Lightning ในชีวิตจริง ไปจนถึงความคิดเรื่องการใช้ชีวิต งานสร้างสรรค์ เทคโนโลยี และการวิ่ง</p>

        <div class="about-actions" aria-label="ลิงก์แนะนำ">
          <a class="btn btn-primary" href="{{ '/archive/' | relative_url }}">สำรวจบทความทั้งหมด</a>
          <a class="btn btn-ghost" href="{{ '/contact/' | relative_url }}">พูดคุยกับผู้เขียน</a>
        </div>

        <dl class="about-stats" aria-label="ข้อมูลสรุปของบล็อก">
          <div>
            <dt>{{ entry_count }}</dt>
            <dd>บันทึกที่เผยแพร่</dd>
          </div>
          <div>
            <dt>{{ first_year }}</dt>
            <dd>เริ่มบันทึกตั้งแต่</dd>
          </div>
          <div>
            <dt>4</dt>
            <dd>หัวข้อหลัก</dd>
          </div>
        </dl>
      </div>

      <figure class="about-portrait">
        <img src="{{ '/assets/image/web-banner.jpg' | relative_url }}" alt="ภาพวาดตัวละคร Khunjibna ยืนอยู่หน้าวัดไทย" width="1024" height="576" fetchpriority="high">
        <figcaption>
          <span class="about-portrait-mark" aria-hidden="true">✦</span>
          <span>บันทึกจากประสบการณ์จริง<br><small>เล่าตามที่เห็น คิด และได้ลองทำ</small></span>
        </figcaption>
      </figure>
    </div>
  </header>

  <div class="container about-content">
    <section class="about-intro" aria-labelledby="about-summary-title">
      <div>
        <p class="eyebrow">In a nutshell</p>
        <h2 id="about-summary-title">บล็อกนี้เล่าเรื่องอะไร</h2>
      </div>
      <div class="about-intro-copy">
        <p>ที่นี่เป็นเหมือนสมุดบันทึกออนไลน์ของคนคนหนึ่งซึ่งชอบออกเดินทาง ทดลองสิ่งใหม่ และสังเกตรายละเอียดเล็ก ๆ รอบตัว เรื่องราวจึงมีทั้งทริปที่พาไปพบผู้คนและร้านค้า การใช้งาน Lightning ในสถานการณ์จริง ความสนใจใน Nostr และเทคโนโลยี ตลอดจนบันทึกชีวิตที่ช้าลงและเรียบง่ายขึ้น</p>
        <p>เป้าหมายไม่ใช่การให้คำตอบสำเร็จรูป แต่คือการเก็บประสบการณ์ ความรู้สึก และบทเรียนระหว่างทางไว้อย่างตรงไปตรงมา เผื่อบางเรื่องจะเป็นจุดเริ่มต้นให้ผู้อ่านออกไปลอง สังเกต หรือเขียนเรื่องของตัวเองบ้าง</p>
      </div>
    </section>

    <section class="about-topics" aria-labelledby="about-topics-title">
      <div class="about-section-head">
        <div>
          <p class="eyebrow">What you’ll find</p>
          <h2 id="about-topics-title">เรื่องที่มักพบในบล็อก</h2>
        </div>
        <p>สี่เส้นเรื่องที่ค่อย ๆ เชื่อมกันผ่านประสบการณ์จริง</p>
      </div>

      <div class="about-topic-grid">
        <article class="about-topic-card">
          <span class="about-topic-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16M5 16l4-9 4 6 2-4 4 7"/><path d="M8 4h.01"/></svg>
          </span>
          <p class="about-topic-number">01</p>
          <h3>เดินทาง &amp; Lightning</h3>
          <p>เรื่องจากเมืองและร้านค้าที่ได้ไปเยือน พร้อมประสบการณ์จ่ายด้วย Bitcoin Lightning ในสถานการณ์จริง</p>
        </article>

        <article class="about-topic-card">
          <span class="about-topic-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 7 7 0 0 0 0 14 5 5 0 0 0 0-10 3 3 0 0 0 0 6"/></svg>
          </span>
          <p class="about-topic-number">02</p>
          <h3>ชีวิตอย่างตั้งใจ</h3>
          <p>บันทึกการกลับมามองจังหวะชีวิต ความเรียบง่าย และความสัมพันธ์ระหว่างโลกดิจิทัลกับเวลาของเรา</p>
        </article>

        <article class="about-topic-card">
          <span class="about-topic-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14"/></svg>
          </span>
          <p class="about-topic-number">03</p>
          <h3>สร้างสรรค์ &amp; เทคโนโลยี</h3>
          <p>การทดลองกับ Nostr, AI และมินิแอปเล็ก ๆ ที่เริ่มจากความสงสัย ความสนุก และการลงมือทำ</p>
        </article>

        <article class="about-topic-card">
          <span class="about-topic-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 5.5 10 9l3 2.5-2 4.5M10 9 7 7M13 11.5l4 1.5M8 19l3-3M15 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>
          </span>
          <p class="about-topic-number">04</p>
          <h3>บันทึกวิ่ง</h3>
          <p>สถิติและความทรงจำจากสนามแข่ง รวมถึงเส้นทางซ้อมที่อยากเก็บไว้ใช้เตรียมตัวและแบ่งปันต่อ</p>
        </article>
      </div>
    </section>

    <section class="about-start" aria-labelledby="about-start-title">
      <div class="about-start-copy">
        <p class="eyebrow">Start here</p>
        <h2 id="about-start-title">เลือกทางที่อยากเริ่มอ่าน</h2>
        <p>ไม่จำเป็นต้องอ่านตามลำดับ เลือกเรื่องที่ใกล้กับความสนใจของคุณได้เลย</p>
      </div>

      <nav class="about-start-links" aria-label="ทางเลือกสำหรับเริ่มอ่าน">
        {% if latest_post %}
        <a href="{{ latest_post.url | relative_url }}">
          <span class="about-start-index">01</span>
          <span><small>เรื่องล่าสุด</small><strong>{{ latest_post.title }}</strong></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        {% endif %}
        <a href="{{ '/archive/' | relative_url }}">
          <span class="about-start-index">02</span>
          <span><small>ดูตามช่วงเวลา</small><strong>คลังบทความทั้งหมด</strong></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href="{{ '/running/' | relative_url }}">
          <span class="about-start-index">03</span>
          <span><small>สนามและเส้นทาง</small><strong>เปิดบันทึกวิ่ง</strong></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </nav>
    </section>

    <section class="about-author" aria-labelledby="about-author-title">
      <div class="about-author-heading">
        <p class="eyebrow">Behind the stories</p>
        <h2 id="about-author-title">คนที่อยู่หลังบันทึกเหล่านี้</h2>
      </div>
      {% include author-card.html %}
    </section>
  </div>
</article>
