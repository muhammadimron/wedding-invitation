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

      <button
        @click="handleSubmit"
        class="btn-primary"
        :disabled="isLoading"
      >
        {{ isLoading ? "Mengirim..." : "Konfirmasi Kehadiran" }}
      </button>

      <div class="stats-container shadow-premium">
        <div v-for="(val, key) in mappedStats" :key="key" class="stat-item">
          <div v-if="isLoading" class="mini-loader"></div>

          <span v-else class="stat-count">{{ val.count }}</span>

          <span class="stat-label">{{ val.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

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

const mappedStats = computed(() => [
  { label: 'Total', count: props.statistik?.total || 0 },
  { label: 'Hadir', count: props.statistik?.hadir || 0 },
  { label: 'Absen', count: props.statistik?.tidakHadir || 0 }
]);

const handleSubmit = () => {
  namaError.value = "";
  kehadiranError.value = "";

  let hasError = false;

  if (!form.value.nama.trim()) {
    namaError.value = "Nama tidak boleh kosong.";
    hasError = true;
  }

  if (!form.value.kehadiran) {
    kehadiranError.value = "Mohon pilih status kehadiran.";
    hasError = true;
  }

  if (hasError) return;

  emit("submit-rsvp", { ...form.value });

  // Reset form
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.stat-count {
  font-size: 1.2rem;
  font-weight: bold;
  color: #bc6c25;
  min-height: 25px; /* Mencegah layout goyang saat loading */
}
</style>
