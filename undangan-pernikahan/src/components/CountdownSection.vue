<script setup>
import { ref, onMounted } from "vue";

// Definisikan prop untuk menerima data dari App.vue
const props = defineProps({
  mempelai: Object,
});

// --- LOGIKA COUNTDOWN ---
const waktuTersisa = ref({ hari: 0, jam: 0, menit: 0, detik: 0 });

const hitungMundur = () => {
  const target = new Date(props.mempelai.tanggal).getTime();
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
  const startDT = new Date(props.mempelai.tanggal);
  const endDT = new Date(startDT.getTime() + 2 * 60 * 60 * 1000);

  const formatICSDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}T${hour}${minute}${second}`;
  };

  const dtStart = formatICSDate(startDT);
  const dtEnd = formatICSDate(endDT);
  const dtStamp = formatICSDate(new Date());

  const title = `Undangan Pernikahan ${props.mempelai.pria} & ${props.mempelai.wanita}`;
  const location = `${props.mempelai.akad.tempat}, ${props.mempelai.alamat.kota}`;
  const description = `Akad: ${props.mempelai.akad.waktu}. Resepsi: ${props.mempelai.resepsi.waktu}. Lokasi: ${location}`;

  // 2. Susun Konten ICS
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SimpanTanggal//WebUndangan//ID",
    "BEGIN:VEVENT",
    `UID:${dtStamp}-${Math.random().toString(36).substring(2, 9)}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  // 3. Trigger Download File .ics
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Undangan_${props.mempelai.pria}_${props.mempelai.wanita}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

onMounted(() => {
  setInterval(hitungMundur, 1000);
});
</script>

<template>
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
</template>

<style scoped>
/* Salin semua style untuk .countdown-section, .timer-box, .btn-save-date, dll. */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

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
  background-color: #bc6c25;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: background-color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-save-date:hover {
  background-color: #a45a1e;
}

@media (min-width: 600px) {
  .time-item {
    min-width: 70px;
  }
  .time-item span {
    font-size: 1.8rem;
  }
}
</style>
