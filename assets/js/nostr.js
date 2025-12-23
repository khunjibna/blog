if (!window.nip19 && window.nostrTools?.nip19) {
  window.nip19 = window.nostrTools.nip19;
}

function isArticleNaddr(naddr) {
  if (!window.nip19) return false;
  try {
    const decoded = window.nip19.decode(naddr);
    return decoded.type === "naddr" && decoded.data.kind === 30023;
  } catch (e) {
    console.warn("decode ผิดพลาด:", e);
    return false;
  }
}

const relayUrls = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://nostr.wine',
  'wss://relay.notoshi.win',
  'wss://relay.siamdev.cc/'
];

const publicKey = '0f9da41389e1239d267c43105ecfc92273079e80c2d4b09e1d1e172701bd07d7';
const receivedProfiles = new Set();
const receivedNotes = new Map();

relayUrls.forEach(relayUrl => {
  const ws = new WebSocket(relayUrl);
  ws.onopen = () => {
    ws.send(JSON.stringify(["REQ", "sub_id_1", { authors: [publicKey], kinds: [0] }]));
    ws.send(JSON.stringify(["REQ", "sub_id_2", { authors: [publicKey], kinds: [1], limit: 100 }]));
    fetchFollowersAndFollowing();
  };
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data[0] === "EVENT") {
        const ev = data[2];
        if (ev.kind === 0) {
          const profile = JSON.parse(ev.content);
          if (!receivedProfiles.has(profile.name)) {
            receivedProfiles.add(profile.name);
            displayProfile(profile);
          }
        } else if (ev.kind === 1) {
          const tags = ev.tags || [];
          const isOriginalNote = !tags.some(tag => tag[0] === 'e');
          if (isOriginalNote && !receivedNotes.has(ev.id)) {
            receivedNotes.set(ev.id, {
              content: ev.content,
              created_at: ev.created_at
            });
          }
        }
      }
    } catch (e) {
      console.error("JSON Parse Error:", e);
    }
  };
});

function displayProfile(profile) {
  document.getElementById('profile-name').textContent = profile.name || 'N/A';
  document.getElementById('profile-about').textContent = profile.about || 'N/A';
  document.getElementById('profile-picture').src = profile.picture || 'default-avatar.png';
}

function fetchFollowersAndFollowing() {
  const ws = new WebSocket("wss://relay.damus.io");
  let followers = new Set();
  let followingCount = 0;
  ws.onopen = () => {
    ws.send(JSON.stringify(["REQ", "get_following", { kinds: [3], authors: [publicKey], limit: 1 }]));
    ws.send(JSON.stringify(["REQ", "get_followers", { kinds: [3], "#p": [publicKey], limit: 1000 }]));
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data[0] === "EVENT" && data[2].kind === 3) {
      const event = data[2];
      if (event.pubkey === publicKey) {
        const tags = event.tags || [];
        followingCount = tags.filter(tag => tag[0] === "p").length;
      }
      const tags = event.tags || [];
      const isFollower = tags.some(tag => tag[0] === "p" && tag[1] === publicKey);
      if (isFollower) {
        followers.add(event.pubkey);
      }
      document.getElementById('followers').textContent = `ผู้ติดตาม: ${followers.size}`;
      document.getElementById('following').textContent = `กำลังติดตาม: ${followingCount}`;
    }
  };
}

function displayNoteOrImage(noteContent, created_at) {
  const notesDiv = document.getElementById('notes');
  const container = document.createElement('div');
  container.className = "bg-white p-4 rounded-lg shadow text-gray-800 space-y-3";

  // ✅ 1. ภาพ
  const imageRegex = /(https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|webp))/i;
  const imageMatch = noteContent.match(imageRegex);
  if (imageMatch) {
    const img = document.createElement('img');
    img.src = imageMatch[0];
    img.className = "w-full max-w-lg rounded-lg mx-auto";
    container.appendChild(img);
  }

  // ✅ 2. YouTube
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = noteContent.match(youtubeRegex);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = "100%";
    iframe.height = "630";
    iframe.className = "w-full rounded-lg";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
  }

  // ✅ 3. เตรียมข้อความก่อนแสดง
  let cleanContent = noteContent
    .replace(/https?:\/\/[^\s<]+?\.(jpg|jpeg|png|gif|webp)/gi, '')
    .replace(/https?:\/\/(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/gi, '');

  const noteElement = document.createElement('div');
  let escaped = cleanContent
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" class="text-blue-600 underline" target="_blank">$1</a>');

  noteElement.innerHTML = escaped;
  container.appendChild(noteElement);

  // ✅ 4. ตรวจหา nostr:npub1 หรือ nostr:naddr1
  const nostrRegex = /nostr:(naddr1[0-9a-z]+|npub1[0-9a-z]+)/gi;
  const matches = [...noteContent.matchAll(nostrRegex)];

  matches.forEach(match => {
    const fullTag = match[0]; // เช่น nostr:npub1xxx หรือ nostr:naddr1xxx
    const value = match[1];
  
    if (value.startsWith('naddr1')) {
      const pointer = getNaddrPointer(value);
      if (pointer) {
        const label = document.createElement('div');
        label.className = "text-sm text-gray-600";
        label.innerHTML = `
          🔖 <strong>Kind:</strong> ${pointer.kind} |
          <strong>ID:</strong> ${pointer.identifier} |
          <strong>Pubkey:</strong> ${pointer.pubkey.slice(0, 12)}…`;
        container.appendChild(label);
      } else {
        // ❗️ซ่อน fullTag ถ้า nip19 ยังไม่พร้อม
        noteElement.innerHTML = noteElement.innerHTML.replace(fullTag, '');
      }
    }
  
    if (value.startsWith('npub1')) {
      const replaced = replaceNpubLinksWithNames(fullTag, noteElement);
      if (!replaced) {
        noteElement.innerHTML = noteElement.innerHTML.replace(fullTag, '');
      }
    }
  });

  // ✅ 5. เวลา
  const date = new Date(created_at * 1000);
  const formatted = date.toLocaleString("th-TH", {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const timeElement = document.createElement('div');
  timeElement.className = "text-xs text-gray-500";
  timeElement.textContent = `โพสต์เมื่อ ${formatted} น.`;
  container.appendChild(timeElement);

  notesDiv.appendChild(container);
}


function replaceNpubLinksWithNames(fullTag, container) {
  if (!window.nip19 && window.nostrTools?.nip19) {
    window.nip19 = window.nostrTools.nip19;
  }

  if (!window.nip19) {
    console.warn("nip19 ยังไม่พร้อมใช้งาน");
    return false;
  }

  const regex = /npub1[0-9a-z]+/i;
  const match = fullTag.match(regex);
  if (!match) return false;

  const npub = match[0];
  let pubkey;
  try {
    const decoded = window.nip19.decode(npub);
    if (decoded.type !== 'npub') return false;
    pubkey = decoded.data;
  } catch (err) {
    console.warn('decode npub ผิดพลาด:', err);
    return false;
  }

  const ws = new WebSocket('wss://relay.nostr.wine');
  ws.onopen = () => {
    const req = ["REQ", `sub_${pubkey}`, { kinds: [0], authors: [pubkey], limit: 1 }];
    ws.send(JSON.stringify(req));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data[0] === "EVENT" && data[2].kind === 0) {
        const profile = JSON.parse(data[2].content);
        const name = profile.display_name || profile.name || `${npub.slice(0, 12)}…`;
        const tag = `<a href="https://njump.me/${npub}" target="_blank" class="text-purple-600 underline">@${name}</a>`;
        container.innerHTML = container.innerHTML.replace(fullTag, tag);
        ws.close();
      }
    } catch (err) {
      console.error('profile decode ผิด:', err);
    }
  };

  return true;
}


function displayLatestNotes(limit = 10) {
  const notesArray = Array.from(receivedNotes.values())
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, limit);
  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';
  notesArray.forEach(note => displayNoteOrImage(note.content, note.created_at));
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.nip19 && window.nostrTools?.nip19) {
    window.nip19 = window.nostrTools.nip19;
  }

  setTimeout(() => {
    const notesDiv = document.getElementById("notes");
    if (notesDiv) {
      displayLatestNotes(10);
    } else {
      console.warn("⚠️ ไม่พบ <div id='notes'> บนหน้า HTML");
    }
  }, 2000);
});

function renderArticlePreview(naddr, container) {
  if (!window.nip19) return console.error("nip19 not available");
  try {
    const decoded = window.nip19.decode(naddr);
    if (decoded.type !== "naddr") return;
    const { pubkey, identifier } = decoded.data;
    const articleReq = ["REQ", "sub_article", {
      kinds: [30023], authors: [pubkey], "#d": [identifier], limit: 1
    }];
    const ws = new WebSocket("wss://relay.notoshi.win");
    ws.onopen = () => ws.send(JSON.stringify(articleReq));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data[0] === "EVENT" && data[2].kind === 30023) {
        const article = JSON.parse(data[2].content);
        const card = document.createElement('div');
        card.className = "bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2";
        card.innerHTML = `
          <div class="font-semibold text-lg">${article.title || 'ไม่มีชื่อบทความ'}</div>
          <div class="text-sm text-gray-600">${article.summary || ''}</div>
          ${article.image ? `<img src="${article.image}" class="rounded w-full max-w-md mt-2">` : ''}
          <div><a href="https://njump.me/${naddr}" target="_blank" class="text-blue-600 underline">อ่านบทความฉบับเต็ม</a></div>
        `;
        container.appendChild(card);
        ws.close();
      }
    };
  } catch (err) {
    console.error("decode ผิดพลาด:", err);
  }
}

function getNaddrPointer(naddr) {
  if (!window.nip19 && window.nostrTools?.nip19) {
    window.nip19 = window.nostrTools.nip19;
  }
  if (!window.nip19) {
    console.warn("nip19 not available");
    return null;
  }

  try {
    const decoded = window.nip19.decode(naddr);
    if (decoded.type !== 'naddr') return null;

    const { pubkey, kind, identifier, relays } = decoded.data;

    return {
      type: decoded.type,
      pubkey,
      kind,
      identifier,
      relays: relays || []
    };
  } catch (err) {
    console.error("decode naddr ผิดพลาด:", err);
    return null;
  }
}
