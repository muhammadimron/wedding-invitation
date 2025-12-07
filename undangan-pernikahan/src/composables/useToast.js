// src/composables/useToast.js

import { ref, watch } from "vue";

// --- STATE GLOBAL YANG AKAN DIBACA OLEH KOMPONEN TOAST ---
export const showToast = ref(false);
export const toastMessage = ref("");

// Variabel internal untuk manajemen timer dan sentuhan
let toastTimerId = null;
let startY = 0;

// --- MANAJEMEN EVENT GLOBAL ---

const closeToastOnInteraction = (event) => {
  if (!showToast.value) return;

  // LOGIKA TAP VS SWIPE (Jika di mobile)
  if (event.type === "touchend" && event.changedTouches.length > 0) {
    const endY = event.changedTouches[0].clientY;
    // Jika pergerakan vertikal > 10px, asumsikan ini adalah scroll/swipe (abaikan)
    if (Math.abs(startY - endY) > 10) {
      return;
    }
  }

  // TUTUP TOAST (TAP/KLIK TERDETEKSI)
  if (toastTimerId) {
    clearTimeout(toastTimerId);
    toastTimerId = null;
  }
  showToast.value = false;
};

const handleTouchStart = (event) => {
  if (showToast.value && event.touches.length === 1) {
    startY = event.touches[0].clientY;
  }
};

// PENGELOLAAN LISTENER DENGAN WATCH (Vue-Idiomatic)
watch(
  showToast,
  (newValue) => {
    if (newValue) {
      // Pasang listener saat toast muncul
      document.addEventListener("mousedown", closeToastOnInteraction);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchend", closeToastOnInteraction);
    } else {
      // Hapus listener saat toast hilang
      document.removeEventListener("mousedown", closeToastOnInteraction);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", closeToastOnInteraction);
    }
  },
  { immediate: false }
);

/**
 * Fungsi utama yang dipanggil oleh komponen manapun untuk menampilkan toast.
 * @param {string} message - Pesan yang akan ditampilkan.
 */
export function triggerToast(message) {
  if (toastTimerId) {
    clearTimeout(toastTimerId);
    toastTimerId = null;
  }

  toastMessage.value = message;
  showToast.value = true;

  toastTimerId = setTimeout(() => {
    showToast.value = false;
    toastTimerId = null;
  }, 3000);
}
