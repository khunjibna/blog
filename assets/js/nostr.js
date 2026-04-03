const relayUrls = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  "wss://nostr.wine",
  "wss://relayrs.notoshi.win",
  "wss://sign.siamstr.com"
];

const publicKey = "0f9da41389e1239d267c43105ecfc92273079e80c2d4b09e1d1e172701bd07d7";
const fallbackAvatar = "/blog/assets/image/web-banner.jpg";
const receivedProfiles = new Map();
const receivedNotes = new Map();
const profileNameCache = new Map();

function ensureNip19() {
  if (!window.nip19 && window.nostrTools?.nip19) {
    window.nip19 = window.nostrTools.nip19;
  }

  return window.nip19;
}

function byId(id) {
  return document.getElementById(id);
}

function hasNostrWidgets() {
  return Boolean(
    byId("profile-name") ||
    byId("profile-about") ||
    byId("profile-picture") ||
    byId("followers") ||
    byId("following") ||
    byId("notes")
  );
}

function parseMessage(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return null;
  }
}

function safeExternalUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const parsed = new URL(value, window.location.origin);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch (error) {
    console.warn("URL ไม่ถูกต้อง:", error);
  }

  return null;
}

function setSafeImageSource(element, value, fallback) {
  if (!element) return;
  element.src = safeExternalUrl(value) || fallback;
}

function closeSubscription(ws, subscriptionId) {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  try {
    ws.send(JSON.stringify(["CLOSE", subscriptionId]));
  } catch (error) {
    console.warn("ปิด subscription ไม่สำเร็จ:", error);
  }
}

function connectRelay(relayUrl, { timeoutMs = 8000, onOpen, onMessage } = {}) {
  let ws;

  try {
    ws = new WebSocket(relayUrl);
  } catch (error) {
    console.warn("เปิด relay ไม่สำเร็จ:", relayUrl, error);
    return null;
  }

  const timeoutId = window.setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
    }
  }, timeoutMs);

  ws.onopen = () => {
    if (typeof onOpen === "function") {
      onOpen(ws);
    }
  };

  ws.onmessage = event => {
    const data = parseMessage(event.data);
    if (!data || typeof onMessage !== "function") return;
    onMessage(ws, data);
  };

  ws.onerror = error => {
    console.warn("Relay error:", relayUrl, error);
  };

  ws.onclose = () => {
    window.clearTimeout(timeoutId);
  };

  return ws;
}

function appendTextWithLinks(container, text) {
  const urlRegex = /(https?:\/\/[^\s<]+)/gi;
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    const href = safeExternalUrl(match[0]);
    if (href) {
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.className = "text-blue-600 underline";
      anchor.textContent = match[0];
      container.appendChild(anchor);
    } else {
      container.appendChild(document.createTextNode(match[0]));
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    container.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

function appendMultilineText(container, text) {
  const lines = text.split(/\n/);
  lines.forEach((line, index) => {
    appendTextWithLinks(container, line);
    if (index < lines.length - 1) {
      container.appendChild(document.createElement("br"));
    }
  });
}

function formatThaiDate(timestampSeconds) {
  const date = new Date(timestampSeconds * 1000);
  return date.toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function createNoteMetaLabel(pointer) {
  const label = document.createElement("div");
  label.className = "text-sm text-gray-600";

  const segments = [
    ["Kind", String(pointer.kind)],
    ["ID", pointer.identifier || "-"],
    ["Pubkey", `${pointer.pubkey.slice(0, 12)}…`]
  ];

  segments.forEach((segment, index) => {
    const [title, value] = segment;
    if (index > 0) {
      label.appendChild(document.createTextNode(" | "));
    }

    const strong = document.createElement("strong");
    strong.textContent = `${title}:`;
    label.appendChild(strong);
    label.appendChild(document.createTextNode(` ${value}`));
  });

  return label;
}

function fetchProfileNameForNpub(npub, anchor) {
  if (!anchor) return;

  const cachedName = profileNameCache.get(npub);
  if (cachedName) {
    anchor.textContent = `@${cachedName}`;
    return;
  }

  const nip19 = ensureNip19();
  if (!nip19) return;

  let pubkey;
  try {
    const decoded = nip19.decode(npub);
    if (decoded.type !== "npub") return;
    pubkey = decoded.data;
  } catch (error) {
    console.warn("decode npub ผิดพลาด:", error);
    return;
  }

  const subscriptionId = `profile_${pubkey.slice(0, 12)}`;
  connectRelay("wss://relay.nostr.wine", {
    timeoutMs: 5000,
    onOpen(ws) {
      ws.send(JSON.stringify(["REQ", subscriptionId, { kinds: [0], authors: [pubkey], limit: 1 }]));
    },
    onMessage(ws, data) {
      if (data[0] === "EVENT" && data[2]?.kind === 0) {
        try {
          const profile = JSON.parse(data[2].content);
          const name = profile.display_name || profile.name || npub.slice(0, 12);
          profileNameCache.set(npub, name);
          anchor.textContent = `@${name}`;
        } catch (error) {
          console.warn("อ่าน profile ไม่สำเร็จ:", error);
        }
      }

      if (data[0] === "EOSE") {
        closeSubscription(ws, subscriptionId);
        ws.close();
      }
    }
  });
}

function createMentionLink(npub) {
  const anchor = document.createElement("a");
  anchor.href = `https://njump.me/${encodeURIComponent(npub)}`;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.className = "text-blue-600 underline";
  anchor.textContent = `@${npub.slice(0, 12)}…`;
  fetchProfileNameForNpub(npub, anchor);
  return anchor;
}

function isArticleNaddr(naddr) {
  const nip19 = ensureNip19();
  if (!nip19) return false;

  try {
    const decoded = nip19.decode(naddr);
    return decoded.type === "naddr" && decoded.data.kind === 30023;
  } catch (error) {
    console.warn("decode ผิดพลาด:", error);
    return false;
  }
}

function displayProfile(profile, pubkey) {
  const nameElement = byId("profile-name");
  const aboutElement = byId("profile-about");
  const pictureElement = byId("profile-picture");

  if (receivedProfiles.has(pubkey)) return;
  receivedProfiles.set(pubkey, true);

  if (nameElement) {
    nameElement.textContent = profile.name || profile.display_name || "N/A";
  }
  if (aboutElement) {
    aboutElement.textContent = profile.about || "N/A";
  }
  setSafeImageSource(pictureElement, profile.picture, fallbackAvatar);
}

function fetchFollowersAndFollowing() {
  const followersElement = byId("followers");
  const followingElement = byId("following");
  if (!followersElement && !followingElement) return;

  const followers = new Set();
  let followingCount = 0;
  const followingSubId = "get_following";
  const followersSubId = "get_followers";

  connectRelay("wss://relay.damus.io", {
    timeoutMs: 7000,
    onOpen(ws) {
      ws.send(JSON.stringify(["REQ", followingSubId, { kinds: [3], authors: [publicKey], limit: 1 }]));
      ws.send(JSON.stringify(["REQ", followersSubId, { kinds: [3], "#p": [publicKey], limit: 1000 }]));
    },
    onMessage(ws, data) {
      if (data[0] === "EVENT" && data[2]?.kind === 3) {
        const event = data[2];
        const tags = Array.isArray(event.tags) ? event.tags : [];

        if (event.pubkey === publicKey) {
          followingCount = tags.filter(tag => tag[0] === "p").length;
        }

        if (tags.some(tag => tag[0] === "p" && tag[1] === publicKey)) {
          followers.add(event.pubkey);
        }

        if (followersElement) {
          followersElement.textContent = `ผู้ติดตาม: ${followers.size}`;
        }
        if (followingElement) {
          followingElement.textContent = `กำลังติดตาม: ${followingCount}`;
        }
      }

      if (data[0] === "EOSE") {
        closeSubscription(ws, followingSubId);
        closeSubscription(ws, followersSubId);
        ws.close();
      }
    }
  });
}

function displayNoteOrImage(noteContent, createdAt) {
  const notesDiv = byId("notes");
  if (!notesDiv) return;

  const container = document.createElement("div");
  container.className = "bg-white p-4 rounded-lg shadow text-gray-800 space-y-3";

  const imageRegex = /(https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|webp))/i;
  const imageMatch = noteContent.match(imageRegex);
  const safeImageUrl = imageMatch ? safeExternalUrl(imageMatch[0]) : null;
  if (safeImageUrl) {
    const img = document.createElement("img");
    img.src = safeImageUrl;
    img.className = "w-full max-w-lg rounded-lg mx-auto";
    img.loading = "lazy";
    img.alt = "Nostr note image";
    container.appendChild(img);
  }

  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = noteContent.match(youtubeRegex);
  if (youtubeMatch) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    iframe.width = "100%";
    iframe.height = "630";
    iframe.className = "w-full rounded-lg";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    container.appendChild(iframe);
  }

  const cleanContent = noteContent
    .replace(/https?:\/\/[^\s<]+?\.(jpg|jpeg|png|gif|webp)/gi, "")
    .replace(/https?:\/\/(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/gi, "")
    .trim();

  if (cleanContent) {
    const noteElement = document.createElement("div");
    appendMultilineText(noteElement, cleanContent);
    container.appendChild(noteElement);
  }

  const nostrRegex = /nostr:(naddr1[0-9a-z]+|npub1[0-9a-z]+)/gi;
  const matches = Array.from(noteContent.matchAll(nostrRegex));
  if (matches.length > 0) {
    const references = document.createElement("div");
    references.className = "space-y-2";

    matches.forEach(match => {
      const value = match[1];

      if (value.startsWith("naddr1") && isArticleNaddr(value)) {
        const pointer = getNaddrPointer(value);
        if (pointer) {
          references.appendChild(createNoteMetaLabel(pointer));
        }
      }

      if (value.startsWith("npub1")) {
        const mentionRow = document.createElement("div");
        mentionRow.className = "text-sm text-gray-600";
        mentionRow.appendChild(createMentionLink(value));
        references.appendChild(mentionRow);
      }
    });

    if (references.childNodes.length > 0) {
      container.appendChild(references);
    }
  }

  const timeElement = document.createElement("div");
  timeElement.className = "text-xs text-gray-500";
  timeElement.textContent = `โพสต์เมื่อ ${formatThaiDate(createdAt)} น.`;
  container.appendChild(timeElement);

  notesDiv.appendChild(container);
}

function displayLatestNotes(limit = 10) {
  const notesDiv = byId("notes");
  if (!notesDiv) return;

  const notesArray = Array.from(receivedNotes.values())
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, limit);

  notesDiv.replaceChildren();
  notesArray.forEach(note => displayNoteOrImage(note.content, note.created_at));
}

function fetchNotesAndProfile() {
  relayUrls.forEach(relayUrl => {
    const relayKey = relayUrl.replace(/[^a-z0-9]/gi, "_");
    const profileSubId = `profile_${relayKey}`;
    const notesSubId = `notes_${relayKey}`;

    connectRelay(relayUrl, {
      timeoutMs: 9000,
      onOpen(ws) {
        ws.send(JSON.stringify(["REQ", profileSubId, { authors: [publicKey], kinds: [0], limit: 1 }]));
        ws.send(JSON.stringify(["REQ", notesSubId, { authors: [publicKey], kinds: [1], limit: 100 }]));
      },
      onMessage(ws, data) {
        if (data[0] === "EVENT") {
          const ev = data[2];
          if (!ev) return;

          if (ev.kind === 0) {
            try {
              const profile = JSON.parse(ev.content);
              displayProfile(profile, ev.pubkey);
            } catch (error) {
              console.warn("อ่านโปรไฟล์ไม่สำเร็จ:", error);
            }
          }

          if (ev.kind === 1) {
            const tags = Array.isArray(ev.tags) ? ev.tags : [];
            const isOriginalNote = !tags.some(tag => tag[0] === "e");
            if (isOriginalNote && !receivedNotes.has(ev.id)) {
              receivedNotes.set(ev.id, {
                content: typeof ev.content === "string" ? ev.content : "",
                created_at: ev.created_at || 0
              });
            }
          }
        }

        if (data[0] === "EOSE") {
          closeSubscription(ws, profileSubId);
          closeSubscription(ws, notesSubId);
          ws.close();
          displayLatestNotes(10);
        }
      }
    });
  });
}

function renderArticlePreview(naddr, container) {
  const nip19 = ensureNip19();
  if (!nip19) {
    console.error("nip19 not available");
    return;
  }

  try {
    const decoded = nip19.decode(naddr);
    if (decoded.type !== "naddr") return;

    const { pubkey, identifier } = decoded.data;
    const subscriptionId = `article_${identifier}`;

    connectRelay("wss://relay.notoshi.win", {
      timeoutMs: 7000,
      onOpen(ws) {
        ws.send(JSON.stringify(["REQ", subscriptionId, {
          kinds: [30023],
          authors: [pubkey],
          "#d": [identifier],
          limit: 1
        }]));
      },
      onMessage(ws, data) {
        if (data[0] === "EVENT" && data[2]?.kind === 30023) {
          const event = data[2];
          const tagMap = new Map(
            (Array.isArray(event.tags) ? event.tags : [])
              .filter(tag => Array.isArray(tag) && tag.length >= 2)
              .map(tag => [tag[0], tag[1]])
          );

          const card = document.createElement("div");
          card.className = "bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2";

          const titleDiv = document.createElement("div");
          titleDiv.className = "font-semibold text-lg";
          titleDiv.textContent = tagMap.get("title") || "ไม่มีชื่อบทความ";
          card.appendChild(titleDiv);

          const summaryDiv = document.createElement("div");
          summaryDiv.className = "text-sm text-gray-600";
          summaryDiv.textContent = tagMap.get("summary") || "";
          card.appendChild(summaryDiv);

          const imageUrl = safeExternalUrl(tagMap.get("image"));
          if (imageUrl) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.className = "rounded w-full max-w-md mt-2";
            img.loading = "lazy";
            img.alt = titleDiv.textContent;
            card.appendChild(img);
          }

          const linkWrapper = document.createElement("div");
          const link = document.createElement("a");
          link.href = `https://njump.me/${encodeURIComponent(naddr)}`;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "text-blue-600 underline";
          link.textContent = "อ่านบทความฉบับเต็ม";
          linkWrapper.appendChild(link);
          card.appendChild(linkWrapper);

          container.appendChild(card);
        }

        if (data[0] === "EOSE") {
          closeSubscription(ws, subscriptionId);
          ws.close();
        }
      }
    });
  } catch (error) {
    console.error("decode ผิดพลาด:", error);
  }
}

function getNaddrPointer(naddr) {
  const nip19 = ensureNip19();
  if (!nip19) {
    console.warn("nip19 not available");
    return null;
  }

  try {
    const decoded = nip19.decode(naddr);
    if (decoded.type !== "naddr") return null;

    const { pubkey, kind, identifier, relays } = decoded.data;
    return {
      type: decoded.type,
      pubkey,
      kind,
      identifier,
      relays: relays || []
    };
  } catch (error) {
    console.error("decode naddr ผิดพลาด:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!hasNostrWidgets()) return;

  ensureNip19();
  fetchFollowersAndFollowing();
  fetchNotesAndProfile();
});
