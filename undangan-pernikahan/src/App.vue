<script setup>
import { onMounted, ref } from "vue";
// IMPORT KOMPONEN BARU
import LoaderOverlay from "./components/LoaderOverlay.vue";
import ToastNotification from "./components/ToastNotification.vue";
import BottomNavBar from "./components/BottomNavBar.vue";
import ClosingSection from "./components/ClosingSection.vue";
import NasheedPlayer from "./components/NasheedPlayer.vue";
import GiftSection from "./components/GiftSection.vue";
import RSVPSection from "./components/RSVPSection.vue";
import QuranQuote from "./components/QuranQoute.vue";
import PerkenalanMempelai from "./components/PerkenalanMempelai.vue";
import EventDetails from "./components/EventDetails.vue";
import CountdownSection from "./components/CountdownSection.vue";
import GuestbookSection from "./components/GuestBookSection.vue";
import CoverSection from "./components/CoverSection.vue";
import { triggerToast } from "./composables/useToast.js";

const API_URL = "https://sheetdb.io/api/v1/7ev7dpmgzl9uh";
const RSVP_LINK = "https://forms.gle/ContohLinkRSVPAnda";

// --- DATA MEMPELAI & ACARA (GLOBAL DATA) ---
const mempelai = {
  pria: "Imron",
  wanita: "Dewi",
  lengkapPria: "Muhammad Imron",
  lengkapWanita: "Dewi Sri Lestari",
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
    namaTempat: "Kediaman Mempelai Akhwat",
    jalan: "Jl. Cinta Abadi No. 12, RT 05/RW 02",
    kota: "Nanjungjaya, Kec. Kersamanah, Kabupaten Garut, Jawa Barat 44189",
    gmapsLink: "https://maps.app.goo.gl/H21ue3w9mSJ5tbKS6",
    gmapsLinkEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.9497663025813!2d108.02528712898494!3d-7.0564159075831006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68cb02a96090e5%3A0x20b36ab157cc9cf!2sRindu%20Tanah%20Suci!5e0!3m2!1sid!2sid!4v1764985338564!5m2!1sid!2sid",
  },
  hadiah: {
    bank: "BCA Syariah", // Ganti dengan bank Anda
    rekening: "0092013176", // Ganti dengan nomor rekening Anda
    atasNama: "Muhammad Imron",
    opsiLain:
      "Jl. Masjid Raya No. 5, Nanjungjaya, Kec. Kersamanah, Kabupaten Garut, Jawa Barat 44189 (Kotak Kado)", // Alamat pengiriman fisik
  },
};

// --- LOGIKA BUKU TAMU ---
const daftarUcapan = ref([]);
const isLoading = ref(false);
const isContentLoading = ref(true);

const showCover = ref(true); // Default: Tampilkan cover
const isInvitationOpened = ref(false); // Untuk menandai undangan sudah dibuka

const handleOpenInvitation = () => {
  showCover.value = false;
  isInvitationOpened.value = true;
  isContentLoading.value = false;
  // Jika NasheedPlayer otomatis di-play oleh interaksi ini,
  // maka ia akan mulai berbunyi.
};

// Fungsi ambil data dari Google Sheets
const ambilDataUcapan = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    daftarUcapan.value = data.reverse();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

// Fungsi kirim ucapan dipanggil dari GuestbookSection
const kirimUcapan = async ({ nama, pesan }) => {
  // Validasi sudah diurus di GuestbookSection.vue
  if (!nama || !pesan) return;

  isLoading.value = true;

  const dataBaru = {
    nama: nama,
    tanggal:
      new Date().toLocaleDateString("id-ID") +
      " " +
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    pesan: pesan,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataBaru }),
    });

    // 1. Ambil data ucapan terbaru segera setelah sukses POST
    await ambilDataUcapan();

    // 2. Tampilkan Toast sukses (menggantikan alert)
    triggerToast("Terima kasih, ucapan berhasil dikirim!");
  } catch (error) {
    console.error("Error kirim:", error);
    // Tampilkan Toast error (menggantikan alert)
    triggerToast("Gagal mengirim pesan. Coba lagi nanti.");
  } finally {
    isLoading.value = false;
  }
};

// Load data saat web dibuka
onMounted(() => {
  ambilDataUcapan(); // PENTING: Tunggu hingga semua aset (termasuk gambar) selesai dimuat

  window.addEventListener("load", () => {
    // Beri sedikit delay (500ms) agar transisi hilangnya loader terasa halus
    setTimeout(() => {
      isContentLoading.value = false;
    }, 500);
  }); // Jika window.onload sudah terpicu sebelum onMounted (sangat cepat), // kita tetap perlu memastikan loader hilang.

  if (document.readyState === "complete") {
    setTimeout(() => {
      isContentLoading.value = false;
    }, 100);
  }
});
</script>

<template>
  <LoaderOverlay v-if="isContentLoading && showCover" />

  <CoverSection
    v-if="!isContentLoading && showCover"
    :mempelaiPria="mempelai.pria"
    :mempelaiWanita="mempelai.wanita"
    :tanggalAcara="mempelai.akad.tanggal"
    @open="handleOpenInvitation"
  />
  <template v-if="isInvitationOpened">
    <NasheedPlayer />

    <div
      id="app-container"
      class="container"
      :class="{ 'content-hidden': isContentLoading }"
      style="transition: visibility 0s, opacity 0.5s linear"
    >
      <section class="hero">
        <p class="sub-title">The Wedding of</p>
        <h1 class="title">{{ mempelai.pria }} & {{ mempelai.wanita }}</h1>
        <img
          src="/avatar_hero.png"
          alt="Mempelai Pria dan Wanita Berpegangan Tangan"
          class="full-frame-avatar"
        />
      </section>

      <QuranQuote />
      <CountdownSection :mempelai="mempelai" />
      <PerkenalanMempelai :mempelai="mempelai" />
      <EventDetails :mempelai="mempelai" />
      <GiftSection :mempelai="mempelai" />
      <RSVPSection :rsvp-link="RSVP_LINK" />
      <GuestbookSection
        :daftar-ucapan="daftarUcapan"
        :is-loading="isLoading"
        @kirim-ucapan="kirimUcapan"
      />
      <ClosingSection />

      <ToastNotification />
      <BottomNavBar />
    </div>
  </template>
</template>

<style scoped>
/* --- VARIABLE CSS (DIPERTAHANKAN DI SINI UNTUK GLOBAL) --- */
:root {
  --primary-color: #d4a373; /* Warna Emas/Krem */
  --bg-color: #faedcd; /* Warna Background Cream lembut */
  --text-color: #4a4e69; /* Warna Teks Gelap */
  --white: #ffffff;
}

/* --- GLOBAL LAYOUT (DIPERTAHANKAN) --- */
.container {
  margin: 0;
  padding-bottom: 80px;
  background-color: #fefcf5;
  min-height: 100vh;
  font-family: "Lato", sans-serif;
  color: #555;
  scroll-behavior: smooth;
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

/* --- HERO (DIPERTAHANKAN) --- */
.content-hidden {
  /* Ini memastikan layout dimensi tetap ada, hanya isinya yang tidak terlihat */
  visibility: hidden;
  /* Tambahkan opacity: 0 agar ada efek fade jika Anda mengatur transition di template */
  opacity: 0;
}

.hero {
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
  width: 90%;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
  margin: 20px auto;
  display: block;
  border-radius: 8px;
}

/* --- FOOTER (DIPERTAHANKAN) --- */
footer {
  padding: 20px;
  text-align: center;
  font-size: 0.8rem;
  background: #eee;
}

/* --- MEDIA QUERY (Revisi untuk GLOBAL) --- */
@media (min-width: 600px) {
  .container {
    max-width: 550px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .full-frame-avatar {
    max-width: 95%;
    max-height: 500px;
  }

  /* Perbesar ukuran font di layar laptop agar lebih nyaman */
  .title {
    font-size: 4.5rem;
  }
  .sub-title {
    font-size: 0.8rem;
  }
  h2 {
    font-size: 3rem;
  }
}
</style>
