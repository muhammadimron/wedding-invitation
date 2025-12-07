<template>
  <nav class="bottom-navbar">
    <div class="nav-links">
      <a
        @click="handleClick($event, 'app-container')"
        class="nav-item"
        aria-label="Home"
        :class="{ active: activeSectionId === 'app-container' }"
      >
        <i class="fas fa-home"></i>
      </a>

      <a
        @click="handleClick($event, 'perkenalan-mempelai')"
        class="nav-item"
        aria-label="Mempelai"
        :class="{ active: activeSectionId === 'perkenalan-mempelai' }"
      >
        <i class="fas fa-heart"></i>
      </a>

      <a
        @click="handleClick($event, 'event-details')"
        class="nav-item"
        aria-label="Acara"
        :class="{ active: activeSectionId === 'event-details' }"
      >
        <i class="fas fa-calendar-alt"></i>
      </a>
      <a
        @click="handleClick($event, 'gift-section')"
        class="nav-item"
        aria-label="Kado"
        :class="{ active: activeSectionId === 'gift-section' }"
      >
        <i class="fas fa-gift"></i>
      </a>
      <a
        @click="handleClick($event, 'guestbook-section')"
        class="nav-item"
        aria-label="Ucapan"
        :class="{ active: activeSectionId === 'guestbook-section' }"
      >
        <i class="fas fa-comments"></i>
      </a>
    </div>
  </nav>
</template>

<script setup>
// *** SCRIPT SETUP TETAP SAMA DENGAN LOGIKA SCROLL SPY DAN HANDLE CLICK SEBELUMNYA ***
import { ref, onMounted, onBeforeUnmount } from "vue";

const activeSectionId = ref("app-container");
const isClickScrolling = ref(false);
const NAVBAR_HEIGHT = 60;

const sectionIds = [
  "app-container",
  "perkenalan-mempelai",
  "event-details",
  "gift-section",
  "guestbook-section",
];

// Logika pemantauan scroll (Scroll Spy)
const handleScroll = () => {
  if (isClickScrolling.value) {
    return;
  }

  const activeThreshold = NAVBAR_HEIGHT;
  let currentActive = "app-container";

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const id = sectionIds[i];
    const section = document.getElementById(id);

    if (section) {
      const rect = section.getBoundingClientRect();

      if (rect.top <= activeThreshold) {
        currentActive = id;
        break;
      }
    }
  }
  activeSectionId.value = currentActive;
};

// Logika klik dan scroll manual
const handleClick = (event, targetId) => {
  event.preventDefault();
  activeSectionId.value = targetId;
  isClickScrolling.value = true;

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    let offsetPosition;
    if (targetId === "app-container") {
      offsetPosition = 0;
    } else {
      const elementPosition = targetElement.getBoundingClientRect().top;
      offsetPosition = elementPosition + window.scrollY;
    }

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      isClickScrolling.value = false;
    }, 800);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setTimeout(handleScroll, 300);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.bottom-navbar {
  /* Layout Umum Floating Capsule */
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  height: 60px;
  z-index: 999;
  padding: 5px 15px;

  /* Style Kapsul Mengambang */
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* Efek Frosted Glass */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Bagian Navigasi Links --- */
.nav-links {
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #888;
  flex: 1;
  transition: color 0.3s, transform 0.3s;
}

/* Semua Icon sekarang berukuran standar 1.5rem */
.nav-item i {
  font-size: 1.5rem;
  margin: 0;
}

/* Style Icon Aktif */
.nav-item.active {
  color: #bc6c25;
}

/* Layout responsif untuk desktop/layar lebar */
@media (min-width: 768px) {
  .bottom-navbar {
    width: 400px;
  }
}
</style>
