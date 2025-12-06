<script setup>
import { onMounted, ref } from "vue";
import dataAwal from "./assets/ucapan.json";

const API_URL = "https://sheetdb.io/api/v1/7ev7dpmgzl9uh";

// --- DATA MEMPELAI & ACARA ---
const mempelai = {
  pria: "Imron",
  wanita: "Dewi",
  tanggal: "2026-06-18T09:00:00", // Format: YYYY-MM-DDTHH:mm:ss
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
      <p class="date">18 Juni 2026</p>
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
    </section>

    <section class="location-section">
      <h2>Lokasi Acara</h2>
      <p>Gedung Serbaguna Indah, Jakarta</p>
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
      <a
        href="https://maps.app.goo.gl/H21ue3w9mSJ5tbKS6"
        target="_blank"
        class="btn"
        >Buka di Google Maps</a
      >
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
  max-width: 480px; /* Ukuran Mobile First */
  margin: 0 auto;
  background-color: #fefcf5;
  min-height: 100vh;
  font-family: "Lato", sans-serif;
  color: #555;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("https://source.unsplash.com/random/800x600/?wedding");
  background-size: cover;
  padding-top: 80px;
  padding-bottom: 80px;
}

.sub-title {
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.title {
  font-family: "Great Vibes", cursive;
  font-size: 4rem;
  color: #bc6c25;
  margin: 10px 0;
  line-height: 1.2;
}
.date {
  font-weight: bold;
  margin-top: 10px;
}

/* --- COUNTDOWN --- */
.timer-box {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.time-item {
  background: #d4a373;
  color: white;
  padding: 10px;
  border-radius: 8px;
  min-width: 60px;
}
.time-item span {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
}
.time-item small {
  font-size: 0.7rem;
  text-transform: uppercase;
}

/* --- MAP --- */
.map-container {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
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
</style>
