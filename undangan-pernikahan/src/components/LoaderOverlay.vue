<template>
  <div class="loader-overlay">
    <div class="loader-content">
      <h1 class="loader-initials">I & D</h1>
      <div class="loader-line"></div>
      <p class="loader-text">Menyiapkan Momen Bahagia...</p>
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
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

/* Style untuk Spinner (Animation) */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1); /* Warna dasar spinner (transparan) */
  border-top: 4px solid #d4a373; /* Warna tema untuk bagian berputar */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px auto;
}

.loader-initials {
  font-family: 'Great Vibes', cursive;
  font-size: 4rem;
  color: #bc6c25;
  margin: 0;
  animation: pulseOpacity 2s infinite ease-in-out;
}

.loader-line {
  width: 50px;
  height: 2px;
  background: #d4a373;
  margin: 10px auto;
  animation: growLine 2s infinite ease-in-out;
}

.loader-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: #584b42;
  text-transform: uppercase;
}

@keyframes pulseOpacity {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes growLine {
  0%, 100% { width: 10px; }
  50% { width: 80px; }
}
</style>
