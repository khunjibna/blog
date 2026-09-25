---
layout: default
title: บทความ
permalink: /archive/
---

<header class="page-header container">
  <p class="eyebrow">Archive</p>
  <h1>บทความทั้งหมด</h1>
  <p>รวม {{ site.posts | size }} เรื่องเล่า เรียงจากใหม่ไปเก่า</p>
</header>

<div class="container">
  <div class="archive-tools">
    <label class="archive-search">
      <span class="visually-hidden">กรองบทความ</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input class="input" type="search" id="archive-filter" placeholder="กรองตามชื่อเรื่องหรือคำอธิบาย…" autocomplete="off">
    </label>
    <span class="archive-count" id="archive-count" aria-live="polite">{{ site.posts | size }} บทความ</span>
  </div>

  {% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in years %}
  <section class="archive-year" data-year>
    <h2 class="archive-year-label">{{ year.name | plus: 543 }}<small>{{ year.items | size }} บทความ</small></h2>
    <ul class="archive-list">
      {% for post in year.items %}
      <li class="archive-item" data-search="{{ post.title | append: ' ' | append: post.summary | downcase | escape }}">
        <a class="archive-link" href="{{ post.url | relative_url }}">
          <span class="card-media"><img src="{{ post.image | default: site.og_image | relative_url }}" alt="" loading="lazy"></span>
          <span>
            <span class="card-meta">
              <time datetime="{{ post.date | date_to_xmlschema }}">{% include thai-date.html date=post.date %}</time>
              <span class="dot" aria-hidden="true"></span>
              <span>{% include reading-time.html content=post.content %}</span>
            </span>
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-summary">{{ post.summary | default: post.excerpt | strip_html | strip }}</p>
          </span>
        </a>
      </li>
      {% endfor %}
    </ul>
  </section>
  {% endfor %}

  <p class="archive-empty" id="archive-empty" hidden>ไม่พบบทความที่ตรงกับคำค้น ลองใช้คำอื่นดูนะ</p>
</div>
