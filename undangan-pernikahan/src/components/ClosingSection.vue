<template>
  <section class="closing-section">
    <div class="closing-content thankyou">
      <h2 class="closing-title">Penutup</h2>
      <p class="closing-text">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu.
        <br />
        Atas kehadiran, perhatian, dan do'a restu dari Anda sekalian, kami
        mengucapkan:
      </p>

      <h3 class="arabic-phrase">جَزَاكُمُ اللهُ خَيْرًا كَثِيْرًا</h3>
      <p class="arabic-translation">
        (Semoga Allah membalas kalian dengan kebaikan yang banyak)
      </p>
    </div>

    <hr class="separator" />

    <div class="closing-content names">
      <p class="closing-text">Kami yang berbahagia,</p>
      <h1 class="signature-names">Imron & Dewi</h1>
    </div>

    <hr class="separator" />

    <footer class="closing-footer">
      <p>Wedding invitation website created with ❤️ by Muhammad Imron</p>
    </footer>
  </section>
</template>

<script setup>
// Tidak ada logika atau state yang diperlukan untuk bagian ini
</script>

<style scoped>
.closing-section {
  padding: 60px 20px 80px; /* Padding bawah 80px untuk memberi ruang Fixed Navbar */
  background-color: #fcf8f4;
  text-align: center;
  color: #584b42;
}

.closing-title {
  font-family: "Great Vibes", cursive; /* Font formal */
  font-size: 2.5rem;
  color: #bc6c25;
  margin-bottom: 20px;
}

.closing-text {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 20px;
}

/* --- STYLE BARU UNTUK TEKS ARAB --- */
.arabic-phrase {
  font-family: "Times New Roman", serif; /* Font yang mendukung karakter Arab */
  font-size: 1.8rem;
  color: #bc6c25;
  margin: 20px auto 5px;
  direction: rtl;
}

.arabic-translation {
  font-size: 0.9rem;
  font-style: italic;
  color: #888;
  margin-bottom: 25px;
}

/* Style Nama Mempelai */
.signature-names {
  /* Gunakan font yang mirip dengan font di Cover Section/monogram */
  font-family: "Brush Script MT", cursive; /* Ganti dengan font estetik Anda */
  font-size: 3.5rem;
  color: #bc6c25;
  margin-top: 10px;
  margin-bottom: 30px;
}

/* Garis Pemisah (Sangat estetik) */
.separator {
  width: 150px;
  height: 1px;
  background-color: #d4a373;
  border: none;
  margin: 40px auto;
}

/* Style Kredit */
.closing-footer {
  padding-top: 20px;
  font-size: 0.75rem;
  color: #a0a0a0; /* Teks abu-abu muda */
}
</style>
