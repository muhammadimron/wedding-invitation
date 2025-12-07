<template>
  <section id="gift-section" class="gift-section">
    <h2>Amplop Online</h2>
    <p class="intro">
      Doa restu dari Bapak/Ibu/Saudara/i sekalian sudah merupakan karunia yang
      sangat berarti bagi kami. Namun, jika ingin memberikan tanda kasih, dapat
      disalurkan melalui:
    </p>

    <div class="bank-info">
      <p class="bank-name">{{ mempelai.hadiah.bank }}</p>
      <p class="account-number">
        {{ mempelai.hadiah.rekening }}
      </p>
      <p class="recipient-name">A.N. {{ mempelai.hadiah.atasNama }}</p>

      <button @click="copyRekening" class="btn-copy">
        <i class="fas fa-copy"></i> Salin Nomor Rekening
      </button>
    </div>

    <p class="note">
      Atau, Anda dapat menyalurkan kado secara langsung di lokasi acara:
      <br />
      <br />
      <strong>{{ mempelai.hadiah.opsiLain }}</strong>
    </p>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import { triggerToast } from '../composables/useToast.js';

const props = defineProps({
  mempelai: Object,
});

const copyRekening = () => {
  const rekening = props.mempelai.hadiah.rekening;

  navigator.clipboard
    .writeText(rekening)
    .then(() => {
      // Panggil triggerToast GLOBAL
      triggerToast(`Nomor rekening ${rekening} berhasil disalin!`);
    })
    .catch(() => {
      // Panggil triggerToast GLOBAL
      triggerToast("Gagal menyalin. Mohon salin manual.");
    });
};
</script>

<style scoped>
.gift-section {
  padding: 60px 20px;
  background-color: var(--bg-color);
  text-align: center;
}

h2 {
  font-family: "Great Vibes", cursive;
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

.intro {
  max-width: 600px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
}

.bank-info {
  background-color: var(--white);
  border: 1px dashed var(--primary-color);
  border-radius: 10px;
  padding: 25px 20px;
  max-width: 350px;
  margin: 0 auto 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.bank-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--text-color);
  margin: 0 0 5px 0;
}

.account-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #bc6c25; /* Warna tema yang lebih gelap untuk penekanan */
  margin: 0 0 10px 0;
}

.recipient-name {
  font-size: 0.9rem;
  color: #777;
  margin: 0 0 20px 0;
}

.btn-copy {
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

.btn-copy:hover {
  background-color: #a45a1e;
}

.btn-copy i {
  margin-right: 5px;
}

.note {
  font-size: 0.7rem;
  color: #777;
  margin-top: 20px;
}
</style>
