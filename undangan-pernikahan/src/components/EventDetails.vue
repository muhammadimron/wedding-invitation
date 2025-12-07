<template>
  <section v-aos id="event-details" class="event-details">
    <div v-aos class="event-card-container shadow-premium">
      <h2 class="section-title">Akad & Resepsi</h2>
      <p class="address-intro">Yang Insya Allah akan dilaksanakan pada:</p>
      
      <div class="calendar-wrapper">
        <div class="calendar-header">
          <h3>JUNI 2026</h3>
        </div>
        
        <div class="calendar-grid">
          <div class="day-name">M</div>
          <div class="day-name">S</div>
          <div class="day-name">S</div>
          <div class="day-name">R</div>
          <div class="day-name">K</div>
          <div class="day-name">J</div>
          <div class="day-name">S</div>
  
          <div class="day-num-disable">31</div>
          <div v-for="d in 17" :key="d" class="day-num">{{ d }}</div>
          
          <div class="day-num wedding-day">
            <span class="highlight-circle"></span>
            18
          </div>
  
          <div v-for="d in [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]" :key="d" class="day-num">{{ d }}</div>
          <div v-for="d in 4" :key="'next'+d" class="day-num-disable">{{ d }}</div>
        </div>
      </div>

      <hr class="separator">
      <p class="time-highlight">Pukul 09.00 - 15.00 WIB</p>
    </div>

    <div v-aos class="location-wrapper">
      <div class="location-card shadow-premium">
        <h2 class="section-title">Lokasi Acara</h2>
        <div class="location-info">
          <h4 class="venue-name">{{ mempelai.alamat.namaTempat }}</h4>
          <p class="venue-address">{{ mempelai.alamat.jalan }}</p>
          <p class="venue-city">{{ mempelai.alamat.kota }}</p>
        </div>

        <div class="map-container">
          <iframe
            :src="mempelai.alamat.gmapsLinkEmbed"
            width="100%"
            height="250"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>

        <a :href="mempelai.alamat.gmapsLink" target="_blank" class="btn-maps">
          <i class="fas fa-map-marker-alt"></i> Buka di Google Maps
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  mempelai: Object,
});
</script>

<style scoped>
.event-details {
  padding: 80px 20px;
  background-color: #fefcf5;
}

/* KOTAK UTAMA (CALENDAR BOX) */
.event-card-container {
  border-radius: 20px;
  padding: 40px 20px;
  max-width: 450px;
  margin: 0 auto 50px auto;
  text-align: center;
  border: 1px dashed #bc6c25;
}

.shadow-premium {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.02);
}

.section-title {
  font-family: "Great Vibes", cursive;
  font-size: 2.8rem;
  color: #bc6c25;
  margin-bottom: 5px;
}

.address-intro {
  font-size: 0.85rem;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 30px;
  text-transform: uppercase;
}

/* CALENDAR STYLING */
.calendar-wrapper {
  margin: 0 auto;
}

.calendar-header h3 {
  font-family: 'Times New Roman', serif;
  font-size: 1.3rem;
  letter-spacing: 4px;
  color: #584b42;
  margin-bottom: 20px;
  border-bottom: 1px solid #d4a373;
  display: inline-block;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px 5px;
}

.day-name {
  font-weight: bold;
  color: #bc6c25;
  font-size: 0.8rem;
}

.day-num, .day-num-disable {
  font-size: 0.95rem;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.day-num-disable { color: #eee; }
.day-num { color: #584b42; }

.wedding-day {
  color: #bc6c25;
  font-weight: bold;
}

.highlight-circle {
  position: absolute;
  width: 35px; height: 35px;
  background-color: rgba(188, 108, 37, 0.15);
  border-radius: 50%;
  animation: soft-pulse 2s infinite;
}

@keyframes soft-pulse {
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 0.4; }
}

.time-highlight {
  font-size: 1.1rem;
  font-weight: 600;
  color: #bc6c25;
  margin-top: 10px;
}

/* LOCATION BLOCK */
.location-wrapper {
  max-width: 450px;
  margin: 0 auto;
}

.location-card {
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  border: 1px dashed #bc6c25;
}

.venue-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
}

.venue-address, .venue-city {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #777;
}

.map-container {
  border-radius: 15px;
  overflow: hidden;
  margin: 25px 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.btn-maps {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #bc6c25;
  color: white;
  padding: 12px 25px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.3);
}

.btn-maps:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.4);
}

.separator {
  width: 80px;
  height: 2px;
  background: linear-gradient(to right, transparent, #d4a373, transparent);
  border: none;
  margin: 30px auto;
}
</style>