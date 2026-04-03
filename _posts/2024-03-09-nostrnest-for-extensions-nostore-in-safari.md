---
layout: post
title: "การใช้งาน Nostrnest โดยใช้ Extensions Nostore"
date: 2024-03-09
categories: [Article]
image: /assets/image/blog/20240309-1/0.jpg
summary: "แนะนำการใช้งาน nostrnest โดยใช้ extensions nostore บน safari สำหรับ IPhone"
---

<img src="{{ '/assets/image/blog/20240309-1/0.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">

<div class="px-2 py-2 border bg-red-200 text-whlie rounded"><b>หมายเหตุ: บทความนี้เก่าแล้ว (มีนาคม 2024) แต่ยังสามารถเป็นแนวทางการใช้งานส่วนเสริม Nostore Nostr ได้**</b></div>
<br>
สำหรับท่านไหนที่ต้องการใช้งาน nostrnest สำหรับบนมือถือ iphone โดย Extensions Nostore บน safari
<br>
สำหรับวิธีดังกล่าวเป็นวิธีที่ใครที่ต้องการอยากจะพูดคุยและฟังในรังนกของทุ่งม่วงแห่งนี้ โดยมีวิธีขั้นตอนดังต่อไปนี้
<br><br>
&ensp;&ensp;&ensp;&ensp;1.เข้า APP STORE เพื่อดาวโหลด NOSTORE
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/1.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;2.หลังจากดาวโหลดเรียบร้อยแล้วให้เข้า Safari ให้ดำเนินการเข้าเว็บไซต์ไหนก็ได้เพื่อทำการกดเปิด Extensions Nostore อย่างยกตัวอย่างเข้า google.com จากนั้นกดปุ่มที่ aA เพื่อดูเมนูในบราวเชอร์ เลือก Manage Extensions เพื่อดู Extensions ของ Safari
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/2.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;3.กดปุ่มเปิด Nostore จากนั้นกด Done จากนั้นจะมีป๊อบอัพของ Safari ให้ทำการ Access Extensions โดยสามารถกำหนดเลือกเป็น Allow for one Day หรือ Always Allow… ก็ได้ เพื่อสามารถอ่านค่า npub ของผู้ใช้งานจากนั้นไปที่หน้าบราวเชอร์กดที่ปุ่ม aA เลือกเข้า  Extensions Nostore จากนั้นจะมีโปรไฟล์เริ่มต้นมาซึ่งการเข้าครั้งแรกนั้น จะต้องให้ดำเนินการเพิ่ม relays "You do not have any relays setup for this profile. Would you like to add some recommended relays now?" ให้กดปุ่ม Add Relays
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/3.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;4.จากนั้นกดปุ่ม Settings สำหรับการเพิ่ม Relays เพิ่มเติม ให้กดที่ settings หลังจากเข้ามาแล้วจะพบ Profile / Private Key และ Public Key สำหรับการเข้าใช้งาน Client ตัวอื่นได้ จากนั้นให้เลื่อนลงมาเพื่อเพิ่ม Relays เพิ่มเติม จะมีช่องให้กด Relays อย่างเช่นผมจะเพิ่ม ( wss://relays.siamstr.com จากนั้นกด add  และ wss://relays.notoshi.win จากนั้นกด add ) จากนั้น กด Close
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/4.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;5.จากนั้นให้เข้าเว็บไซต์ nostrnest.com กดปุ่ม login ให้ดำเนินการ Sign in with extension
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/5.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;6.จากนั้นหน้าเว็บไซต์จะขอ permission: public key ให้เข้าสู่ระบบโดย account ใน nostore ให้กด Allow (แต่สามารถกด Remember selection เพื่อสามารถเปิดสิทธิ์ได้ตลอดเวลาได้) ระบบจะเด้งมายังหน้าแรกของ nostrnest ให้ดำเนินการเลือกห้องที่ต้องการเข้าใช้งานได้ทันที หลังจากกดปุ่มเข้าห้องแล้ว ทางเว็บไซต์จะขอ permission สำหรับ sign event ของห้องซึ่งจะเด้งไปยังหน้า  extensions nostore สำหรับการเข้าห้องดังกล่าวจำนวน 2 ครั้งให้ทำการกด allow (แต่สามารถกด Remember selection เพื่อสามารถเปิดสิทธิ์ได้ตลอดเวลาได้)
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/6.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;7.หลังจากกด Allow ทั้งสองครั้งเรียบร้อยแล้ว nostrnests นั้นจะให้ขอสิทธิ์เราสำหรับการเปิด Microphone ของเราเพื่อที่จะสามารถพูดคุยได้ ให้ทำการกด Allow รอ Host ดำเนินการเชิญเราขึ้นเป็น Moderator หรือ speaker จากนั้นสามารถใช้งานได้ตามปกติ จบกระบวนการ (ขอบคุณครับ) 
<br><br>
<img src="{{ '/assets/image/blog/20240309-1/7.jpg' | relative_url }}"
     alt="คำอธิบายภาพ"
     class="mx-auto rounded-xl mb-6"
     loading="lazy">
&ensp;&ensp;&ensp;&ensp;บทความนี้เป็นบทความการใช้งาน Extensions Nostore สำหรับการจัดการ npub และ nsec สำหรับผู้ใช้งานบน iphone นะครับ โดยไม่จำเป็นต้องโหลดแอพพิเคชั่น Nostr APP มาโหลดใช้งานโดยสามารถใช้งาน client บนบราวเชอร์ safari ได้เลยครับ สำหรับวีดีโอสามารถดูได้ด้านล่างครับ

<hr class="mx-5 my-5">
<b>Onlynips #12 - Nostr extensions [Nip-07]</b>
<div class="h-[380px] w-full">
  <iframe
    src="https://www.youtube.com/embed/ePD8aJ4v720"
    title="YouTube video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="w-full h-full">
  </iframe>
</div>