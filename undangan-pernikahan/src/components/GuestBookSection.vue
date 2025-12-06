<script setup>
import { ref } from "vue";

// Props untuk menerima data ucapan yang sudah ada
const props = defineProps({
  daftarUcapan: Array,
  isLoading: Boolean,
});

// Emits untuk memanggil fungsi kirimUcapan di App.vue
const emit = defineEmits(["kirim-ucapan"]);

const inputNama = ref("");
const inputPesan = ref("");

const kirimLokal = () => {
  // Memanggil fungsi kirimUcapan di App.vue
  emit("kirim-ucapan", {
    nama: inputNama.value,
    pesan: inputPesan.value,
  });

  // Reset form di sini (atau biarkan App.vue yang mereset setelah sukses)
  // Untuk keamanan, biarkan App.vue yang handle reset.
  // Tapi untuk UX yang cepat, kita bisa reset setelah emit:
  inputNama.value = "";
  inputPesan.value = "";
};
</script>

<template>
  <section class="guestbook-section">
    <h2>Ucapkan Sesuatu</h2>

    <div class="form-box">
      <input v-model="inputNama" type="text" placeholder="Nama Anda" />
      <textarea
        v-model="inputPesan"
        placeholder="Tulis ucapan dan doa..."
      ></textarea>
      <button @click="kirimLokal" class="btn-primary" :disabled="isLoading">
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
</template>

<style scoped>
/* Salin semua style untuk .guestbook-section, .form-box, .messages-list, dll. */
/* --- GUEST BOOK --- */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #d4a373;
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
