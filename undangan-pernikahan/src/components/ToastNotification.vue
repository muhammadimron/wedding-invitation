<template>
  <transition name="toast-fade">
    <div v-if="showToast" class="toast-notification">
      <p>{{ toastMessage }}</p>
    </div>
  </transition>
</template>

<script setup>
import { showToast, toastMessage } from "../composables/useToast.js";
</script>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #bc6c25; /* Hijau sukses */
  color: #fff;
  padding: 10px 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 200px;
  text-align: center;
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
}

/* Transisi Vue */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px); /* Muncul dari bawah */
}
</style>
