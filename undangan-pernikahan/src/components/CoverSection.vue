<template>
  <div class="cover-section" :class="{ 'fade-out': isFadingOut }">
    <div class="cover-content">
      <p class="greeting-text">Undangan Pernikahan</p>
      <h1 class="names">{{ mempelaiPria }} & {{ mempelaiWanita }}</h1>
      <p class="date-text">{{ tanggalAcara }}</p>

      <button class="open-button" @click="openInvitation">
        <i class="fas fa-envelope-open"></i> Buka Undangan
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  mempelaiPria: String,
  mempelaiWanita: String,
  tanggalAcara: String, // Contoh: "Kamis, 18 Juni 2026"
});

const emit = defineEmits(["open"]);
const isFadingOut = ref(false);

const openInvitation = () => {
  isFadingOut.value = true; // Aktifkan kelas fade-out
  setTimeout(() => {
    emit("open"); // Emit event 'open' setelah animasi fade-out
  }, 1000); // Sesuaikan durasi timeout dengan durasi transisi CSS
};
</script>

<style scoped>
.cover-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fcf8f4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  z-index: 2000; /* Pastikan di atas semua elemen lain */
  transition: opacity 1s ease-out, visibility 1s ease-out; /* Transisi untuk fade-out */
}

.cover-section.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none; /* Penting agar tidak menghalangi klik setelah fade-out */
}

.cover-content {
  padding: 20px;
  max-width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.greeting-text {
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  color: #584b42;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.names {
  font-family: "Great Vibes", cursive; /* Font yang elegan */
  font-size: 4rem;
  color: #bc6c25;
  margin: 10px 0 20px;
  line-height: 1.1;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.date-text {
  font-family: "Times New Roman", serif; /* Font klasik */
  font-size: 1.2rem;
  color: #d4a373;
  margin-bottom: 40px;
}

.open-button {
  background-color: #bc6c25;
  color: #ffffff;
  border: none;
  border-radius: 50px; /* Bentuk pil */
  padding: 15px 30px;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.open-button:hover {
  background-color: #a15d22; /* Sedikit lebih gelap saat hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.open-button i {
  font-size: 1.1rem;
}

/* Media Query untuk ukuran font di layar lebih kecil/besar */
@media (max-width: 400px) {
  .names {
    font-size: 3rem;
  }
  .greeting-text {
    font-size: 0.5rem;
  }
}
@media (min-width: 768px) {
  .names {
    font-size: 5rem;
  }
  .greeting-text {
    font-size: 1.2rem;
  }
}
</style>
