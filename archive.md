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
        {% if post.image %}
          <a class="post-card-media" href="{{ post.url | relative_url }}">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
          </a>
        {% endif %}
        <div class="post-card-content">
        <p class="eyebrow">{{ post.date | date: "%d %b %Y" }}</p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.summary or post.description %}
          <p>{{ post.summary | default: post.description }}</p>
        {% else %}
          <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
        {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>