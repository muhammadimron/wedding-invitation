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
      <RSVPSection
        @submit-rsvp="kirimRSVP"
        :statistik="statistikRSVP"
        :isLoading="isLoading"
      />
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

<script setup>
import { onMounted, ref } from "vue";
import { createClient } from "@supabase/supabase-js";
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

const SUPABASE_URL = "https://ymisxzlsmpbodvfiqzws.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaXN4emxzbXBib2R2ZmlxendzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTA0MTgsImV4cCI6MjA4MDY2NjQxOH0.SYOOmA3FMZtcgzy6XsgNs_TvQinW4OhXJeQkvFL-QeY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

const statistikRSVP = ref({ total: 0, hadir: 0, tidakHadir: 0 });

const handleOpenInvitation = () => {
  showCover.value = false;
  isInvitationOpened.value = true;
  isContentLoading.value = false;
  // Jika NasheedPlayer otomatis di-play oleh interaksi ini,
  // maka ia akan mulai berbunyi.
};

// Fungsi kirim RSVP
const kirimRSVP = async (dataRSVP) => {
  isLoading.value = true;
  try {
    const { error } = await supabase.from("rsvp").insert([dataRSVP]);

    if (error) throw error;
    await ambilStatistikRSVP();
    triggerToast("Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.");
  } catch (error) {
    console.error("Gagal RSVP:", error.message);
    triggerToast("Gagal mengirim konfirmasi. Coba lagi nanti.");
  } finally {
    isLoading.value = false;
  }
};

const ambilStatistikRSVP = async () => {
  isLoading.value = true; // Mulai loading
  const { data, error } = await supabase.from("rsvp").select("kehadiran");

  if (!error && data) {
    statistikRSVP.value.total = data.length;
    statistikRSVP.value.hadir = data.filter(
      (d) => d.kehadiran === "Hadir"
    ).length;
    statistikRSVP.value.tidakHadir = data.filter(
      (d) => d.kehadiran === "Tidak Hadir"
    ).length;
  }
  isLoading.value = false; // Selesai loading
};

// Fungsi ambil data dari Google Sheets
const ambilDataUcapan = async () => {
  try {
    // Mengambil data dari tabel 'ucapan', urutkan berdasarkan yang terbaru (tanggal input)
    const { data, error } = await supabase
      .from("ucapan")
      .select("*")
      .order("id", { ascending: false }); // Gunakan ID atau created_at untuk urutan terbaru

    if (error) throw error;
    daftarUcapan.value = data;
  } catch (error) {
    console.error("Gagal mengambil data dari Supabase:", error.message);
  }
};

// Fungsi kirim ucapan dipanggil dari GuestbookSection
const kirimUcapan = async ({ nama, pesan }) => {
  if (!nama || !pesan) return;
  isLoading.value = true;

  const dataBaru = {
    nama: nama,
    pesan: pesan,
    tanggal:
      new Date().toLocaleDateString("id-ID") +
      " " +
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  };

  try {
    const { error } = await supabase.from("ucapan").insert([dataBaru]);

    if (error) throw error;

    // Refresh data setelah sukses
    await ambilDataUcapan();
    triggerToast("Terima kasih, ucapan berhasil dikirim!");
  } catch (error) {
    console.error("Gagal kirim pesan:", error.message);
    triggerToast("Gagal mengirim pesan.");
  } finally {
    isLoading.value = false;
  }
};

// Load data saat web dibuka
onMounted(() => {
  ambilDataUcapan(); // PENTING: Tunggu hingga semua aset (termasuk gambar) selesai dimuat
  ambilStatistikRSVP();

  // AKTIFKAN REAL-TIME SUBSCRIPTION
  supabase
    .channel("public:ucapan") // Nama channel bebas
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "ucapan",
      },
      (payload) => {
        console.log("Ada pesan baru masuk!", payload.new);

        // Tambahkan data baru ke daftar ucapan (di posisi paling atas)
        // Gunakan spread operator agar Vue mendeteksi perubahan state
        daftarUcapan.value = [payload.new, ...daftarUcapan.value];
      }
    )
    .subscribe();

  supabase
    .channel("public:rsvp_stats")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "rsvp" },
      () => {
        // Setiap ada baris baru di tabel rsvp, hitung ulang statistik
        ambilStatistikRSVP();
      }
    )
    .subscribe();

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
  opacity: 0;
  animation: fadeInAvatar 1.5s ease forwards;
  animation-delay: 0.5s; /* Muncul sedikit setelah kontainer utama */
}

@keyframes fadeInAvatar {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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
