<script setup>
// Definisikan prop untuk menerima data dari App.vue
defineProps({
  mempelai: Object,
});
</script>

<template>
  <section id="perkenalan-mempelai" class="perkenalan">
    <h2>Mempelai</h2>
    <div class="couple-intro-container">
      <div class="mempelai-card">
        <img
          src="/avatar_mempelai_ikhwan.png"
          alt="Avatar Pria"
          class="single-avatar"
        />
        <h3 class="name-title">{{ mempelai.lengkapPria }}</h3>
        <p class="parent-text">Putra dari:</p>
        <p class="parent-names">
          Bapak {{ mempelai.ayahPria }} & Ibu {{ mempelai.ibuPria }}
        </p>
      </div>

      <div class="symbol-separator">
        <span class="heart-symbol">❤️</span>
      </div>

      <div class="mempelai-card">
        <img
          src="/avatar_mempelai_akhwat.png"
          alt="Avatar Wanita"
          class="single-avatar"
        />
        <h3 class="name-title">{{ mempelai.lengkapWanita }}</h3>
        <p class="parent-text">Putri dari:</p>
        <p class="parent-names">
          Bapak {{ mempelai.ayahWanita }} & Ibu {{ mempelai.ibuWanita }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Salin semua style untuk .perkenalan, .couple-intro-container, .mempelai-card, dll. */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

.perkenalan {
  padding: 50px 20px;
  background-color: var(--bg-color);
}

.couple-intro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.mempelai-card {
  text-align: center;
  width: 100%;
}

.single-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.name-title {
  font-family: "Great Vibes", cursive;
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0 0 5px 0;
}

.parent-text {
  font-size: 0.9rem;
  color: #777;
  margin: 0;
}

.parent-names {
  font-weight: bold;
  color: var(--text-color);
  margin-top: 5px;
}

.symbol-separator {
  width: 100%;
  margin: 10px 0 30px 0;
}

.heart-symbol {
  font-size: 2.5rem;
  color: #d4a373;
  display: block;
  text-align: center;
}

@media (min-width: 600px) {
  .couple-intro-container {
    max-width: 400px;
    margin: 0 auto;
  }

  .single-avatar {
    width: 200px;
    height: 200px;
  }

  .mempelai-card {
    width: 100%;
  }

  .symbol-separator {
    margin: 20px 0;
  }

  .heart-symbol {
    font-size: 3.5rem;
  }
}
</style>
