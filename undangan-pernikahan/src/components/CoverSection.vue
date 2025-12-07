<template>
  <div class="cover-section" :class="{ 'fade-out': isFadingOut }">
    <div class="cover-content">
      <p class="greeting-text">Undangan Pernikahan</p>
      <h1 class="names">{{ mempelaiPria }} & {{ mempelaiWanita }}</h1>
      <p class="date-text">{{ tanggalAcara }}</p>

      <button
        class="open-button"
        @click="handleOpenWithPreload"
        :disabled="isWaitingAssets"
      >
        <i v-if="!isWaitingAssets" class="fas fa-envelope-open"></i>
        <i v-else class="fas fa-spinner fa-spin"></i>
        <span>{{ isWaitingAssets ? "Menyiapkan..." : "Buka Undangan" }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  mempelaiPria: String,
  mempelaiWanita: String,
  tanggalAcara: String,
});

const emit = defineEmits(["open"]);

const isFadingOut = ref(false);
const isWaitingAssets = ref(false);

const handleOpenWithPreload = () => {
  isWaitingAssets.value = true;

  // Tentukan aset krusial yang harus di-preload agar Hero Section tampil sempurna
  const assetsToLoad = [
    "/avatar_hero.png",
    "/avatar_mempelai_akhwat",
    "/avatar_mempelai_ikhwan",
    "/logo.png",
    "/nasheed_wedding_muhammad_al_mutqi.mp3",
  ];
  let loadedCount = 0;

  // Fungsi internal untuk memulai transisi keluar
  const startTransition = () => {
    isFadingOut.value = true;
    setTimeout(() => {
      emit("open");
      isWaitingAssets.value = false;
    }, 1000); // Harus sama dengan durasi transition CSS (1s)
  };

  // Logika Preloading
  assetsToLoad.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === assetsToLoad.length) {
        startTransition();
      }
    };
    img.onerror = () => {
      // Jika error (misal file tidak ketemu), tetap lanjut agar user tidak stuck
      startTransition();
    };
  });

  // Safety Timeout: Jika internet sangat lambat, paksa buka setelah 3.5 detik
  setTimeout(() => {
    if (isWaitingAssets.value) startTransition();
  }, 3500);
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
  z-index: 2000;
  /* Transisi fade out yang mulus */
  transition: opacity 1s ease-out, visibility 1s ease-out;
}

.cover-section.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
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
  font-family: "Great Vibes", cursive;
  font-size: 4rem;
  color: #bc6c25;
  margin: 10px 0 20px;
  line-height: 1.1;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.date-text {
  font-family: "Times New Roman", serif;
  font-size: 1.2rem;
  color: #d4a373;
  margin-bottom: 40px;
}

.open-button {
  background-color: #bc6c25;
  color: #ffffff;
  border: none;
  border-radius: 50px;
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
  min-width: 200px; /* Lebar minimum agar tombol tidak goyang saat ganti teks */
}

.open-button:disabled {
  background-color: #d4a373;
  cursor: wait;
}

.open-button:hover:not(:disabled) {
  background-color: #a15d22;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.open-button i {
  font-size: 1.1rem;
}

/* Spinner Animation */
.fa-spin {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

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
