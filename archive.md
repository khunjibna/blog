---
layout: default
title: Archive
permalink: /archive/
---

<section class="post-list-section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Archive</p>
      <h2>Collected Stories</h2>
    </div>
    <p>{{ site.posts | size }} published article{% if site.posts.size != 1 %}s{% endif %}</p>
  </div>

  <div class="post-list">
    {% for post in site.posts %}
      <article class="post-card">
        <p class="eyebrow">{{ post.date | date: "%d %b %Y" }}</p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.description %}
          <p>{{ post.description }}</p>
        {% else %}
          <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>