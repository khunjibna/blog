---
layout: page
title: ติดต่อเรา
eyebrow: Contact
permalink: /contact/
description: ช่องทางพูดคุย ติดตาม และสนับสนุนผู้เขียน
---

<div class="contact-grid">
  {% if site.nostr.npub %}
  <a class="contact-card" href="https://njump.me/{{ site.nostr.npub }}" target="_blank" rel="noopener">
    <span class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V4l16 16V4"/></svg></span>
    <strong>Nostr</strong>
    <small>ทักมาคุยหรือติดตามโพสต์ล่าสุด</small>
  </a>
  {% endif %}
  {% if site.lightning.lnurl %}
  <a class="contact-card" href="{{ site.lightning.lnurl }}" target="_blank" rel="noopener">
    <span class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg></span>
    <strong>Lightning</strong>
    <small>{{ site.lightning.address }}</small>
  </a>
  {% endif %}
  {% if site.repository_url %}
  <a class="contact-card" href="{{ site.repository_url }}" target="_blank" rel="noopener">
    <span class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span>
    <strong>GitHub</strong>
    <small>ดูซอร์สโค้ดของบล็อกนี้</small>
  </a>
  {% endif %}
</div>
