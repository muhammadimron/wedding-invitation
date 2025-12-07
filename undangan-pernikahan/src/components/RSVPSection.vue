<template>
  <section class="rsvp-section">
    <h2>RSVP</h2>
    <p class="intro">
      Mohon konfirmasi kehadiran Anda untuk membantu kami dalam mempersiapkan
      acara dengan sebaik-baiknya.
    </p>

    <a :href="rsvpLink" target="_blank" class="btn-rsvp">
      <i class="fas fa-check-circle"></i> Konfirmasi Sekarang
    </a>

    <p class="thanks-note">
      Kami nantikan kehadiran dan doa restu Anda. Terima kasih.
    </p>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  rsvpLink: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Menyamakan style section dengan Gift Section */
.rsvp-section {
  padding: 60px 20px;
  background-color: var(--bg-color);
  text-align: center;
}

/* Menyamakan style heading (h2) dengan Gift Section */
h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  /* Menggunakan warna primary yang terlihat di Gift Section */
  color: #bc6c25;
  margin-bottom: 20px;
}

.intro {
  max-width: 600px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
}

/* Menyamakan style tombol dengan .btn-copy di Gift Section */
.btn-rsvp {
  display: inline-block;
  background-color: #bc6c25;
  color: white;
  text-decoration: none;
  padding: 10px 20px; /* Padding sama seperti tombol utama */
  border-radius: 25px; /* Radius sama seperti tombol utama */
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow sama seperti tombol utama */
}

.btn-rsvp:hover {
  background-color: #a45a1e;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* Hover shadow yang konsisten */
}

.btn-rsvp i {
  margin-right: 8px;
}

.thanks-note {
  margin-top: 25px;
  font-style: italic;
  color: #777;
  font-size: 0.8rem;
}
</style>
