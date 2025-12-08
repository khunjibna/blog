---
layout: default
title: หน้าแรก
---

<div class="max-w-6xl mx-auto px-4 py-10 space-y-12">

  <!-- Intro -->
  <section class="text-center">
    <h1 class="text-3xl font-bold mb-2">สวัสดีครับ ผมจิ๊ปนะครับผม 👋</h1>
    <p class="text-lg text-gray-700">ยินดีต้อนรับสู่บล็อกส่วนตัวของผมโดยใช้ Tamachirs.com ไม่รู้จะจดโดเมนอะไรก็จดไปงั้นๆแหละ เดี๋ยวค่อยไปตามหาชื่อใหม่ Hosting: Github</p> 
    <p class="text-lg text-gray-700">รวมบทความที่เคยเขียนใน Nostr เอาไว้เป็นอนุสรณ์สถานถ้ายังไม่โดนลบแอดเคาน์นะ ขอบคุณที่ติดตามและอย่าลืมสนับสนุนกันครับ</p>
     <p class="text-lg text-gray-700 mt-5">IT | GAME | TRAVEL | EXPERIENCE </p>
      <p class="text-sm text-gray-700">ช่องทางเมนสตรีม: <a href="https://www.facebook.com/gowithjib" target="_blank" class="underline text-blue-800">เพจไปกับจิ๊บ (Facebook)</a></p>
    
  </section>

  <!-- Slideshow -->
<section>
  <h2 class="text-2xl font-semibold mb-4">📸 แนะนำบทความเด่น</h2>
  <div class="relative overflow-hidden rounded-xl shadow">
    <div class="w-full h-64 relative">
      {% for post in site.posts limit:5 %}
        <div class="slide absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none z-0 {% if forloop.first %}opacity-100 pointer-events-auto z-10{% endif %}">
          <a href="{{ post.url | relative_url }}">
            <img src="{{ post.image | default: '/assets/images/default.jpg' }}" alt="{{ post.title }}"
                 class="w-full h-full object-cover rounded-xl" />
            <div class="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
              <h3 class="text-lg font-semibold">{{ post.title }}</h3>
            </div>
          </a>
        </div>
      {% endfor %}
    </div>
  </div>
  <script>
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
      slides[current].classList.add('opacity-0', 'pointer-events-none', 'z-0');

      current = (current + 1) % slides.length;

      slides[current].classList.remove('opacity-0', 'pointer-events-none', 'z-0');
      slides[current].classList.add('opacity-100', 'pointer-events-auto', 'z-10');
    }, 5000);

  </script>
</section>

  <!-- Latest Posts -->
  <section>
    <h2 class="text-2xl font-semibold mb-4">📰 บทความล่าสุด</h2>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {% for post in site.posts limit:6 %}
         <a href="{{ post.url | relative_url }}"
            class="block rounded-xl shadow overflow-hidden bg-white hover:shadow-lg transition">
            <img src="{{ post.image | default: '/assets/images/default.jpg' }}" alt="{{ post.title }}"
              class="w-full h-48 object-cover" />
            <div class="p-4">
              {% assign months = "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม" | split: "," %}
              {% assign day = post.date | date: "%-d" %}
              {% assign month_index = post.date | date: "%-m" | minus: 1 %}
              {% assign month_thai = months[month_index] %}
              {% assign year_thai = post.date | date: "%Y" | plus: 543 %}
              
              <p class="text-xs text-gray-500">{{ day }} {{ month_thai }} {{ year_thai }}</p>

              <h2 class="font-semibold text-lg text-gray-900 mb-1">{{ post.title }}</h2>
              <p class="text-sm text-gray-600 line-clamp-3">
                {{ post.summary | default: post.excerpt | strip_html | truncatewords: 20 }}
              </p>
            </div>
          </a>
      {% endfor %}
    </div>
  </section>

  <!-- View All Button -->
  <section class="text-center">
    <a href="{{ '/article/' | relative_url }}" class="inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl transition">
      ดูบทความทั้งหมด →
    </a>
  </section>

</div>
