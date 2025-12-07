<template>
  <section v-aos id="rsvp-section" class="rsvp-section">
    <h2>Konfirmasi</h2>

    <div class="form-box">
      <input
        v-model="form.nama"
        type="text"
        placeholder="Nama Lengkap"
        :class="{ 'input-error': namaError }"
        @input="namaError = ''"
      />
      <p v-if="namaError" class="error-message">{{ namaError }}</p>

      <select
        v-model="form.kehadiran"
        :class="{ 'input-error': kehadiranError }"
        @change="kehadiranError = ''"
      >
        <option value="" disabled selected>Status Kehadiran</option>
        <option value="Hadir">Insya Allah, Hadir</option>
        <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
      </select>
      <p v-if="kehadiranError" class="error-message">{{ kehadiranError }}</p>

      <textarea
        v-model="form.pesan_tambahan"
        placeholder="Catatan (Opsional)..."
      ></textarea>

      <button @click="handleSubmit" class="btn-primary" :disabled="isLoading">
        {{ isLoading ? "Mengirim..." : "Konfirmasi Kehadiran" }}
      </button>

      <div class="stats-container">
        <div class="stat-item">
          <div v-if="isLoading" class="mini-loader"></div>
          <span v-else class="stat-count">{{ animatedStats.total }}</span>
          <span class="stat-label">Konfirmasi</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div v-if="isLoading" class="mini-loader"></div>
          <span v-else class="stat-count">{{ animatedStats.hadir }}</span>
          <span class="stat-label">Hadir</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div v-if="isLoading" class="mini-loader"></div>
          <span v-else class="stat-count">{{ animatedStats.absen }}</span>
          <span class="stat-label">Absen</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, reactive } from "vue";

const emit = defineEmits(["submit-rsvp"]);
const props = defineProps({
  statistik: Object,
  isLoading: Boolean,
});

const form = ref({
  nama: "",
  kehadiran: "",
  pesan_tambahan: "",
});

const namaError = ref("");
const kehadiranError = ref("");

const animatedStats = reactive({
  total: 0,
  hadir: 0,
  absen: 0,
});

// FUNGSI ANIMASI NUMBER COUNTER
const animateNumber = (key, targetValue) => {
  const duration = 1500; // 1.5 detik durasi animasi
  const startValue = animatedStats[key];
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    // Easing function agar melambat di akhir
    const easeOut = 1 - Math.pow(1 - progress, 3);

    animatedStats[key] = Math.floor(easeOut * targetValue);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      animatedStats[key] = targetValue; // Pastikan berakhir di angka tepat
    }
  };

  requestAnimationFrame(step);
};

// Pantau saat loading selesai untuk memicu animasi
watch(
  () => props.isLoading,
  (loading) => {
    if (!loading && props.statistik) {
      animateNumber("total", props.statistik.total || 0);
      animateNumber("hadir", props.statistik.hadir || 0);
      animateNumber("absen", props.statistik.tidakHadir || 0);
    }
  },
  { immediate: true }
);

// Pantau jika ada update real-time (tamu lain kirim data)
watch(
  () => props.statistik,
  (newVal) => {
    if (!props.isStatsLoading && newVal) {
      animateNumber("total", newVal.total || 0);
      animateNumber("hadir", newVal.hadir || 0);
      animateNumber("absen", newVal.tidakHadir || 0);
    }
  },
  { deep: true }
);

const handleSubmit = () => {
  if (!form.value.nama.trim()) return (namaError.value = "Nama wajib diisi.");
  if (!form.value.kehadiran)
    return (kehadiranError.value = "Pilih status kehadiran.");

  emit("submit-rsvp", { ...form.value });
  form.value = { nama: "", kehadiran: "", pesan_tambahan: "" };
};
</script>

<style scoped>
/* Menyamakan persis dengan GuestbookSection */
.rsvp-section {
  padding: 50px 20px;
  background-color: #fefcf5;
}

h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
  text-align: center;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 450px;
  margin: 0 auto;
}

input,
textarea,
select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  background-color: #fefcf5;
  color: #555;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #bc6c25;
  outline: none;
  box-shadow: 0 0 0 3px rgba(212, 163, 115, 0.2);
}

.btn-primary {
  background-color: #bc6c25;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #a45a1e;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-error {
  border-color: #e74c3c !important;
  box-shadow: none !important;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: -5px;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 5px;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #d4a373;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  margin-top: 5px;
}

.stat-divider {
  width: 1px;
  background-color: #eee;
  height: 30px;
  align-self: center;
}

.mini-loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(188, 108, 37, 0.2);
  border-top: 2px solid #bc6c25;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
  margin-bottom: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.stat-count {
  font-size: 1.2rem;
  font-weight: bold;
  color: #bc6c25;
  min-height: 25px; /* Mencegah layout goyang saat loading */
}
</style>
