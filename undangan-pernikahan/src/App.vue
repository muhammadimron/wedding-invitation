<script setup>
import { onMounted, ref } from "vue";
import dataAwal from "./assets/ucapan.json";

const API_URL = "https://sheetdb.io/api/v1/7ev7dpmgzl9uh";

// --- DATA MEMPELAI & ACARA ---
const mempelai = {
  pria: "Imron",
  wanita: "Dewi",
  lengkapPria: "Muhammad Imron",
  lengkapWanita: "Sri Dewi Lestari",
  ayahPria: "Mokhamad Bahrun Triyono",
  ibuPria: "Sri Kamtinah",
  ayahWanita: "Montague",
  ibuWanita: "Mrs. Montague",
  tanggal: "2026-06-18T09:00:00", // Format: YYYY-MM-DDTHH:mm:ss
  akad: {
    tanggal: "Kamis, 18 Juni 2026", 
    waktu: "Pukul 09.00 - 10.00 WIB",
    tempat: "Kediaman Mempelai Akhwat",
  },
  resepsi: {
    tanggal: "Kamis, 18 Juni 2026", 
    waktu: "Pukul 11.00 - 15.00 WIB",
    tempat: "Kediaman Mempelai Akhwat",
  },
  alamat: {
    namaTempat: "Kediaman Bpk. Montague",
    jalan: "Jl. Cinta Abadi No. 12, RT 05/RW 02",
    kota: "Nanjungjaya, Kec. Kersamanah, Kabupaten Garut, Jawa Barat 44189",
    gmapsLink: "https://maps.app.goo.gl/H21ue3w9mSJ5tbKS6"
  }
};


// --- LOGIKA COUNTDOWN ---
const waktuTersisa = ref({ hari: 0, jam: 0, menit: 0, detik: 0 });

const hitungMundur = () => {
  const target = new Date(mempelai.tanggal).getTime();
  const sekarang = new Date().getTime();
  const selisih = target - sekarang;

  if (selisih > 0) {
    waktuTersisa.value.hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    waktuTersisa.value.jam = Math.floor(
      (selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    waktuTersisa.value.menit = Math.floor(
      (selisih % (1000 * 60 * 60)) / (1000 * 60)
    );
    waktuTersisa.value.detik = Math.floor((selisih % (1000 * 60)) / 1000);
  }
};

const simpanTanggal = () => {
    // 1. Format Tanggal ke format ICS (YYYYMMDDTHHMMSS)
    const startDT = new Date(mempelai.tanggal);
    // Tambahkan 2 jam untuk waktu selesai acara (asumsi)
    const endDT = new Date(startDT.getTime() + 2 * 60 * 60 * 1000); 

    const formatICSDate = (date) => {
        // Format lokal YYYYMMDDTHHMMSS (Tanpa Z/UTC)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hour}${minute}${second}`;
    };

    const dtStart = formatICSDate(startDT);
    const dtEnd = formatICSDate(endDT);
    const dtStamp = formatICSDate(new Date()); // Waktu saat ini

    const title = `Undangan Pernikahan ${mempelai.pria} & ${mempelai.wanita}`;
    const location = "Gedung Serbaguna Indah, Jakarta";
    const description = `Mohon kehadiran Anda dalam acara pernikahan kami. Lokasi: ${location}`;

    // 2. Susun Konten ICS
    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SimpanTanggal//WebUndangan//ID",
        "BEGIN:VEVENT",
        // Gunakan UID unik agar kalender tidak menganggapnya duplikat
        `UID:${dtStamp}-${Math.random().toString(36).substring(2, 9)}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join('\n');

    // 3. Trigger Download File .ics
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Undangan_${mempelai.pria}_${mempelai.wanita}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Fungsi ambil data dari Google Sheets
const ambilDataUcapan = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // SheetDB mengembalikan array objek, kita urutkan dari yang terbaru (opsional)
    // Asumsi data baru ditambahkan di bawah, kita reverse agar muncul di atas
    daftarUcapan.value = data.reverse();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

// --- LOGIKA BUKU TAMU (MENGGUNAKAN LOCALSTORAGE) ---
const daftarUcapan = ref([]);
const inputNama = ref("");
const inputPesan = ref("");
const isLoading = ref(false);

// Load data saat web dibuka
onMounted(() => {
  setInterval(hitungMundur, 1000);
  ambilDataUcapan(); // Ambil data saat pertama kali buka
});

const kirimUcapan = async () => {
  if (!inputNama.value || !inputPesan.value)
    return alert("Mohon isi nama dan pesan");

  isLoading.value = true;

  const dataBaru = {
    nama: inputNama.value,
    tanggal: new Date().toLocaleDateString("id-ID"),
    pesan: inputPesan.value,
  };

  try {
    // Kirim data ke SheetDB (POST)
    await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataBaru }),
    });

    // Reset Form
    inputNama.value = "";
    inputPesan.value = "";

    // Ambil ulang data agar tampilan terupdate
    await ambilDataUcapan();

    alert("Terima kasih, ucapan berhasil dikirim!");
  } catch (error) {
    console.error("Error kirim:", error);
    alert("Gagal mengirim pesan. Coba lagi nanti.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <section class="hero">
      <p class="sub-title">The Wedding of</p>
      <h1 class="title">{{ mempelai.pria }} & {{ mempelai.wanita }}</h1>
      <img 
        src="/avatar_hero.png" 
        alt="Mempelai Pria dan Wanita Berpegangan Tangan" 
        class="full-frame-avatar"
      >
    </section>

    <section class="quran-quote">
      <p class="taawwudh-text">
        أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
      </p>
      <p class="arab-text">
        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
      </p>
      <p class="terjemahan">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
      </p>
      <p class="sumber">
        — Q.S. Ar-Rum Ayat 21
      </p>
    </section>

    <section class="countdown-section">
      <h2>Menuju Halal</h2>
      <div class="timer-box">
        <div class="time-item">
          <span>{{ waktuTersisa.hari }}</span
          ><small>Hari</small>
        </div>
        <div class="time-item">
          <span>{{ waktuTersisa.jam }}</span
          ><small>Jam</small>
        </div>
        <div class="time-item">
          <span>{{ waktuTersisa.menit }}</span
          ><small>Menit</small>
        </div>
        <div class="time-item">
          <span>{{ waktuTersisa.detik }}</span
          ><small>Detik</small>
        </div>
      </div>
      <h3 class="date">18 Juni 2026</h3>
      <button @click="simpanTanggal" class="btn-save-date">
        Simpan Tanggal ke Kalender
      </button>
    </section>

    <section class="perkenalan">
      <h2>Mempelai</h2>
      <div class="couple-intro-container">
          
          <div class="mempelai-card">
              <img src="/avatar_mempelai_ikhwan.png" alt="Avatar Pria" class="single-avatar">
              <h3 class="name-title">{{ mempelai.lengkapPria }}</h3>
              <p class="parent-text">Putra dari:</p>
              <p class="parent-names">Bapak {{ mempelai.ayahPria }} & Ibu {{ mempelai.ibuPria }}</p>
          </div>

          <div class="symbol-separator">
              <span class="heart-symbol">❤️</span>
          </div>

          <div class="mempelai-card">
              <img src="/avatar_mempelai_akhwat.png" alt="Avatar Wanita" class="single-avatar">
              <h3 class="name-title">{{ mempelai.lengkapWanita }}</h3>
              <p class="parent-text">Putri dari:</p>
              <p class="parent-names">Bapak {{ mempelai.ayahWanita }} & Ibu {{ mempelai.ibuWanita }}</p>
          </div>
      </div>
    </section>

    <section class="event-details">
        <h2>Waktu dan Tempat</h2>

        <div class="event-card-container">
            <div class="event-card akad-card">
                <span class="icon-event">💍</span>
                <h3>Akad Nikah</h3>
                <p class="event-date">{{ mempelai.akad.tanggal }}</p>
                <p class="event-time">{{ mempelai.akad.waktu }}</p>
                <p class="event-location">{{ mempelai.akad.tempat }}</p>
            </div>

            <div class="event-card resepsi-card">
                <span class="icon-event">🎉</span>
                <h3>Resepsi Pernikahan</h3>
                <p class="event-date">{{ mempelai.resepsi.tanggal }}</p>
                <p class="event-time">{{ mempelai.resepsi.waktu }}</p>
                <p class="event-location">{{ mempelai.resepsi.tempat }}</p>
            </div>
        </div>
        
        <div class="full-address-block">
            <h2>Lokasi Acara</h2>
            <p class="address-name">{{ mempelai.alamat.namaTempat }}</p>
            <p class="address-detail">{{ mempelai.alamat.jalan }}</p>
            <p class="address-detail">{{ mempelai.alamat.kota }}</p>
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.9497663025813!2d108.02528712898494!3d-7.0564159075831006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68cb02a96090e5%3A0x20b36ab157cc9cf!2sRindu%20Tanah%20Suci!5e0!3m2!1sid!2sid!4v1764985338564!5m2!1sid!2sid"
                width="100%"
                height="300"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
            <a :href="mempelai.alamat.gmapsLink" target="_blank" class="btn-maps">
                Lihat di Google Maps
            </a>
        </div>
    </section>

    <section class="guestbook-section">
      <h2>Kirim Ucapan & Doa</h2>

      <div class="form-box">
        <input v-model="inputNama" type="text" placeholder="Nama Anda" />
        <textarea
          v-model="inputPesan"
          placeholder="Tulis ucapan dan doa..."
        ></textarea>
        <button @click="kirimUcapan" class="btn-primary" :disabled="isLoading">
          {{ isLoading ? "Mengirim..." : "Kirim Ucapan" }}
        </button>
      </div>

      <div class="messages-list">
        <div
          v-for="(item, index) in daftarUcapan"
          :key="index"
          class="message-card"
        >
          <h4>{{ item.nama }}</h4>
          <small>{{ item.tanggal }}</small>
          <p>{{ item.pesan }}</p>
        </div>
      </div>
    </section>

    <footer>
      <p>Dibuat dengan ❤️ menggunakan Vue.js</p>
      <p>Copyright by Muhammad Imron 2026</p>
    </footer>
  </div>
</template>

<style scoped>
/* --- VARIABLE CSS (Ganti warna di sini) --- */
:root {
  --primary-color: #d4a373; /* Warna Emas/Krem */
  --bg-color: #faedcd; /* Warna Background Cream lembut */
  --text-color: #4a4e69; /* Warna Teks Gelap */
  --white: #ffffff;
}

/* --- GLOBAL LAYOUT --- */
.container {
  /* Hapus fixed max-width di sini untuk tampilan mobile default (100% lebar) */
  margin: 0; 
  background-color: #fefcf5;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  color: #555;
  /* Hapus box-shadow agar lebih bersih di HP */
}

section {
  padding: 40px 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #d4a373;
  margin-bottom: 20px;
}

/* --- HERO --- */
.hero {
  /* Ganti URL gambar */
  background-color: var(--bg-color);
  padding-top: 40px;
  padding-bottom: 40px;
}

.sub-title {
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.4rem;
}
.title {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin: 10px 0;
  line-height: 1.2;
}

.full-frame-avatar {
  width: 90%; /* Mengambil 90% lebar layar HP */
  max-height: 50vh; /* Maksimal 50% dari tinggi viewport agar content lain tetap terlihat */
  height: auto;
  object-fit: contain; /* Memastikan gambar tidak terpotong saat diskalakan */
  margin: 20px auto;
  display: block;
  border-radius: 8px; /* Sudut sedikit membulat */
}


/* --- STYLE UNTUK TA'AWWUDH --- */
.quran-quote {
  padding: 30px 20px;
  background-color: var(--white);
  font-family: 'Times New Roman', serif;
}

.taawwudh-text {
  font-family: 'Scheherazade New', serif; 
  font-size: 1rem; /* Lebih kecil dari ayat utama */
  margin-bottom: 10px;
  color: #555; /* Warna agak lebih lembut */
  direction: rtl; 
  text-align: center;
}

.arab-text {
  font-family: 'Scheherazade New', serif;
  font-size: 1rem;
  line-height: 2;
  margin-bottom: 20px;
  color: #333;
  direction: rtl; 
  text-align: center;
}

.terjemahan {
  font-size: 1rem;
  font-style: italic;
  color: #777;
  max-width: 450px;
  margin: 0 auto 15px auto;
  line-height: 1.6;
}

.sumber {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 5px;
}

/* --- COUNTDOWN --- */
.date {
  font-weight: bold;
  margin-top: 30px;
}
.timer-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.time-item {
  background: #d4a373;
  color: white;
  padding: 10px 5px;
  border-radius: 8px;
  min-width: 55px;
}
.time-item span {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
}
.time-item small {
  font-size: 0.6rem;
  text-transform: uppercase;
}

.btn-save-date {
  background-color: #bc6c25; /* Warna cokelat/emas gelap */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px; /* Dibuat agak bulat */
  cursor: pointer;
  margin-top: 10px; /* Jarak dari kotak countdown */
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: background-color 0.3s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn-save-date:hover {
  background-color: #a45a1e;
}

/* === STYLE BARU: PERKENALAN MEMPELAI === */
.perkenalan {
  padding: 50px 20px;
  background-color: var(--bg-color); /* Warna latar berbeda */
}

.couple-intro-container {
  display: flex;
  flex-direction: column; /* Default: tumpuk vertikal di HP */
  align-items: center;
  gap: 30px; /* Jarak antara card di HP */
}

.mempelai-card {
  text-align: center;
  width: 100%;
}

.single-avatar {
  width: 120px; 
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.name-title {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0 0 5px 0;
}

.parent-text {
  font-size: 0.9rem;
  color: #777;
  margin: 0;
}

.parent-names {
  font-weight: bold;
  color: var(--text-color);
  margin-top: 5px;
}

/* Simbol Romantis (Heart) */
.symbol-separator {
  /* Di HP, hanya berfungsi sebagai penampung Jantung */
  width: 100%;
  margin: 10px 0 30px 0;
}

.heart-symbol {
  font-size: 2.5rem;
  color: #d4a373; /* Warna Emas */
  display: block;
  text-align: center;
}

/* --- MAP --- */
.map-container {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4a4e69;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* --- GUEST BOOK --- */
.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}
input,
textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
}
.btn-primary {
  background-color: #bc6c25;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.messages-list {
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px; /* Untuk estetika scrollbar */
}
.message-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.message-card h4 {
  margin: 0;
  color: #bc6c25;
}
.message-card small {
  color: #999;
  font-size: 0.8rem;
}
.message-card p {
  margin-top: 5px;
  font-style: italic;
}

footer {
  padding: 20px;
  text-align: center;
  font-size: 0.8rem;
  background: #eee;
}

/* === STYLE UNTUK AVATAR === */
.avatar-container {
  display: flex;
  justify-content: center; /* Membuat mereka di tengah */
  align-items: center;
  gap: 15px; 
  margin: 20px 0; 
}

.avatar {
  width: 100px;  /* Ukuran di HP */
  height: 100px;
  border-radius: 50%; 
  object-fit: cover; 
  border: 4px solid var(--primary-color); 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
}

.and-symbol {
  font-family: 'Great Vibes', cursive;
  font-size: 3rem; 
  color: var(--primary-color);
}

/* === STYLE BARU: EVENT DETAILS SECTION (Waktu dan Tempat) === */
.event-details {
  padding: 50px 20px;
  background-color: var(--white); 
}

/* Container untuk 2 kartu: Akad dan Resepsi */
.event-card-container {
  display: flex;
  flex-direction: column; /* Tumpuk vertikal di HP */
  gap: 20px;
  margin-bottom: 40px;
}

.event-card {
  padding: 25px 15px;
  border-radius: 12px;
  background-color: #fef8f0; /* Warna krem muda/putih gading untuk card */
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
}

.icon-event {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}

.event-card h3 {
  font-family: 'Great Vibes', cursive;
  font-size: 2.2rem;
  color: #bc6c25;
  margin: 0 0 10px 0;
}

.event-date {
  font-weight: bold;
  color: var(--text-color);
  margin: 5px 0 0 0;
}

.event-time {
  font-style: italic;
  color: #777;
  margin: 15px 0 15px 0;
  font-size: 0.6rem;
}

.event-location {
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

/* --- Block Alamat Lengkap --- */
.full-address-block {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px dashed #d4a373; /* Garis aksen putus-putus */
  border-radius: 8px;
}

.full-address-block h4 {
  font-size: 1.1rem;
  color: #bc6c25;
  margin-top: 0;
}

.address-detail, .address-name {
  font-size: 0.9rem;
  color: #555;
  margin: 3px 0;
}

.btn-maps {
  display: inline-block;
  background-color: #d4a373;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
  margin-top: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-maps:hover {
  background-color: #bc6c25;
}

/* --- MEDIA QUERY: UNTUK LAYAR BESAR (Tablet/Laptop) --- */
/* Terapkan batas lebar maksimum hanya pada layar > 600px */
@media (min-width: 600px) {
  .container {
    max-width: 550px; /* Batas lebar untuk tampilan di laptop */
    margin: 0 auto; /* Posisi di tengah layar */
    box-shadow: 0 0 20px rgba(0,0,0,0.1); /* Kembalikan shadow di laptop */
  }

  .avatar {
    width: 120px; /* Ukuran di Laptop/Tablet */
    height: 120px;
    border-width: 5px; 
  }

  .full-frame-avatar {
    max-width: 95%; 
    max-height: 500px; /* Batasi tinggi maksimum di laptop */
  }

  .and-symbol {
    font-size: 4rem;
  }

  .taawwudh-text {
    font-size: 1rem; 
  }

  .arab-text {
    font-size: 1.2rem;
  }

  .terjemahan {
    font-size: 1.1rem;
  }

  .couple-intro-container {
    justify-content: space-around;
    gap: 0;
    max-width: 400px;
    margin: 0 auto;
  }

  .single-avatar {
    width: 200px;
    height: 200px;
  }

  .mempelai-card {
    width: 100%; /* Memastikan kartu mengambil lebar penuh container 400px */
  }

  .event-card-container {
    flex-direction: row; 
    max-width: 550px;
    margin: 0 auto 40px auto;
  }

  /* Simbol Romantis di Laptop */
  .symbol-separator {
    display: flex; 
    align-items: center;
    justify-content: center;
    width: 20%;
    margin: 20px 0;
  }
  
  .heart-symbol {
    font-size: 3.5rem; /* Perbesar sedikit */
  }

  /* Perbesar ukuran font di layar laptop agar lebih nyaman */
  .title {
    font-size: 4.5rem;
  }
  .sub-title {
    font-size: 0.8rem;
  }
  .time-item {
    min-width: 70px;
  }
  .time-item span {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 3rem;
  }
}
</style>
