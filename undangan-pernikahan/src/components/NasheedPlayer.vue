<template>
  <div class="nasheed-player-container"> 
    <button @click="toggleMusic" class="nasheed-button" :class="{ 'is-playing': isPlaying }">
      <i :class="isPlaying ? 'fas fa-music' : 'fas fa-play'"></i>
      
      <div v-if="isPlaying" class="pulse-ring"></div>
      <div v-if="isPlaying" class="pulse-ring delay"></div>
    </button>

    <audio ref="audioPlayer" loop preload="auto">
      <source src="/nasheed_wedding_muhammad_al_mutqi.mp3" type="audio/mp3">
      Browser Anda tidak mendukung elemen audio.
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const audioPlayer = ref(null);
const isPlaying = ref(false);

const toggleMusic = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play().catch((error) => {
      console.log("Autoplay diblokir atau gagal:", error);
    });
  }
  isPlaying.value = !isPlaying.value;
};

onMounted(() => {
  const audio = audioPlayer.value;

  // 1. ATUR VOLUME MENJADI 50% (0.5)
  audio.volume = 0.5;

  // 2. COBA AUTOPLAY (Mungkin diblokir browser!)
  // Karena ini adalah Autoplay yang tidak didahului interaksi, ia akan gagal
  // jika browser memiliki kebijakan ketat.
  audio
    .play()
    .then(() => {
      // Berhasil diputar otomatis
      isPlaying.value = true;
    })
    .catch((error) => {
      // Gagal Autoplay (normal di browser modern)
      console.log("Autoplay diblokir:", error);
      isPlaying.value = false;
    });

  // Set status isPlaying berdasarkan keadaan audio saat dimuat (untuk menghindari race condition)
  // isPlaying.value = !audio.paused; // Baris ini tidak diperlukan karena ditangani di .then/.catch
});

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
});
</script>

<style scoped>
.nasheed-player-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.nasheed-button {
  /* Ukuran default (Desktop/Tablet) */
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.85);
  color: #888;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 2;
}

.nasheed-button i {
  font-size: 1.2rem;
}

.nasheed-button.is-playing {
  background-color: #bc6c25;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.4);
}

/* Penyesuaian untuk dimensi layar kecil (Mobile) */
@media (max-width: 480px) {
  .nasheed-player-container {
    top: 15px;
    right: 15px;
  }

  .nasheed-button {
    width: 35px; /* Ukuran tombol lebih kecil */
    height: 35px;
  }

  .nasheed-button i {
    font-size: 0.9rem; /* Ukuran ikon lebih kecil */
  }
}

.nasheed-button:hover {
  transform: scale(1.05);
}

audio {
  display: none;
}

/* Denyut Ring */
.pulse-ring {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 2px solid #bc6c25;
  z-index: -1;
  animation: ripple 2s infinite ease-out;
}

.delay {
  animation-delay: 1s;
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}
</style>