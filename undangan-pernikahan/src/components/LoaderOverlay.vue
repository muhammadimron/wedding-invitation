<template>
  <div class="loader-overlay">
    <div class="loader-content">
      <div class="spinner"></div>
      <p class="loader-text">Mempersiapkan Undangan...</p>
    </div>
  </div>
</template>

<script setup>
// Komponen ini tidak membutuhkan script tambahan
</script>

<style scoped>
/* Pastikan loader menutupi seluruh layar dan memiliki z-index tertinggi */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Gunakan warna background tema agar senada */
  background-color: var(--bg-color);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-content {
  text-align: center;
}

/* Style untuk Spinner (Animation) */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1); /* Warna dasar spinner (transparan) */
  border-top: 4px solid var(--primary-color); /* Warna tema untuk bagian berputar */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px auto;
}

.loader-text {
  font-family: "Great Vibes", cursive;
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
