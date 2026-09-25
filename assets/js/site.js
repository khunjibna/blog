(function () {
  "use strict";

  var root = document.documentElement;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      var t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      resolve();
    });
  }

  /* ── Theme ─────────────────────────────────────────────── */
  var themeBtn = $("#theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ── Header: scrolled state + mobile menu ──────────────── */
  var header = $("#site-header");
  var progress = $("#reading-progress");
  var article = $(".post-content");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (progress && article) {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight * 0.6;
      var ratio = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = $("#menu-toggle");
  var menu = $("#mobile-menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  $$("[data-to-top]").forEach(function (btn) {
    btn.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  });

  /* ── Copy link ─────────────────────────────────────────── */
  $$("[data-copy-link]").forEach(function (btn) {
    var label = $("span", btn);
    var original = label ? label.textContent : "";
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-copy-link");
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        navigator.share({ title: btn.getAttribute("data-title") || document.title, url: url }).catch(function () {});
        return;
      }
      copyText(url).then(function () {
        btn.classList.add("is-done");
        if (label) label.textContent = "คัดลอกแล้ว";
        setTimeout(function () {
          btn.classList.remove("is-done");
          if (label) label.textContent = original;
        }, 2000);
      });
    });
  });

  /* ── Search dialog ─────────────────────────────────────── */
  var dialog = $("#search-dialog");
  var input = $("#search-input");
  var results = $("#search-results");
  var hint = $("#search-hint");
  var index = null;
  var active = -1;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(dialog.getAttribute("data-index"))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data.map(function (p) {
          p._hay = (p.title + " " + p.summary + " " + p.content).toLowerCase();
          return p;
        });
        return index;
      });
  }

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    var i = safe.toLowerCase().indexOf(escapeHtml(q).toLowerCase());
    if (i < 0) return safe;
    var len = escapeHtml(q).length;
    return safe.slice(0, i) + "<mark>" + safe.slice(i, i + len) + "</mark>" + safe.slice(i + len);
  }

  function thaiDate(iso) {
    var m = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    var d = iso.split("-");
    return parseInt(d[2], 10) + " " + m[parseInt(d[1], 10) - 1] + " " + (parseInt(d[0], 10) + 543);
  }

  function render(q) {
    q = q.trim().toLowerCase();
    loadIndex().then(function (posts) {
      var terms = q.split(/\s+/).filter(Boolean);
      var list = terms.length
        ? posts.filter(function (p) { return terms.every(function (t) { return p._hay.indexOf(t) > -1; }); })
        : posts.slice(0, 5);
      active = -1;
      results.innerHTML = list.map(function (p) {
        return '<li><a href="' + escapeHtml(p.url) + '" role="option">' +
          '<img src="' + escapeHtml(p.image || "") + '" alt="" loading="lazy">' +
          "<span><strong>" + highlight(p.title, terms[0]) + "</strong>" +
          "<small>" + thaiDate(p.date) + "</small></span></a></li>";
      }).join("");
      hint.hidden = list.length > 0 && terms.length > 0;
      if (terms.length && !list.length) {
        hint.hidden = false;
        hint.textContent = "ไม่พบบทความที่ตรงกับ “" + q + "”";
      } else if (!terms.length) {
        hint.textContent = "บทความล่าสุด · พิมพ์เพื่อค้นหาจากชื่อเรื่องและเนื้อหา";
      }
    }).catch(function () {
      hint.hidden = false;
      hint.textContent = "โหลดข้อมูลค้นหาไม่สำเร็จ ลองใหม่อีกครั้ง";
    });
  }

  function openSearch(e) {
    if (e) e.preventDefault();
    if (!dialog || dialog.open) return;
    if (menu) { menu.classList.remove("is-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "false"); }
    dialog.showModal();
    input.value = "";
    render("");
    input.focus();
  }

  if (dialog && typeof dialog.showModal === "function") {
    $$("[data-search-open]").forEach(function (b) { b.addEventListener("click", openSearch); });
    $$("[data-search-close]").forEach(function (b) { b.addEventListener("click", function () { dialog.close(); }); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });

    var timer;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () { render(input.value); }, 120);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); dialog.close(); return; }
      var links = $$("a", results);
      if (!links.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        active = (active + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach(function (l, i) { l.setAttribute("aria-selected", String(i === active)); });
        links[active].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        window.location.href = links[Math.max(active, 0)].href;
      }
    });

    document.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
        openSearch(e);
      }
    });
  } else {
    // เบราว์เซอร์เก่าที่ไม่รองรับ <dialog> → ไปหน้า archive แทน
    $$("[data-search-open]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = (document.querySelector(".brand") || {}).href + "archive/";
      });
    });
  }

  /* ── Archive filter ────────────────────────────────────── */
  var filter = $("#archive-filter");
  if (filter) {
    var items = $$(".archive-item");
    var years = $$("[data-year]");
    var count = $("#archive-count");
    var empty = $("#archive-empty");
    filter.addEventListener("input", function () {
      var terms = filter.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (li) {
        var hay = li.getAttribute("data-search");
        var match = terms.every(function (t) { return hay.indexOf(t) > -1; });
        li.hidden = !match;
        if (match) shown++;
      });
      years.forEach(function (y) { y.hidden = !$(".archive-item:not([hidden])", y); });
      count.textContent = shown + " บทความ";
      empty.hidden = shown > 0;
    });
  }

  /* ── Zap (Lightning) ───────────────────────────────────── */
  var zap = $("#zap-dialog");
  if (zap && typeof zap.showModal === "function") {
    var amount = $("#zap-amount");
    var status = $("#zap-status");
    var result = $("#zap-result");
    var submit = $("#zap-submit");
    var invoice = "";

    function syncPresets() {
      $$("[data-sats]", zap).forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-sats") === amount.value);
      });
    }

    $$("[data-zap-open]").forEach(function (b) {
      b.addEventListener("click", function () { zap.showModal(); syncPresets(); });
    });
    $$("[data-zap-close]").forEach(function (b) { b.addEventListener("click", function () { zap.close(); }); });
    zap.addEventListener("click", function (e) { if (e.target === zap) zap.close(); });
    $$("[data-sats]", zap).forEach(function (b) {
      b.addEventListener("click", function () { amount.value = b.getAttribute("data-sats"); syncPresets(); });
    });
    amount.addEventListener("input", syncPresets);

    function loadQr() {
      if (window.QRCode) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    submit.addEventListener("click", function () {
      var sats = parseInt(amount.value, 10);
      status.textContent = "";
      if (isNaN(sats) || sats < 1) {
        status.textContent = "กรุณาใส่จำนวน sats ที่ถูกต้อง";
        return;
      }
      submit.disabled = true;
      submit.textContent = "กำลังสร้าง invoice…";
      var comment = zap.getAttribute("data-comment");
      fetch(zap.getAttribute("data-lnurl"))
        .then(function (r) { return r.json(); })
        .then(function (ln) {
          var sep = ln.callback.indexOf("?") > -1 ? "&" : "?";
          return fetch(ln.callback + sep + "amount=" + sats * 1000 + "&comment=" + encodeURIComponent(comment));
        })
        .then(function (r) { return r.json(); })
        .then(function (inv) {
          if (!inv.pr) throw new Error(inv.reason || "ไม่สามารถสร้าง invoice ได้");
          invoice = inv.pr;
          return loadQr().then(function () {
            QRCode.toCanvas($("#zap-qr"), "lightning:" + invoice, { width: 240, margin: 1 });
            $("#zap-pr").textContent = invoice;
            $("#zap-open-wallet").href = "lightning:" + invoice;
            result.hidden = false;
          });
        })
        .catch(function (err) {
          status.textContent = "เกิดข้อผิดพลาด: " + err.message;
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = "สร้าง QR ใหม่";
        });
    });

    $("#zap-copy").addEventListener("click", function (e) {
      var btn = e.currentTarget;
      copyText(invoice).then(function () {
        btn.textContent = "คัดลอกแล้ว";
        setTimeout(function () { btn.textContent = "คัดลอก invoice"; }, 2000);
      });
    });
  }
})();
