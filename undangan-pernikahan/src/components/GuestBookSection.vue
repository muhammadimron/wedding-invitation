<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  daftarUcapan: Array,
  isLoading: Boolean,
});

const emit = defineEmits(["kirim-ucapan"]);

const inputNama = ref("");
const inputPesan = ref("");

// --- STATE VALIDASI ---
const namaError = ref("");
const pesanError = ref("");

// --- FUNGSI BARU UNTUK MERESET ERROR SECARA INSTAN ---
const resetNamaError = () => {
  namaError.value = "";
};

const resetPesanError = () => {
  pesanError.value = "";
};
// ----------------------------------------------------

const handleKirimUcapan = () => {
  // Reset error messages sebelum validasi baru (Ini penting untuk saat tombol diklik)
  namaError.value = "";
  pesanError.value = "";

  let hasError = false;

  // 1. Validasi Nama
  if (!inputNama.value.trim()) {
    namaError.value = "Nama tidak boleh kosong.";
    hasError = true;
  }

  // 2. Validasi Pesan
  if (!inputPesan.value.trim()) {
    pesanError.value = "Pesan atau doa restu tidak boleh kosong.";
    hasError = true;
  }

  // 3. Jika ada error, hentikan proses
  if (hasError) {
    return;
  }

  // 4. Jika validasi sukses, emit event
  emit("kirim-ucapan", {
    nama: inputNama.value,
    pesan: inputPesan.value,
  });

  // 5. Reset input field
  inputNama.value = "";
  inputPesan.value = "";
};
</script>

<template>
  <section id="guestbook-section" class="guestbook-section">
    <h2>Ucapkan Sesuatu</h2>

    <div class="form-box">
      <input
        v-model="inputNama"
        type="text"
        placeholder="Nama Anda"
        :class="{ 'input-error': namaError }"
        @input="resetNamaError"
      />
      <p v-if="namaError" class="error-message">{{ namaError }}</p>

      <textarea
        v-model="inputPesan"
        placeholder="Tulis ucapan dan doa..."
        :class="{ 'input-error': pesanError }"
        @input="resetPesanError"
      ></textarea>
      <p v-if="pesanError" class="error-message">{{ pesanError }}</p>

      <button
        @click="handleKirimUcapan"
        class="btn-primary"
        :disabled="isLoading"
      >
        {{ isLoading ? "Mengirim..." : "Kirim Ucapan" }}
      </button>
    </div>

    <div class="messages-list">
      <TransitionGroup name="list-stagger">
        <div
          v-for="(item, index) in daftarUcapan"
          :key="item.id || index"
          class="message-card"
        >
          <h4>{{ item.nama }}</h4>
          <small>{{ item.tanggal }}</small>
          <p>{{ item.pesan }}</p>
        </div>
      </TransitionGroup>

      <div v-if="isLoading" class="loading-message">Memuat ucapan...</div>
      <div v-else-if="daftarUcapan.length === 0" class="empty-message">
        Belum ada ucapan. Jadilah yang pertama!
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Salin semua style untuk .guestbook-section, .form-box, .messages-list, dll. */
/* --- GUEST BOOK --- */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

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
  /* Jaminan latar belakang putih cerah */
  background-color: var(--white);
  color: var(--text-color);
  /* Tambahkan transisi untuk efek fokus yang halus */
  transition: all 0.3s ease;
}

/* Style saat field sedang difokuskan/diisi */
input:focus,
textarea:focus {
  /* Ganti border menjadi warna tema */
  border-color: var(--primary-color);
  outline: none; /* Hapus outline biru/hitam default browser */
  /* Tambahkan bayangan lembut berwarna tema untuk efek "cerah" */
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
}
.messages-list {
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px;
}
.message-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}
.message-card h4 {
  margin: 0;
  color: #bc6c25;
  font-size: 1rem;
}
.message-card small {
  color: #999;
  font-size: 0.6rem;
}
.message-card p {
  margin-top: 5px;
  font-style: italic;
  font-size: 0.8rem;
}

.message-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 1. Animasi untuk UCAPAN BARU (Masuk) */
.list-stagger-enter-active {
  transition: all 0.6s ease-out;
}

.list-stagger-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.list-stagger-move {
  transition: transform 0.6s ease;
}

.input-error {
  /* Ganti border menjadi warna merah yang kontras */
  border-color: #e74c3c !important;
  /* Hapus bayangan fokus jika ada error */
  box-shadow: none !important;
}

.error-message {
  color: #e74c3c; /* Warna teks merah */
  font-size: 0.8rem;
  margin-top: -5px; /* Sedikit naik agar dekat dengan input */
  margin-bottom: 5px;
  text-align: left; /* Teks error harus rata kiri */
  padding-left: 5px;
}

.loading-message,
.empty-message {
  text-align: center;
  color: #777;
  padding: 20px;
  font-style: italic;
}

/* --- MEDIA QUERY (Revisi untuk GLOBAL) --- */
@media (min-width: 600px) {
  .message-card h4 {
    font-size: 1.2rem;
  }
  .message-card small {
    font-size: 0.8rem;
  }
  .message-card p {
    font-size: 1rem;
  }
}
</style>
