<script setup>
// Definisikan prop untuk menerima data dari App.vue
defineProps({
  mempelai: Object,
});
</script>

<template>
  <section class="event-details">
    <h2>Waktu dan Tempat</h2>

    <div class="event-card-container">
      <div class="event-card akad-card">
        <span class="icon-event">💍</span>
        <h3>Akad Nikah</h3>
        <p class="event-date">{{ mempelai.akad.tanggal }}</p>
        <p class="event-time">{{ mempelai.akad.waktu }}</p>
        <p class="event-location">{{ mempelai.akad.tempat }}</p>
      </div>

      <div class="event-card resepsi-card">
        <span class="icon-event">🎉</span>
        <h3>Resepsi Pernikahan</h3>
        <p class="event-date">{{ mempelai.resepsi.tanggal }}</p>
        <p class="event-time">{{ mempelai.resepsi.waktu }}</p>
        <p class="event-location">{{ mempelai.resepsi.tempat }}</p>
      </div>
    </div>

    <div class="full-address-block">
      <h2>Lokasi Acara</h2>
      <p class="address-name">{{ mempelai.alamat.namaTempat }}</p>
      <p class="address-detail">{{ mempelai.alamat.jalan }}</p>
      <p class="address-detail">{{ mempelai.alamat.kota }}</p>
      <div class="map-container">
        <iframe
          :src="mempelai.alamat.gmapsLinkEmbed"
          width="100%"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <a :href="mempelai.alamat.gmapsLink" target="_blank" class="btn-maps">
        Lihat di Google Maps
      </a>
    </div>
  </section>
</template>

<style scoped>
/* Salin semua style untuk .event-details, .event-card-container, .full-address-block, dll. */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #d4a373;
  margin-bottom: 20px;
}

.event-details {
  padding: 50px 20px;
  background-color: var(--white);
}

.event-card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.event-card {
  padding: 25px 15px;
  border-radius: 12px;
  background-color: #fef8f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.icon-event {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}

.event-card h3 {
  font-family: "Great Vibes", cursive;
  font-size: 2.2rem;
  color: #bc6c25;
  margin: 0 0 10px 0;
}

.event-date {
  font-weight: bold;
  color: var(--text-color);
  margin: 5px 0 0 0;
}

.event-time {
  font-style: italic;
  color: #777;
  margin: 15px 0 15px 0;
  font-size: 0.6rem;
}

.event-location {
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.full-address-block {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px dashed #d4a373;
  border-radius: 8px;
}

.full-address-block h4 {
  font-size: 1.1rem;
  color: #bc6c25;
  margin-top: 0;
}

.address-detail,
.address-name {
  font-size: 0.9rem;
  color: #555;
  margin: 3px 0;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-maps {
  display: inline-block;
  /* Ganti warna latar agar sama seperti tombol utama countdown */
  background-color: #bc6c25;
  color: white;
  text-decoration: none;
  /* Sesuaikan padding, radius, dan ukuran font agar terlihat sama */
  padding: 10px 20px; 
  border-radius: 25px; 
  margin-top: 20px;
  font-size: 0.9rem; 
  font-weight: bold;
  transition: background-color 0.3s;
  /* Tambahkan box-shadow agar terlihat 'terangkat' dan interaktif */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.btn-maps:hover {
  /* Sesuaikan warna hover */
  background-color: #a45a1e; 
}
@media (min-width: 600px) {
  .event-card-container {
    flex-direction: row;
    max-width: 550px;
    margin: 0 auto 40px auto;
  }
}
</style>
