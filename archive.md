---
layout: default
title: บทความ
permalink: /archive/
sidebar: true
---

<div class="blog-home">
  <div class="blog-home-main">

    <div class="blog-archive-heading">
      <h1>บทความทั้งหมด</h1>
      <p>{{ site.posts | size }} บทความ</p>
    </div>

    {% assign featured = site.posts.first %}
    {% assign rest = site.posts | offset: 1 %}

    {% if featured %}
    <article class="blog-post-entry blog-post-featured">
      {% if featured.image %}
      <a href="{{ featured.url | relative_url }}" class="blog-post-thumb">
        <img src="{{ featured.image | relative_url }}" alt="{{ featured.title }}" loading="lazy">
      </a>
      {% endif %}
      <div class="blog-post-body">
        <div class="blog-post-meta">
          <time>{% include thai-date.html date=featured.date %}</time>
          {% if featured.categories.size > 0 %}
            <span class="blog-post-cat">{{ featured.categories | first }}</span>
          {% endif %}
        </div>
        <h2 class="blog-post-title"><a href="{{ featured.url | relative_url }}">{{ featured.title }}</a></h2>
        <p class="blog-post-excerpt">{{ featured.summary | default: featured.excerpt | strip_html | truncate: 200 }}</p>
        <a href="{{ featured.url | relative_url }}" class="blog-read-more">อ่านต่อ &rarr;</a>
      </div>
    </article>
    {% endif %}

    <div class="blog-post-grid">
      {% for post in site.posts offset:1 %}
      <article class="blog-post-entry blog-post-card">
        {% if post.image %}
        <a href="{{ post.url | relative_url }}" class="blog-post-thumb">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
        </a>
        {% endif %}
        <div class="blog-post-body">
          <div class="blog-post-meta">
            <time>{% include thai-date.html date=post.date %}</time>
            {% if post.categories.size > 0 %}
              <span class="blog-post-cat">{{ post.categories | first }}</span>
            {% endif %}
          </div>
          <h2 class="blog-post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
          <p class="blog-post-excerpt">{{ post.summary | default: post.excerpt | strip_html | truncate: 120 }}</p>
          <a href="{{ post.url | relative_url }}" class="blog-read-more">อ่านต่อ &rarr;</a>
        </div>
      </article>
      {% endfor %}
    </div>

  </div>

  <aside class="blog-home-sidebar">
    {% include sidebar.html %}
  </aside>
</div>
